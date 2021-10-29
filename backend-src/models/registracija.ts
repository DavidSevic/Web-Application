import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Registracija = new Schema({

    id : Number,
    ime : String,
    prezime : String,
    korisnickoIme : String,
    lozinka : String,
    slika : String,
    email : String,
    grad : String,
    drzava : String

});

export default mongoose.model("Registracija", Registracija, "Registracija");