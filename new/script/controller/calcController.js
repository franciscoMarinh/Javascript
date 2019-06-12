class calcController{

  constructor(){
    this._lastOperator = [];
    this._lastNum = '';
    this._lastOperator = '';

    this._operation = [];
    this._displayEl = document.getElementById("display");


    this.initialize();

  }
  setError(){

    this.displayCalc = 'Error';

  }
  set displayCalc(value){

    if (isNaN(value)){
      this.setError();
      return false;
    }

    this._displayEl.innerHTML = value.replace('.',',');

  }
  initialize(){

    this.initKeyboardEvents();
    this.iniButtonsEvents();
    this.setLastNumberToDisplay();

  }

  getLastItem(isOperator = false){

    let lastItem;

    for (let i = this._operation.length - 1; i >= 0; i-- ){

    let value = this._operation[i];

    if (this.isOperator(this._operation[i]) == isOperator) {

      lastItem = this._operation[i];
      break;
    }
  }
    if (!lastItem) {

      lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

  }

  return lastItem;
}

  setLastOperation(value){

    let newValue = value.slice(0,11);

    this._operation[this._operation.length - 1] = newValue;

  }
  setLastNumberToDisplay(){

    if (this._operation.length == 0) {

    }
    let lastNumber =  this.getLastItem(false);

    if (!lastNumber) {

     lastNumber = '0';

    }

    this.displayCalc = lastNumber;

  }

  getResult(){
    try {


      return eval( [parseFloat(this._operation[0]), this._operation[1], parseFloat(this._operation[2])].join(" ") ).toString();

    } catch{

      return this._operation[0];
    }

  }

  calc(){

    let last = '';

    this._lastOperator = this.getLastItem(true);

    if (this._operation.length < 3) {

      let firstNum = this._operation[0];
      this._operation = [firstNum, this._lastOperator, this._lastNum];

    }
    if (this._operation.length > 3) {

      last = this._operation.pop();
      this._lastNum = this.getResult();

    }else if (this._operation.length == 3) {

      this._lastNum = this.getLastItem();

    }

    let result = this.getResult();

    if (last == "%") {

      result /= 100;
      this._operation = [result];

    }
    else {

      this._operation = [result];
      if (last) {

        this._operation.push(last);

      }

    }

    this.setLastNumberToDisplay();
  }
  pushOperation(value){

    this._operation.push(value);

    if (this._operation.length > 3) {

      this.calc();

    }

  }
  clearAll(){

    this._operation = ["0"];
    this._lastNum = '';
    this._lastOperator = '';

    this.setLastNumberToDisplay();
  }
  divisingByOne(){

    let value = this.getLastOperation();

    if (!this.isOperator(value)) {

      this.setLastOperation((1 / value).toFixed(11));

    }

    this.setLastNumberToDisplay();

  }

  addDot(value){

    if(!this.isOperator(this.getLastOperation())){


      if (this.getLastOperation().indexOf(".") == -1) {

        this.setLastOperation(this.getLastOperation()+".");

      }
    }else {

      this._operation.push("0.");

    }

    this.setLastNumberToDisplay();

  }
  getLastOperation(){

    return this._operation[this._operation.length - 1];

  }

  addOperation(value){


    if (isNaN(this.getLastOperation())) {                // Pergunta se o valor passado anteriormente é um número ou Operador, 1° inicialização é undefined array vazio


      if (this.isOperator(value)) {               // pergunta se o argumento passado é um operador, se o anterior for um Operador ele realiza a troca de operador

        this.setLastOperation(value);           // Chama o metode que coloca na mesma posição do array um sinal diferente

      }
      else if (isNaN(value)) {                  // Se não for um operador se sobreviver a todas as outras console.log

      }
      else{

        this.pushOperation(value);          //Primeira inicialização onde o ultimo item passado não existe e é undefined ele inciliaza a primeira posição do array
                                            //Inicializa a terceira posição do array
      }


    }else{                                 // se o ultimo item do array for um número ele cai aqui

      if (this.isOperator(value)) {        // se for passado como parametro um sinal de operação

        this.pushOperation(value);       //push no operador

      }else{
      let newValue = this.getLastOperation() + value;
      this.setLastOperation(newValue.toString()); // pega o ultimo número passado, concatena com o novo e sobrescreve o antigo valor



      }

    }
    this.setLastNumberToDisplay();
  }
  setOperation(newValue){

    this._operation[this._operation.length -1 ] = newValue;

  }
  clearEntry(){

    if ( !this.isOperator(this.getLastOperation()) ) {

      this._operation.pop();

    }

    this.setLastNumberToDisplay();

  }
  backSpace(){

    if ( !this.isOperator(this.getLastOperation()) ) {

      if (this.getLastOperation().length > 0) {

      let newValue = this.getLastOperation();

      this.setLastOperation(newValue.slice(0, newValue.length-1 ));
    }

  }
    if (this.getLastOperation() == '') {

      this.setLastOperation("0");

    }
    this.setLastNumberToDisplay();

  }
  squareRise(){

    let lastOperation = this.getLastOperation();

    if (!this.isOperator(lastOperation)) {

        this.setLastOperation((lastOperation * lastOperation).toString());
    }

        this.setLastNumberToDisplay();
  }
  squareRoot(){

      let lastOperation = Math.sqrt(this.getLastOperation());

      if (!this.isOperator(lastOperation)) {

        this.setLastOperation(lastOperation.toString());
      }

        this.setLastNumberToDisplay();
  }


  execBtn(value){

    switch (value) {

      case "+":
      this.addOperation('+');
      break;
      case "-":
      this.addOperation('-');
      break;
      case "X":
      this.addOperation('*');
      break;
      case "÷":
      this.addOperation('/');
      break;
      case "=":
      this.calc();
      break;
      case "±":
      this.numberOperator();
      break;
      case ',':
      this.addDot('.');
      break;
      case '%':
      this.addOperation('%');
      break;
      case '←':
      this.backSpace("");
      break;
      case 'C':
      this.clearAll();
      break;
      case 'CE':
      this.clearEntry();
      break;
      case 'x²':
      this.squareRise();
      break;
      case '√':
      this.squareRoot();
      break;
      case '¹/x':
      this.divisingByOne();
      break;


      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":

      this.addOperation(value);
        break;
      default:

    }

  }
  execKey(value){

    switch (value) {

      case "+":
      this.addOperation('+');
      break;
      case "-":
      this.addOperation('-');
      break;
      case "*":
      this.addOperation('*');
      break;
      case "÷":
      case "/":
      this.addOperation('/');
      break;

      case "=":
      case "Enter":
      this.calc();
      break;

      break;
      case ',':
      case '.':

      this.addDot('.');
      break;
      case '%':
      this.pushOperation('%');
      break;
      case 'Backspace':
      this.backSpace("");
      break;
      case 'c':
      this.clearAll();
      break;
      case 'CE':
      this.clearEntry();
      break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":

      this.addOperation(value);
        break;
      default:


  }
}
  numberOperator(){

    if (!this.isOperator(this.getLastItem())){

      let value = this.getLastItem();

      if (value < 0) {

        this.setLastOperation(value.replace("-",""));
        this.setLastNumberToDisplay();

    }else if (value > 0){

      this.setLastOperation("-"+value);
      this.setLastNumberToDisplay();
      }
    }

  }

  isOperator(value){

    return (['+','-','*','%',"/"].indexOf(value) > -1);

  }

  iniButtonsEvents(){

    document.querySelectorAll("button").forEach(btn=>{

      this.addEventListenerAll(btn,'click drag', e=>{

        this.execBtn(btn.innerHTML);

      });

    });



  }
  initKeyboardEvents(){

    document.addEventListener("keyup", e=>{

      this.execKey(e.key);

    });

  }
  addEventListenerAll(element, events, fn){

    events.split(" ").forEach(event=>{

      element.addEventListener(event, fn, false);

    });

  }


}
