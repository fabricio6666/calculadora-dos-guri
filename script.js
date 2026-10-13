// Pegando os elementos do HTML
const botoes = document.querySelectorAll("button");
const operacao = document.getElementById("operacao");
const resultado = document.getElementById("resultado");


// Variáveis da calculadora
let valorAtual = "";
let valorAnterior = "";
let operador = "";


// Percorre todos os botões
botoes.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const valor = botao.textContent;

        // Números
        if (!isNaN(valor) || valor === ",") {
            adicionarNumero(valor);
        }

        // Operadores
        else if (
            valor === "+" ||
            valor === "−" ||
            valor === "×" ||
            valor === "÷" ||
            valor === "%"
        ) {
            escolherOperador(valor);
        }

        // Igual
        else if (valor === "=") {
            calcular();
        }

        // Limpar
        else if (valor === "C") {
            limpar();
        }

        // Apagar
        else if (valor === "⌫") {
            apagar();
        }

    });

});


// Adiciona número ao display
function adicionarNumero(numero) {

    if (numero === "," && valorAtual.includes(",")) {
        return;
    }

    valorAtual += numero;

    resultado.textContent = valorAtual;
}


// Escolhe o operador
function escolherOperador(novoOperador) {

    if (valorAtual === "") {
        return;
    }

    valorAnterior = valorAtual;

    valorAtual = "";

    operador = novoOperador;

    operacao.textContent =
        valorAnterior + " " + operador;
}


// Faz a conta
function calcular() {

    if (
        valorAnterior === "" ||
        valorAtual === "" ||
        operador === ""
    ) {
        return;
    }


    // Converte vírgula para ponto
    const numero1 = Number(
        valorAnterior.replace(",", ".")
    );

    const numero2 = Number(
        valorAtual.replace(",", ".")
    );


    let resultadoFinal;


    // Decide qual operação fazer
    switch (operador) {

        case "+":
            resultadoFinal = numero1 + numero2;
            break;

        case "−":
            resultadoFinal = numero1 - numero2;
            break;

        case "×":
            resultadoFinal = numero1 * numero2;
            break;

        case "÷":

            if (numero2 === 0) {
                resultado.textContent = "Erro";
                return;
            }

            resultadoFinal = numero1 / numero2;
            break;

        case "%":
            resultadoFinal = numero1 * (numero2 / 100);
            break;
    }


    // Mostra a conta completa
    operacao.textContent =
        valorAnterior +
        " " +
        operador +
        " " +
        valorAtual;


    // Mostra o resultado
    resultado.textContent =
        resultadoFinal.toString().replace(".", ",");


    // Prepara a calculadora para uma nova operação
    valorAtual = resultadoFinal
        .toString()
        .replace(".", ",");

    valorAnterior = "";

    operador = "";
}


// Limpa tudo
function limpar() {

    valorAtual = "";

    valorAnterior = "";

    operador = "";

    operacao.textContent = "0";

    resultado.textContent = "0";
}


// Apaga o último número
function apagar() {

    valorAtual = valorAtual.slice(0, -1);

    if (valorAtual === "") {
        resultado.textContent = "0";
    } else {
        resultado.textContent = valorAtual;
    }
}


/* CONTROLE PELO TECLADO */

document.addEventListener("keydown", function (evento) {

    const tecla = evento.key;

    let botaoAlvo = null;

    // Números
    if (tecla >= "0" && tecla <= "9") {
        botaoAlvo = tecla;
    }

    // Operações
    else if (tecla === "+") {
        botaoAlvo = "+";
    }
    else if (tecla === "-") {
        botaoAlvo = "−";
    }
    else if (tecla === "*") {
        botaoAlvo = "×";
    }
    else if (tecla === "/") {
        botaoAlvo = "÷";
    }
    else if (tecla === "%") {
        botaoAlvo = "%";
    }

    // Decimal
    else if (tecla === "," || tecla === ".") {
        botaoAlvo = ",";
    }

    // Calcular
    else if (tecla === "Enter" || tecla === "=") {
        evento.preventDefault();
        botaoAlvo = "=";
    }

    // Apagar
    else if (tecla === "Backspace") {
        botaoAlvo = "⌫";
    }

    // Limpar
    else if (tecla === "Escape") {
        botaoAlvo = "C";
    }

    // Aciona o botão correspondente
    if (botaoAlvo !== null) {
        const botoes = document.querySelectorAll(".botoes button");

        for (const botao of botoes) {
            if (botao.textContent.trim() === botaoAlvo) {
                botao.click();
                break;
            }
        }
    }

});

// Fecha a introdução e revela a calculadora

setTimeout(function () {
    const intro = document.getElementById("intro");

    intro.classList.add("saindo");

    setTimeout(function () {
        intro.remove();
    }, 700);

}, 2200);