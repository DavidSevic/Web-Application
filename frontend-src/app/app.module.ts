import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { MeniKorisnikComponent } from './meni-korisnik/meni-korisnik.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PodaciKorisnikaComponent } from './podaci-korisnika/podaci-korisnika.component';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { PorukaComponent } from './poruka/poruka.component';
import { InboxComponent } from './inbox/inbox.component';
import { KonverzacijaComponent } from './konverzacija/konverzacija.component';
import { KorisnikNekretnineComponent } from './korisnik-nekretnine/korisnik-nekretnine.component';
import { AgentComponent } from './agent/agent.component';
import { MeniAgentComponent } from './meni-agent/meni-agent.component';
import { SveNekretnineComponent } from './sve-nekretnine/sve-nekretnine.component';
import { UgovoriComponent } from './ugovori/ugovori.component';
import { ZahteviUgovoriComponent } from './zahtevi-ugovori/zahtevi-ugovori.component';
import { ZahteviNekretninaComponent } from './zahtevi-nekretnina/zahtevi-nekretnina.component';
import { AdminComponent } from './admin/admin.component';
import { MeniAdminComponent } from './meni-admin/meni-admin.component';
import { ZahteviRegistracijeComponent } from './zahtevi-registracije/zahtevi-registracije.component';
import { IzmeneKorisnikaComponent } from './izmene-korisnika/izmene-korisnika.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    KorisnikComponent,
    RegistracijaComponent,
    MeniKorisnikComponent,
    PromenaLozinkeComponent,
    PodaciKorisnikaComponent,
    NekretninaComponent,
    PorukaComponent,
    InboxComponent,
    KonverzacijaComponent,
    KorisnikNekretnineComponent,
    AgentComponent,
    MeniAgentComponent,
    SveNekretnineComponent,
    UgovoriComponent,
    ZahteviUgovoriComponent,
    ZahteviNekretninaComponent,
    AdminComponent,
    MeniAdminComponent,
    ZahteviRegistracijeComponent,
    IzmeneKorisnikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
