import express from "express";
import { NekretnineController } from "../controllers/nekretnine";

const NekretnineRouter = express.Router();

NekretnineRouter.route("/sve").get((req, res)=>{
    new NekretnineController().sve(req, res);
});

NekretnineRouter.route("/prodaja").post((req, res)=>{
    new NekretnineController().prodaja(req, res);
});

NekretnineRouter.route("/nova").post((req, res)=>{
    new NekretnineController().nova(req, res);
});

NekretnineRouter.route("/izmena").post((req, res)=>{
    new NekretnineController().izmena(req, res);
});

NekretnineRouter.route("/odobrenje").post((req, res)=>{
    new NekretnineController().odobrenje(req, res);
});

NekretnineRouter.route("/promo").post((req, res)=>{
    new NekretnineController().promo(req, res);
});

NekretnineRouter.route("/procenti").post((req, res)=>{
    new NekretnineController().procenti(req, res);
});

NekretnineRouter.route("/procentiPromena").post((req, res)=>{
    new NekretnineController().procentiPromena(req, res);
});



export default NekretnineRouter;