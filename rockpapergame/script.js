let choice = ["Rock", "Paper", "Scissor"];
function playGame(playerChoice) {
    let randomIndex = Math.floor(Math.random() * 3);
    let computerChoice = choice[randomIndex];
    let result = "";
    if (playerChoice === computerChoice) {
        result = "it a tie";
    }
    else if (playerChoice == "rock" && computerChoice == "scissor" || playerChoice == "paper" && computerChoice == "rock" || playerChoice == "scissor" && computerChoice == "paper ") {
        result = "player win";
    }
    else {
        result = "computer win";
    }

    document.getElementById("computer").innerHTML = "computer:" + computerChoice;
    document.getElementById("result").innerHTML = result;
}
