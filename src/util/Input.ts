import * as iconv from 'iconv-lite'

/**
 * Classe Input - Solução para leitura de caracteres acentuados com o readline-sync no Windows
 *
 * 🔴 PROBLEMA:
 * - No Windows, o console usa a codificação CP850 (não UTF-8)
 * - Quando você digita "João", o console envia bytes em CP850
 * - O Node.js interpreta como UTF-8 e fica "Joo" (perde os acentos)
 *
 * ✅ SOLUÇÃO:
 * - Esta classe converte automaticamente CP850 → UTF-8
 * - Você digita "João" e a variável recebe "João" corretamente!
 */
export class Input {
	/** Indica se o encoding já foi detectado (detecta apenas uma vez) */
	private static configured = false

	/** Armazena o encoding do console (cp850, cp1252 ou utf8) */
	private static consoleEncoding: string = 'cp850'

	/**
	 * 🔍 Detecta qual encoding o console do Windows está usando
	 */
	private static detectEncoding(): void {
		if (this.configured) return

		if (process.platform === 'win32') {
			try {
				const { execSync } = require('child_process')
				const result = execSync('chcp', {
					encoding: 'utf8',
				}).toString()

				const match = result.match(/\d+/)

				if (match) {
					const codePage = match[0]
					this.consoleEncoding =
						codePage === '65001'
							? 'utf8'
							: codePage === '850'
								? 'cp850'
								: codePage === '1252'
									? 'cp1252'
									: `cp${codePage}`
				}
			} catch (error) {
				this.consoleEncoding = 'cp850'
			}
		} else {
			this.consoleEncoding = 'utf8'
		}

		this.configured = true
	}

	/**
	 * 🔧 Converte uma string UTF-8 para o encoding do console
	 */
	private static convertToConsole(text: string): string {
		const buffer = iconv.encode(text, this.consoleEncoding)
		return buffer.toString('binary')
	}

	/**
	 * 🔧 Converte bytes do console para UTF-8
	 */
	private static convertFromConsole(rawText: string): string {
		const buffer = Buffer.from(rawText, 'binary')
		return iconv.decode(buffer, this.consoleEncoding)
	}

	/**
	 * 🔧 Prepara as configurações para uso com readline-sync
	 */
	private static prepareConfig(config?: any): any {
		this.detectEncoding()

		let finalConfig: any = {
			encoding: 'binary',
			...config,
		}

		// Converte defaultInput se existir
		if (config?.defaultInput !== undefined) {
			finalConfig.defaultInput = this.convertToConsole(String(config.defaultInput))
		}

		// Converte limitMessage se existir
		if (config?.limitMessage) {
			finalConfig.limitMessage = this.convertToConsole(config.limitMessage)
		}

		return finalConfig
	}

	/**
	 * 📝 Lê uma linha de TEXTO com acentuação correta
	 *
	 * 💡 QUANDO USAR:
	 * - Para ler nomes: "João", "José", "María"
	 * - Para ler endereços: "Rua São Paulo"
	 * - Para ler qualquer texto com acentos
	 *
	 * 📖 EXEMPLOS:
	 * const nome = Input.question('Digite seu nome: ')
	 * const cidade = Input.question('Digite sua cidade: ', { defaultInput: 'São Paulo' })
	 */
	static question(prompt: string, config?: any): string {
		const readlinesync = require('readline-sync')

		const convertedPrompt = this.convertToConsole(prompt)
		const finalConfig = this.prepareConfig(config)

		const rawAnswer = readlinesync.question(convertedPrompt, finalConfig)
		return this.convertFromConsole(rawAnswer)
	}

	/**
	 * 🔢 Lê um número INTEIRO com validação automática (USA O MÉTODO NATIVO!)
	 *
	 * 💡 QUANDO USAR:
	 * - Para idade: 25, 30, 18
	 * - Para quantidade: 5, 10, 100
	 * - Para opções de menu: 1, 2, 3
	 * - Para qualquer número SEM casas decimais
	 *
	 * 📖 EXEMPLOS:
	 * const idade = Input.questionInt('Digite sua idade: ')
	 * const opcao = Input.questionInt('Escolha (1-3): ', { limit: [1, 2, 3] })
	 * const quantidade = Input.questionInt('Quantidade: ', { defaultInput: 1 })
	 *
	 * ✅ VANTAGENS:
	 * - Usa a validação NATIVA do readline-sync
	 * - Suporta limit, limitMessage, defaultInput
	 * - Rejeita automaticamente valores inválidos
	 * - Mensagem de erro padrão em português
	 */
	static questionInt(prompt: string, config?: any): number {
		const readlinesync = require('readline-sync')

		const convertedPrompt = this.convertToConsole(prompt)
		
		// Define a mensagem padrão em português, se não fornecida
		const configWithMessage = {
			limitMessage: 'Digite um número inteiro!',
			...config
		}
		
		const finalConfig = this.prepareConfig(configWithMessage)

		// USA o método nativo questionInt() do readline-sync!
		return readlinesync.questionInt(convertedPrompt, finalConfig)
	}

	/**
	 * 💰 Lê um número DECIMAL com validação automática (USA O MÉTODO NATIVO!)
	 *
	 * 💡 QUANDO USAR:
	 * - Para preço: 19.90, 100.50
	 * - Para altura: 1.75, 1.80
	 * - Para peso: 70.5, 65.3
	 * - Para nota: 8.5, 9.0
	 * - Para qualquer número COM casas decimais
	 *
	 * 📖 EXEMPLOS:
	 * const preco = Input.questionFloat('Digite o preço: ')
	 * const altura = Input.questionFloat('Digite sua altura (m): ', { limit: [1.0, 2.5] })
	 * const nota = Input.questionFloat('Digite a nota: ', { defaultInput: 0.0 })
	 *
	 * ✅ VANTAGENS:
	 * - Usa a validação NATIVA do readline-sync
	 * - Suporta limit, limitMessage, defaultInput
	 * - Aceita tanto inteiros quanto decimais
	 * - Mensagem de erro padrão em português
	 */
	static questionFloat(prompt: string, config?: any): number {
		const readlinesync = require('readline-sync')

		const convertedPrompt = this.convertToConsole(prompt)
		
		// Define a mensagem padrão em português, se não fornecida
		const configWithMessage = {
			limitMessage: 'Digite um número decimal!',
			...config
		}
		
		const finalConfig = this.prepareConfig(configWithMessage)

		// USA o método nativo questionFloat() do readline-sync!
		return readlinesync.questionFloat(convertedPrompt, finalConfig)
	}

	/**
	 * 📋 Exibe um menu de opções para o usuário escolher
	 *
	 * 💡 QUANDO USAR:
	 * - Para menu principal do programa
	 * - Para escolher entre várias opções
	 * - Para campos do tipo SELECT (como em formulários)
	 *
	 * 📖 EXEMPLO:
	 * const opcoes = ['Cadastrar', 'Listar', 'Sair']
	 * const escolha = Input.keyInSelect(opcoes, 'Escolha uma opção: ')
	 *
	 * if (escolha === 0) {
	 *   console.log('Você escolheu Cadastrar')
	 * } else if (escolha === 1) {
	 *   console.log('Você escolheu Listar')
	 * } else if (escolha === 2) {
	 *   console.log('Você escolheu Sair')
	 * } else {
	 *   console.log('Você cancelou') // escolha === -1
	 * }
	 */
	static keyInSelect(options: string[], prompt: string, config?: any): number {
		this.detectEncoding()
		const readlinesync = require('readline-sync')

		const convertedPrompt = this.convertToConsole(prompt)
		const convertedOptions = options.map((option) => this.convertToConsole(option))

		return readlinesync.keyInSelect(convertedOptions, convertedPrompt, config)
	}

	/**
	 * ❓ Faz uma pergunta SIM ou NÃO (modo estrito)
	 *
	 * 💡 QUANDO USAR:
	 * - Para confirmar ações: "Deseja realmente excluir?"
	 * - Para perguntas sim/não: "Você é maior de idade?"
	 * - Quando precisa de uma resposta clara (Y ou N)
	 *
	 * 📖 EXEMPLOS:
	 * const confirmou = Input.keyInYNStrict('Deseja continuar? ')
	 * if (confirmou) {
	 *   console.log('Usuário confirmou!')
	 * } else {
	 *   console.log('Usuário negou!')
	 * }
	 */
	static keyInYNStrict(prompt: string, config?: any): boolean {
		this.detectEncoding()
		const readlinesync = require('readline-sync')

		const convertedPrompt = this.convertToConsole(prompt)
		return readlinesync.keyInYNStrict(convertedPrompt, config)
	}

	/**
	 * ⏸️ Pausa o programa e aguarda o usuário pressionar ENTER
	 *
	 * 💡 QUANDO USAR:
	 * - Para pausar o programa: "Pressione ENTER para continuar..."
	 * - Para o usuário ler mensagens antes de limpar a tela
	 * - Para criar "breakpoints" no fluxo do programa
	 */
	static prompt(): void {
		const readlinesync = require('readline-sync')
		readlinesync.prompt()
	}

	/**
	 * 🔍 Retorna qual encoding está sendo usado
	 *
	 * 💡 QUANDO USAR:
	 * - Para DEBUGAR problemas de acentuação
	 * - Para verificar se está usando UTF-8 ou CP850
	 */
	static getEncoding(): string {
		this.detectEncoding()
		return this.consoleEncoding
	}
}