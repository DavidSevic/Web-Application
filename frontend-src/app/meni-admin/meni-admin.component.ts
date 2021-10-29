import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-meni-admin',
  templateUrl: './meni-admin.component.html',
  styleUrls: ['./meni-admin.component.css']
})
export class MeniAdminComponent implements OnInit {

  ulogovan : Korisnik;


  constructor(private router : Router) { 

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

  }

  ngOnInit(): void {
  }

  odlogovanje() {

    sessionStorage.removeItem("ulogovan");

    this.router.navigate([""]);

  }

  pocetna() {
    this.router.navigate(["admin"]);
  }
 
  zahteviNekretnina() {
    this.router.navigate(["zahteviNekretnina"]);
  }

  promenaLozinke() {
    this.router.navigate(["promenaLozinke"]);
  }

  podaciKorisnika() {
    this.router.navigate(["podaciKorisnika"]);
  }

  sveNekretnine() {
    this.router.navigate(["sveNekretnine"]);
  }

  sviUgovori() {
    this.router.navigate(["sviUgovori"]);
  }

  korisnici() {
    this.router.navigate(["izmenaKorisnika"]);
  }

  zahteviRegistracija() {
    this.router.navigate(["zahteviRegistracije"]);
  }

}
