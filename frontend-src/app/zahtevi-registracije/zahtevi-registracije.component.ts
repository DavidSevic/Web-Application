import { Component, OnInit } from '@angular/core';
import { FunkcionalniService } from '../funkcionalni.service';
import { Korisnik } from '../models/korisnik';
import { Registracija } from '../models/registracija';

@Component({
  selector: 'app-zahtevi-registracije',
  templateUrl: './zahtevi-registracije.component.html',
  styleUrls: ['./zahtevi-registracije.component.css']
})
export class ZahteviRegistracijeComponent implements OnInit {

  ulogovan : Korisnik;

  registracije : Registracija[];

  constructor(private fService : FunkcionalniService) { }

  ngOnInit(): void {
    
    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    this.fService.sveRegistracije().subscribe((registracije : Registracija[])=>{
      if(registracije) {
        this.registracije = registracije;
      }
    });

  }

  prihvati(r) {

    this.fService.noviKorisnik(r.ime, r.prezime, r.korisnickoIme, r.lozinka, "korisnik", r.slika, r.email, r.grad, r.drzava).subscribe(resp=>{
      console.log(resp)

      this.fService.brisiReg(r.id).subscribe(resp=>{console.log(resp)});
    
    });

    for(var i in this.registracije)
      if(this.registracije[i].id == r.id) {
        this.registracije.splice(parseInt(i), 1);
        break;
      }
  }

  odbij(r) {

    this.fService.brisiReg(r.id).subscribe(resp=>{console.log(resp)});

    for(var i in this.registracije)
      if(this.registracije[i].id == r.id) {
        this.registracije.splice(parseInt(i), 1);
        break;
      }
  }

}
