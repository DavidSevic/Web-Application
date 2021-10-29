import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-meni-agent',
  templateUrl: './meni-agent.component.html',
  styleUrls: ['./meni-agent.component.css']
})
export class MeniAgentComponent implements OnInit {

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
    this.router.navigate(["agent"]);
  }
 
  zahteviNekretnina() {
    this.router.navigate(["zahteviNekretnina"]);
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

  vaseNekretnine() {
    this.router.navigate(["korisnikNekretnine"]);
  }

  sveNekretnine() {
    this.router.navigate(["sveNekretnine"]);
  }

  sviUgovori() {
    this.router.navigate(["sviUgovori"]);
  }

  zahteviUgovori() {
    this.router.navigate(["zahteviUgovori"]);
  }

}
