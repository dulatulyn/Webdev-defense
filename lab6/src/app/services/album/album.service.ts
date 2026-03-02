import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Album } from '../../models/album.model';
import { Photo } from '../../models/photo.model';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    private apiUrl = 'https://jsonplaceholder.typicode.com/albums';

    private deletedIds = new Set<number>();
    private updatedAlbums = new Map<number, Album>();

    private albumsSubject = new BehaviorSubject<Album[] | null>(null);
    albums$ = this.albumsSubject.asObservable();

    constructor(private http: HttpClient) { }

    loadAlbums(): void {
        if (this.albumsSubject.value !== null) {
            return;
        }
        this.http.get<Album[]>(this.apiUrl).pipe(
            map(albums => albums
                .filter(a => !this.deletedIds.has(a.id))
                .map(a => this.updatedAlbums.get(a.id) ?? a)
            )
        ).subscribe(albums => this.albumsSubject.next(albums));
    }

    getAlbum(id: number): Observable<Album> {
        return this.http.get<Album>(`${this.apiUrl}/${id}`).pipe(
            map(album => this.updatedAlbums.get(album.id) ?? album)
        );
    }

    getAlbumPhotos(id: number): Observable<Photo[]> {
        return this.http.get<Photo[]>(`${this.apiUrl}/${id}/photos`);
    }

    createAlbum(payload: { userId: number; title: string }): Observable<Album> {
        return this.http.post<Album>(this.apiUrl, payload).pipe(
            tap(createdAlbum => {
                const current = this.albumsSubject.value ?? [];
                this.albumsSubject.next([createdAlbum, ...current]);
            })
        );
    }

    updateAlbum(album: Album): Observable<Album> {
        return this.http.put<Album>(`${this.apiUrl}/${album.id}`, album).pipe(
            tap(() => {
                this.updatedAlbums.set(album.id, album);
                const current = this.albumsSubject.value;
                if (current) {
                    this.albumsSubject.next(
                        current.map(a => a.id === album.id ? album : a)
                    );
                }
            })
        );
    }

    deleteAlbum(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.deletedIds.add(id);
                const current = this.albumsSubject.value;
                if (current) {
                    this.albumsSubject.next(current.filter(a => a.id !== id));
                }
            })
        );
    }
}
