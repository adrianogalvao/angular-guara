import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  pessoas: any;
  pages: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPessoas('https://swapi.co/api/people/?page=1');
  }

  ngOnNextPage(){
    this.getPessoas(this.pages.next);
  }

  ngOnPrevPage(){
    this.getPessoas(this.pages.previous);
  }

  getPessoas(url : string){
    this.http.get(url).subscribe(      
      response => {
        this.pessoas = response.results;
        this.pages = response;
        for (let i = 0; i < this.pessoas.length; i++) {
          this.http.get(this.pessoas[i].homeworld).subscribe(
            response => {
              this.pessoas[i].planeta = response.name
            }
          );
          this.http.get(this.pessoas[i].species[0]).subscribe(
            response => {
              this.pessoas[i].specie = response.name
            }
          )         
        };
      },
      error => { console.log(error) }
    )
  }  
}