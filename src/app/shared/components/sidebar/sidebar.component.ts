import { Component } from '@angular/core';
import { GifService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    
    constructor(private gifsService : GifService){     
    }

    get tags() : string[]{
      return this.gifsService.tagsHistory;
    }

    searchTag  (tag : string): void{
      this.gifsService.searchTag(tag);
    }




    
}
