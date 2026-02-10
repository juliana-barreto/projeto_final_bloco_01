import { Product } from "./Product";
import { ProductType } from "../util/ProductType";

export class Game extends Product {

  private _genre!: string;
  private _developer!: string;

  constructor(id: number, name: string, type: ProductType, price: number, genre: string, developer: string) {
    super(id, name, type, price);
    this.genre = genre;
    this.developer = developer;
  }

  public get genre(): string {
    return this._genre;
  }

  public set genre(value: string) {
    if (value.trim() === '') {
      throw new Error('O gênero do jogo não pode ser vazio.');
    }
    this._genre = value;
  }

  public get developer(): string {
    return this._developer;
  }
  
  public set developer(value: string) {
    if (value.trim() === '') {
      throw new Error('A desenvolvedora do jogo não pode ser vazia.');
    }
    this._developer = value;
  }

  public view(): void {
    super.view();
    console.log(`Gênero: ${this._genre}`);
    console.log(`Desenvolvedora: ${this._developer}`);
    console.log("*****************************************************\n");
  }
}