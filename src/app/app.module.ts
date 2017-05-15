import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';

import { AlbumModule } from './album/album.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistModule } from './artist/artist.module';
import { CoreModule } from './core/core.module';
import { PlayerModule } from './player/player.module';
import { SearchModule } from './search/search.module';
import { TrackModule } from './track/track.module';

import 'hammerjs';
import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AlbumModule,
    ArtistModule,
    SearchModule,
    TrackModule,
    PlayerModule,
    AppRoutingModule,
  ],

  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
