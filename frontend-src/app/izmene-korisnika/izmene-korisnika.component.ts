import { Component, OnInit } from '@angular/core';
import { FunkcionalniService } from '../funkcionalni.service';
import { Korisnik } from '../models/korisnik';
import alertify from "alertify.js";

@Component({
  selector: 'app-izmene-korisnika',
  templateUrl: './izmene-korisnika.component.html',
  styleUrls: ['./izmene-korisnika.component.css']
})
export class IzmeneKorisnikaComponent implements OnInit {

  ulogovan : Korisnik;

  korisnici : Korisnik[];

  tip : string;
  ime: string;
  prezime: string;
  korisnickoIme: string;
  slika: string;
  email: string;
  grad: string;
  drzava: string;

  poruka: string;

  stanje : string;

  lozinka : string;
  lozinkaP : string;

  constructor(private fService : FunkcionalniService) { }

  ngOnInit(): void {


    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    this.stanje = "svi";
 
    this.fService.sviKorisnici().subscribe((korisnici : Korisnik[])=>{
      if(korisnici) {

        this.korisnici = [];

        for(var i in korisnici)
          if(korisnici[i].tip != "admin" && korisnici[i].korisnickoIme != "agencija")
            this.korisnici.push(korisnici[i]);
        
      }
    })

  }

  promeni(kor, tipPromene) {

    if (tipPromene == "ime")
      this.fService.promenaIme(kor.id, this.ime).subscribe(resp => {
        console.log(resp);

        kor.ime = this.ime;
        this.ime = null;
      });

    if (tipPromene == "prezime")
      this.fService.promenaPrezime(kor.id, this.prezime).subscribe(resp => {
        console.log(resp);

        kor.prezime = this.prezime;
        this.prezime = null;
      });

    if (tipPromene == "korIme") {

      this.fService.proveraKorIme(this.korisnickoIme).subscribe((korisnik: Korisnik) => {
        if (korisnik) {
          alertify.error("Uneto korisničko ime je zauzeto");
          this.korisnickoIme = null;
        }else {
          this.fService.promenaKorIme(kor.id, this.korisnickoIme).subscribe(resp => {
            console.log(resp);
            kor.korisnickoIme = this.korisnickoIme;
            this.korisnickoIme = null;
          });
        }
      });
    }

    if (tipPromene == "slika") {

      let slikaS = this.slika.slice(12);

      this.fService.promenaSlika(kor.id, slikaS).subscribe(resp => {
        console.log(resp);

        kor.slika = slikaS;
        this.slika = null;
      });
    }

    if (tipPromene == "email")
      this.fService.promenaEmail(kor.id, this.email).subscribe(resp => {
        console.log(resp);

        kor.email = this.email;
        this.email = null;
      });

    if (tipPromene == "grad")
      this.fService.promenaGrad(kor.id, this.grad).subscribe(resp => {
        console.log(resp);

        kor.grad = this.grad;
        this.grad = null;
      });

    if (tipPromene == "drzava")
      this.fService.promenaDrzava(kor.id, this.drzava).subscribe(resp => {
        console.log(resp);

        kor.drzava = this.drzava;
        this.drzava = null;
      });

      if (tipPromene == "tip")
      this.fService.promenaTip(kor.id, this.tip).subscribe(resp => {
        console.log(resp);

        kor.tip = this.tip;
        this.tip = null;
      });

  }

  noviKor() {
    this.stanje = "novi";
  }

  unos() {

    if (this.ime == null || this.ime == "" || this.prezime == null || this.prezime == "" ||
      this.korisnickoIme == null || this.korisnickoIme == "" || this.lozinka == null || this.lozinka == "" ||
      this.lozinkaP == null || this.lozinkaP == "" || this.email == null || this.email == "" ||
      this.grad == null || this.grad == "" || this.drzava == null || this.drzava == "" || this.tip == null || this.tip == "") {
      alertify.error("Morate uneti sva polja");
      return;
    }

    if(this.tip != "korisnik" && this.tip != "radnik" && this.tip != "admin") {
      alert(this.tip);
      alertify.error("Uneli ste neodgovarajući tip korisnika");
      return;
    }

    this.fService.sviKorisnici().subscribe((korisnici: Korisnik[]) => {
      if (korisnici) {

        let zauzetoKor = false;
        let zauzetMail = false;


        for (var k in korisnici) {
          if (korisnici[k].korisnickoIme == this.korisnickoIme) {
            zauzetoKor = true;
            break;
          }
          if (korisnici[k].email == this.email) {
            zauzetMail = true;
            break;
          }
        }

        if (zauzetoKor == true) {
          alertify.error("Uneto korisničko ime je zauzeto");
          return;
        }

        if (zauzetMail == true) {
          alertify.error("Unet email je već u upotrebi");
          return;
        }

        if (this.lozinka != this.lozinkaP) {
          alertify.error("Potvrda lozinke razlikuje se od unete lozinke");
          return;
        }

        if (this.lozinka.length < 8 || this.lozinka.length > 24) {
          alertify.error("Lozinka mora imati najmanje 8 i najvise 24 karaktera");
          return;
        }

        let imaVeliko = false;
        let imaMalo = false;
        let imaBroj = false;
        let imaPosebno = false;

        let i = 0;

        for (i = 0; i < this.lozinka.length; i++) {
          if (this.lozinka.charCodeAt(i) >= 65 && this.lozinka.charCodeAt(i) <= 90)
            imaVeliko = true;
          if (this.lozinka.charCodeAt(i) >= 97 && this.lozinka.charCodeAt(i) <= 122)
            imaMalo = true;
          if (this.lozinka.charCodeAt(i) >= 48 && this.lozinka.charCodeAt(i) <= 57)
            imaBroj = true;
          if (this.lozinka.charCodeAt(i) >= 33 && this.lozinka.charCodeAt(i) <= 47)
            imaPosebno = true;
          if (this.lozinka.charCodeAt(i) >= 58 && this.lozinka.charCodeAt(i) <= 64)
            imaPosebno = true;
          if (this.lozinka.charCodeAt(i) >= 91 && this.lozinka.charCodeAt(i) <= 96)
            imaPosebno = true;
          if (this.lozinka.charCodeAt(i) >= 123)
            imaPosebno = true;
        }

        if (imaVeliko == false) {
          alertify.error("Lozinka mora imati barem 1 veliko slovo");
          return;
        }
        if (imaMalo == false) {
          alertify.error("Lozinka mora imati barem 1 malo slovo");
          return;
        }
        if (imaBroj == false) {
          alertify.error("Lozinka mora imati barem 1 cifru");
          return;
        }
        if (imaPosebno == false) {
          alertify.error("Lozinka mora imati barem 1 poseban karakter");
          return;
        }

        let trostruko = false;

        let j = 0;

        for (j = 0; j < this.lozinka.length - 3; j++) {
          if (this.lozinka[i] == this.lozinka[j + 1] && this.lozinka[j] == this.lozinka[j + 2]) {
            trostruko = true;
            break;
          }
        }

        if (trostruko == true) {
          alertify.error("Lozinka ne sme imati 3 uzastopna karaktera");
          return;
        }


        if (this.slika == null)
          this.fService.noviKorisnik(this.ime, this.prezime, this.korisnickoIme, this.lozinka, this.tip,
            null, this.email, this.grad, this.drzava).subscribe(resp => {
              console.log(resp);
              this.fService.sviKorisnici().subscribe((korisnici : Korisnik[])=>{
                if(korisnici) {
          
                  this.korisnici = [];
          
                  for(var i in korisnici)
                    if(korisnici[i].tip != "admin" && korisnici[i].korisnickoIme != "agencija")
                      this.korisnici.push(korisnici[i]);

                  this.ime = null;
                  this.prezime = null;
                  this.korisnickoIme = null;
                  this.lozinka = null;
                  this.lozinkaP = null;
                  this.tip = null;
                  this.slika = null;
                  this.email = null;
                  this.grad = null;
                  this.drzava = null;

                  alertify.success("Uspešno ste uneli novog korisnika");
                  
                }
              })
            });
        else
          this.fService.noviKorisnik(this.ime, this.prezime, this.korisnickoIme, this.lozinka, this.tip,
            this.slika.slice(12), this.email, this.grad, this.drzava).subscribe(resp => {
              console.log(resp);
              this.fService.sviKorisnici().subscribe((korisnici : Korisnik[])=>{
                if(korisnici) {
          
                  this.korisnici = [];
          
                  for(var i in korisnici)
                    if(korisnici[i].tip != "admin" && korisnici[i].korisnickoIme != "agencija")
                      this.korisnici.push(korisnici[i]);

                      this.ime = null;
                      this.prezime = null;
                      this.korisnickoIme = null;
                      this.lozinka = null;
                      this.lozinkaP = null;
                      this.tip = null;
                      this.slika = null;
                      this.email = null;
                      this.grad = null;
                      this.drzava = null;

                      alertify.success("Uspešno ste uneli novog korisnika");
                  
                }
              })
            })
      }
    });
  }

  povratak() {
    this.stanje = "svi";
  }

  brisanje(k) {
    this.fService.brisiKorisnika(k.id).subscribe(resp=>{
      console.log(resp);

      for(var i in this.korisnici)
        if(this.korisnici[i].id == k.id) 
          this.korisnici.splice(parseInt(i), 1);
        
    });
  }

}
