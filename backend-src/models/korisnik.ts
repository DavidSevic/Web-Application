import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({

    id : Number,
    korisnickoIme : String,
    lozinka : String,
    tip : String,
    ime : String,
    prezime : String,
    slika : String,
    email : String,
    grad : String,
    drzava : String

});

export default mongoose.model("Korisnik", Korisnik, "Korisnik");