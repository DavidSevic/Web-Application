import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Nekretnina = new Schema({

    id : Number,
    naziv : String,
    adresa : String,
    tip : String,
    spratovi : String,
    kvadratura : Number,
    sobe : Number,
    namestenost : Boolean,
    galerija : Array,
    tipOglasa : String,
    cena : Number,
    vlasnik : Number,
    promovisana : Boolean,
    prodata : Boolean,
    odobrena : Boolean
});

export default mongoose.model("Nekretnina", Nekretnina, "Nekretnina");