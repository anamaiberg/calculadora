const numberButtons = document.querySelectorAll("[data-numero]");
const operationButtons = document.querySelectorAll("[data-operador]");
const equalsButton = document.querySelector("[data-igual]");
const deleteButton = document.querySelector("[data-deletar]");
const allClearButton = document.querySelector("[data-limpar-tudo]");
const previousOperandTextElement = document.querySelector("[data-operador-antes]");
const currentOperandTextElement = document.querySelector("[data-operador-agora]");

class Calculadora{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    deletar(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    calcular(){
        let resultado;

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if(isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch(this.operacao){
            case "+":
                resultado = previousOperandFloat + currentOperandFloat;
                break;
            case "-":
                resultado = previousOperandFloat - currentOperandFloat;
                break;
            case "÷":
                resultado = previousOperandFloat / currentOperandFloat;
                break;
            case "x":
                resultado = previousOperandFloat * currentOperandFloat;
                break;
            default:
                return;
        }

        this.currentOperand = resultado;
        this.operacao = undefined;
        this.previousOperand = "";
    }

    escolhaOperacao(operacao){
        if(this.currentOperand == "") return;
        if(this.previousOperand != ""){
            this.calcular()
        }
        this.operacao = operacao;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ""
    }

    appendNumero(numero){
        if (this.currentOperand.includes(".") && numero == ".") return;

        this.currentOperand = `${this.currentOperand}${numero.toString()}`;
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operacao ="";
    }

    updateDisplay(){
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operacao || ""}`;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}

const calculadora = new Calculadora(previousOperandTextElement, currentOperandTextElement);

for (const operationButton of operationButtons){
    operationButton.addEventListener("click", () => {
        calculadora.escolhaOperacao(operationButton.innerText);
        calculadora.updateDisplay();
    })
}

for(const numberButton of numberButtons){
    numberButton.addEventListener("click", () => {
        calculadora.appendNumero(numberButton.innerText);
        calculadora.updateDisplay();
    })
}

allClearButton.addEventListener("click", () => {
    calculadora.clear();
    calculadora.updateDisplay();
})

equalsButton.addEventListener("click", () => {
    calculadora.calcular();
    calculadora.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculadora.deletar();
    calculadora.updateDisplay();
})

