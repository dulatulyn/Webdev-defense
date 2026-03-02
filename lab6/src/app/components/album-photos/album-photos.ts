import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album/album.service';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-album-photos',
  imports: [CommonModule],
  templateUrl: './album-photos.html',
  styleUrl: './album-photos.css',
})
export class AlbumPhotos implements OnInit {
  photos = signal<Photo[]>([]);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.albumService.getAlbumPhotos(id).subscribe((data) => {
        this.photos.set(data.map(photo => ({
          ...photo,
          thumbnailUrl: photo.thumbnailUrl.replace('via.placeholder.com', 'dummyimage.com')
        })));
        this.loading.set(false);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
