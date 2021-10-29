import express from "express";
import { IznajmljivanjaKupovineController } from "../controllers/iznajmljivanjaKupovine";

const IznajmljivanjaKupovineRouter = express.Router();

IznajmljivanjaKupovineRouter.route("/sva").get((req, res)=>{
    new IznajmljivanjaKupovineController().sva(req, res);
}); 

IznajmljivanjaKupovineRouter.route("/sve").get((req, res)=>{
    new IznajmljivanjaKupovineController().sve(req, res);
}); 

IznajmljivanjaKupovineRouter.route("/dodajIzn").post((req, res)=>{
    new IznajmljivanjaKupovineController().dodajIzn(req, res);
});
 
IznajmljivanjaKupovineRouter.route("/dodajKup").post((req, res)=>{
    new IznajmljivanjaKupovineController().dodajKup(req, res);
});

IznajmljivanjaKupovineRouter.route("/brisiKup").post((req, res)=>{
    new IznajmljivanjaKupovineController().brisiKup(req, res);
});

IznajmljivanjaKupovineRouter.route("/brisiIzn").post((req, res)=>{
    new IznajmljivanjaKupovineController().brisiIzn(req, res);
});

IznajmljivanjaKupovineRouter.route("/prodaja").post((req, res)=>{
    new IznajmljivanjaKupovineController().prodaja(req, res);
});

IznajmljivanjaKupovineRouter.route("/prihvatiKup").post((req, res)=>{
    new IznajmljivanjaKupovineController().prihvatiKup(req, res);
});

IznajmljivanjaKupovineRouter.route("/prihvatiIzn").post((req, res)=>{
    new IznajmljivanjaKupovineController().prihvatiIzn(req, res);
});

IznajmljivanjaKupovineRouter.route("/procitajKup").post((req, res)=>{
    new IznajmljivanjaKupovineController().procitajKup(req, res);
});

IznajmljivanjaKupovineRouter.route("/procitajIzn").post((req, res)=>{
    new IznajmljivanjaKupovineController().procitajIzn(req, res);
});

IznajmljivanjaKupovineRouter.route("/arhKup").post((req, res)=>{
    new IznajmljivanjaKupovineController().arhKup(req, res);
});
 
IznajmljivanjaKupovineRouter.route("/arhIzn").post((req, res)=>{
    new IznajmljivanjaKupovineController().arhIzn(req, res);
});

IznajmljivanjaKupovineRouter.route("/potvrdiKup").post((req, res)=>{
    new IznajmljivanjaKupovineController().potvrdiKup(req, res);
});

IznajmljivanjaKupovineRouter.route("/potvrdiIzn").post((req, res)=>{
    new IznajmljivanjaKupovineController().potvrdiIzn(req, res);
});

IznajmljivanjaKupovineRouter.route("/prihodKup").post((req, res)=>{
    new IznajmljivanjaKupovineController().prihodKup(req, res);
});

IznajmljivanjaKupovineRouter.route("/prihodIzd").post((req, res)=>{
    new IznajmljivanjaKupovineController().prihodIzd(req, res);
});

export default IznajmljivanjaKupovineRouter;