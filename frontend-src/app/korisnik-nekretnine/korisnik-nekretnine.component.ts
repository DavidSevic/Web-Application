import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import alertify from "alertify.js";

@Component({
  selector: 'app-korisnik-nekretnine',
  templateUrl: './korisnik-nekretnine.component.html',
  styleUrls: ['./korisnik-nekretnine.component.css']
})
export class KorisnikNekretnineComponent implements OnInit {

  ulogovan: Korisnik;

  nekretnine: Nekretnina[];

  slike: string[];

  stanje: string;

  naziv: string;
  nazivNovo: string;

  adresa: string;
  adresaNovo: string;

  tip: string;
  tipNovo: string;

  spratovi: string;
  spratoviNovo: string;

  kvadratura: string;
  kvadraturaNovo: string;

  namestenost: boolean;
  namestenostNovo: boolean;

  sobe: string;
  sobeNovo: string;

  tipOglasa: string;
  tipOglasaNovo: string;

  cena: string;
  cenaNovo: string;

  promovisanje: boolean;
  promovisanjeNovo: boolean;

  slikeNova: string[];
  slikeNovo: string[];

  odabrana: Nekretnina;

  poruka: string;

  constructor(private nService: NekretnineService) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    //if(this.ulogovan.tip == "radnik")
    //this.ulogovan = JSON.parse(sessionStorage.getItem("agencija"));

    this.stanje = "sve";

    this.nService.sveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      if (nekretnine) {

        this.nekretnine = [];

        if (this.ulogovan.tip == "korisnik") {
          for (var i in nekretnine)
            if (nekretnine[i].vlasnik == this.ulogovan.id && nekretnine[i].prodata == false && nekretnine[i].odobrena == true)
              this.nekretnine.push(nekretnine[i]);
        } else if (this.ulogovan.tip == "radnik") {
          for (var i in nekretnine)
            if (nekretnine[i].vlasnik == 0 && nekretnine[i].prodata == false)
              this.nekretnine.push(nekretnine[i]);
        }

        this.slike = [];

        for (var k in this.nekretnine)
          this.slike[this.nekretnine[k].id] = this.slikaNasum(this.nekretnine[k].id);
      }
    });


  }

  opstGrad(id) {
    for (var i in this.nekretnine)
      if (this.nekretnine[i].id == id)
        return this.nekretnine[i].adresa.split(',')[1] + ", " + this.nekretnine[i].adresa.split(',')[0];
  }

  tipNek(id) {
    for (var i in this.nekretnine)
      if (this.nekretnine[i].id == id) {
        if (this.nekretnine[i].tip == "kuca")
          return "kuca";
        else if (this.nekretnine[i].tip == "stan") {
          if (this.nekretnine[i].sobe == 1)
            return "jednosoban stan";
          if (this.nekretnine[i].sobe == 2)
            return "dvosoban stan";
          if (this.nekretnine[i].sobe == 3)
            return "trosoban stan";
          if (this.nekretnine[i].sobe == 4)
            return "cetvorosoban stan";
          if (this.nekretnine[i].sobe == 5)
            return "petosoban stan";
          if (this.nekretnine[i].sobe == 6)
            return "sestosoban stan";
          if (this.nekretnine[i].sobe == 7)
            return "sedmosoban stan";
        }
      }
  }

  slikaNasum(id) {

    if(this.nekretnine != null) {

      for (var i in this.nekretnine)
        if (this.nekretnine[i].id == id) {

          if (this.nekretnine[i].galerija.length == 0)
            return "assets/nema.png";

          while(true) {
            let m = Math.floor(Math.random() * this.nekretnine[i].galerija.length);

            if(this.nekretnine[i].galerija[m].includes("jpg"))
              return "assets/" + this.nekretnine[i].galerija[m];
          }

        }
    }
  }

  nova() {
    this.stanje = "nova";
  }

  povratak() {
    this.stanje = "sve";
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

    if (this.ulogovan.tip == "radnik") {
      odobrena = true;
      id = 0;
    }


      

    this.nService.novaNekretnina(this.naziv, this.adresa, this.tip, this.spratovi, parseInt(this.kvadratura),
      parseInt(this.sobe), this.namestenost, this.tipOglasa, parseInt(this.cena), id,
      this.promovisanje, this.slikeNova, false, odobrena).subscribe(resp => { 
        console.log(resp);
        
        if(this.ulogovan.tip == "korisnik")
          alertify.success("Uspešno poslat zahtev za nekretninu");
        else
          alertify.success("Uspešno uneta nekretnina");

        this.naziv = null;
        this.adresa = null;
        this.tip = null;
        this.spratovi = null;
        this.kvadratura = null;
        this.sobe = null;
        this.namestenost = null;
        this.tipOglasa = null;
        this.cena = null;
        this.promovisanje = null;
        this.slikeNova = null;

      });


  }

  promena() {

    var s = "";
    var fileinput = (<HTMLInputElement>document.getElementById("idSlike"));
    var file = fileinput.files;

    if (file.length < 3 && file.length > 0) {
      alertify.error("Morate uneti barem tri slike/videa");
      this.slikeNova = null;
      return;
    }

    if (file.length == 0) {
      this.slikeNovo = this.odabrana.galerija;
    } else {

      for (var i = 0; i < file.length; i++) {
        s += file.item(i).name;
        if (i + 1 < file.length) {
          s += ",";
        }
      }

      this.slikeNovo = [];

      for (var j in s.split(','))
        this.slikeNovo.push(s.split(',')[j]);

    }

    if (this.nazivNovo == null || this.nazivNovo == "")
      this.nazivNovo = this.odabrana.naziv;
    if (this.adresaNovo == null || this.adresaNovo == "")
      this.adresaNovo = this.odabrana.adresa;
    if (this.tipNovo == null || this.tipNovo == "")
      this.tipNovo = this.odabrana.tip;
    if (this.spratoviNovo == null || this.spratoviNovo == "")
      this.spratoviNovo = this.odabrana.spratovi;
    if (this.kvadraturaNovo == null || this.kvadraturaNovo == "")
      this.kvadraturaNovo = "" + this.odabrana.kvadratura;
    if (this.sobeNovo == null || this.sobeNovo == "")
      this.sobeNovo = "" + this.odabrana.sobe;
    if (this.namestenostNovo == null)
      this.namestenostNovo = this.odabrana.namestenost;
    if (this.tipOglasaNovo == null || this.tipOglasaNovo == "")
      this.tipOglasaNovo = this.odabrana.tipOglasa;
    if (this.cenaNovo == null || this.cenaNovo == "")
      this.cenaNovo = "" + this.odabrana.cena;
    if (this.promovisanjeNovo == null)
      this.promovisanjeNovo = this.odabrana.promovisana;

    this.nService.izmenaNekretnine(this.odabrana.id, this.nazivNovo, this.adresaNovo, this.tipNovo,
      this.spratoviNovo, this.kvadraturaNovo, this.sobeNovo, this.namestenostNovo,
      this.tipOglasaNovo, this.cenaNovo, this.ulogovan.id, this.promovisanjeNovo, this.slikeNovo, this.odabrana.prodata, this.odabrana.odobrena).subscribe(resp => { console.log(resp); });


    this.odabrana.naziv = this.nazivNovo;
    this.odabrana.adresa = this.adresaNovo;
    this.odabrana.tip = this.tipNovo;
    this.odabrana.spratovi = this.spratoviNovo;
    this.odabrana.kvadratura = parseInt(this.kvadraturaNovo);
    this.odabrana.sobe = parseInt(this.sobeNovo);
    this.odabrana.namestenost = this.namestenostNovo;
    this.odabrana.tipOglasa = this.tipOglasaNovo;
    this.odabrana.cena = parseInt(this.cenaNovo);
    this.odabrana.promovisana = this.promovisanjeNovo;
    this.odabrana.galerija = this.slikeNovo;


    this.nazivNovo = null;
    this.adresaNovo = null;
    this.tipNovo = null;
    this.spratoviNovo = null;
    this.kvadraturaNovo = null;
    this.sobeNovo = null;
    this.namestenostNovo = null;
    this.tipOglasaNovo = null;
    this.cenaNovo = null;
    this.promovisanjeNovo = null;
    this.slikeNovo = null;
    this.slikeNova = null;


  }

  odabir(nekretnina) {
    this.odabrana = nekretnina;
    this.stanje = 'izmena';
  }

  daNe(vrednost) {
    if (vrednost == true)
      return "Da";
    else
      return "Ne";
  }

}
