import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Procenti = new Schema({
    id : Number,
    procenatProdaje : Number,
    procenatIzdavanja : Number
});

export default mongoose.model("Procenti", Procenti, "Procenti");