import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  izbor: string;

  nekretnine: Nekretnina[];

  boje: string[];

  canvas : HTMLCanvasElement;
  ctx : any;
  myChart : Chart;

  naslov : string;

  constructor(private nService: NekretnineService) { }

  ngOnInit(): void {

    this.izbor = "poGradu";

    this.naslov = "Nekretnine po tipovima i oglasima";

    this.boje = [];

    this.boje.push("#31255e");
    this.boje.push("#41327e");
    this.boje.push("#523f9e");
    this.boje.push("#7465b1");
    this.boje.push("#978bc4");



    this.nService.sveNekretnine().subscribe((nekretnine: Nekretnina[]) => {

      if (nekretnine) {

        this.nekretnine = [];

        for(var o in nekretnine)
          if(nekretnine[o].odobrena == true)
            this.nekretnine.push(nekretnine[o]);


        let gradovi = [];
        let brojevi = [];

        for(var i in this.nekretnine) {

          let nasao = false;

          for(var j in gradovi)
            if(this.nekretnine[i].adresa.split(',')[0] == gradovi[j]) {
              nasao = true;
              ++brojevi[j];
              break;
            }

          if(nasao == false){
            gradovi.push(this.nekretnine[i].adresa.split(',')[0]);
            brojevi.push(1);
          }
        }

        let bojeSad = [];

        for(var m in gradovi)
          bojeSad.push(this.boje[parseInt(m) % 5]);

        let vrednosti = [];

        for(var b in brojevi)
          vrednosti.push(this.nekretnine.length / brojevi[b]);

        this.canvas = <HTMLCanvasElement>document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');

        this.myChart = new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: gradovi,
            datasets: [{
              backgroundColor: bojeSad,
              data: brojevi
            }]
          }
        });


      }

    });



  }

  promena() {

    this.myChart.destroy();

    if(this.izbor == "poBroju") {

      this.naslov = "Nekretnine po gradovima";

      let kucaProd = 0;
      let kucaIzd = 0;
      let stanProd = 0;
      let stanIzd = 0;

      for(var i in this.nekretnine) {
        if(this.nekretnine[i].tip == "kuca" && this.nekretnine[i].tipOglasa == "prodaja")
          ++kucaProd;
        if(this.nekretnine[i].tip == "kuca" && this.nekretnine[i].tipOglasa == "izdavanje")
          ++kucaIzd;
        if(this.nekretnine[i].tip == "stan" && this.nekretnine[i].tipOglasa == "prodaja")
          ++stanProd;
        if(this.nekretnine[i].tip == "stan" && this.nekretnine[i].tipOglasa == "izdavanje")
          ++stanIzd;
      }

      let vrednosti = [];

      vrednosti.push(kucaProd);
      vrednosti.push(kucaIzd);
      vrednosti.push(stanProd);
      vrednosti.push(stanIzd);
      

      let nazivi = [];
      
      nazivi.push("Kuće na prodaju");
      nazivi.push("Kuće za izdavanje");
      nazivi.push("Stanovi na prodaju");
      nazivi.push("Stanovi za izdavanje");

      let bojeSad = [];

      for(var m in nazivi)
        bojeSad.push(this.boje[parseInt(m) % 5]);


      this.canvas = <HTMLCanvasElement>document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');

        this.myChart = new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: nazivi,
            datasets: [{
              backgroundColor: bojeSad,
              data: vrednosti
            }]
          }
        });
        
        return;
    } 

    if(this.izbor == "poCeniProd") {

      this. naslov = "Nekretnine na prodaju u cenovnim rangovima";

      let opsezi = [];

      opsezi.push("do 80.000");
      opsezi.push("81.000-150.000");
      opsezi.push("151.000-300.000");
      opsezi.push("preko 300.000");

      
      let brojevi = [];
      
      brojevi.push(0);
      brojevi.push(0);
      brojevi.push(0);
      brojevi.push(0);

      for(var po in this.nekretnine) 
        if(this.nekretnine[po].tipOglasa == "prodaja" && this.nekretnine[po].cena <= 80000)
          ++brojevi[0];
        else if(this.nekretnine[po].tipOglasa == "prodaja" && this.nekretnine[po].cena > 80000 && this.nekretnine[po].cena <= 150000)
        ++brojevi[1];
        else if(this.nekretnine[po].tipOglasa == "prodaja" && this.nekretnine[po].cena > 150000 && this.nekretnine[po].cena <= 300000)
        ++brojevi[2];
        else if(this.nekretnine[po].tipOglasa == "prodaja" && this.nekretnine[po].cena > 300000)
        ++brojevi[3];

        let bojeSad = [];

      for(var m in opsezi)
        bojeSad.push(this.boje[parseInt(m) % 5]);

        this.canvas = <HTMLCanvasElement>document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
  
          this.myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
              labels: opsezi,
              datasets: [{
                backgroundColor: bojeSad,
                data: brojevi
              }]
            }
          });
      
          return;

    }

    if(this.izbor == "poCeniIzd") {

      this. naslov = "Nekretnine za izdavanje u cenovnim rangovima";

      let opsezi = [];

      opsezi.push("do 1000");
      opsezi.push("1001-2000");
      opsezi.push("2001-3000");
      opsezi.push("preko 3000");

      
      let brojevi = [];
      
      brojevi.push(0);
      brojevi.push(0);
      brojevi.push(0);
      brojevi.push(0);

      for(var po in this.nekretnine) 
        if(this.nekretnine[po].tipOglasa == "izdavanje" && this.nekretnine[po].cena <= 1000)
          ++brojevi[0];
        else if(this.nekretnine[po].tipOglasa == "izdavanje" && this.nekretnine[po].cena > 1001 && this.nekretnine[po].cena <= 2000)
        ++brojevi[1];
        else if(this.nekretnine[po].tipOglasa == "izdavanje" && this.nekretnine[po].cena > 2001 && this.nekretnine[po].cena <= 3000)
        ++brojevi[2];
        else if(this.nekretnine[po].tipOglasa == "izdavanje" && this.nekretnine[po].cena > 3000)
        ++brojevi[3];

        let bojeSad = [];

      for(var m in opsezi)
        bojeSad.push(this.boje[parseInt(m) % 5]);

        this.canvas = <HTMLCanvasElement>document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
  
          this.myChart = new Chart(this.ctx, {
            type: 'pie',
            data: {
              labels: opsezi,
              datasets: [{
                backgroundColor: bojeSad,
                data: brojevi
              }]
            }
          });
      
          return;
    }
    if(this.izbor == 'poGradu') {

      this.naslov = "Nekretnine po tipovima i oglasima";

      let gradovi = [];
        let brojevi = [];

        for(var i in this.nekretnine) {

          let nasao = false;

          for(var j in gradovi)
            if(this.nekretnine[i].adresa.split(',')[0] == gradovi[j]) {
              nasao = true;
              ++brojevi[j];
              break;
            }

          if(nasao == false){
            gradovi.push(this.nekretnine[i].adresa.split(',')[0]);
            brojevi.push(1);
          }
        }

        let bojeSad = [];

        for(var m in gradovi)
          bojeSad.push(this.boje[parseInt(m) % 5]);

        let vrednosti = [];

        for(var b in brojevi)
          vrednosti.push(this.nekretnine.length / brojevi[b]);

        this.canvas = <HTMLCanvasElement>document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');

        this.myChart = new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: gradovi,
            datasets: [{
              backgroundColor: bojeSad,
              data: brojevi
            }]
          }
        });

    }

  }




}
