import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Albums } from './components/albums/albums';
import { AlbumDetail } from './components/album-detail/album-detail';
import { AlbumPhotos } from './components/album-photos/album-photos';
import { AlbumCreate } from './components/album-create/album-create';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'albums', component: Albums },
    { path: 'albums/new', component: AlbumCreate },
    { path: 'albums/:id', component: AlbumDetail },
    { path: 'albums/:id/photos', component: AlbumPhotos },
    { path: '**', redirectTo: '/home' }
];
