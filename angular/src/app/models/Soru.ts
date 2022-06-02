export class Soru{
  static soruId(soruId: any): HTMLCollectionOf<HTMLElement> {
    throw new Error('Method not implemented.');
  }
    SoruId:number;
    soru1:string;
    oA:string;
    oB:string;
    oC:string;
    oD:string;
    ans:string;
    UyeId: number;
    uyeKadi: string;
  islem: boolean;
  cevaplandi:boolean = false;
  cevap:boolean;
}