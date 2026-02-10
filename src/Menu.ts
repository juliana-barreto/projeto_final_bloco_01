import { ProductController } from './controller/ProductController';
import { Game } from './model/Game';
import { Console } from './model/Console';
import { Peripheral } from './model/Peripheral'; 
import { ProductType } from './util/ProductType';
import { Colors } from './util/Colors';
import { Input } from './util/Input';

const productController = new ProductController();

export function main() {

  let option: number;

  while (true) {
    console.log(Colors.bg.black, Colors.fg.magentastrong,
      "*****************************************************");
    console.log("                                                     ");
    console.log("                PRESS START GAMES                    ");
    console.log("                                                     ");
    console.log("*****************************************************");
    console.log(Colors.fg.cyanstrong,
      "            1 - Listar todos os Produtos             ");
    console.log("            2 - Listar Produto pelo ID               ");
    console.log("            3 - Cadastrar Produto                    ");
    console.log("            4 - Atualizar Produto                    ");
    console.log("            5 - Deletar Produto                      ");
    console.log("            0 - Sair                                 ");
    console.log("*****************************************************");
    console.log(Colors.reset, "");

    console.log(Colors.fg.whitestrong, "Entre com a opção desejada: ", Colors.reset);
    try {
      option = Input.questionInt("");

      if (option == 0) {
        console.log(Colors.fg.greenstrong, "\nPress Start Games");
        about();
        console.log(Colors.reset, "");
        process.exit(0);
      }

      switch (option) {
        case 1:
          listAllProducts();
          keyPress();
          break;

        case 2:
          listProductById();
          keyPress();
          break;

        case 3:
          registerProduct();
          keyPress();
          break;

        case 4:
          updateProduct();
          keyPress();
          break;

        case 5:
          deleteProduct();
          keyPress();
          break;

        default:
          console.log(Colors.fg.redstrong, "\nOpção Inválida!\n", Colors.reset);
          keyPress();
          break;
      }
    } catch (error: any) {
      console.log(Colors.fg.redstrong, `\nErro de execução: ${error.message}`, Colors.reset);
      keyPress();
    }
  }
}

function listAllProducts(): void {
  productController.listAll();
}

function listProductById(): void {
  const id = Input.questionInt("Digite o ID do Produto: ");
  productController.listByID(id);
}

function registerProduct(): void {
  console.log(Colors.fg.whitestrong, "\n\nCadastrar Produto\n\n", Colors.reset);

  const name = Input.question("Digite o Nome do Produto: ");

  const options = ['Jogo', 'Console', 'Periférico'];
  const index = Input.keyInSelect(options, "", { cancel: false });
  const type : ProductType = index + 1;

  const price = Input.questionFloat("Digite o preço: ");

  switch (type) {
    case ProductType.GAME:
      const genre = Input.question("Digite o Gênero do Jogo: ");
      const developer = Input.question("Digite a Desenvolvedora: ");
      productController.register(new Game(productController.generateId(), name, type, price, genre, developer));
      break;

    case ProductType.CONSOLE:
      const brandConsole = Input.question("Digite a Marca do Console: ");
      const storage = Input.questionInt("Digite o Armazenamento (500, 1024, 2048): ");
      productController.register(new Console(productController.generateId(), name, type, price, storage, brandConsole));
      break;

    case ProductType.PERIPHERAL:
      const brandPeripheral = Input.question("Digite a Marca do Periférico: ");
      const connectionType = Input.question("Digite o Tipo de Conexão: ");
      productController.register(new Peripheral(productController.generateId(), name, type, price, brandPeripheral, connectionType));
      break;
  }
}

function updateProduct(): void {
  console.log(Colors.fg.whitestrong, "\n\nAtualizar Produto\n\n", Colors.reset);

  const id = Input.questionInt("Digite o ID do Produto: ");
  const product = productController.findProductById(id);

  if (product !== null) {
    const name = Input.question("Digite o Nome do Produto: ", { defaultInput: product.name });
    const price = Input.questionFloat("Digite o preço: ", { defaultInput: product.price });
    const type = product.type;

    switch (type) {
      case ProductType.GAME:
        const game = product as Game;
        const genre = Input.question("Digite o Gênero do Jogo: ", { defaultInput: game.genre });
        const developer = Input.question("Digite a Desenvolvedora: ", { defaultInput: game.developer });
        productController.update(new Game(id, name, type, price, genre, developer));
        break;

      case ProductType.CONSOLE:
        const consoleProd = product as Console;
        const brandConsole = Input.question("Digite a Marca do Console: ", { defaultInput: consoleProd.brand });
        const storage = Input.questionInt("Digite o Armazenamento (500, 1024, 2048): ", { defaultInput: consoleProd.storage });
        productController.update(new Console(id, name, type, price, storage, brandConsole));
        break;

      case ProductType.PERIPHERAL:
        const peripheral = product as Peripheral;
        const brandPeripheral = Input.question("Digite a Marca do Periférico: ", { defaultInput: peripheral.brand });
        const connectionType = Input.question("Digite o Tipo de Conexão: ", { defaultInput: peripheral.connectionType });
        productController.update(new Peripheral(id, name, type, price, brandPeripheral, connectionType));
        break;
    }
  } else {
    console.log(Colors.fg.red, "\nProduto não encontrado!", Colors.reset);
  }
}

function deleteProduct(): void {
  console.log(Colors.fg.whitestrong, "\n\nDeletar Produto\n\n", Colors.reset);
  const id = Input.questionInt("Digite o ID do Produto: ");
  productController.delete(id);
}

export function about(): void {
  console.log(Colors.fg.gray, "\n*****************************************************");
  console.log("Projeto Desenvolvido por: ");
  console.log("Juliana Souza Barreto - barreto.juliana@outlook.com");
  console.log("github.com/juliana-barreto");
  console.log("*****************************************************", Colors.reset);
}

// Função auxiliar para pausar o sistema 
export function keyPress(): void {
  console.log(Colors.reset, "\nPressione enter para continuar...");
  Input.prompt();
}

main();