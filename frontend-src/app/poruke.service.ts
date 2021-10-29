import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PorukeService {

  constructor(private http : HttpClient) { }

 

  dodaj(naslov, posiljalac, primalac, idNek, text, datumVreme, procitana, status) {
    const data = {
      naslov : naslov,
      posiljalac : posiljalac,
      primalac : primalac,
      idNek : idNek,
      text : text,
      datumVreme : datumVreme,
      procitana : procitana,
      status : status
    }

    return this.http.post(`http://localhost:4000/poruke/dodaj`, data);
  }

  svaBlokiranja() {
    return this.http.get(`http://localhost:4000/blokiranja/sva`);
  }

  svePoruke() {
    return this.http.get(`http://localhost:4000/poruke/sve`);
  }

  procitaj(id) {

    const data = {
      id : id
    }

    return this.http.post(`http://localhost:4000/poruke/procitaj`, data);
  }

  status(id, status) {

    const data = {
      id : id,
      status : status
    }

    return this.http.post(`http://localhost:4000/poruke/status`, data);
  }

  noviBlok(idBlokira, idBlokiran) {
    
    const data = {
      idBlokira : idBlokira,
      idBlokiran : idBlokiran
    }

    return this.http.post(`http://localhost:4000/blokiranja/dodaj`, data);
  }

  brisiBlok(idBlokira, idBlokiran) {
    
    const data = {
      idBlokira : idBlokira,
      idBlokiran : idBlokiran
    }

    return this.http.post(`http://localhost:4000/blokiranja/ukloni`, data);
  }

}
