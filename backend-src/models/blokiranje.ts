import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Blokiranje = new Schema({
    id : Number,
    idBlokira : Number,
    idBlokiran : Number
});

export default mongoose.model("Blokiranje", Blokiranje, "Blokiranje");