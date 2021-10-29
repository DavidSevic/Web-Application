import express, { Request, Response } from "express";
import Poruka from "../models/poruka";

export class PorukeController {

     
    dodaj = (req: express.Request, res: express.Response) => {

        Poruka.find({}, (err, poruke) => {
            if (err)
                console.log(err);
            else {
                
                let max = 0;

                for(var i in poruke)
                    if(poruke[i].id > max)
                        max = poruke[i].id;

                let poruka = new Poruka(req.body);
                poruka.id = max + 1;

                poruka.save().then(poruka => {
                    res.json({ "message": "dodato" });
                }).catch(err => {
                    res.json(err);
                })
            }


        });
    }

    sve = (req: express.Request, res: express.Response) => {

        Poruka.find({}, (err, poruke) => {
            if (err)
                console.log(err);
            else 
                res.json(poruke);
        });
     }

     procitaj = (req: express.Request, res: express.Response) => {

        Poruka.findOne({ "id": req.body.id }, (err, poruka) => {
            if (err)
                console.log(err);
            else {
                Poruka.updateOne({ "id": req.body.id }, { $set: { "procitana": true } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "procitana poruka" });
                    }
                });
            }
        });
        
     }

     status = (req: express.Request, res: express.Response) => {

        Poruka.findOne({ "id": req.body.id }, (err, poruka) => {
            if (err)
                console.log(err);
            else {
                Poruka.updateOne({ "id": req.body.id }, { $set: { "status": req.body.status } }, (err, r) => {
                    if (err)
                        console.log(err);
                    else {
                        res.json({ "message": "procitana poruka" });
                    }
                });
            }
        });
        
     }
}