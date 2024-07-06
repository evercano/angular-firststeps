import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifService {

    public gifList : Gif[]=[];

    private _tagsHistory : string[] = [];
    private apiKey : string = 'ZSxuOHzOuDt2OPegPfsphuKqDHMxVlO3';
    private serviceUrl : string = 'https://api.giphy.com/v1/gifs';

    constructor( private http : HttpClient) { 
        this.loadFromLocalStorage();
        console.log("Gifs Service Ready!");
    }

    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private saveToLocalStorage(){
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadFromLocalStorage(){
        if(!localStorage.getItem('history')) return;        
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
        this.searchTag(this._tagsHistory[0]);
    }

    private organizeHistory ( tag : string){
        tag =  tag.toLowerCase();
        // VERIFICAMOS SIN EL TAG BUSCADO ESTA DENTRO DEL ARREGLO
        if(this._tagsHistory.includes(tag)){
            //SI ESTA REALIZAREMOS UN PREDICADO PARA RETORNAR EL ARREGLO SIN EL ELEMENTO BUSCADO
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
        }
        this._tagsHistory.unshift(tag); //INCLUIMOS EL NUEVO TAG
        this._tagsHistory = this._tagsHistory.splice(0,10); // REALIZAMOS UN SPLITE PARA DEJAR SOLO LOS PRIMEROS 10 ELEMENTOS
        this.saveToLocalStorage();
    }

     searchTag( tag : string) : void{
        if ( tag.length ===0 ) return;
        this.organizeHistory(tag);       
        const params  = new HttpParams()
        .set('api_key',this.apiKey)
        .set('q',tag)
        .set('limit','10');
        
        this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
            .subscribe ( resp => {
                //console.log(resp); 
                this.gifList = resp.data;                
            });

            
        /*fetch('https://api.giphy.com/v1/gifs/search?api_key=ZSxuOHzOuDt2OPegPfsphuKqDHMxVlO3&q=valorant&limit=10')
             .then(resp => resp.json())
             .then(data => console.log(data));*/
        //console.log(this._tagsHistory);
    }  

    
}