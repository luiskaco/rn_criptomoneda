console.log("hola")

document.querySelector("#input_1_15").addEventListener('keypress', numero);

function numero(event){
        console.log(event.keyCode);
    
     if((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !==190  && event.keyCode !==110 && event.keyCode !==8 && event.keyCode !==9  ){
            return false;
        }
}