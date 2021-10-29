import express from "express";
import Iznajmljivanje from "../models/iznajmljivanje";
import Kupovina from "../models/kupovina";

export class IznajmljivanjaKupovineController {


    sva = (req: express.Request, res: express.Response) => {

        Iznajmljivanje.find({}, (err, iznajmljivanja) => {
            if (err)
                console.log(err);
            else
                res.json(iznajmljivanja);
        })

    }

    sve = (req: express.Request, res: express.Response) => {

        Kupovina.find({}, (err, kupovine) => {
            if (err)
                console.log(err);
            else
                res.json(kupovine);
        })

    }

    dodajIzn = (req: express.Request, res: express.Response) => {

        let br = 0;

        Iznajmljivanje.find({}, (err, iznajmljivanja) => {
            if (err)
                console.log(err);
            else {

                let max = 0;

                for(var i in iznajmljivanja)
                    if(iznajmljivanja[i].id > max)
                        max = iznajmljivanja[i].id;

                let iznajmljivanje = new Iznajmljivanje(req.body);
                iznajmljivanje.id = max + 1;

                iznajmljivanje.save().then(iznajmljivanje => {
                    res.json({ "message": "dodato" });
                }).catch(err => {
                    res.json(err);
                })
            }
        });
    }

    dodajKup = (req: express.Request, res: express.Response) => {

        let br = 0;

        Kupovina.find({}, (err, kupovine) => {
            if (err)
                console.log(err);
            else {

                let max = 0;

                for(var i in kupovine)
                    if(kupovine[i].id > max)
                        max = kupovine[i].id;

                let kupovina = new Kupovina(req.body);
                kupovina.id = max + 1;

                kupovina.save().then(kupovina => {
                    res.json({ "message": "dodato" });
                }).catch(err => {
                    res.json(err);
                })
            }


        });
    }

    brisiKup = (req: express.Request, res: express.Response) => {

        Kupovina.deleteOne({"id" : req.body.id},(err)=>{
            if(err)
                console.log(err);
        });
 
    }

    brisiIzn = (req: express.Request, res: express.Response) => {

        Iznajmljivanje.deleteOne({"id" : req.body.id},(err)=>{
            if(err)
                console.log(err);
        });

    }

    prodaja = (req: express.Request, res: express.Response) => {

        Kupovina.deleteMany({"idNek" : req.body.id, "prihvaceno" : false},(err)=>{
            if(err)
                console.log(err);
        });
    }

    prihvatiKup = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        Kupovina.findOne({ "id": id }, (err, kupovine) => {
            if (err)
                console.log(err);
            else {
                Kupovina.updateOne({ "id": id }, { $set: { "prihvaceno": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "prihvacena kupovina" });
                    }
                });
            }
        });
    }

    prihvatiIzn = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        Iznajmljivanje.findOne({ "id": id }, (err, iznajmljivanja) => {
            if (err)
                console.log(err);
            else {
                Iznajmljivanje.updateOne({ "id": id }, { $set: { "prihvaceno": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "prihvaceno iznajmljivanje" });
                    }
                });
            }
        });
    }

    procitajKup = (req: express.Request, res: express.Response) => {

        Kupovina.findOne({ "id": req.body.id }, (err, kupovine) => {
            if (err)
                console.log(err);
            else {
                Kupovina.updateOne({ "id": req.body.id }, { $set: { "procitano": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "procitana kupovina" });
                    }
                });
            }
        });
        
     }

     procitajIzn = (req: express.Request, res: express.Response) => {

        Iznajmljivanje.findOne({ "id": req.body.id }, (err, iznajmljivanja) => {
            if (err)
                console.log(err);
            else {
                Iznajmljivanje.updateOne({ "id": req.body.id }, { $set: { "procitano": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "procitano iznajmljivanje" });
                    }
                });
            }
        });
    }
        arhKup = (req: express.Request, res: express.Response) => {

            Kupovina.findOne({ "id": req.body.id }, (err, kupovine) => {
                if (err)
                    console.log(err);
                else {
                    Kupovina.updateOne({ "id": req.body.id }, { $set: { "arhivirano": req.body.arhivirano } }, (err, r) => {
                        if (err)
                            console.log(err);
                        else {
                            res.json({ "message": "arhivirana kupovina" });
                        }
                    });
                }
            });
     }

     arhIzn = (req: express.Request, res: express.Response) => {

        Iznajmljivanje.findOne({ "id": req.body.id }, (err, iznajmljivanja) => {
            if (err)
                console.log(err);
            else {
                Iznajmljivanje.updateOne({ "id": req.body.id }, { $set: { "arhivirano": req.body.arhivirano } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "arhivirano iznajmljivanje" });
                    }
                });
            }
        });
    }

    potvrdiKup = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        Kupovina.findOne({ "id": id }, (err, kupovine) => {
            if (err)
                console.log(err);
            else {
                Kupovina.updateOne({ "id": id }, { $set: { "potvrdjeno": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "potvrdjena kupovina" });
                    }
                });
            }
        });
    }

    potvrdiIzn = (req: express.Request, res: express.Response) => {

        let id = req.body.id;

        Iznajmljivanje.findOne({ "id": id }, (err, iznajmljivanja) => {
            if (err)
                console.log(err);
            else {
                Iznajmljivanje.updateOne({ "id": id }, { $set: { "potvrdjeno": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "potvrdjeno iznajmljivanje" });
                    }
                });
            }
        });
    }

    prihodKup = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let prihod = req.body.prihod;

        Kupovina.findOne({ "id": id }, (err, kupovina) => {
            if (err)
                console.log(err);
            else {
                Kupovina.updateOne({ "id": id }, { $set: { "prihod": prihod} }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "prihod kupovina" });
                    }
                });
            }
        });
    }

    prihodIzd = (req: express.Request, res: express.Response) => {

        let id = req.body.id;
        let prihod = req.body.prihod;

        Iznajmljivanje.findOne({ "id": id }, (err, iznajmljivanje) => {
            if (err)
                console.log(err);
            else {
                Iznajmljivanje.updateOne({ "id": id }, { $set: { "prihod": prihod} }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "prihod iznajmljivanje" });
                    }
                });
            }
        });
    }
}