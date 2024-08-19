// All the javaScript file is written here with all the functionality.

let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");

let game = document.querySelector("#game");

let x=0;
let y=0;
let p1 = document.querySelector("#p1");
let p3 = document.querySelector("#p3");

btn1.addEventListener("click", ()=>{
    you="Rock";
    computer=Math.floor(Math.random()*3)+1;
    if(computer===1)
    {   
        comp="Rock";
        game.innerText="Draw"; 
    }
    else if(computer===2)
    {
        comp="Paper";
        game.innerText="computer wins...";
        p3.innerText=++y;

    }
    else
    {
        comp="Scissor";
        game.innerText="you win...";
        p1.innerText=++x;

    }

})

btn2.addEventListener("click", ()=>{
    you="Paper";
    computer=Math.floor(Math.random()*3)+1;
    if(computer===1)
    {
        comp="Rock";
        game.innerText="you win...";
        p1.innerText=++x; 

    }
    else if(computer===2)
    {
        comp="Paper";
        game.innerText="Draw";
    }
    else
    {
        comp="Scissor";
        game.innerText="computer win...";
        p3.innerText=++y;
    }                                                              // for numbers count in you and computers
})

btn3.addEventListener("click", ()=>{
    you="Scissor";
    computer=Math.floor(Math.random()*3)+1;
    if(computer===1)
    {
        comp="Rock";
        game.innerText="computer win...";
        p3.innerText=++y;
    }
    else if(computer===2)
    {
        comp="Paper";
        game.innerText="you win...";
        p1.innerText=++x;
    }
    else
    {
        comp="Scissor";
        game.innerText="Draw";
    }
})

// let btn1 = document.querySelector("#btn1");
// let btn2 = document.querySelector("#btn2");
// let btn3 = document.querySelector("#btn3");

// let game = document.querySelector("#game");

// let x=0;
// let y=0;
// let p1 = document.querySelector("#p1");
// let p3 = document.querySelector("#p3");

// btn1.addEventListener("click", ()=>{
//     you="Rock";
//     p1.style.color="blue";
//     p3.style.color="blue";
//     p1.innerText="Rock";
//     computer=Math.floor(Math.random()*3)+1;
//     if(computer===1)
//     {   
//         comp="Rock";                                        // for showing rock paper scissor in you and computer
//         p3.innerText="Rock";
//         game.innerText="Draw"; 
//     }
//     else if(computer===2)
//     {
//         comp="Paper";
//         p3.innerText="Paper";
//         game.innerText="computer wins...";

//     }
//     else
//     {
//         comp="Scissor";
//         p3.innerText="Scissor";
//         game.innerText="you win...";

//     }

// })

// btn2.addEventListener("click", ()=>{
//     you="Paper";
//     p1.style.color="blue";
//     p3.style.color="blue";
//     p1.innerText="Paper";
//     computer=Math.floor(Math.random()*3)+1;
//     if(computer===1)
//     {   
//         comp="Rock";
//         p3.innerText="Rock";
//         game.innerText="you win..."; 
//     }
//     else if(computer===2)
//     {
//         comp="Paper";
//         p3.innerText="Paper";
//         game.innerText="Draw";

//     }
//     else
//     {
//         comp="Scissor";
//         p3.innerText="Scissor";
//         game.innerText="Computer wins...";

//     }
// })

// btn3.addEventListener("click", ()=>{
//     you="Scissor";
//     p1.style.color="blue";
//     p3.style.color="blue";
//     p1.innerText="Scissor";
//     computer=Math.floor(Math.random()*3)+1;
//     if(computer===1)
//     {   
//         comp="Rock";
//         p3.innerText="Rock";
//         game.innerText="computer wins..."; 
//     }
//     else if(computer===2)
//     {
//         comp="Paper";
//         p3.innerText="Paper";
//         game.innerText="You win...";

//     }
//     else
//     {
//         comp="Scissor";
//         p3.innerText="Scissor";
//         game.innerText="Draw";

//     }
// })
