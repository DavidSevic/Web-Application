import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunkcionalniService } from '../funkcionalni.service';
import { Blokiranje } from '../models/blokiranje';
import { Iznajmljivanje } from '../models/iznajmljivanje';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import { PorukeService } from '../poruke.service';
import alertify from "alertify.js";

@Component({
  selector: 'app-nekretnina',
  templateUrl: './nekretnina.component.html',
  styleUrls: ['./nekretnina.component.css']
})
export class NekretninaComponent implements OnInit {

  odabrana: Nekretnina;

  datumOd: string;
  datumDo: string;

  poruka: string;

  ulogovan: Korisnik;

  placanje: string;

  porukaKredit: string;

  vlasnik : Korisnik;

  constructor(private nService: NekretnineService, private router: Router, private fService: FunkcionalniService, private pService: PorukeService) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    this.odabrana = new Nekretnina();
    this.vlasnik = new Korisnik();

    this.porukaKredit = "";

    this.nService.sveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      if (nekretnine) {

        let id = JSON.parse(sessionStorage.getItem("odabrana"));

        for (var i in nekretnine)
          if (nekretnine[i].id == id) {
            this.odabrana = nekretnine[i];
          }

          this.fService.sviKorisnici().subscribe((korisnici : Korisnik[])=>{
            if(korisnici) {
              for(var i in korisnici)
                if(this.odabrana.vlasnik == korisnici[i].id) {
                  this.vlasnik = korisnici[i];
                  break;
                }
            }
          })
      }
    })

  }

  povratak() {
    sessionStorage.removeItem("odabrana");
    this.router.navigate(["korisnik"]);
  }

  iznajmi() {

    this.pService.svaBlokiranja().subscribe((blokiranja: Blokiranje[]) => {
      if (blokiranja) {

        let jeste = false;

        for (var i in blokiranja)
          if (blokiranja[i].idBlokira == this.ulogovan.id && blokiranja[i].idBlokiran == this.odabrana.vlasnik) {
            jeste = true;
            break;
          }

        if (jeste == true) {
          alertify.error("Blokirali ste odabranog korisnika");
          return;
        }

        for (var i in blokiranja)
          if (blokiranja[i].idBlokiran == this.ulogovan.id && blokiranja[i].idBlokira == this.odabrana.vlasnik) {
            jeste = true;
            break;
          }

        if (jeste == true) {
          alertify.error("Odabrani korisnik vas je blokirao");
          return;
        }

        this.poruka = "";

        if (this.datumOd == null || this.datumOd == "" || this.datumDo == null || this.datumDo == "") {
         
          alertify.error("Morate popuniti polja sa datumima");
          return;
        }

        this.nService.svaIznajmljivanja().subscribe((iznamljivanja: Iznajmljivanje[]) => {
          if (iznamljivanja) {

            let okej = true;

            for (var i in iznamljivanja) {

              if(iznamljivanja[i].idNek != this.odabrana.id)
                continue;

              if (this.datumOd >= iznamljivanja[i].datumOd && this.datumOd <= iznamljivanja[i].datumDo && iznamljivanja[i].potvrdjeno == true) {
                okej = false;
                break;
              }
              if (this.datumDo >= iznamljivanja[i].datumOd && this.datumOd <= iznamljivanja[i].datumDo && iznamljivanja[i].potvrdjeno == true) {
                okej = false;
                break;
              }
            }

            if (okej == false) {
              alertify.error("Izabrana nekretnina se već iznajmljuje u unetom periodu.");
              return;
            }

            var datum : string;

    let date = new Date();

    datum = "";

    datum += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    datum += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            this.nService.iznajmi(this.odabrana.id, this.ulogovan.id, this.odabrana.vlasnik, this.datumOd, this.datumDo, false, datum, false, false, false).subscribe(resp => {
              alertify.success("Vaša ponuda je poslata");
            });


          }
        });

      }
    });
  }

  provera() {
    if (this.placanje == "kredit")
      alertify.success("Morate izdvojiti " + this.odabrana.cena * 0.2 + " za učešće kredita(20%)");
  }

  kupi() {

    this.pService.svaBlokiranja().subscribe((blokiranja: Blokiranje[]) => {
      if (blokiranja) {

        let jeste = false;

        for (var i in blokiranja)
          if (blokiranja[i].idBlokira == this.ulogovan.id && blokiranja[i].idBlokiran == this.odabrana.vlasnik) {
            jeste = true;
            break;
          }

        if (jeste == true) {
          alertify.error("Blokirali ste odabranog korisnika");
          return;
        }

        for (var i in blokiranja)
          if (blokiranja[i].idBlokiran == this.ulogovan.id && blokiranja[i].idBlokira == this.odabrana.vlasnik) {
            jeste = true;
            break;
          }

        if (jeste == true) {
          alertify.error("Odabrani korisnik vas je blokirao");
          return;
        }

        this.poruka = "";

        if (this.placanje == null || this.placanje == "") {
          alertify.error("Morate popuniti polje za placanje");
          return;
        }

        if (this.placanje == "kredit")
          alertify.success("Morate izdvojiti " + this.odabrana.cena * 0.2 + " za učešće kredita(20%)");
        else if (this.placanje == "kes")
          this.porukaKredit = "";


          var datum : string;

    let date = new Date();

    datum = "";

    datum += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    datum += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        this.nService.kupi(this.odabrana.id, this.ulogovan.id, this.odabrana.vlasnik, this.placanje, false, datum, false, false, false).subscribe(resp => {
  
          alertify.success("Vaša ponuda je poslata");
        });
      }
    });
  }

  kontakt() {
    
    sessionStorage.setItem("vlasnik", JSON.stringify(this.vlasnik));

    this.router.navigate(["korisnik/nekretnina/poruka"]);
      
  }

  spratovi() {
    if(this.odabrana.tip == "kuca") {
      if(this.odabrana.spratovi == "1")
        return "Kuća na " + this.odabrana.spratovi + " sprat";
      if(parseInt(this.odabrana.spratovi) < 5)
        return "Kuća na " + this.odabrana.spratovi + " sprata";

      return "Kuća na " + this.odabrana.spratovi + " spratova"; 
    }
    if(this.odabrana.tip == "stan") {
      return "Stan na " + this.odabrana.spratovi.split(" ")[0] + ". spratu, ukupan broj spratova: " + this.odabrana.spratovi.split(" ")[1];
    }
  }

  namestenost() {
    if(this.odabrana.namestenost == true)
      return "Da";
    else
      return "Ne";
  }
}
