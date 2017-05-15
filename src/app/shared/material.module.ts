import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
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
  MdButtonModule,
  MdButtonToggleModule,
  MdIconModule,
  MdProgressSpinnerModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {
}
