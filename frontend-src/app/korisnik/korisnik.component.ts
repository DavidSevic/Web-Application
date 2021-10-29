import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-korisnik',
  templateUrl: './korisnik.component.html',
  styleUrls: ['./korisnik.component.css']
})
export class KorisnikComponent implements OnInit {

  poruka : string;

  grad : string;
  cenaOd : string;
  cenaDo : string;
  
  nekretnine : Nekretnina[];

  pretrazeno : boolean;

  slike : string[];
  slikePromo : string[];

  nekretninePretraga : Nekretnina[];

  constructor(private nService : NekretnineService, private router : Router) { }

  ngOnInit(): void {

    this.nekretninePretraga = [];

    this.pretrazeno = false;

    this.nService.sveNekretnine().subscribe((nekretnine : Nekretnina[])=>{
      if(nekretnine) {

        this.nekretnine = [];

        for(var i in nekretnine)
          if(nekretnine[i].prodata == false && nekretnine[i].odobrena == true)
            this.nekretnine.push(nekretnine[i]);

        this.slikePromo = [];

        for(var k in this.nekretnine)
          this.slikePromo[this.nekretnine[k].id] = this.slikaNasum(this.nekretnine[k].id);
     }
    });
  }

  pretraga() {

    if((this.grad == null || this.grad == "") && (this.cenaOd == null || this.cenaOd == "") && (this.cenaDo == null || this.cenaDo == "")) {
      this.poruka = "Morate izabrati bar jedan parametar pretrage";
      this.nekretninePretraga = [];
      return;
    }

    this.nService.sveNekretnine().subscribe((nekretnine : Nekretnina[])=>{
      if(nekretnine) {

        this.nekretninePretraga = [];

        for(var n in nekretnine)
          if(nekretnine[n].odobrena == true && nekretnine[n].prodata == false)
            this.nekretninePretraga.push(nekretnine[n]);



            this.poruka = "";

    
            if(this.grad != null && this.grad != "") {
    
              var i = 0;
              while(i < this.nekretninePretraga.length) {
                if(this.nekretninePretraga[i].adresa.split(',')[0] != this.grad)
                  this.nekretninePretraga.splice(i, 1);
                else
                  ++i;
              }
            }
    
            if(this.cenaOd != null && this.cenaOd != "") {
    
              var i = 0;
              while(i < this.nekretninePretraga.length) {
                if(this.nekretninePretraga[i].cena < parseInt(this.cenaOd))
                  this.nekretninePretraga.splice(i, 1);
                else
                  ++i;
              }
            }
    
            if(this.cenaDo != null && this.cenaDo != "") {
    
              var i = 0;
              while(i < this.nekretninePretraga.length) {
                if(this.nekretninePretraga[i].cena > parseInt(this.cenaDo))
                  this.nekretninePretraga.splice(i, 1);
                else 
                  ++i;
              }
            }
    
            this.slike = [];
    
            for(var k in this.nekretninePretraga)
              this.slike[this.nekretninePretraga[k].id] = this.slikaNasum(this.nekretninePretraga[k].id);
    
    
            this.pretrazeno = true;
      }
    });

    
        
      }
 
  opstGrad(id) {
    for(var i in this.nekretnine)
      if(this.nekretnine[i].id == id)
        return this.nekretnine[i].adresa.split(',')[1] + ", " + this.nekretnine[i].adresa.split(',')[0];
  }

  tipNek(id) {
    for(var i in this.nekretnine)
      if(this.nekretnine[i].id == id) {
        if(this.nekretnine[i].tip == "kuca")
          return "kuca";
        else if(this.nekretnine[i].tip == "stan") {
          if(this.nekretnine[i].sobe == 1)
            return "jednosoban stan";
          if(this.nekretnine[i].sobe == 2)
            return "dvosoban stan";
          if(this.nekretnine[i].sobe == 3)
            return "trosoban stan";
          if(this.nekretnine[i].sobe == 4)
            return "cetvorosoban stan";
          if(this.nekretnine[i].sobe == 5)
            return "petosoban stan";
          if(this.nekretnine[i].sobe == 6)
            return "sestosoban stan";
          if(this.nekretnine[i].sobe == 7)
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

  odabir(id) {
    sessionStorage.setItem("odabrana", JSON.stringify(id));
    this.router.navigate(["korisnik/nekretnina"]);
  }

}
