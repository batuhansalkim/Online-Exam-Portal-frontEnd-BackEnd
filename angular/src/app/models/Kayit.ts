import { Ders } from "./Ders";
import { Ogrenci } from "./Ogrenci";


export class Kayit{
  kayitId: number;
  kayitDersId: number;
  kayitOgrId: number;
  
  ogrBilgi: Ogrenci;
  dersBilgi: Ders;
}