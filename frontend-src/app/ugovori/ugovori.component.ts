import { Component, OnInit } from '@angular/core';
import { FunkcionalniService } from '../funkcionalni.service';
import { Iznajmljivanje } from '../models/iznajmljivanje';
import { Korisnik } from '../models/korisnik';
import { Kupovina } from '../models/kupovina';
import { Nekretnina } from '../models/nekretnina';
import { Procenti } from '../models/procenti';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-ugovori',
  templateUrl: './ugovori.component.html',
  styleUrls: ['./ugovori.component.css']
})
export class UgovoriComponent implements OnInit {

  ulogovan : Korisnik;

  kupovine : Kupovina[];
  iznajmljivanja : Iznajmljivanje[];

  nekretnine : Nekretnina[];
  korisnici : Korisnik[];

  procenatProd : number;
  procenatIzd : number;
  procenatProdNovi : number;
  procenatIzdNovi : number;

  prihodProdaje : number;
  prihodIzdavanja : number;

  constructor(private nService : NekretnineService, private fService : FunkcionalniService) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    this.nService.procenti().subscribe((procenti : Procenti)=>{
      if(procenti) {
        this.procenatProd = procenti.procenatProdaje;
        this.procenatIzd = procenti.procenatIzdavanja;


        this.nService.sveNekretnine().subscribe((nekretnine : Nekretnina[])=>{
          if(nekretnine) {

            this.nekretnine = nekretnine;

            this.nService.sveKupovine().subscribe((kupovine : Kupovina[])=>{
              if(kupovine) {
        
                this.kupovine = [];
        
                for(var i in kupovine)
                  if(kupovine[i].potvrdjeno == true)
                    this.kupovine.push(kupovine[i]);
        
                this.prihodProdaje = 0;

                for(var j in this.kupovine)
                  this.prihodProdaje += kupovine[j].prihod;
        
              }
            });
    
    
            this.nService.svaIznajmljivanja().subscribe((iznajmljivanja : Iznajmljivanje[])=>{
              if(iznajmljivanja) {
        
                this.iznajmljivanja = [];
        
                for(var iz in iznajmljivanja)
                  if(iznajmljivanja[iz].potvrdjeno == true)
                    this.iznajmljivanja.push(iznajmljivanja[iz]);
    
                    this.prihodIzdavanja = 0;
    
                    for(var jz in this.iznajmljivanja) {
                      this.prihodIzdavanja += this.iznajmljivanja[jz].prihod;
                    }
              }
            });
    
    
          }
        });
    
        this.fService.sviKorisnici().subscribe((korisnici : Korisnik[])=>{
          if(korisnici)
            this.korisnici = korisnici;
        });

      }
    });

    

  }
/*
  potvrdiKup(ponuda) {

    this.nService.sveKupovine().subscribe((kupovine: Kupovina[]) => {
      if (kupovine) {

        for(var k in kupovine)
          if(kupovine[k].idNek == ponuda.idNek && kupovine[k].id != ponuda.id)
            this.nService.obrisiKup(kupovine[k]).subscribe(resp => { console.log(resp) });


          
      }
    })
  }
*/
  kupacKoJe(ponuda) {
    for(var j in this.korisnici)
      if(this.korisnici[j].id == ponuda.kupac)
        return "" + this.korisnici[j].ime + " " +  this.korisnici[j].prezime;
    
  }

  nekretninaKoja(ponuda) {
    for(var i in this.nekretnine)
      if(ponuda.idNek == this.nekretnine[i].id)
        return this.nekretnine[i].naziv;
  }

  vlasnikKoJe(ponuda) {
    for(var j in this.korisnici)
      if(this.korisnici[j].id == ponuda.vlasnik)
        return "" + this.korisnici[j].ime + " " +  this.korisnici[j].prezime;
  }

  izmenaProcenta() {
    if(this.procenatProdNovi == null)
      this.procenatProdNovi = this.procenatProd;
    if(this.procenatIzdNovi == null)
      this.procenatIzdNovi = this.procenatIzd;

      this.nService.procentiPromena(this.procenatProdNovi, this.procenatIzdNovi).subscribe(resp=>{
        console.log(resp);

        this.procenatProd = this.procenatProdNovi;
        this.procenatIzd = this.procenatIzdNovi;

        this.procenatProdNovi = null;
        this.procenatIzdNovi = null;
      });
  }

}
