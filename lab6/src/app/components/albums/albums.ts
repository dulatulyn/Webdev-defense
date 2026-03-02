import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AlbumService } from '../../services/album/album.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-albums',
  imports: [CommonModule, RouterLink],
  templateUrl: './albums.html',
  styleUrl: './albums.css',
})
export class Albums implements OnInit {
  albums$: Observable<Album[] | null>;

  constructor(private albumService: AlbumService) {
    this.albums$ = this.albumService.albums$;
  }

  ngOnInit(): void {
    this.albumService.loadAlbums();
  }

  deleteAlbum(id: number): void {
    this.albumService.deleteAlbum(id).subscribe();
  }
}
