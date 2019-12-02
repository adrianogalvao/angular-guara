import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  pessoas: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPessoas();
  }

  getPessoas(){
    this.http.get('https://swapi.co/api/people/').subscribe(
      response => {
        this.pessoas = response.results;
        console.log(this.pessoas);
        for (let i = 0; i < this.pessoas.length; i++) {
          this.http.get(this.pessoas[i].homeworld).subscribe(
            response => {
              this.pessoas[i].homeworld = response.name
            }
          );
          this.http.get(this.pessoas[i].species[0]).subscribe(
            response => {
              this.pessoas[i].species = response.name
            }
          )         
        };
      },
      error => { console.log(error) }
    )
  }  
}