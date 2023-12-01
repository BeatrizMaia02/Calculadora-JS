const display= document.querySelector("#displayInput");
const botaoIgual = document.querySelector(".igual");
const botaoPonto = document.querySelector(".ponto");
const botaoNumeros = document.querySelectorAll(".num");
const botaoOperadores = document.querySelectorAll(".operador");

//Variaveis globais
let operacaoAtual="";
let valorAnterior="";
let operador=null;
let calculando=false;

//Funções
function atualizaDisplay(){
    display.value = operacaoAtual;
}

function insereNumero(evento){
    if(calculando){
       operacaoAtual = evento.target.textContent;
       calculando = false;
    }else{
        operacaoAtual += evento.target.textContent;
    }
    atualizaDisplay();
}

function inserePonto(){
    if(operacaoAtual.indexOf(".") === -1){
        operacaoAtual += ".";
        atualizaDisplay();
    }
}

function insereOperador(evento){
    if(operacaoAtual !== ""){
        if(!calculando){
            if(operador !== null){
               calcuula();
            }
            valorAnterior = operacaoAtual;
            operacaoAtual = "";
          }
            operador = evento.target.textContent;
     }
}

function calcula(){
    let resultado= null;
    const operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);

    switch(operador){
        case "+":
            resultado = operandoAnterior + operandoAtual;
            break;
        case "-":
            resultado = operandoAnterior - operandoAtual;
            break;
        case "*":
            resultado = operandoAnterior * operandoAtual;
            break;
        case "/":
            resultado = operandoAnterior / operandoAtual;
            break;
        default:
            return;
    }

    operacaoAtual = String(resultado);
    valorAnterior=operacaoAtual;
    calculando=true;
    atualizaDisplay();
}


//Eventos
botaoNumeros.forEach(botao => botao.addEventListener("click", insereNumero));
botaoPonto.addEventListener("click", inserePonto);
botaoOperadores.forEach((botao) => botao.addEventListener("click", insereOperador));
botaoIgual.addEventListener("click", calcula);