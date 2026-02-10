import { Colors } from './util/Colors';
import { Input } from './util/Input';

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
        option = Input.questionInt("");

        if (option == 0) {
            console.log(Colors.fg.greenstrong, "\nPress Start Games");
            about();
            console.log(Colors.reset, "");
            process.exit(0);
        }

        switch (option) {
            case 1:
                console.log(Colors.fg.whitestrong, "\n\nListar todos os Produtos\n\n", Colors.reset);
                keyPress();
                break;
            case 2:
                console.log(Colors.fg.whitestrong, "\n\nListar Produto pelo ID\n\n", Colors.reset);
                keyPress();
                break;
            case 3:
                console.log(Colors.fg.whitestrong, "\n\nCadastrar Produto\n\n", Colors.reset);
                keyPress();
                break;
            case 4:
                console.log(Colors.fg.whitestrong, "\n\nAtualizar Produto\n\n", Colors.reset);
                keyPress();
                break;
            case 5:
                console.log(Colors.fg.whitestrong, "\n\nDeletar Produto\n\n", Colors.reset);
                keyPress();
                break;
            default:
                console.log(Colors.fg.redstrong, "\nOpção Inválida!\n", Colors.reset);
                keyPress();
                break;
        }
    }
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