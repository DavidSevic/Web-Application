import { Component, OnInit } from '@angular/core';
import { Blokiranje } from '../models/blokiranje';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import { PorukeService } from '../poruke.service';
import alertify from "alertify.js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-poruka',
  templateUrl: './poruka.component.html',
  styleUrls: ['./poruka.component.css']
})
export class PorukaComponent implements OnInit {

  ulogovan : Korisnik;
  vlasnik : Korisnik;
  odabrana : Nekretnina;

  textPoruke : string;

  poruka : string;

  blok : boolean;

  constructor(private pService : PorukeService, private nService : NekretnineService, private router : Router) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));
    this.vlasnik = JSON.parse(sessionStorage.getItem("vlasnik"));
    
    this.odabrana = new Nekretnina;

    this.nService.sveNekretnine().subscribe((nekretnine : Nekretnina[])=>{
      if(nekretnine) {

        let id = JSON.parse(sessionStorage.getItem("odabrana"));

        for(var i in nekretnine)
          if(nekretnine[i].id == id) {
            this.odabrana = nekretnine[i];
          }
      }
    })

    this.blok = false;

    this.pService.svaBlokiranja().subscribe((blokiranja : Blokiranje[])=>{
      if(blokiranja) {

        for(var i in blokiranja) {
          
          if(blokiranja[i].idBlokira == this.ulogovan.id && blokiranja[i].idBlokiran == this.vlasnik.id) {
            this.blok = true;
            this.poruka = "Blokirali ste vlasnika";
            break;
          }
          if(blokiranja[i].idBlokiran == this.ulogovan.id && blokiranja[i].idBlokira == this.vlasnik.id) {
            this.blok = true;
            this.poruka = "Blokirani ste od strane vlasnika";
            break;
          }
      }
    }
    });

  }

  posalji() {

    var datum : string;

    let date = new Date();


    datum = "";
    
    var godina : number;
    var mesecString : string;
    var danString : string;
    var satString : string;
    var minutString : string;
    var sekundString : string;

    godina = date.getFullYear();

    let mesec = (date.getMonth() + 1);
    if(mesec >= 10)
      mesecString = "" + mesec;
    else
      mesecString = "0" + mesec;
    let dan = date.getDate();
    if(dan >= 10)
      danString = "" + dan;
    else
      danString = "0" + dan;

      let sat = date.getHours();
      if(sat >= 10)
      satString = "" + sat;
      else
      satString = "0" + sat;

      let minut = date.getMinutes();
      if(minut >= 10)
      minutString = "" + minut;
      else
      minutString = "0" + minut;

      let sekund = date.getSeconds();
      if(sekund >= 10)
      sekundString = "" + sekund;
      else
      sekundString = "0" + sekund;

      datum += godina + "-" + mesecString + "-" + danString + " " + satString + ":" + minutString + ":" + sekundString;
    
    

    //datum += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //datum += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();



    this.pService.dodaj(this.odabrana.naziv, this.ulogovan.id, this.vlasnik.id, this.odabrana.id, this.textPoruke, datum, false, "aktivna").subscribe(resp=>{
      alertify.success("Poruka je poslata");
    })
    

  }

  povratak() {
    this.router.navigate(["korisnik/nekretnina"]);
  }

}
