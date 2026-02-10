import { Product } from "./Product";
import { ProductType } from "../util/ProductType";

export class Peripheral extends Product {

  private _brand!: string;
  private _connectionType!: string;

  constructor(id: number, name: string, type: ProductType, price: number, brand: string, connectionType: string) {
    super(id, name, type, price);
    this.brand = brand;
    this.connectionType = connectionType;
  }

  public get connectionType(): string {
    return this._connectionType;
  }

  public set connectionType(value: string) {
    const allowedConnections = ["USB", "Bluetooth", "Wireless", "P2", "USB-C"];

    if (!allowedConnections.includes(value.trim())) {
      throw new Error(`Conexão inválida! Escolha entre: ${allowedConnections.join(", ")}`);
    }

    this._connectionType = value;
  }

  public get brand(): string {
    return this._brand;
  }

  public set brand(value: string) {
    this._brand = value;
  }

  public view(): void {
    super.view();
    console.log(`Marca: ${this._brand}`);
    console.log(`Tipo de conexão: ${this._connectionType}`);
    console.log("*****************************************************\n");
  }
}