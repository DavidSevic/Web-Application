import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-meni-korisnik',
  templateUrl: './meni-korisnik.component.html',
  styleUrls: ['./meni-korisnik.component.css']
})
export class MeniKorisnikComponent implements OnInit {

  ulogovan : Korisnik;

  constructor(private router : Router) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

  }

  odlogovanje() {

    sessionStorage.removeItem("ulogovan");

    this.router.navigate([""]);

  }

  pocetna() {
    this.router.navigate(["korisnik"]);
  }
 
  inbox() {
    this.router.navigate(["inbox"]);
  }

  promenaLozinke() {
    this.router.navigate(["promenaLozinke"]);
  }

  podaciKorisnika() {
    this.router.navigate(["podaciKorisnika"]);
  }

  korisnikNekretnine() {
    this.router.navigate(["korisnikNekretnine"]);
  }


}
