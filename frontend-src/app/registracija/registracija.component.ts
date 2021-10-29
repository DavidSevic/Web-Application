import { Component, OnInit } from '@angular/core';
import { FunkcionalniService } from '../funkcionalni.service';
import alertify from "alertify.js";
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  ime: string;
  prezime: string;
  korisnickoIme: string;
  lozinka: string;
  lozinkaP: string;
  slika: string;
  email: string;
  grad: string;
  drzava: string;

  poruka: string;


  constructor(private fService: FunkcionalniService, private router : Router) { }

  ngOnInit(): void {
  }

  registrovanje() {

    if (this.ime == null || this.ime == "" || this.prezime == null || this.prezime == "" ||
      this.korisnickoIme == null || this.korisnickoIme == "" || this.lozinka == null || this.lozinka == "" ||
      this.lozinkaP == null || this.lozinkaP == "" || this.email == null || this.email == "" ||
      this.grad == null || this.grad == "" || this.drzava == null || this.drzava == "") {
      alertify.error("Morate uneti sva polja");
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
          this.fService.registrovanje(this.ime, this.prezime, this.korisnickoIme, this.lozinka,
            "nema.png", this.email, this.grad, this.drzava).subscribe(resp => {
              console.log(resp);
              alertify.success("Uspešno poslat zahtev za registraciju");
            });
        else
          this.fService.registrovanje(this.ime, this.prezime, this.korisnickoIme, this.lozinka,
            this.slika.slice(12), this.email, this.grad, this.drzava).subscribe(resp => {
              console.log(resp);
              alertify.success("Uspešno poslat zahtev za registraciju");
            })
      }
    });
  }

  povratak() {
    this.router.navigate([""]);
  }
}
