import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NekretnineService {

  constructor(private http : HttpClient) { }

 
  sveNekretnine() {
    return this.http.get(`http://localhost:4000/nekretnine/sve`);
  }

  svaIznajmljivanja() {
    return this.http.get(`http://localhost:4000/iznajmljivanjaKupovine/sva`);
  }

  sveKupovine() {
    return this.http.get(`http://localhost:4000/iznajmljivanjaKupovine/sve`);
  }

  iznajmi(idNek, kupac, vlasnik, datumOd, datumDo, prihvaceno, datumVreme, procitano, arhivirano, potvrdjeno) {
    const data = {
      idNek : idNek,
      kupac : kupac,
      vlasnik : vlasnik,
      datumOd : datumOd,
      datumDo : datumDo,
      prihvaceno : prihvaceno,
      datumVreme : datumVreme,
      procitano : procitano,
      arhivirano : arhivirano,
      potvrdjeno : potvrdjeno

    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/dodajIzn`, data);
  }

  kupi(idNek, kupac, vlasnik, tip, prihvaceno, datumVreme, procitano, arhivirano, potvrdjeno) {
    const data = {
      idNek : idNek,
      kupac : kupac,
      vlasnik : vlasnik,
      tip : tip,
      prihvaceno : prihvaceno,
      datumVreme : datumVreme,
      procitano : procitano,
      arhivirano : arhivirano,
      potvrdjeno : potvrdjeno
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/dodajKup`, data);
  }

  obrisiKup(id) {
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/brisiKup`, data);
  }

  prihvatiKup(id) {
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/prihvatiKup`, data);
  }

  prihvatiIzn(id) {
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/prihvatiIzn`, data);
  }

  obrisiIzn(id) {
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/brisiIzn`, data);
  }

  prodaja(id) {
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/nekretnine/prodaja`, data);
  }

  brisiProdaja(id) {
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/prodaja`, data);
  }

  procitajKup(id) {

    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/procitajKup`, data);
  }

  procitajIzn(id) {

    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/procitajIzn`, data);
  }

  arhKup(id, arhivirano) {
    const data = {
      id : id,
      arhivirano : arhivirano
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/arhKup`, data);
  }

  arhIzn(id, arhivirano) {
    const data = {
      id : id,
      arhivirano : arhivirano
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/arhIzn`, data);
  }

  novaNekretnina(naziv, adresa, tip, spratovi, kvadratura, sobe, namestenost, tipOglasa, cena, vlasnik, promovisana, galerija, prodata, odobrena) {

    const data = {
      naziv : naziv,
      adresa : adresa,
      tip : tip,
      spratovi : spratovi,
      kvadratura : kvadratura,
      sobe : sobe,
      namestenost : namestenost,
      tipOglasa : tipOglasa,
      cena : cena,
      vlasnik : vlasnik,
      promovisana : promovisana,
      galerija : galerija,
      prodata : prodata,
      odobrena : odobrena
    }

    return this.http.post(`http://localhost:4000/nekretnine/nova`, data);
  }

  izmenaNekretnine(id, naziv, adresa, tip, spratovi, kvadratura, sobe, namestenost, tipOglasa, cena, vlasnik, promovisana, galerija, prodata, odobrena) {

    const data = {
      id : id,
      naziv : naziv,
      adresa : adresa,
      tip : tip,
      spratovi : spratovi,
      kvadratura : kvadratura,
      sobe : sobe,
      namestenost : namestenost,
      tipOglasa : tipOglasa,
      cena : cena,
      vlasnik : vlasnik,
      promovisana : promovisana,
      galerija : galerija,
      prodata : prodata,
      odobrena : odobrena
    }

    return this.http.post(`http://localhost:4000/nekretnine/izmena`, data);
  }

  potvrdiKup(id) {
    
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/potvrdiKup`, data);
  }

  potvrdiIzn(id) {
    
    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/potvrdiIzn`, data);
  }

  odobriNekretninu(id) {

    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/nekretnine/odobrenje`, data);
  }

  promovisanje(id, promovisana) {
    const data = {
      id : id,
      promovisana : promovisana
    }

    return this.http.post(`http://localhost:4000/nekretnine/promo`, data);
  }

  procenti() {
    
    const data = {
      id : 1
    }

    return this.http.post(`http://localhost:4000/nekretnine/procenti`, data);
  }

  procentiPromena(procenatProdaje, procenatIzdavanja) {
    
    const data = {
      id : 1,
      procenatProdaje : procenatProdaje,
      procenatIzdavanja : procenatIzdavanja
    }

    return this.http.post(`http://localhost:4000/nekretnine/procentiPromena`, data);
  }

  prihodKup(id, prihod) {

    const data = {
      id : id,
      prihod : prihod
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/prihodKup`, data);
  }

  prihodIzd(id, prihod) {

    const data = {
      id : id,
      prihod : prihod
    }

    return this.http.post(`http://localhost:4000/iznajmljivanjaKupovine/prihodIzd`, data);
  }

}
