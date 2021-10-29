import express from "express";
import { BlokiranjaController } from "../controllers/blokiranja";

const BlokiranjaRouter = express.Router();

BlokiranjaRouter.route("/sva").get((req, res)=>{
    new BlokiranjaController().sva(req, res);
});

BlokiranjaRouter.route("/dodaj").post((req, res)=>{
    new BlokiranjaController().dodaj(req, res);
});

BlokiranjaRouter.route("/ukloni").post((req, res)=>{
    new BlokiranjaController().ukloni(req, res);
});

 

export default BlokiranjaRouter;