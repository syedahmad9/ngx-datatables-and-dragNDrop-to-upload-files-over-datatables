import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { ProgressComponent } from './progress/progress.component';
import { DndDirective } from './dnd.directive';

@NgModule({
  imports:      [ CommonModule, BrowserModule, FormsModule, NgxDatatableModule, HttpClientModule ],
  declarations: [ AppComponent, ProgressComponent, DndDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
