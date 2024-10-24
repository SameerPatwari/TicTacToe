let boxes = document.querySelectorAll(".box");
let resetGameButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#newgame-btn");
let messageContainer = document.querySelector(".message-container");
let message = document.querySelector("#message");


let turnO = true; //playerO,playerX
let countOfClicks = 0;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = ()=>{
    countOfClicks = 0;
    turnO = true;
    enableBoxes();
    messageContainer.classList.add("hide");
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner)=>{
    message.innerText = `Congratulations! Player ${winner} is the Winner!`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        console.log(countOfClicks);
        if(turnO){
            box.innerText = "O";
            box.style.color = "green";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;
        countOfClicks += 1;

        let isWinner = checkWinner();
        if(countOfClicks === 9 && !isWinner){
            showDraw();
        }
    });
});

const checkWinner = ()=>{
    for(let pattern of winningPatterns){
        // Entering the values at the winning pattern boxes into the variables.
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        // Checking if the values at the winning boxes match when all of them are not empty.
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                console.log(`Player ${pos1} is the Winner!`);
                showWinner(pos1);
                return true;
            }
        }
    }
}

const showDraw = ()=>{
    message.innerText = `It's a Draw! Play again.`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}
resetGameButton.addEventListener("click",resetGame);
newGameButton.addEventListener("click",resetGame);
