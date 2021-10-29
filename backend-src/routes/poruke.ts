import express from "express";
import { PorukeController } from "../controllers/poruke";

const PorukeRouter = express.Router();

PorukeRouter.route("/dodaj").post((req, res)=>{
    new PorukeController().dodaj(req, res);
});

PorukeRouter.route("/sve").get((req, res)=>{
    new PorukeController().sve(req, res);
});

PorukeRouter.route("/procitaj").post((req, res)=>{
    new PorukeController().procitaj(req, res);
});

PorukeRouter.route("/status").post((req, res)=>{
    new PorukeController().status(req, res);
});
 

export default PorukeRouter;