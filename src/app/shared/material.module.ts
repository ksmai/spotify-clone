import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdSliderModule,
  MdTabsModule,
  MdToolbarModule,
} from '@angular/material';

const materialModules: any = [
  MdInputModule,
  MdSliderModule,
  MdToolbarModule,
  MdCardModule,
  MdTabsModule,
  MdProgressBarModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdIconModule,
  MdListModule,
  MdProgressSpinnerModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {
}
