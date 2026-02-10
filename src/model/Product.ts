import { Colors } from '../util/Colors';
import { formatCurrency } from '../util/Currency';
import { ProductType } from '../util/ProductType';

export abstract class Product {

  private _id!: number;
  private _name!: string;
  private _type!: ProductType;
  private _price!: number;

  constructor(id: number, name: string, type: ProductType, price: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
  }

  public get id(): number {
    return this._id;
  }
  
  public set id(value: number) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    if (value.trim() === '') {
      throw new Error('O nome do produto não pode ser vazio.');
    }
    this._name = value;
  }

  public get type(): ProductType {
    return this._type;
  }

  public set type(value: ProductType) {
    const isValid = Object.values(ProductType).includes(value);

    if (!isValid) {
      throw new Error('Tipo de produto inválido. O valor deve corresponder a um tipo existente no catálogo.');
    }

    this._type = value;
  }

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    if (value < 0) {
      throw new Error('O preço do produto não pode ser negativo.');
    }
    this._price = value;
  }

  public view(): void {
    let type: string = '';

    switch (this._type) {
      case ProductType.GAME:
        type = 'Jogo';
        break;
      case ProductType.CONSOLE:
        type = 'Console';
        break;
      case ProductType.PERIPHERAL:
        type = 'Periférico';
        break;
    }

    console.log(Colors.fg.cyanstrong, '\n*****************************************************', Colors.reset);
    console.log('                    DADOS DO PRODUTO                     ');
    console.log(Colors.fg.cyanstrong, '*****************************************************', Colors.reset);
    console.log(`ID: ${this._id}`);
    console.log(`Nome: ${this._name}`);
    console.log(`Tipo: ${type}`);
    console.log(`Preço: ${formatCurrency(this._price)}`);
  }
}