// All the javaScript code is written here

let calculate = function calculator(){
    let x,y,z,c,n,m;
    x=parseFloat(document.getElementById("number1").value);
    y=parseFloat(document.getElementById("number2").value);
    z=parseFloat(document.getElementById("number3").value);

   c=(12*z);
   y=(y/12/100);
   n=(x*(1+y)*((Math.pow((1+y),c))-1)/y);
   m=Math.round(n);
   document.getElementById("number4").value=m+".00"; 
    
}

let btn = document.querySelector("#btn");

btn.addEventListener("click",calculate);   

