import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Iznajmljivanje = new Schema({

    id : Number,
    idNek : Number,
    kupac : Number,
    vlasnik : Number,
    datumOd : String,
    datumDo : String,
    prihvaceno : Boolean,
    datumVreme : String,
    procitano : Boolean,
    arhivirano : Boolean,
    potvrdjeno : Boolean,
    prihod : Number

});

export default mongoose.model("Iznajmljivanje", Iznajmljivanje, "Iznajmljivanje");