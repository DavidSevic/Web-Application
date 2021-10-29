import { HttpClient } from '@angular/common/http';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunkcionalniService {

  constructor(private http : HttpClient) { }


  ulogovanje(korisnickoIme, lozinka, tip) {
    const data = {
      korisnickoIme : korisnickoIme,
      lozinka : lozinka,
      tip : tip
    }

    return this.http.post(`http://localhost:4000/funkcionalni/logovanje`, data);

  }

  registrovanje(ime, prezime, korisnickoIme, lozinka, slika, email, grad, drzava) {
    const data = {
      ime : ime,
      prezime : prezime,
      korisnickoIme : korisnickoIme,
      lozinka : lozinka,
      slika : slika, 
      email : email,
      grad : grad,
      drzava : drzava
    }

    return this.http.post(`http://localhost:4000/funkcionalni/registrovanje`, data);

  }

  proveraKorIme(korisnickoIme) {
    const data = {
      korisnickoIme : korisnickoIme
    }

    return this.http.post(`http://localhost:4000/funkcionalni/proveraKorIme`, data);
  }

  proveraLozinka(korisnickoIme, lozinka) {
    const data = {
      korisnickoIme : korisnickoIme,
      lozinka : lozinka
    }

    return this.http.post(`http://localhost:4000/funkcionalni/proveraLozinka`, data);
  }

  promenaLozinka(id, lozinka) {
    const data = {
      id : id,
      lozinka : lozinka
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaLozinka`, data);
  }

  sviKorisnici() {
    return this.http.get(`http://localhost:4000/funkcionalni/sviKorisnici`);
  }

  promenaIme(id, ime) {
    const data = {
      id : id,
      ime : ime
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaIme`, data);
  }

  promenaPrezime(id, prezime) {
    const data = {
      id : id,
      prezime : prezime
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaPrezime`, data);
  }

  promenaKorIme(id, korisnickoIme) {
    const data = {
      id : id,
      korisnickoIme : korisnickoIme
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaKorIme`, data);
  }

  promenaSlika(id, slika) {
    const data = {
      id : id,
      slika : slika
    }


    return this.http.post(`http://localhost:4000/funkcionalni/promenaSlika`, data);
  }

  promenaEmail(id, email) {
    const data = {
      id : id,
      email : email
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaEmail`, data);
  }

  promenaGrad(id, grad) {
    const data = {
      id : id,
      grad : grad
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaGrad`, data);
  }

  promenaDrzava(id, drzava) {
    const data = {
      id : id,
      drzava : drzava
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaDrzava`, data);
  }

  promenaTip(id, tip) {
    const data = {
      id : id,
      tip : tip
    }

    return this.http.post(`http://localhost:4000/funkcionalni/promenaTip`, data);
  }

  sveRegistracije() {
    return this.http.get(`http://localhost:4000/funkcionalni/sveRegistracije`);
  }

  brisiReg(id) {

    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/funkcionalni/brisiReg`, data);
  }
  
  noviKorisnik(ime, prezime, korisnickoIme, lozinka, tip, slika, email, grad, drzava) {

    const data = {
      ime : ime,
      prezime : prezime,
      korisnickoIme : korisnickoIme,
      lozinka : lozinka,
      tip : tip,
      slika : slika, 
      email : email,
      grad : grad,
      drzava : drzava
    }

    return this.http.post(`http://localhost:4000/funkcionalni/noviKorisnik`, data);
  }

  brisiKorisnika(id) {

    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/funkcionalni/brisiKor`, data);
  }

}
