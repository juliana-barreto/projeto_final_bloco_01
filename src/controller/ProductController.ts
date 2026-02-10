import { Product } from "../model/Product";
import { ProductRepository } from "../repository/ProductRepository";
import { Colors } from "../util/Colors";

export class ProductController implements ProductRepository {

  private products: Map<number, Product> = new Map<number, Product>();

  // Contador de IDs
  public id: number = 0;

  // Implementação dos Métodos do CRUD 

  listAll(): void {
    console.log(Colors.fg.cyan, "\n--- Listagem de Produtos ---", Colors.reset);
    this.products.forEach(product => product.view());
  }

  listByID(id: number): void {
    const product = this.products.get(id);

    if (product !== undefined) {
      product.view();
    } else {
      console.log(Colors.fg.red, `\nO Produto com ID ${id} não foi encontrado!`, Colors.reset);
    }
  }

  register(product: Product): void {

    if (this.products.has(product.id)) {
      console.log(Colors.fg.red, `\nO Produto com ID ${product.id} já existe!`, Colors.reset);
      return;
    }

    this.products.set(product.id, product);
    console.log(Colors.fg.green, `\nO Produto "${product.name}" foi cadastrado com sucesso!`, Colors.reset);
  }

  update(product: Product): void {

    if (this.products.has(product.id)) {
      this.products.set(product.id, product);
      console.log(Colors.fg.green, `\nO Produto "${product.name}" foi atualizado com sucesso!`, Colors.reset);
    } else {
      console.log(Colors.fg.red, "\nProduto não encontrado para atualização!", Colors.reset);
    }
  }

  delete(id: number): void {

    if (this.products.delete(id)) {
      console.log(Colors.fg.green, "\nProduto deletado com sucesso!", Colors.reset);
    } else {
      console.log(Colors.fg.red, "\nProduto não encontrado para exclusão!", Colors.reset);
    }
  }

  // Gera IDs sequenciais automaticamente
  public generateId(): number {
    return ++this.id;
  }

  // Método auxiliar caso o Menu precise buscar um objeto sem exibir
  public findProductById(id: number): Product | null {
    return this.products.get(id) || null;
  }

}