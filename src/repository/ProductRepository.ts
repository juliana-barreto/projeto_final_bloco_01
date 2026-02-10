import { Product } from "../model/Product";

export interface ProductRepository {
  listAll(): void;
  listByID(id: number): void;
  register(product: Product): void;
  update(product: Product): void;
  delete(id: number): void;
}