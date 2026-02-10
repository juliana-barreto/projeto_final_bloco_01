import { Product } from "./Product";
import { ProductType } from "../util/ProductType";

export class Console extends Product {

  private _brand!: string;
  private _storage!: number;

  constructor(id: number, name: string, type: ProductType, price: number, storage: number, brand: string) {
    super(id, name, type, price);
    this.storage = storage;
    this.brand = brand;
  }

  public get brand(): string {
    return this._brand;
  }

  public set brand(value: string) {
    this._brand = value;
  }

  public get storage(): number {
    return this._storage;
  }

  public set storage(value: number) {
    const validSizes = [500, 1024, 2048];

    if (!validSizes.includes(value)) {
      throw new Error("Capacidade de armazenamento inválida. Use 500, 1024 (1TB) ou 2048 (2TB).");
    }
    this._storage = value;
  }

  public view(): void {
    super.view();

    let storageDisplay: string;
    if (this._storage >= 1024) {
      storageDisplay = (this._storage / 1024) + " TB";
    } else {
      storageDisplay = this._storage + " GB";
    }

    console.log(`Marca: ${this._brand}`);
    console.log(`Armazenamento: ${storageDisplay}`);
    console.log("*****************************************************\n");
  }
}