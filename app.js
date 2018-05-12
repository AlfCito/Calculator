window.onload = function() {

  let preMath = 0;
  let result = 0;
  let operation = '';
  let chain = false;
  let firstNoneZero = false;

  let alertText = "Digit Limit Met";

  let buttons = document.getElementsByTagName("button");
  let screen = document.getElementById("screen");
  let subscreen = document.getElementById("subscreen");

  for(var x=0; x < buttons.length; x++){
    buttons[x].addEventListener("click", function (e){
      getData(this.value);
    });
  }

  let getData = (value) => {

    if(value === '/' || value === 'x' || value === '+' || value === '-'){
      addOperator(value);
    }else if(value === 'CE'){
      clearLast();
    }else if(value === 'C'){
      clear();
    }else if(value === 's'){
      signChange();
    }else if(value === '='){
      calculate(preMath);
    }else{
      createNumber(value);      
    }

  }

  //create numbers
  let createNumber = (value) => {

    //if number dont excede the available space
    if(screen.innerHTML.length < 15){

      // if the display is in 0
      if(screen.innerHTML === '0'){

        if(subscreen.innerHTML === alertText){
          subscreen.innerHTML = '';
        }

        //if input is going to be with decimal point
        if(value === '.'){
          // keep the 0 and .
          screen.innerHTML = '0' + value;
        }else{ //if is not decimal
          //replace the 0, this becomes the new first no zero
          screen.innerHTML = value;
        }

      }else{  //if the display is not in 0

        if(subscreen.innerHTML === alertText){
          subscreen.innerHTML = '';
        }

        //is value ia a new first number 
        if(firstNoneZero === true){ 
          //replace the current number
          screen.innerHTML = value;
          // after replacing the first number remove the state to keep adding characters
          chain = false;
          firstNoneZero = false;
        }else{  //if is not the first number

          if(value === '.'){

            let counter = 0;
            for(let i = 0; i < screen.innerHTML; i++){
              if( screen.innerHTML[i] === '.'){
                counter++;
              }
            }

            if(counter < 1){
              screen.innerHTML += value;
            }

          }else{
            //keep adding number characters
            screen.innerHTML += value;
          }       
          
        }      

      }

    }
    
  }

  // add math operator
  let addOperator = (value) => {

    // => user has NOT input any number => user is just presing the operations btns
    if(chain === true){      

      if(subscreen.innerHTML === ''){
        subscreen.innerHTML += screen.innerHTML + ' ' + value + ' '; 
        //prepare for a chained operation (adding more numbers and signs)
        chain = true; 
        //set ready for new number
        firstNoneZero = true;
        // set the value of the operation to use in preCalculus
        if(operation === ''){
          //if the value of operation was reseted by the = operation; set it to the new value
          operation = value;
        }      
        //calculate and temporary store the results of the subscreen operations     
        preCalculus();
      }else if(subscreen.innerHTML === alertText){
          subscreen.innerHTML = '';
      }else{
        //remove the last 2 characters 
        subscreen.innerHTML = subscreen.innerHTML.slice(0, -2) + value + ' ';
      }
          
    }else{  // chain === false => user has input some number
      // add the number and the sign of the operation to the subscreen
      subscreen.innerHTML += screen.innerHTML + ' ' + value + ' ';  
      //prepare for a chained operation (adding more numbers and signs)
      chain = true; 
      //set ready for new number
      firstNoneZero = true;
      // set the value of the operation to use in preCalculus
      if(operation === ''){
        //if the value of operation was reseted by the = operation; set it to the new value
        operation = value;
      }      
      //calculate and temporary store the results of the subscreen operations     
      preCalculus();
    }
    // set the value of the current operation
    operation = value;    

  }

  //Calculate value of substring elements
  let preCalculus = () => {
    //get the current display number
    let displayNum = Number(screen.innerHTML);
    // if user haven't input any number
    if(preMath === 0){
      //leave the 0 in the display
      preMath = displayNum;
    }else if(preMath !== 0){ //if the user enter some input
      // calculate and store 
      preMath = doMath(preMath, displayNum);
    }

    //set the amount of decimal points
    let pres = 14 - preMath.toString().indexOf('.');  
    // round the result and display it on the screen  
    screen.innerHTML = round(preMath, pres);
  }

  //Calculate the final result
  let calculate = (numMemory) =>{
    //get the current display number
    let display = Number(screen.innerHTML);
    // calculate the result
    result = doMath(numMemory, display);    

    //set the amount of decimal points
    let pres = 14 - result.toString().indexOf('.'); 
    // round the result and display it on the screen 
    let roundResult = round(result, pres).toString();  
/*
    screen.innerHTML = roundResult;
    //since is the final result erase the subscreen display
    subscreen.innerHTML = '';
*/

    if(roundResult.length <= 14){
      screen.innerHTML = roundResult;
      //since is the final result erase the subscreen display
      subscreen.innerHTML = '';
    }else{

      if(roundResult.indexOf('e') !== -1){
        clear();
        subscreen.innerHTML = alertText;
      }else{
        screen.innerHTML = roundResult.slice(0, 14);
        subscreen.innerHTML = '';
      }
    }
    

    
    //and reset the variables
    preMath = 0;
    result = 0;
    operation = '';
    // be prepare for chained values
    chain = true;
    // be prepare for next number to be the first none zero
    firstNoneZero = true;
  }

  //do mathematical operations
  let doMath = (numA, displayNum) => { 

    if(operation === '/'){
      return numA / displayNum;
    }
    if(operation === 'x'){
      return numA * displayNum;
    }
    if(operation === '+'){
      return numA + displayNum;
    }
    if(operation === '-'){
      return numA - displayNum;
    }
  }

  let signChange = () => {

    let temp;
    if(screen.innerHTML !== '0'){

      if(screen.innerHTML[0] !== '-'){
        temp = '-' + screen.innerHTML;
      }else{
       temp = screen.innerHTML.substr(1);
      }
      screen.innerHTML = temp;

    }
  }

  let clearLast = () => {
    screen.innerHTML = '0';
  }

  let clear = () => {
    preMath = 0;
    result = 0;
    operation = '';
    chain = false;
    firstNoneZero = false;
    screen.innerHTML = '0';
    subscreen.innerHTML = '';
  }

  //round function
  function round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }

}


