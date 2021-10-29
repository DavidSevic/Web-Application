import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { InboxComponent } from './inbox/inbox.component';
import { IzmeneKorisnikaComponent } from './izmene-korisnika/izmene-korisnika.component';
import { KonverzacijaComponent } from './konverzacija/konverzacija.component';
import { KorisnikNekretnineComponent } from './korisnik-nekretnine/korisnik-nekretnine.component';
import { KorisnikComponent } from './korisnik/korisnik.component';
import { NekretninaComponent } from './nekretnina/nekretnina.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PodaciKorisnikaComponent } from './podaci-korisnika/podaci-korisnika.component';
import { PorukaComponent } from './poruka/poruka.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { SveNekretnineComponent } from './sve-nekretnine/sve-nekretnine.component';
import { UgovoriComponent } from './ugovori/ugovori.component';
import { ZahteviNekretninaComponent } from './zahtevi-nekretnina/zahtevi-nekretnina.component';
import { ZahteviRegistracijeComponent } from './zahtevi-registracije/zahtevi-registracije.component';
import { ZahteviUgovoriComponent } from './zahtevi-ugovori/zahtevi-ugovori.component';

const routes: Routes = [
  {path : "", component : PocetnaComponent},
  {path : "korisnik", component : KorisnikComponent},
  {path : "registracija", component : RegistracijaComponent},
  {path : "promenaLozinke", component : PromenaLozinkeComponent},
  {path : "podaciKorisnika", component : PodaciKorisnikaComponent},
  {path : "korisnik/nekretnina", component : NekretninaComponent},
  {path : "korisnik/nekretnina/poruka", component : PorukaComponent},
  {path : "inbox", component : InboxComponent},
  {path : "inbox/konverzacija", component : KonverzacijaComponent},
  {path : "korisnikNekretnine", component : KorisnikNekretnineComponent},
  {path : "agent", component : AgentComponent},
  {path : "sveNekretnine", component : SveNekretnineComponent},
  {path : "sviUgovori", component : UgovoriComponent},
  {path : "zahteviUgovori", component : ZahteviUgovoriComponent},
  {path : "zahteviNekretnina", component : ZahteviNekretninaComponent},
  {path : "admin", component : AdminComponent},
  {path : "zahteviRegistracije", component : ZahteviRegistracijeComponent},
  {path : "izmenaKorisnika", component : IzmeneKorisnikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
