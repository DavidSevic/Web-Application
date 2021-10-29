import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { FunkcionalniService } from '../funkcionalni.service';
import { Iznajmljivanje } from '../models/iznajmljivanje';
import { Korisnik } from '../models/korisnik';
import { Kupovina } from '../models/kupovina';
import { Nekretnina } from '../models/nekretnina';
import { Procenti } from '../models/procenti';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-zahtevi-ugovori',
  templateUrl: './zahtevi-ugovori.component.html',
  styleUrls: ['./zahtevi-ugovori.component.css']
})
export class ZahteviUgovoriComponent implements OnInit {

  ulogovan: Korisnik;

  kupovine: Kupovina[];
  iznajmljivanja: Iznajmljivanje[];

  korisnici: Korisnik[];
  nekretnine: Nekretnina[];

  constructor(private nService: NekretnineService, private fService: FunkcionalniService) { }

  ngOnInit(): void {

    this.ulogovan = JSON.parse(sessionStorage.getItem("ulogovan"));

    this.nService.sveKupovine().subscribe((kupovine: Kupovina[]) => {
      if (kupovine) {

        this.kupovine = [];

        for (var i in kupovine)
          if (kupovine[i].vlasnik != 0 && kupovine[i].potvrdjeno == false && kupovine[i].prihvaceno == true)
            this.kupovine.push(kupovine[i]);

      }
    });

    this.nService.svaIznajmljivanja().subscribe((iznajmljivanja: Iznajmljivanje[]) => {
      if (iznajmljivanja) {

        this.iznajmljivanja = [];

        for (var iz in iznajmljivanja)
          if (iznajmljivanja[iz].vlasnik != 0 && iznajmljivanja[iz].potvrdjeno == false && iznajmljivanja[iz].prihvaceno == true)
            this.iznajmljivanja.push(iznajmljivanja[iz]);

      }
    });

    this.fService.sviKorisnici().subscribe((korisnici: Korisnik[]) => {
      if (korisnici)
        this.korisnici = korisnici;
    });

    this.nService.sveNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      if (nekretnine)
        this.nekretnine = nekretnine;
    })


  }

  potvrda(ponuda) {

    for (var j in this.kupovine) {
      if (this.kupovine[j].id == ponuda.id) {


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


        this.nService.sveKupovine().subscribe((kupovine: Kupovina[]) => {
          if (kupovine) {

            for (var ii in kupovine)
              if (kupovine[ii].idNek == ponuda.idNek && kupovine[ii].id != ponuda.id)
                this.nService.obrisiKup(kupovine[ii].id).subscribe(resp => { console.log(resp) });

            this.nService.prodaja(ponuda.idNek).subscribe(resp => {
              console.log(resp);

              this.nService.potvrdiKup(ponuda.id).subscribe(resp => {
                console.log(resp);

                this.nService.sveKupovine().subscribe((kupovine: Kupovina[]) => {
                  if (kupovine) {

                    this.kupovine = [];

                    for (var i in kupovine)
                      if (kupovine[i].vlasnik != 0 && kupovine[i].potvrdjeno == false && kupovine[i].prihvaceno == true)
                        this.kupovine.push(kupovine[i]);

                  }
                });
              });
            });
          }
        });

        return;
      }
    }

    for (var j in this.iznajmljivanja)
      if (this.iznajmljivanja[j].id == ponuda.id) {


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


        this.nService.svaIznajmljivanja().subscribe((iznajmljivanja: Iznajmljivanje[]) => {

          for (var i in iznajmljivanja) {

            if (iznajmljivanja[i].idNek != ponuda.idNek)
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
              this.nService.obrisiIzn(iznajmljivanja[i].id).subscribe(resp => { console.log(resp) });
            }
          }

          this.nService.potvrdiIzn(ponuda.id).subscribe(resp => {
            console.log(resp)

            this.nService.svaIznajmljivanja().subscribe((iznajmljivanja: Iznajmljivanje[]) => {
              if (iznajmljivanja) {

                this.iznajmljivanja = [];

                for (var iz in iznajmljivanja)
                  if (iznajmljivanja[iz].vlasnik != 0 && iznajmljivanja[iz].potvrdjeno == false && iznajmljivanja[iz].prihvaceno == true)
                    this.iznajmljivanja.push(iznajmljivanja[iz]);

              }
            });
          });

        });



        return;
      }
  }

  kupacKoJe(ponuda) {
    for (var j in this.korisnici)
      if (this.korisnici[j].id == ponuda.kupac)
        return "" + this.korisnici[j].ime + " " + this.korisnici[j].prezime;

  }

  nekretninaKoja(ponuda) {
    for (var i in this.nekretnine)
      if (ponuda.idNek == this.nekretnine[i].id)
        return this.nekretnine[i].naziv;
  }

  vlasnikKoJe(ponuda) {
    for (var j in this.korisnici)
      if (this.korisnici[j].id == ponuda.vlasnik)
        return "" + this.korisnici[j].ime + " " + this.korisnici[j].prezime;
  }

}
