import express from "express";
import Blokiranje from "../models/blokiranje";

export class BlokiranjaController {

     
    sva = (req: express.Request, res: express.Response) => {

        Blokiranje.find({}, (err, blokiranja) => {
            if (err)
                console.log(err);
            else 
                res.json(blokiranja);
        });
    }

    dodaj = (req: express.Request, res: express.Response) => {


        Blokiranje.find({}, (err, blokiranja) => {
            if (err)
                console.log(err);
            else {
                let max = 0;

                for(var i in blokiranja)
                    if(blokiranja[i].id > max)
                        max = blokiranja[i].id;

                let blok = new Blokiranje(req.body);
                blok.id = max + 1;

                blok.save().then(blok => {
                    res.json({ "message": "dodato" });
                }).catch(err => {
                    res.json(err);
                })
            }
        });
    }

    ukloni = (req: express.Request, res: express.Response) => {

        Blokiranje.deleteMany({"idBlokira" : req.body.idBlokira, "idBlokiran" : req.body.idBlokiran},(err)=>{
            if(err)
                console.log(err);
        });

    }

}