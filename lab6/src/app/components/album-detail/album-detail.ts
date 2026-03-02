import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album/album.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-album-detail',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.css',
})
export class AlbumDetail implements OnInit {
  album = signal<Album | null>(null);
  loading = signal(true);
  newTitle = '';

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.albumService.getAlbum(id).subscribe((data) => {
        this.album.set(data);
        this.newTitle = data.title;
        this.loading.set(false);
      });
    }
  }

  saveTitle(): void {
    const current = this.album();
    if (current && this.newTitle) {
      const updatedAlbum = { ...current, title: this.newTitle };
      this.albumService.updateAlbum(updatedAlbum).subscribe(() => {
        this.album.set(updatedAlbum);
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
