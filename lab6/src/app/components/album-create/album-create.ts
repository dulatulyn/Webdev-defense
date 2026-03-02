import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album/album.service';

@Component({
  selector: 'app-album-create',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './album-create.html',
  styleUrl: './album-create.css',
})
export class AlbumCreate {
  userId: number | null = null;
  title: string = '';
  submitting = signal(false);
  error = signal('');

  constructor(private albumService: AlbumService, private router: Router) {}

  get isValid(): boolean {
    return (
      this.userId !== null &&
      this.userId >= 1 &&
      this.userId <= 10 &&
      this.title.trim().length >= 3
    );
  }

  onSubmit(): void {
    if (!this.isValid || this.userId === null) {
      return;
    }

    this.submitting.set(true);
    this.error.set('');

    this.albumService
      .createAlbum({ userId: this.userId, title: this.title.trim() })
      .subscribe({
        next: () => {
          this.router.navigate(['/albums']);
        },
        error: () => {
          this.error.set('Failed to create album. Please try again.');
          this.submitting.set(false);
        },
      });
  }
}
