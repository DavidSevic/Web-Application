import { Component, OnInit } from '@angular/core';
import { FunkcionalniService } from '../funkcionalni.service';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import alertify from "alertify.js";

@Component({
  selector: 'app-sve-nekretnine',
  templateUrl: './sve-nekretnine.component.html',
  styleUrls: ['./sve-nekretnine.component.css']
})
export class SveNekretnineComponent implements OnInit {

  nekretnine : Nekretnina[];

  ulogovan : Korisnik;

  korisnici : Korisnik[];

  agent : boolean;
  admin : boolean;
  stanje : string;

  slike: string[];

  naziv: string;

  adresa: string;

  tip: string;

  spratovi: string;

  kvadratura: string;

  namestenost: boolean;

  sobe: string;

  tipOglasa: string;

  cena: string;

  promovisanje: boolean;

  slikeNova: string[];

  poruka: string;

  constructor(private nService : NekretnineService, private fService : FunkcionalniService) { }

  ngOnInit(): void {

    this.nekretnine = [];

    this.stanje = "sve";
 
    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    if(this.ulogovan.tip == "radnik")
      this.agent = true;
    else
      this.agent = false;

      if(this.ulogovan.tip == "admin")
      this.admin = true;
    else
      this.admin = false;

    this.nService.sveNekretnine().subscribe((nekretnine : Nekretnina[])=>{
      if(nekretnine) {

        this.nekretnine = [];

        for(var i in nekretnine) {
          if(nekretnine[i].prodata == false && nekretnine[i].odobrena == true)
            this.nekretnine.push(nekretnine[i]);
        }
      }
    }); 

    this.fService.sviKorisnici().subscribe((korisnici : Korisnik[])=>{
      if(korisnici) {
        this.korisnici = korisnici;
      }
    });

  }

  spratoviKoji(n) {
    if(n.tip == "kuca") {
      if(n.spratovi == "1")
        return "Kuća na " + n.spratovi + " sprat";
      if(parseInt(n.spratovi) < 5)
        return "Kuća na " + n.spratovi + " sprata";

      return "Kuća na " + n.spratovi + " spratova"; 
    }
    if(n.tip == "stan") {
      return "Stan na " + n.spratovi.split(" ")[0] + ". spratu, ukupan broj spratova: " + n.spratovi.split(" ")[1];
    }
  }

  namestenostJel(n) {
    if(n.namestenost == true)
      return "Da";
    else
      return "Ne";
  }

  vlasnik(n) {
    
        for(var i in this.korisnici)
          if(this.korisnici[i].id == n.vlasnik)
            return this.korisnici[i].ime + " " + this.korisnici[i].prezime;
  }

  promo(n) {
    if(n.promovisana == true) {
      this.nService.promovisanje(n.id, false).subscribe(resp=>{console.log(resp)});
      n.promovisana = false;
    }
    else {
      this.nService.promovisanje(n.id, true).subscribe(resp=>{console.log(resp)});
      n.promovisana = true;
    }
  }

  novaNek() {
    this.stanje = "nova";
  }

  postavi() {

    if (this.naziv == null || this.naziv == "" || this.adresa == null || this.adresa == "" ||
      this.tip == null || this.tip == "" || this.spratovi == null || this.spratovi == "" ||
      this.kvadratura == null || this.kvadratura == "" ||
      this.sobe == null || this.sobe == "" ||
      this.namestenost == null || this.tipOglasa == null || this.tipOglasa == "" ||
      this.cena == null || this.cena == "" || this.promovisanje == null) {

      alertify.error("Morate uneti sva polja");

      return;
    }


    var s = "";
    var fileinput = (<HTMLInputElement>document.getElementById("idSlike"));

    var file = fileinput.files;

    if (file.length < 3) {
      alertify.error("Morate uneti barem tri slike/videa");
      return;
    }
    for (var i = 0; i < file.length; i++) {
      s += file.item(i).name;
      if (i + 1 < file.length) {
        s += ",";
      }
    }

    this.slikeNova = [];

    for (var j in s.split(','))
      this.slikeNova.push(s.split(',')[j]);

    var odobrena = false;
    var id = this.ulogovan.id;

    if (this.ulogovan.tip == "radnik" || this.ulogovan.tip == "admin") {
      odobrena = true;
      id = 0;
    }


      

    this.nService.novaNekretnina(this.naziv, this.adresa, this.tip, this.spratovi, parseInt(this.kvadratura),
      parseInt(this.sobe), this.namestenost, this.tipOglasa, parseInt(this.cena), id,
      this.promovisanje, this.slikeNova, false, odobrena).subscribe(resp => { 
        console.log(resp);

        alertify.success("Uspešno uneta nekretnina");
      });

  }

  povratak() {
    this.stanje = "sve";
    location.reload();
  }


}
