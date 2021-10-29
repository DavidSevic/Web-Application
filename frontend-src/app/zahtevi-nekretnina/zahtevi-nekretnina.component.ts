import { Component, OnInit } from '@angular/core';
import { FunkcionalniService } from '../funkcionalni.service';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';

@Component({ 
  selector: 'app-zahtevi-nekretnina',
  templateUrl: './zahtevi-nekretnina.component.html',
  styleUrls: ['./zahtevi-nekretnina.component.css']
})
export class ZahteviNekretninaComponent implements OnInit {

  ulogovan : Korisnik;
  nekretnine : Nekretnina[];

  izabrana : Nekretnina;
  izabranaId : number;

  korisnici : Korisnik[];

  constructor(private nService : NekretnineService, private fService : FunkcionalniService) { }

  ngOnInit(): void {

    this.izabrana = null;

    this.nekretnine = [];

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    this.nService.sveNekretnine().subscribe((nekretnine : Nekretnina[])=>{
      if(nekretnine) {

        this.nekretnine = [];

        for(var i in nekretnine) {
          if(nekretnine[i].odobrena == false)
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

  izaberi() {

    for(var i in this.nekretnine)
      if(this.nekretnine[i].id == this.izabranaId) {
        this.izabrana = this.nekretnine[i];
      }
  }

    spratovi(n) {
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

    namestenost(n) {
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

    odobri() {

      this.nService.odobriNekretninu(this.izabrana.id).subscribe(resp=>{
        console.log(resp)

        this.nService.sveNekretnine().subscribe((nekretnine : Nekretnina[])=>{
          if(nekretnine) {
    
            this.nekretnine = [];
    
            for(var i in nekretnine) {
              if(nekretnine[i].odobrena == false)
                this.nekretnine.push(nekretnine[i]);

            this.izabrana = null
            }
          }
        }); 

      });
    }


}
