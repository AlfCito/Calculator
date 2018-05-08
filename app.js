window.onload = function() {

  let buttons = document.getElementsByTagName("button");
  let screen = document.getElementById("screen");
  let subscreen = document.getElementById("subscreen");

  for(var x=0; x < buttons.length; x++){
    buttons[x].addEventListener("click", function (e){
      getData(this.value);
    });
  }

  let numberA = '';
  let numberB = '';
  let firstNum = true;
  let operation = '';
  let result;


  let getData = (value) => {
   
    if( 
      value !== 'CE' && 
      value !== 'C' && 
      value !== 'e' && 
      value !== '/' && 
      value !== 'x' && 
      value !== '+' &&
      value !== '-' &&
      value !== '='
      )
    { // if user input is a number

      if(firstNum){

        if(numberA !== '0'){

          if(numberA.length < 15){

            /*
            if(numberA.length === 3){
              let preStrA = numberA.substring(0, 1);
              let preStrB = numberA.substring(1, numberA.length);
              numberA = preStrA + ',' + preStrB;

            }*/
            numberA += value;
            
          }
          
        }else{
          numberA = value;
        }        
        screen.innerHTML = numberA;

      }else{

        if(numberB !== '0'){
          if(numberB.length < 15){
            numberB += value;
          }
        }else{
          numberB = value;
        } 
        screen.innerHTML = numberB;

      }

    }else if( value === 'CE'){ // else if is CE

      if(!firstNum){

        numberA = '';
        numberB = '';
        operation = '';
        firstNum = true;
        result = 0;
        screen.innerHTML = '0';
        subscreen.innerHTML = '';

      }else{

        numberB = '0';
        screen.innerHTML = '0';
      }

    }else if(value === 'C'){ // else if is C

      numberA = '';
      numberB = '';
      operation = '';
      firstNum = true;
      result = 0;
      screen.innerHTML = '0';
      subscreen.innerHTML = '';

    }else if ( value === 'e'){ // else if is e for sign change

      let temp = '';
      if(firstNum){

        if(numberA !== ''){
          let temp = "-"+ numberA
          numberA = temp;
          screen.innerHTML = temp;
        }

      }else{

        if(numberB !== ''){
          let temp = "-"+ numberB
          numberB = temp;
          screen.innerHTML = temp;
        }
      }

    }else if(value === '=' && numberB !== ''){ // else if is iqual

      doMath();

    }else{  // else if is a mathematical operator

      if(numberA === ''){
        subscreen.innerHTML = '0 '+value;
      }else{
        subscreen.innerHTML = numberA + ' ' + value;
      }
      operation = value;
      firstNum = false;
    }

  }

  let doMath = () => {

    subscreen.innerHTML = '';

    let numA = Number(numberA);
    let numB = Number(numberB);

    if(operation === '/'){

      result = numA / numB;

    }else if(operation === 'x'){

      result = numA * numB;

    }else if(operation === '+'){

      result = numA + numB;

    }else if(operation === '-'){

      result = numA - numB;

    }

    numberA = result.toString();
    numberB = '';
    operation = '';
    firstNum = false;
    screen.innerHTML = result;

  }


}
