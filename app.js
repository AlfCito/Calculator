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
    currentNumber : '',  
    previousNumber : '',  
    substring : [],
    result : 0,
    finished : false,
  }


  let getData = (value) => {   
    if( value === 'x' || value === '/' || value === '+' || value === '-'|| value === '='){ // if is a mathematical operator
      operation(value);
    }else if( value === 'CE'){ // else if is CE
      resetLast();
    }else if(value === 'C'){ // else if is C
      resetAll();
    }else if ( value === 's'){ // else if is s for sign change
      switchSign();
    }else{  // else if user input is a number 
      createNumber(value);
    }
  }

  let switchSign = () => {

    let temp;

    if(data.currentNumber[0] !== '-'){
      temp = '-' + data.currentNumber;
    }else{
      temp = data.currentNumber.substr(1);
    }      

    screen.innerHTML = temp
    data.currentNumber = temp;

  }

  let createNumber = (val) => {


    if(data.finished === true){  
      data.currentNumber = '';  
      data.finished = false;
    }

    if(data.currentNumber.length < 12){
      data.currentNumber += val;         
    }

    screen.innerHTML = data.currentNumber;
    //screen.innerHTML = formatNumber(data.currentNumber);   

  }

  // Try to implement this function in all the displays, including the subscreen
  let formatNumber = (num) => {

    let displayNum;
    let x = num;

    if(data.currentNumber.length > 9){     
      displayNum = x.slice(0, 3) + "," + x.slice(3, 6) + "," + x.slice(6, 9) + "," + x.slice(9, 14);  
      return displayNum;   
    }else if(data.currentNumber.length > 6){   
      displayNum = x.slice(0, 3) + "," + x.slice(3, 6) + "," + x.slice(6, 9);      
      return displayNum; 
    }else if(data.currentNumber.length > 3){  
      displayNum = x.slice(0, 3) + "," + x.slice(3, 6); 
      return displayNum;        
    }else{
      return x;
    }

  }

  let getNum = (num) => {
    let numArr = data[num];
    if(numArr === ''){ numArr = '0'};
    return numArr;
  }


  let operation = (val) => {

    data.substring.push(getNum('currentNumber'), val);    
    data.previousNumber = data.currentNumber;
    data.currentNumber = '';
    subscreen.innerHTML = data.substring.join(' ');  

    doMath(val);  
    
  }

  let doMath = (val) => {

    let currentOperation = data.substring[data.substring.length-3];

    if(!currentOperation){
      currentOperation = '+';
    }
    
    let numA = data.result;
    let numB = Number(getNum('previousNumber'));
    let myResult;

    //console.log('numA');
    //console.log(numA);
    //console.log('currentOperation');
    //console.log(currentOperation);
    //console.log('numB');
    //console.log(numB);

    if(currentOperation === '/'){

      myResult = numA / numB;

    }else if(currentOperation === 'x'){

      myResult = numA * numB;

    }else if(currentOperation === '+'){

      myResult = numA + numB;

    }else if(currentOperation === '-'){

      myResult = numA - numB;

    }

    data.result = round(myResult, 10);
    
    //console.log('result');
    //console.log(data.result);

    screen.innerHTML = data.result;

    //console.log('-----------------------');

    if(val === '='){
      subscreen.innerHTML = '';
      data.currentNumber = data.result; 
      data.previousNumber = '';
      data.substring = [];
      data.result = 0;
      data.finished = true;

      //console.log('previousNumber');
      //console.log(data.previousNumber);
      //console.log('result');
      //console.log(data.result);
      //console.log('substring');
      //console.log(data.substring);
    }

  }

  let resetAll = () => { // for C

    data.currentNumber = '';
    data.previousNumber = '';
    data.substring = [];
    data.result = 0;
    screen.innerHTML = '0';
    subscreen.innerHTML = '';

  }

  let resetLast = (num) => {
    screen.innerHTML = '0';
    data.currentNumber = '';
  }

  function round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }


}



/*
TO DO:
- negative empty number returns NaN
- dont display zero as the first number (s)
- Add comas to the display
- Check all the functionality
*/

