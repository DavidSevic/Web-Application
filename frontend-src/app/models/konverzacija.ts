import { Iznajmljivanje } from "./iznajmljivanje";
import { Kupovina } from "./kupovina";
import { Poruka } from "./poruka";

export class Konverzacija {
    idKor1 : number;
    idKor2 : number;
    idNek : number;

    naslov : string;

    poruke : Poruka[];

    kupovine : Kupovina[];

    iznajmljivanja : Iznajmljivanje[];

    najskorija : string;

    arhivirana : boolean;
}