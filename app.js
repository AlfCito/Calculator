window.onload = function() {

  let buttons = document.getElementsByTagName("button");
  let screen = document.getElementById("screen");
  let subscreen = document.getElementById("subscreen");

  for(var x=0; x < buttons.length; x++){
    buttons[x].addEventListener("click", function (e){
      getData(this.value);
    });
  }

  let data = {    
    numberA : [],
    numberB : [],
    numberC : [],
    operation : '',
    substring : [],
    result : 0,
    temp: 0,
  }

  let state = 'firstNum';

  let updateState = () => {
    if(data.substring.length === 0){
      state = 'firstNum';
    }else if(data.substring.length === 2){
      state = 'secondNum';
    }else if(data.substring.length >= 4){
      state = 'ongoing';
    }
  }

  let getData = (value) => {   
    if( value === 'x' || value === '/' || value === '+' || value === '-'){ // if is a mathematical operator
      operation(value);
    }else if( value === 'CE'){ // else if is CE
      reset();
    }else if(value === 'C'){ // else if is C
      resetAll();
    }else if ( value === 's'){ // else if is s for sign change
      switchSign();
    }else if(value === '='){ // else if is equal
      state = 'finish';
      doMath();
    }else{  // else if user input is a number 
      createNumber(value);
    }
  }

  let switchSign = () => {

    if(state === 'firstNum'){
      if(data.numberA[0] !== '-'){
        data.numberA.unshift('-');
      }else{
        data.numberA.shift();
      }      
    }
    if(state === 'secondNum'){
      if(data.numberB[0] !== '-'){
        data.numberB.unshift('-');
      }else{
        data.numberB.shift();
      }
    }
    if(state === 'ongoing'){
      if(data.numberC[0] !== '-'){
        data.numberC.unshift('-');
      }else{
        data.numberC.shift();
      }
    }
    updateDisplay();

  }

  let createNumber = (val) => {

    if(state === 'firstNum'){
      if(data.numberA.length < 15){
         data.numberA.push(val);       
      } 
    }
    if(state === 'secondNum'){
      if(data.numberB.length < 15){
         data.numberB.push(val);       
      } 
    }
    if(state === 'ongoing'){
      if(data.numberC.length < 15){
         data.numberC.push(val);       
      } 
    }
    updateDisplay();
  }

  let getNum = (num) => {
    let numArr = data[num].join('');
    if(numArr === ''){ numArr = '0'};
    return numArr;
  }

  let updateDisplay = () => {

    let numA = getNum('numberA');
    let numB = getNum('numberB');
    let numC = getNum('numberC');
    let subscreenD = data.substring.join(' ');

    if(state === 'firstNum'){
      screen.innerHTML = numA;
      subscreen.innerHTML = subscreenD;
    }

    if(state === 'secondNum'){
      screen.innerHTML = numB;
      subscreen.innerHTML = subscreenD;
    }

    if(state === 'ongoing'){
      screen.innerHTML = numC;
      subscreen.innerHTML = subscreenD;
    }

    if(state === 'finish'){
      screen.innerHTML = data.result;
      subscreen.innerHTML = '';
      reset();
    }

    updateState();

  } 

  let operation = (val) => {

    data.operation = val;

    if(state === 'firstNum'){
      data.substring.push( getNum('numberA'), val );
    }
    if(state === 'secondNum'){
      data.substring.push( getNum('numberB'), val );
    }
    if(state === 'ongoing'){
      data.substring.push( getNum('numberC'), val );
    }
    if(state === 'finish'){
      data.substring.push( getNum('numberA'), val );
    }
    doMath();
    
  }

  let doMath = () => {

    let numA = Number(getNum('numberA'));
    let numB = Number(getNum('numberB'));

    if(data.operation === '/'){

      data.result = numA / numB;

    }else if(data.operation === 'x'){

      data.result = numA * numB;

    }else if(data.operation === '+'){

      data.result = numA + numB;

    }else if(data.operation === '-'){

      data.result = numA - numB;

    }

    data.temp = data.result;

    updateDisplay();

  }

  let reset = () => { // fore CE
    if(state === 'firstNum'){
      resetAll();
    }
    if(state === 'secondNum'){
      resetLast('numberB');
    } 
    if(state === 'ongoing'){
      resetLast('numberC');
    }
    if(state === 'finish'){
      finish();
    } 
  }

  let resetAll = () => { // for C
    data.numberA = [];
    data.numberB = [];
    data.numberC = [];
    data.substring = [];
    updateState();
    updateDisplay();
  }

  let resetLast = (num) => {
    data[num] = [];
    updateState();
    updateDisplay();
  }

  let finish = () => {
    data.numberA = [];
    data.numberA.push(data.result);
    data.numberB = [];
    data.numberC = [];
    data.substring = [];
    updateState();
    updateDisplay();
  }

}



/*
TO DO:
- Star a new number after equal
- Make a new number after equal if a number is pressed; if an operator is pressed continue ( is working )
- Make it work with more than two numbers
- Add comas to the display
- Check all the functionality
*/

