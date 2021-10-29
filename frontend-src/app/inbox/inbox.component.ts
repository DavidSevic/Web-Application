import { JitEvaluator } from '@angular/compiler';
import { JitEmitterVisitor } from '@angular/compiler/src/output/output_jit';
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
import { NekretnineService } from '../nekretnine.service';
import { PorukeService } from '../poruke.service';
import alertify from "alertify.js";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  ulogovan: Korisnik;

  korisnici: Korisnik[];

  poruke: Poruka[];
  konverzacijeAkt: Konverzacija[];
  konverzacijeArh: Konverzacija[];

  prikaz: string;

  primalac: string;
  textPoruke: string;

  poruka: string;
  nekretnine: Nekretnina[];
  izabranaNek: string;

  nekretninePoruka : Nekretnina[];

  agenti : number[];

  constructor(private pService: PorukeService, private fService: FunkcionalniService, private router: Router, private nService: NekretnineService) { }

  ngOnInit(): void {

    this.prikaz = "aktivne";

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    if(this.ulogovan.tip == "radnik") 
      this.ulogovan.id = 0;

    this.nService.sveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      if (nekretnine) {
        this.nekretnine = [];
        this.nekretninePoruka = [];
        for (var i in nekretnine)
          if(nekretnine[i].odobrena == true) {
            this.nekretnine.push(nekretnine[i]);
            if(nekretnine[i].prodata == false)
              this.nekretninePoruka.push(nekretnine[i]);
          }
      }
    })
 
    this.fService.sviKorisnici().subscribe((korisnici: Korisnik[]) => {
      if (korisnici) {
        this.korisnici = korisnici;

        this.agenti = [];

        for(var i in korisnici)
          if(this.korisnici[i].tip == "radnik")
            this.agenti.push(this.korisnici[i].id);

            this.pService.svePoruke().subscribe((poruke: Poruka[]) => {
              if (poruke) {
                this.poruke = poruke;
        
                let konverzacije = [];
        
                for (var i in poruke) {
                  if (poruke[i].posiljalac == this.ulogovan.id || poruke[i].primalac == this.ulogovan.id || (this.agenti.includes(poruke[i].posiljalac) && this.ulogovan.id == 0)) {
        
                    let ima = false;
        
                    for (var j in konverzacije) {
        
                      if (((poruke[i].primalac == konverzacije[j].idKor1 && poruke[i].posiljalac == konverzacije[j].idKor2)
                        || (poruke[i].posiljalac == konverzacije[j].idKor1 && poruke[i].primalac == konverzacije[j].idKor2)
                        || (this.agenti.includes(poruke[i].posiljalac) && (this.ulogovan.id == 0 || this.ulogovan.id == poruke[i].primalac) && poruke[i].primalac == konverzacije[j].idKor2))
                        && poruke[i].idNek == konverzacije[j].idNek) {
        
                        konverzacije[j].poruke.push(poruke[i]);
        
                        ima = true;
                        break;
                      }
                    }
                    if (ima == false) {
        
                      let novaK = new Konverzacija();
                      novaK.idKor1 = poruke[i].primalac;
                      novaK.idKor2 = poruke[i].posiljalac;
                      novaK.naslov = poruke[i].naslov;
                      novaK.idNek = poruke[i].idNek;
                      novaK.poruke = [];
                      novaK.poruke.push(poruke[i]);
                      konverzacije.push(novaK);
                    }
                  }
                }
        
        
                this.konverzacijeAkt = [];
                this.konverzacijeArh = [];
        
                for (var i in konverzacije) {
        
                  let arh = true;
        
                  for (var j in konverzacije[i].poruke)
                    if (konverzacije[i].poruke[j].status == "aktivna") {
                      arh = false;
                      break;
                    }
        
                  if (arh == true) {
                    konverzacije[i].arhivirana = true;
                    this.konverzacijeArh.push(konverzacije[i]);
                  }
                  else {
                    konverzacije[i].arhivirana = false;
                    this.konverzacijeAkt.push(konverzacije[i]);
                  }
                }
        
                for (var i in this.konverzacijeAkt) {
                  this.konverzacijeAkt[i].kupovine = [];
                  this.konverzacijeAkt[i].iznajmljivanja = [];
                }
        
                for (var i in this.konverzacijeArh) {
                  this.konverzacijeArh[i].kupovine = [];
                  this.konverzacijeArh[i].iznajmljivanja = [];
                }
        
                this.nService.sveKupovine().subscribe((kupovine: Kupovina[]) => {
                  if (kupovine) {
        
                    for (var i in kupovine) {
        
                      if(kupovine[i].vlasnik != this.ulogovan.id && kupovine[i].kupac != this.ulogovan.id)
                            continue;
        
                      let nasao = false;

        
                      for (var j in this.konverzacijeAkt) {
        
                        if ((this.konverzacijeAkt[j].idKor1 == kupovine[i].kupac && this.konverzacijeAkt[j].idKor2 == kupovine[i].vlasnik && this.konverzacijeAkt[j].idNek == kupovine[i].idNek)
                          || (this.konverzacijeAkt[j].idKor2 == kupovine[i].kupac && this.konverzacijeAkt[j].idKor1 == kupovine[i].vlasnik && this.konverzacijeAkt[j].idNek == kupovine[i].idNek)) {
        
                          this.konverzacijeAkt[j].kupovine.push(kupovine[i]);
                          nasao = true;
                          break;
                        }
                      }
        
                      for(var index in this.konverzacijeArh) {
        
                        if ((this.konverzacijeArh[index].idKor1 == kupovine[i].kupac && this.konverzacijeArh[index].idKor2 == kupovine[i].vlasnik && this.konverzacijeArh[index].idNek == kupovine[i].idNek)
                          || (this.konverzacijeArh[index].idKor2 == kupovine[i].kupac && this.konverzacijeArh[index].idKor1 == kupovine[i].vlasnik && this.konverzacijeArh[index].idNek == kupovine[i].idNek)) {
        
                          this.konverzacijeArh[index].kupovine.push(kupovine[i]);
                          
                          if(kupovine[i].arhivirano == false) {
                            this.konverzacijeArh[index].arhivirana = false;
                            this.konverzacijeAkt.push(this.konverzacijeArh[index]);
                            this.konverzacijeArh.splice(parseInt(index), 1);
                          } 
                          nasao = true;
                          break;
                        }
                      }
        
                      if (nasao == false) {
        
        
                        let nova = new Konverzacija();
                        nova.kupovine = [];
                        nova.iznajmljivanja = [];
                        nova.poruke = [];
                        nova.idKor1 = kupovine[i].kupac;
                        nova.idKor2 = kupovine[i].vlasnik;
                        nova.idNek = kupovine[i].idNek;
                        nova.kupovine.push(kupovine[i]);
                        for (var k in this.nekretnine)
                          if (this.nekretnine[k].id == nova.idNek)
                            nova.naslov = this.nekretnine[k].naziv;
                            if (kupovine[i].arhivirano == true) {
                              nova.arhivirana = true;
                              this.konverzacijeArh.push(nova);
                            }
                            else if (kupovine[i].arhivirano == false) {
                              nova.arhivirana = false;
                              this.konverzacijeAkt.push(nova);
                            }
                      }
                    }
        
                    this.nService.svaIznajmljivanja().subscribe((iznajmljivanja: Iznajmljivanje[]) => {
                      if (iznajmljivanja) {
        
                        for (var i in iznajmljivanja) {
        
                          if(iznajmljivanja[i].vlasnik != this.ulogovan.id && iznajmljivanja[i].kupac != this.ulogovan.id)
                            continue;
        
                          let nasao = false;

                          if(iznajmljivanja[i].arhivirano == false) {
        
                          for (var j in this.konverzacijeAkt) {
        
                            if ((this.konverzacijeAkt[j].idKor1 == iznajmljivanja[i].kupac && this.konverzacijeAkt[j].idKor2 == iznajmljivanja[i].vlasnik && this.konverzacijeAkt[j].idNek == iznajmljivanja[i].idNek)
                              || (this.konverzacijeAkt[j].idKor2 == iznajmljivanja[i].kupac && this.konverzacijeAkt[j].idKor1 == iznajmljivanja[i].vlasnik && this.konverzacijeAkt[j].idNek == iznajmljivanja[i].idNek)) {
        
                              this.konverzacijeAkt[j].iznajmljivanja.push(iznajmljivanja[i]);
                              nasao = true;
                              break;
                            }
                          }
                        }
                        if(iznajmljivanja[i].arhivirano == true) {

                          for (var j in this.konverzacijeArh) {
                            if ((this.konverzacijeArh[j].idKor1 == iznajmljivanja[i].kupac && this.konverzacijeArh[j].idKor2 == iznajmljivanja[i].vlasnik && this.konverzacijeArh[j].idNek == iznajmljivanja[i].idNek)
                              || (this.konverzacijeArh[j].idKor2 == iznajmljivanja[i].kupac && this.konverzacijeArh[j].idKor1 == iznajmljivanja[i].vlasnik && this.konverzacijeArh[j].idNek == iznajmljivanja[i].idNek)) {
        
                              this.konverzacijeArh[j].iznajmljivanja.push(iznajmljivanja[i]);
                              
                              if(iznajmljivanja[i].arhivirano == false) {
                                this.konverzacijeArh[j].arhivirana = false;
                                this.konverzacijeAkt.push(this.konverzacijeArh[j]);
                                this.konverzacijeArh.splice(parseInt(j), 1);
                              } 
                              nasao = true;
                              break;
                            }
                          }
                        }
        
                          if (nasao == false) {
        
        
                            let nova = new Konverzacija();
                            nova.kupovine = [];
                            nova.iznajmljivanja = [];
                            nova.poruke = [];
                            nova.idKor1 = iznajmljivanja[i].kupac;
                            nova.idKor2 = iznajmljivanja[i].vlasnik;
                            nova.idNek = iznajmljivanja[i].idNek;
                            nova.iznajmljivanja.push(iznajmljivanja[i]);
                            for (var k in this.nekretnine) {
                              if (this.nekretnine[k].id == nova.idNek) {
                                nova.naslov = this.nekretnine[k].naziv;
                              }
                            }
                            if (iznajmljivanja[i].arhivirano == true) {
                              nova.arhivirana = true;
                              this.konverzacijeArh.push(nova);
                            }
                            else if (iznajmljivanja[i].arhivirano == false) {
                              nova.arhivirana = false;
                              this.konverzacijeAkt.push(nova);
                            }
                          }
        
                        }
        
        
        
        
                        for (var i in this.konverzacijeAkt) {
        
                          //alert("iteracija " + i);
        
                          this.konverzacijeAkt[i].poruke.sort((a, b) => {
                            if (a.datumVreme > b.datumVreme)
                              return 1;
                            else
                              return -1;
                          });
        
                          this.konverzacijeAkt[i].kupovine.sort((a, b) => {
                            if (a.datumVreme > b.datumVreme)
                              return 1;
                            else
                              return -1;
                          });
        
                          this.konverzacijeAkt[i].iznajmljivanja.sort((a, b) => {
                            if (a.datumVreme > b.datumVreme)
                              return 1;
                            else
                              return -1;
                          });
        
                          var p;
                          var kk;
                          var iz;
        
                          if (this.konverzacijeAkt[i].poruke.length > 0)
                            p = this.konverzacijeAkt[i].poruke[this.konverzacijeAkt[i].poruke.length - 1].datumVreme;
                          else
                            p = "0";
        
                          if (this.konverzacijeAkt[i].kupovine.length > 0)
                            kk = this.konverzacijeAkt[i].kupovine[this.konverzacijeAkt[i].kupovine.length - 1].datumVreme;
                          else
                            kk = "0";
        
                          if (this.konverzacijeAkt[i].iznajmljivanja.length > 0)
                            iz = this.konverzacijeAkt[i].iznajmljivanja[this.konverzacijeAkt[i].iznajmljivanja.length - 1].datumVreme;
                          else
                            iz = "0";
        
                          let max = "0";
        
                          if (p >= max)
                            max = p;
                          if (kk >= max)
                            max = kk;
                          if (iz >= max)
                            max = iz;
        
                          //alert("akt max = " + max + " p = " + p + " k = " + kk + " iz = " + iz);
        
                          this.konverzacijeAkt[i].najskorija = max;
                        }
        
                        for (var i in this.konverzacijeArh) {
        
                          //alert("iteracija " + i);
        
                          this.konverzacijeArh[i].poruke.sort((a, b) => {
                            if (a.datumVreme > b.datumVreme)
                              return 1;
                            else
                              return -1;
                          });
        
                          this.konverzacijeArh[i].kupovine.sort((a, b) => {
                            if (a.datumVreme > b.datumVreme)
                              return 1;
                            else
                              return -1;
                          });
        
                          this.konverzacijeArh[i].iznajmljivanja.sort((a, b) => {
                            if (a.datumVreme > b.datumVreme)
                              return 1;
                            else
                              return -1;
                          });
        
                          var p;
                          var ko;
                          var iz;
        
                          if (this.konverzacijeArh[i].poruke.length > 0)
                            p = this.konverzacijeArh[i].poruke[this.konverzacijeArh[i].poruke.length - 1].datumVreme;
                          else
                            p = "0";
        
                          if (this.konverzacijeArh[i].kupovine.length > 0)
                            ko = this.konverzacijeArh[i].kupovine[this.konverzacijeArh[i].kupovine.length - 1].datumVreme;
                          else
                            ko = "0";
        
                          if (this.konverzacijeArh[i].iznajmljivanja.length > 0)
                            iz = this.konverzacijeArh[i].iznajmljivanja[this.konverzacijeArh[i].iznajmljivanja.length - 1].datumVreme;
                          else
                            iz = "0";
        
                          let max = "0";
        
                          if (p >= max)
                            max = p;
                          if (ko >= max)
                            max = ko;
                          if (iz >= max)
                            max = iz;
        
                          //alert("arh max = " + max + " p = " + p + " k = " + ko + " iz = " + iz);
        
                          this.konverzacijeArh[i].najskorija = max;
                        }
        
        
                        this.konverzacijeAkt.sort((a, b) => {
                          if (a.najskorija < b.najskorija)
                            return 1;
                          else
                            return -1;
                        });
        
                        this.konverzacijeArh.sort((a, b) => {
                          if (a.najskorija < b.najskorija)
                            return 1;
                          else
                            return -1;
                        });
        
                      }
                    });
                  }
                });
              }
            });

      }
    });

    

    
  }

  drugiKorisnik(konverzacija) {

    var id;

    if (konverzacija.idKor1 == this.ulogovan.id)
      id = konverzacija.idKor2;
    else
      id = konverzacija.idKor1;

    for (var i in this.korisnici)
      if (this.korisnici[i].id == id)
        return this.korisnici[i].ime + " " + this.korisnici[i].prezime;
  }

  neprocitano(konverzacija) {
    for (var i in konverzacija.poruke)
      if (konverzacija.poruke[i].procitana == false && konverzacija.poruke[i].primalac == this.ulogovan.id)
        return true;

        for (var i in konverzacija.kupovine)
        if (konverzacija.kupovine[i].procitano == false && konverzacija.kupovine[i].vlasnik == this.ulogovan.id)
          return true;
    
          for (var i in konverzacija.iznajmljivanja)
          if (konverzacija.iznajmljivanja[i].procitano == false && konverzacija.iznajmljivanja[i].vlasnik == this.ulogovan.id)
            return true;     

    return false;
  }

  otvoriKon(konverzacija) {
    sessionStorage.removeItem("konverzacija");
    sessionStorage.setItem("konverzacija", JSON.stringify(konverzacija));
  }

  promeni() {
    if (this.prikaz == "aktivne")
      this.prikaz = "arhivirane";
    else
      this.prikaz = "aktivne";
  }

  arhiviraj(konverzacija) {

    for (var i in this.konverzacijeAkt)
      if (this.konverzacijeAkt[i] == konverzacija) {
        this.konverzacijeAkt.splice(parseInt(i), 1);
        this.konverzacijeArh.push(konverzacija);

        this.konverzacijeArh.sort((a, b) => {
          if (a.najskorija < b.najskorija)
            return 1;
          else
            return -1;
        });

        for (var i in konverzacija.poruke)
          this.pService.status(konverzacija.poruke[i].id, "arhivirana").subscribe(resp => {
            console.log(resp);
          });

          for (var i in konverzacija.kupovine)
          this.nService.arhKup(konverzacija.kupovine[i].id, true).subscribe(resp => {
            console.log(resp);
          });  
  
          for (var i in konverzacija.iznajmljivanja)
          this.nService.arhIzn(konverzacija.iznajmljivanja[i].id, true).subscribe(resp => {
            console.log(resp);
          }); 

      }

    konverzacija.arhivirana = true;
  }

  aktiviraj(konverzacija) {

    for (var i in this.konverzacijeArh)
      if (this.konverzacijeArh[i] == konverzacija) {
        this.konverzacijeArh.splice(parseInt(i), 1);
        this.konverzacijeAkt.push(konverzacija);

        this.konverzacijeAkt.sort((a, b) => {
          if (a.najskorija < b.najskorija)
            return 1;
          else
            return -1;
        });

        for (var i in konverzacija.poruke)
          this.pService.status(konverzacija.poruke[i].id, "aktivna").subscribe(resp => {
            console.log(resp);
          });

          for (var i in konverzacija.kupovine)
          this.nService.arhKup(konverzacija.kupovine[i].id, false).subscribe(resp => {
            console.log(resp);
          });  
  
          for (var i in konverzacija.iznajmljivanja)
          this.nService.arhIzn(konverzacija.iznajmljivanja[i].id, false).subscribe(resp => {
            console.log(resp);
          }); 

        konverzacija.arhivirana = false;
      }
  }

  novaPoruka() {
    this.prikaz = "nova";
  }

  posalji() {

    this.fService.sviKorisnici().subscribe((korisnici: Korisnik[]) => {
      if (korisnici) {

        if (this.textPoruke == null || this.textPoruke == "" || this.primalac == null || this.primalac == "" || this.izabranaNek == null || this.izabranaNek == "") {
          alertify.error("Morate uneti sva polja");
          return;
        }

        let ima = false;

        var kor: Korisnik;

        for (var i in korisnici)
          if (korisnici[i].ime == this.primalac.split(" ")[0] && korisnici[i].prezime == this.primalac.split(" ")[1]) {
            ima = true;
            kor = korisnici[i];
            break;
          }

        if (ima == false) {
          alertify.error("Izabrali ste nepostojećeg korisnika");
          return;
        }

        this.pService.svaBlokiranja().subscribe((blokiranja: Blokiranje[]) => {
          if (blokiranja) {

            let jeste = false;

            for (var i in blokiranja)
              if (blokiranja[i].idBlokira == this.ulogovan.id && blokiranja[i].idBlokiran == kor.id) {
                jeste = true;
                break;
              }

            if (jeste == true) {
              alertify.error("Blokirali ste odabranog korisnika");
              return;
            }

            for (var i in blokiranja)
              if (blokiranja[i].idBlokiran == this.ulogovan.id && blokiranja[i].idBlokira == kor.id) {
                jeste = true;
                break;
              }

            if (jeste == true) {
              alertify.error("Odabrani korisnik vas je blokirao");
              return;
            }

            var nek: Nekretnina;

            for (var i in this.nekretnine) {
              if (this.nekretnine[i].naziv == this.izabranaNek)
                nek = this.nekretnine[i];
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

            this.pService.dodaj(this.izabranaNek, JSON.parse(sessionStorage.getItem("ulogovan")).id, kor.id, nek.id, this.textPoruke, datum, false, "aktivna").subscribe(resp => {



              alertify.success("Poruka je poslata");

              this.primalac = null;
              this.izabranaNek = null;
              this.textPoruke = null;


            })
          }
        });

      }
    });
  }

  povratak() {
    this.prikaz = "aktivne";

    location.reload();
  }

}
