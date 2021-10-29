import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Poruka = new Schema({

    id : Number,
    naslov : String,
    posiljalac : Number,
    primalac : Number,
    idNek : Number,
    text : String,
    datumVreme : String,
    procitana : Boolean,
    status : String
});

export default mongoose.model("Poruka", Poruka, "Poruka");