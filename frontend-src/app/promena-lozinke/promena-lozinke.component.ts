import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunkcionalniService } from '../funkcionalni.service';
import { Korisnik } from '../models/korisnik';
import alertify from "alertify.js";

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  stara : string;
  nova : string;
  novaP : string;

  poruka : string;

  ulogovan : Korisnik;

  constructor(private fService : FunkcionalniService, private router : Router) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));
  
  }


  promena() {

    if(this.stara == null || this.stara == "" || this.nova == null || this.nova == "" || this.novaP == null || this.novaP == "") {
      alertify.error("Sva polja moraju biti popunjena");
      return;
    }

    if(this.stara != this.ulogovan.lozinka) {
      alertify.error("Stara lozinka nije ispravna");
      return;
    }

    if(this.nova != this.novaP) {
      alertify.error("Nova lozinka i njena potvrda se razlikuju");
      return;
    }

    if(this.nova.length < 8 || this.nova.length > 24) {
      alertify.error("Lozinka mora imati najmanje 8 i najvise 24 karaktera");
      return;
    }

    let imaVeliko = false;
    let imaMalo = false;
    let imaBroj = false;
    let imaPosebno = false;

    for(var i = 0; i < this.nova.length; i++) {
      if(this.nova.charCodeAt(i) >= 65 && this.nova.charCodeAt(i) <= 90)
        imaVeliko = true;
      if(this.nova.charCodeAt(i) >= 97 && this.nova.charCodeAt(i) <= 122)
        imaMalo = true;
      if(this.nova.charCodeAt(i) >= 48 && this.nova.charCodeAt(i) <= 57)
        imaBroj = true;
      if(this.nova.charCodeAt(i) >= 33 && this.nova.charCodeAt(i) <= 47)
        imaPosebno = true;
      if(this.nova.charCodeAt(i) >= 58 && this.nova.charCodeAt(i) <= 64)
        imaPosebno = true;
      if(this.nova.charCodeAt(i) >= 91 && this.nova.charCodeAt(i) <= 96)
        imaPosebno = true;
      if(this.nova.charCodeAt(i) >= 123)
        imaPosebno = true;
    }
    
    if(imaVeliko == false) {
      alertify.error("Lozinka mora imati barem 1 veliko slovo");
      return;
    }
    if(imaMalo == false) {
      alertify.error("Lozinka mora imati barem 1 malo slovo");
      return;
    }
    if(imaBroj == false) {
      alertify.error("Lozinka mora imati barem 1 cifru");
      return;
    }
    if(imaPosebno == false) {
      alertify.error("Lozinka mora imati barem 1 poseban karakter");
      return;
    }

    let trostruko = false;

    for(var i = 0; i < this.nova.length - 3; i++) {
      if(this.nova[i] == this.nova[i + 1] && this.nova[i] == this.nova[i + 2]) {
        trostruko = true;
        break;
      }
    }

    if(trostruko == true) {
      alertify.error("Lozinka ne sme imati 3 uzastopna karaktera");
      return;
    }


    this.fService.promenaLozinka(this.ulogovan.id, this.nova).subscribe(resp => {
      console.log(resp);

      this.router.navigate([""]);
    });

  }

}
