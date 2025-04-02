function rps() {
    let input = prompt("Please enter rock, paper, or scissors: ").toLowerCase(); // to lowercase because users might enter capital letters as input 
    
    if (input !== "rock" && input !== "paper" && input !== "scissors") { // if rock paper or sissors is not the input
        input = prompt("Please try again. Enter rock, paper, or scissors: ").toLowerCase();
    }

    const rock = "rock";
    const scissors = "scissors";
    const paper = "paper";

    let rand = Math.random() * 3; // picks a random number between 0 and 1 times 3

    let cinput;

    switch (true) {
        case rand < 1: 
        cinput = rock;
        break;
        case rand < 2: 
        cinput = paper;
        break;
        default:
            cinput = scissors;
    }
    console.log("User Choice: " + input); // Shows user choice as text + input
    console.log("Computer Choice: " + cinput) // Computer choice as text + computer input aka cinput 

    let final;
    //I used chatGPT on this part. I didn't want to write multiple if statements for each possibility
    //I then learned that you could use a single if else statement.
    
    //I dont want to use multiple if statements for displaying 4 possibilities in javascript. Is there a better way to not write multiple if statements
    //The code below comes from the information I got from chatGPT with changes.  
    if (input === cinput){
        final = "You tied!"
    } else if (
        (input === "rock" && cinput === "scissors") ||
        (input === "scissors" && cinput === "paper") ||
        (input === "paper" && cinput === "rock")
    ) {
        final = "You won!";
    } else {
        final = "You lost!";
    }

    console.log(final);

    //This asks the player to play again
    if (confirm ("Do you want to play again?")) {
        //I got how to start and restart the game from chatGPT
        //I asked it how to restart or start a game in javaScript
        // It told me to simply call the function for both 
        rps(); // Restarts the game
    } else {
        console.log("Hope to see you soon!")
    }
}
rps(); // Starts game