import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Kupovina = new Schema({

    id : Number,
    idNek : Number,
    kupac : Number,
    vlasnik : Number,
    tip : String,
    prihvaceno : Boolean,
    datumVreme : String,
    procitano : Boolean,
    arhivirano : Boolean,
    potvrdjeno : Boolean,
    prihod : Number

});

export default mongoose.model("Kupovina", Kupovina, "Kupovina");