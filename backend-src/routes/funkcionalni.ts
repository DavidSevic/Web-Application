import express from "express";
import { FunkcionalniController } from "../controllers/funkcionalni";

const FunkcionalniRouter = express.Router();

FunkcionalniRouter.route("/logovanje").post((req, res)=>{
    new FunkcionalniController().logovanje(req, res);
});

FunkcionalniRouter.route("/registrovanje").post((req, res)=>{
    new FunkcionalniController().registrovanje(req, res);
});

FunkcionalniRouter.route("/proveraKorIme").post((req, res)=>{
    new FunkcionalniController().proveraKorIme(req, res);
});

FunkcionalniRouter.route("/proveraLozinka").post((req, res)=>{
    new FunkcionalniController().proveraLozinka(req, res);
});

FunkcionalniRouter.route("/promenaLozinka").post((req, res)=>{
    new FunkcionalniController().promenaLozinka(req, res);
});

FunkcionalniRouter.route("/sviKorisnici").get((req, res)=>{
    new FunkcionalniController().sviKorisnici(req, res);
});

FunkcionalniRouter.route("/promenaIme").post((req, res)=>{
    new FunkcionalniController().promenaIme(req, res);
});

FunkcionalniRouter.route("/promenaPrezime").post((req, res)=>{
    new FunkcionalniController().promenaPrezime(req, res);
});

FunkcionalniRouter.route("/promenaKorIme").post((req, res)=>{
    new FunkcionalniController().promenaKorIme(req, res);
});

FunkcionalniRouter.route("/promenaSlika").post((req, res)=>{
    new FunkcionalniController().promenaSlika(req, res);
});

FunkcionalniRouter.route("/promenaEmail").post((req, res)=>{
    new FunkcionalniController().promenaEmail(req, res);
});

FunkcionalniRouter.route("/promenaGrad").post((req, res)=>{
    new FunkcionalniController().promenaGrad(req, res);
});

FunkcionalniRouter.route("/promenaDrzava").post((req, res)=>{
    new FunkcionalniController().promenaDrzava(req, res);
});

FunkcionalniRouter.route("/promenaTip").post((req, res)=>{
    new FunkcionalniController().promenaTip(req, res);
});

FunkcionalniRouter.route("/sveRegistracije").get((req, res)=>{
    new FunkcionalniController().sveRegistracije(req, res);
});

FunkcionalniRouter.route("/brisiReg").post((req, res)=>{
    new FunkcionalniController().brisiReg(req, res);
});

FunkcionalniRouter.route("/noviKorisnik").post((req, res)=>{
    new FunkcionalniController().noviKorisnik(req, res);
});

FunkcionalniRouter.route("/brisiKor").post((req, res)=>{
    new FunkcionalniController().brisiKor(req, res);
});

export default FunkcionalniRouter;