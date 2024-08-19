let btn = document.querySelector("#btn");

btn.addEventListener("click",function calculator(){
    let x,y,z,c;
    x=document.getElementById("number1").value;
    y=document.getElementById("num").value;
    z=document.getElementById("number2").value;
   if(y== "+")
       {
         c=parseInt(x)+parseInt(z);    
         document.getElementById("number3").value=c;    
       }
   else if(y== "-")
       {
         c=parseInt(x)-parseInt(z);    
         document.getElementById("number3").value=c;    
       }
     else if(y== "*")
       {
         c=parseInt(x)*parseInt(z);    
         document.getElementById("number3").value=c;   
       }
     else if(y== "/")
       {
         c=parseInt(x)/parseInt(z);    
         document.getElementById("number3").value=c;    
       }
     else
       {  c="error! please enter appropriate operator";
          document.getElementById("number3").value.innerHTML=c;
          alert(c);
       }
});