import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunkcionalniService } from '../funkcionalni.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-podaci-korisnika',
  templateUrl: './podaci-korisnika.component.html',
  styleUrls: ['./podaci-korisnika.component.css']
})
export class PodaciKorisnikaComponent implements OnInit {

  ulogovan: Korisnik;

  ime: string;
  prezime: string;
  korisnickoIme: string;
  slika: string;
  email: string;
  grad: string;
  drzava: string;

  poruka: string;

  constructor(private fService: FunkcionalniService, private router : Router) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));
  }

  promeni(tip) {
    
    if (tip == "ime")
      this.fService.promenaIme(this.ulogovan.id, this.ime).subscribe(resp => {
        console.log(resp);

        this.ulogovan.ime = this.ime;
        sessionStorage.removeItem("ulogovan");
        sessionStorage.setItem("ulogovan", JSON.stringify(this.ulogovan));
        this.ime = null;

        location.reload();
      });

    if (tip == "prezime")
      this.fService.promenaPrezime(this.ulogovan.id, this.prezime).subscribe(resp => {
        console.log(resp);

        this.ulogovan.prezime = this.prezime;
        sessionStorage.removeItem("ulogovan");
        sessionStorage.setItem("ulogovan", JSON.stringify(this.ulogovan));
        this.prezime = null;

        location.reload();
      });

    if (tip == "korIme") {

      this.fService.proveraKorIme(this.korisnickoIme).subscribe((korisnik: Korisnik) => {
        if (korisnik) {
          this.poruka = "Uneto korisničko ime je zauzeto";
        }else {
          this.fService.promenaKorIme(this.ulogovan.id, this.korisnickoIme).subscribe(resp => {
            console.log(resp);

            this.ulogovan.korisnickoIme = this.korisnickoIme;
            sessionStorage.removeItem("ulogovan");
            sessionStorage.setItem("ulogovan", JSON.stringify(this.ulogovan));
            this.korisnickoIme = null;
          });
        }
      });
    }

    if (tip == "slika") {

      let slikaS = this.slika.slice(12);

      this.fService.promenaSlika(this.ulogovan.id, slikaS).subscribe(resp => {
        console.log(resp);

        this.ulogovan.slika = slikaS;
        sessionStorage.removeItem("ulogovan");
        sessionStorage.setItem("ulogovan", JSON.stringify(this.ulogovan));
        this.slika = null;
      });
    }

    if (tip == "email")
      this.fService.promenaEmail(this.ulogovan.id, this.email).subscribe(resp => {
        console.log(resp);

        this.ulogovan.email = this.email;
        sessionStorage.removeItem("ulogovan");
        sessionStorage.setItem("ulogovan", JSON.stringify(this.ulogovan));
        this.email = null;
      });

    if (tip == "grad")
      this.fService.promenaGrad(this.ulogovan.id, this.grad).subscribe(resp => {
        console.log(resp);

        this.ulogovan.grad = this.grad;
        sessionStorage.removeItem("ulogovan");
        sessionStorage.setItem("ulogovan", JSON.stringify(this.ulogovan));
        this.grad = null;
      });

    if (tip == "drzava")
      this.fService.promenaDrzava(this.ulogovan.id, this.drzava).subscribe(resp => {
        console.log(resp);

        this.ulogovan.drzava = this.drzava;
        sessionStorage.removeItem("ulogovan");
        sessionStorage.setItem("ulogovan", JSON.stringify(this.ulogovan));
        this.drzava = null;
      });

      //location.reload();

  }

  povratak() {
    this.router.navigate(["korisnik"]);
  }

}
