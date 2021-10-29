import express from "express";
import Nekretnina from "../models/nekretnina";
import Procenti from "../models/procenti";

export class NekretnineController {

     
    sve = (req : express.Request, res : express.Response)=>{

        Nekretnina.find({}, (err, nekretnine)=>{
            if(err)
                console.log(err);
            else
                res.json(nekretnine);
        })

    }

    prodaja = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        Nekretnina.findOne({ "id": id }, (err, nekretnine) => {
            if (err)
                console.log(err);
            else {
                Nekretnina.updateOne({ "id": id }, { $set: { "prodata": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "prodata nekretnina" });
                    }
                });
            }
        });
    }

    nova = (req: express.Request, res: express.Response) => {

        let br = 0;

        Nekretnina.find({}, (err, nekretnine) => {
            if (err)
                console.log(err);
            else {

                let max = 0;

                for(var i in nekretnine)
                    if(nekretnine[i].id > max)
                        max = nekretnine[i].id;

                let nekretnina = new Nekretnina(req.body);
                nekretnina.id = max + 1;

                nekretnina.save().then(nekretnina => {
                    res.json({ "message": "dodata nekretnina" });
                }).catch(err => {
                    res.json(err);
                })
            }


        });
    }

    izmena = (req: express.Request, res: express.Response) => {

        Nekretnina.updateOne({ "id": req.body.id }, { $set: { "naziv": req.body.naziv, 
        "adresa": req.body.adresa, "tip": req.body.tip, "spratovi": req.body.spratovi,
        "kvadratura": req.body.kvadratura, "sobe": req.body.sobe, "namestenost": req.body.namestenost,
        "tipOglasa": req.body.tipOglasa, "cena": req.body.cena, "vlasnik": req.body.vlasnik,
        "promovisana": req.body.promovisana, "galerija": req.body.galerija, "prodata": req.body.prodata, "odobrena": req.body.odobrena } }, (err, r) => {
            if (err)
                console.log(err);
            else {
                res.json({ "message": "izmenjena nekretnina" });
            }
        });
    }

    odobrenje = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        Nekretnina.findOne({ "id": id }, (err, nekretnine) => {
            if (err)
                console.log(err);
            else {
                Nekretnina.updateOne({ "id": id }, { $set: { "odobrena": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "odobrena nekretnina" });
                    }
                });
            }
        });
    }

    promo = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        Nekretnina.findOne({ "id": id }, (err, nekretnine) => {
            if (err)
                console.log(err);
            else {
                Nekretnina.updateOne({ "id": id }, { $set: { "promovisana": req.body.promovisana } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "promovisanje nekretnina " + req.body.promovisana });
                    }
                });
            }
        });
    }

    procenti = (req: express.Request, res: express.Response) => {

        Procenti.findOne({ "id": req.body.id}, (err, procenti) => {
            if (err)
                console.log(err);
            else
                res.json(procenti);
        });

    }


    procentiPromena = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let procenatProdaje = req.body.procenatProdaje;
        let procenatIzdavanja = req.body.procenatIzdavanja;

        Procenti.findOne({ "id": id }, (err, procenti) => {
            if (err)
                console.log(err);
            else {
                Procenti.updateOne({ "id": id }, { $set: { "procenatProdaje": procenatProdaje, "procenatIzdavanja" : procenatIzdavanja } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "promenjeni procenti" });
                    }
                });
            }
        });
    }
}