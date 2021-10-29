import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunkcionalniService } from '../funkcionalni.service';
import { Blokiranje } from '../models/blokiranje';
import { Iznajmljivanje } from '../models/iznajmljivanje';
import { Konverzacija } from '../models/konverzacija';
import { Korisnik } from '../models/korisnik';
import { Kupovina } from '../models/kupovina';
import { Nekretnina } from '../models/nekretnina';
import { Poruka } from '../models/poruka';
import { Procenti } from '../models/procenti';
import { NekretnineService } from '../nekretnine.service';
import { PorukeService } from '../poruke.service';
import alertify from "alertify.js";

@Component({
  selector: 'app-konverzacija',
  templateUrl: './konverzacija.component.html',
  styleUrls: ['./konverzacija.component.css']
})
export class KonverzacijaComponent implements OnInit {

  ulogovan: Korisnik;
  otvorena: Konverzacija;
  drugiKorisnik: Korisnik;

  tip: string;

  poruka: string;

  textPoruke: string;

  blok: boolean;
  blokP: boolean;

  porukaBlok: string;

  ponuda: number;

  ponudeKup: Kupovina[];
  ponudeIzn: Iznajmljivanje[];
  ovaNek: Nekretnina;

  porukaProdata: string;

  kupacPonudeKup: Kupovina[];
  kupacPonudeIzn: Iznajmljivanje[];

  agenti: number[];
  korisnici: Korisnik[];

  nekretnine : Nekretnina[];

  constructor(private fService: FunkcionalniService, private nService: NekretnineService, private pService: PorukeService, private router: Router) { }

  ngOnInit(): void {


    this.drugiKorisnik = new Korisnik();
    this.ovaNek = new Nekretnina();
    this.agenti = [];

    this.otvorena = JSON.parse(sessionStorage.getItem("konverzacija"));
    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    //alert(this.otvorena.iznajmljivanja.length);

    if (this.ulogovan.tip == "radnik") {
      this.ulogovan = JSON.parse(sessionStorage.getItem("agencija"));
      this.ulogovan.tip = "radnik";
    }



    this.nService.sveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      if (nekretnine) {
        this.nekretnine = nekretnine;
        for (var i in nekretnine)
          if (nekretnine[i].id == this.otvorena.idNek) {
            this.ovaNek = nekretnine[i];
            if (this.ulogovan.id == nekretnine[i].vlasnik)
              this.tip = "Kupac: ";
            else
              this.tip = "Vlasnik: ";

            break;
          }

        this.fService.sviKorisnici().subscribe((korisnici: Korisnik[]) => {
          if (korisnici) {

            this.korisnici = korisnici;

            this.agenti = [];

            for (var i in korisnici)
              if (korisnici[i].tip == "radnik")
                this.agenti.push(korisnici[i].id);

            var id;

            if (this.ulogovan.id == this.otvorena.idKor1)
              id = this.otvorena.idKor2;
            else
              id = this.otvorena.idKor1;

            for (var i in korisnici)
              if (korisnici[i].id == id) {
                this.drugiKorisnik = korisnici[i];
                break;
              }

              this.pService.svaBlokiranja().subscribe((blokiranja: Blokiranje[]) => {
                if (blokiranja) {
                  for (var i in blokiranja) {
                    if (blokiranja[i].idBlokira == this.ulogovan.id && blokiranja[i].idBlokiran == this.drugiKorisnik.id) {
                      this.blok = true;
                    }
                    if (blokiranja[i].idBlokira == this.ulogovan.id && blokiranja[i].idBlokiran == this.drugiKorisnik.id
                      || blokiranja[i].idBlokiran == this.ulogovan.id && blokiranja[i].idBlokira == this.drugiKorisnik.id) {
                      this.blokP = true;
                    }
                  }
                  if (this.blok != true)
                    this.blok = false;
                  if (this.blokP != true)
                    this.blokP = false;
          
                  if (this.blok == true)
                    this.porukaBlok = "Blokirali ste korisnika";
                  else if (this.blokP == true)
                    this.porukaBlok = "Korisnik vas je blokirao";
                }
              });


          }
        });


        if (this.ovaNek.tipOglasa == "prodaja") {

          this.nService.sveKupovine().subscribe((kupovine: Kupovina[]) => {
            if (kupovine) {

              this.kupacPonudeKup = [];

              for (var i in kupovine)
                if (kupovine[i].kupac == this.ulogovan.id && kupovine[i].idNek == this.otvorena.idNek && kupovine[i].vlasnik == this.drugiKorisnik.id)
                  this.kupacPonudeKup.push(kupovine[i]);


              this.ponudeKup = [];

              for (var i in kupovine)
                if (kupovine[i].vlasnik == this.ulogovan.id && kupovine[i].idNek == this.otvorena.idNek && kupovine[i].kupac == this.drugiKorisnik.id)
                  this.ponudeKup.push(kupovine[i]);

              this.ponudeKup.sort((a, b) => {
                if (a.datumVreme < b.datumVreme)
                  return 1;
                else
                  return -1;
              });
            }
          })

        }

        if (this.ovaNek.tipOglasa == "izdavanje") {

          this.nService.svaIznajmljivanja().subscribe((iznajmljivanja: Iznajmljivanje[]) => {
            if (iznajmljivanja) {

              this.kupacPonudeIzn = [];

              for (var i in iznajmljivanja)
                if (iznajmljivanja[i].kupac == this.ulogovan.id && iznajmljivanja[i].idNek == this.otvorena.idNek && iznajmljivanja[i].vlasnik == this.drugiKorisnik.id)
                  this.kupacPonudeIzn.push(iznajmljivanja[i]);

              this.ponudeIzn = [];

              for (var i in iznajmljivanja)
                if (iznajmljivanja[i].vlasnik == this.ulogovan.id && iznajmljivanja[i].idNek == this.otvorena.idNek && iznajmljivanja[i].kupac == this.drugiKorisnik.id)
                  this.ponudeIzn.push(iznajmljivanja[i]);

              this.ponudeIzn.sort((a, b) => {
                if (a.datumVreme < b.datumVreme)
                  return 1;
                else
                  return -1;
              });

            }
          })

        }

      }



    });

    for (var i in this.otvorena.poruke)
      if (this.otvorena.poruke[i].procitana == false && this.otvorena.poruke[i].primalac == this.ulogovan.id)
        this.pService.procitaj(this.otvorena.poruke[i].id).subscribe(resp => {
          console.log(resp);
        });

    for (var i in this.otvorena.kupovine)
      if (this.otvorena.kupovine[i].procitano == false && this.otvorena.kupovine[i].vlasnik == this.ulogovan.id)
        this.nService.procitajKup(this.otvorena.kupovine[i].id).subscribe(resp => {
          console.log(resp);
        });

    for (var i in this.otvorena.iznajmljivanja)
      if (this.otvorena.iznajmljivanja[i].procitano == false && this.otvorena.iznajmljivanja[i].vlasnik == this.ulogovan.id)
        this.nService.procitajIzn(this.otvorena.iznajmljivanja[i].id).subscribe(resp => {
          console.log(resp);
        });
  }

  arhAkt() {
    if (this.otvorena.arhivirana == true) {
      for (var i in this.otvorena.poruke)
        this.pService.status(this.otvorena.poruke[i].id, "aktivna").subscribe(resp => {
          console.log(resp);
        });

      for (var i in this.otvorena.kupovine)
        this.nService.arhKup(this.otvorena.kupovine[i].id, false).subscribe(resp => {
          console.log(resp);
        });

      for (var i in this.otvorena.iznajmljivanja)
        this.nService.arhIzn(this.otvorena.iznajmljivanja[i].id, false).subscribe(resp => {
          console.log(resp);
        });

      this.otvorena.arhivirana = false;
    }
    else {
      for (var i in this.otvorena.poruke)
        this.pService.status(this.otvorena.poruke[i].id, "arhivirana").subscribe(resp => {
          console.log(resp);
        });

      for (var i in this.otvorena.kupovine)
        this.nService.arhKup(this.otvorena.kupovine[i].id, true).subscribe(resp => {
          console.log(resp);
        });

      for (var i in this.otvorena.iznajmljivanja)
        this.nService.arhIzn(this.otvorena.iznajmljivanja[i].id, true).subscribe(resp => {
          console.log(resp);
        });

      this.otvorena.arhivirana = true;
    }

  }

  posalji() {
    if (this.textPoruke == null || this.textPoruke == "") {
      alertify.error("Morate popuniti text poruke");
      return;
    }
/*
    var datum: string;

    let date = new Date();

    datum = "";

    datum += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    datum += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
*/


var datum = "";
let date = new Date();
    
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

    this.pService.dodaj(this.otvorena.naslov, JSON.parse(sessionStorage.getItem("ulogovan")).id, this.drugiKorisnik.id, this.otvorena.idNek, this.textPoruke, datum, false, "aktivna").subscribe(resp => {
      alertify.success("Poruka je poslata");

      if (this.otvorena.arhivirana == true) {
        for (var i in this.otvorena.poruke)
          this.pService.status(this.otvorena.poruke[i].id, "aktivna").subscribe(resp => {
            console.log(resp);
          });
        this.otvorena.arhivirana = false;
      }

      let p = new Poruka();
      p.id = this.otvorena.poruke.length + 1;
      p.idNek = this.otvorena.idNek;
      p.naslov = this.otvorena.naslov;
      p.posiljalac = JSON.parse(sessionStorage.getItem("ulogovan")).id;
      p.primalac = this.drugiKorisnik.id;
      p.procitana = false;
      p.status = "aktivna";
      p.text = this.textPoruke;
      p.datumVreme = datum;

      this.otvorena.poruke.push(p);

      this.textPoruke = "";

    });


  }

  blokiranje() {

    this.pService.noviBlok(this.ulogovan.id, this.drugiKorisnik.id).subscribe(resp => {
      console.log(resp);
    });

    this.blok = true;
    this.blokP = true;
    this.porukaBlok = "Blokirali ste korisnika";

    if (this.otvorena.arhivirana == false) {

      this.pService.svePoruke().subscribe((poruke: Poruka[]) => {

        if (poruke) {

          for (var i in poruke)
            if ((poruke[i].posiljalac == this.otvorena.idKor1 && poruke[i].primalac == this.otvorena.idKor2)
              || poruke[i].posiljalac == this.otvorena.idKor2 && poruke[i].primalac == this.otvorena.idKor1)
              this.pService.status(poruke[i].id, "arhivirana").subscribe(resp => {
                console.log(resp);
              });

          this.otvorena.arhivirana = true;

          for(var j in this.otvorena.kupovine)
              this.nService.arhKup(this.otvorena.kupovine[j].id, true).subscribe(resp=>{console.log(resp)});
          
          for(var k in this.otvorena.iznajmljivanja)
              this.nService.arhIzn(this.otvorena.iznajmljivanja[k].id, true).subscribe(resp=>{console.log(resp)});



        }
      });
    }

  }

  odblokiranje() {

    this.pService.brisiBlok(this.ulogovan.id, this.drugiKorisnik.id).subscribe(resp => {
      console.log(resp);
    });

    this.blok = false;

    this.pService.svaBlokiranja().subscribe((blokiranja: Blokiranje[]) => {
      if (blokiranja) {


        let jeste = false;

        for (var i in blokiranja)
          if (blokiranja[i].idBlokira == this.drugiKorisnik.id && blokiranja[i].idBlokiran == this.ulogovan.id) {
            jeste = true;
            break;
          }

        if (jeste == false)
          this.blokP = false;
        else
          this.porukaBlok = "Korisnik vas je blokirao";
      }
    })

  }

  dajPonudu() {
    if (this.ovaNek.prodata == true) {
      alertify.error("Nekretnina je prodata");
      return;
    }
    this.porukaProdata = "";
    sessionStorage.setItem("odabrana", JSON.stringify(this.ovaNek.id));
    this.router.navigate(["korisnik/nekretnina"]);
  }

  odbij(ponuda) {
    if (this.ovaNek.tipOglasa == 'prodaja') {
      this.nService.obrisiKup(ponuda.id).subscribe(resp => { console.log(resp) });
      for (var i in this.ponudeKup)
        if (this.ponudeKup[i].id == ponuda.id)
          this.ponudeKup.splice(parseInt(i), 1);
    }
    else if (this.ovaNek.tipOglasa == 'izdavanje') {
      this.nService.obrisiIzn(ponuda.id).subscribe(resp => { console.log(resp) });
      for (var i in this.ponudeIzn)
        if (this.ponudeIzn[i].id == ponuda.id)
          this.ponudeIzn.splice(parseInt(i), 1);
    }
  }

  prihvati(ponuda) {
    if (this.ovaNek.tipOglasa == 'prodaja') {
      this.nService.sveKupovine().subscribe((kupovine: Kupovina[]) => {
        if (kupovine) {
          
          if (JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik") {

            for (var ii in kupovine)
              if (kupovine[ii].idNek == this.otvorena.idNek && kupovine[ii].id != ponuda.id) {
                for(var k in this.ponudeKup)
                if(this.ponudeKup[k].id == kupovine[ii].id) {
                this.ponudeKup.splice(parseInt(k), 1);
              }
                this.nService.obrisiKup(kupovine[ii].id).subscribe(resp => { console.log(resp) });
              }
          }
          /*
          else if(JSON.parse(sessionStorage.getItem("ulogovan")).tip == "korisnik"){
            for (var iii in kupovine)
            if (kupovine[iii].idNek == this.otvorena.idNek && kupovine[iii].id != ponuda.id && kupovine[iii].prihvaceno == false)
              this.nService.obrisiKup(kupovine[iii].id).subscribe(resp => { console.log(resp) });
          }
          */
        }
      })
      //this.ponudeKup.splice(0, this.ponudeKup.length);
      ponuda.prihvaceno = true;
      if (JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik")
        ponuda.potvrdjeno = true;
      //this.ponudeKup.push(ponuda);
      if (JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik")
        this.nService.prodaja(this.ovaNek.id).subscribe(resp => { console.log(resp) });
      this.nService.prihvatiKup(ponuda.id).subscribe(resp => {
        console.log(resp);
        //this.nService.brisiProdaja(this.ovaNek.id).subscribe(resp => { console.log(resp) });
      });
      if (JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik")
        this.nService.potvrdiKup(ponuda.id).subscribe(resp => {
          console.log(resp);


          if(JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik") {

            this.nService.procenti().subscribe((procenti: Procenti) => {

              if (procenti) {
    
                let cena = 0;
    
                for (var n in this.nekretnine)
                  if (this.nekretnine[n].id == ponuda.idNek)
                    cena = this.nekretnine[n].cena;
    
                if (ponuda.vlasnik != 0)
                  cena = cena * (procenti.procenatProdaje / 100);
    
                this.nService.prihodKup(ponuda.id, cena).subscribe(resp => { console.log(resp) });
    
    
              }
    
            })

          }



        });
    }
    else if (this.ovaNek.tipOglasa == 'izdavanje') {
/*
      var i = 0;

      while (i < this.ponudeIzn.length) {

        let ok = true;

        if (ponuda.datumOd > this.ponudeIzn[i].datumOd && ponuda.datumOd < this.ponudeIzn[i].datumDo && ponuda.id != this.ponudeIzn[i].id) {
          ok = false;
        }
        if (ponuda.datumDo > this.ponudeIzn[i].datumOd && ponuda.datumOd < this.ponudeIzn[i].datumDo && ponuda.id != this.ponudeIzn[i].id) {
          ok = false;
        }
        if (ok == false)
          this.ponudeIzn.splice(i, 1);
        else
          ++i;
      }
*/
      ponuda.prihvaceno = true;
      if (JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik")
        ponuda.potvrdjeno = true;

      if(JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik") {
      

      this.nService.svaIznajmljivanja().subscribe((iznajmljivanja: Iznajmljivanje[]) => {

        for (var i in iznajmljivanja) {

          if (iznajmljivanja[i].idNek != this.otvorena.idNek)
            continue;

          if (iznajmljivanja[i].id == ponuda.id)
            continue;

          let okej = true;

          if (ponuda.datumOd >= iznajmljivanja[i].datumOd && ponuda.datumOd <= iznajmljivanja[i].datumDo) {
            okej = false;
          }
          if (ponuda.datumDo >= iznajmljivanja[i].datumOd && ponuda.datumOd <= iznajmljivanja[i].datumDo) {
            okej = false;
          }

          if (okej == false) {
            for(var p in this.ponudeIzn)
              if(this.ponudeIzn[p].id == iznajmljivanja[i].id) {
                this.ponudeIzn.splice(parseInt(p), 1);
              }
            this.nService.obrisiIzn(iznajmljivanja[i].id).subscribe(resp => { console.log(resp) });
          }
        }
      });
    }
      this.nService.prihvatiIzn(ponuda.id).subscribe(resp => { console.log(resp) });
      if (JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik")
        this.nService.potvrdiIzn(ponuda.id).subscribe(resp => { 
          console.log(resp) 
          
          if(JSON.parse(sessionStorage.getItem("ulogovan")).tip == "radnik") {

            this.nService.procenti().subscribe((procenti: Procenti) => {

              if (procenti) {
    
                let cena = 0;
    
                for (var n in this.nekretnine)
                  if (this.nekretnine[n].id == ponuda.idNek)
                    cena = this.nekretnine[n].cena;
    
    
                let brMeseci = Math.ceil(((parseInt(ponuda.datumDo.split("-")[0]) * 365 + parseInt(ponuda.datumDo.split("-")[1]) * 30 + parseInt(ponuda.datumDo.split("-")[2]))
                  - (parseInt(ponuda.datumOd.split("-")[0]) * 365 + parseInt(ponuda.datumOd.split("-")[1]) * 30 + parseInt(ponuda.datumOd.split("-")[2]))) / 30);

                if (ponuda.vlasnik == 0)
                  cena = cena * brMeseci;
                else
                  cena = cena * (procenti.procenatIzdavanja / 100) * brMeseci;
    
                this.nService.prihodIzd(ponuda.id, cena).subscribe(resp => { console.log(resp) });
    
    
              }
    
            })


          }
        
          
        });

    }

  }

  koSalje(id) {

    //alert("posiljalac " + id + ", ulogovan " + this.ulogovan.id);

    if (id == this.ulogovan.id)
      return "Vi: ";

    for (var i in this.korisnici)
      if (this.korisnici[i].id == id)
        return this.korisnici[i].korisnickoIme + ": ";

  }


}
