import express, { json } from "express";
import Registracija from "../models/registracija";
import Korisnik from "../models/korisnik";

export class FunkcionalniController {

    logovanje = (req: express.Request, res: express.Response) => {

        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let tip = req.body.tip;

        Korisnik.findOne({ "korisnickoIme": korisnickoIme, "lozinka": lozinka, "tip": tip }, (err, korisnik) => {
            if (err)
                console.log(err);
            else
                res.json(korisnik);
        });

    }

    registrovanje = (req: express.Request, res: express.Response) => {

        Registracija.find({}, (err, registracije) => {
            if (err)
                console.log(err);
            else {

                let max = 0;

                for(var i in registracije)
                    if(registracije[i].id > max)
                        max = registracije[i].id;

                let registracija = new Registracija(req.body);

                registracija.id = max + 1;

                registracija.save().then(registracija => {
                    res.json({ "message": "dodata registracija" });
                }).catch(err => {
                    res.json(err);
                })
            }
        });
    }

    proveraKorIme = (req: express.Request, res: express.Response) => {

        let korisnickoIme = req.body.korisnickoIme;

        Korisnik.findOne({ "korisnickoIme": korisnickoIme }, (err, korisnik) => {
            if (err)
                console.log(err);
            else
                res.json(korisnik);
        });

    }

    proveraLozinka = (req: express.Request, res: express.Response) => {

        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({ "korisnickoIme": korisnickoIme, "lozinka": lozinka }, (err, korisnik) => {
            if (err)
                console.log(err);
            else
                res.json(korisnik);
        });

    }


    promenaLozinka = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let lozinka = req.body.lozinka;

        Korisnik.findOne({ "id": id }, (err, korisnik) => {
            if (err)
                console.log(err);
            else {
                Korisnik.updateOne({ "id": id }, { $set: { "lozinka": lozinka } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "promenjena lozinka" });
                    }
                });
            }
        });
    }

    sviKorisnici = (req: express.Request, res: express.Response) => {

        Korisnik.find({}, (err, korisnici) => {
            if (err)
                console.log(err);
            else
                res.json(korisnici);
        })

    }

    promenaIme = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let ime = req.body.ime;

        Korisnik.updateOne({ "id": id }, { $set: { "ime": ime } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjeno ime" });
            }
        });
    }

    promenaPrezime = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let prezime = req.body.prezime;

        Korisnik.updateOne({ "id": id }, { $set: { "prezime": prezime } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjeno prezime" });
            }
        });
    }

    promenaKorIme = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let korisnickoIme = req.body.korisnickoIme;

        Korisnik.updateOne({ "id": id }, { $set: { "korisnickoIme": korisnickoIme } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjeno korisnickoIme" });
            }
        });
    }

    promenaSlika = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let slika = req.body.slika;

        Korisnik.updateOne({ "id": id }, { $set: { "slika": slika } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjena slika" });
            }
        });
    }

    promenaEmail = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let email = req.body.email;

        Korisnik.updateOne({ "id": id }, { $set: { "email": email } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjen email" });
            }
        });
    }

    promenaGrad = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let grad = req.body.grad;

        Korisnik.updateOne({ "id": id }, { $set: { "grad": grad } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjen grad"});
            }
        });
    }

    promenaDrzava = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let drzava = req.body.drzava;

        Korisnik.updateOne({ "id": id }, { $set: { "drzava": drzava } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjena drzava" });
            }
        });
    }

    promenaTip = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let tip = req.body.tip;

        Korisnik.updateOne({ "id": id }, { $set: { "tip": tip } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "promenjen tip"});
            }
        });
    }

    sveRegistracije = (req: express.Request, res: express.Response) => {

        Registracija.find({}, (err, registracije) => {
            if (err)
                console.log(err);
            else
                res.json(registracije);
        });

    }

    brisiReg = (req: express.Request, res: express.Response) => {

        Registracija.deleteOne({"id" : req.body.id},(err)=>{
            if(err)
                console.log(err);
        });

    }

    noviKorisnik = (req: express.Request, res: express.Response) => {

        Korisnik.find({}, (err, korisnici) => {
            if (err)
                console.log(err);
            else {

                let max = 0;

                for(var i in korisnici)
                    if(korisnici[i].id > max)
                        max = korisnici[i].id;

                let korisnik = new Korisnik(req.body);

                korisnik.id = max + 1;

                korisnik.save().then(korisnik => {
                    res.json({ "message": "dodat korisnik" });
                }).catch(err => {
                    res.json(err);
                })
            }
        });
    }

    brisiKor = (req: express.Request, res: express.Response) => {

        Korisnik.deleteOne({"id" : req.body.id},(err)=>{
            if(err)
                console.log(err);
            else
                res.json(({"message" : "obrisan korisnik"}));
        });

    }

}