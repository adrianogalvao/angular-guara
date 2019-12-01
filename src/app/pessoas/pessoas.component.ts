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
        this.pessoas = response;        
        console.log(this.pessoas);
      },
      error => { console.log(error) }
    )
  }
}