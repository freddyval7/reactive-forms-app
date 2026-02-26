import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe],
  templateUrl: './dinamic-page.html',
})
export class DinamicPage {}
