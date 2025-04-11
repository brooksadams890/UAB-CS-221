function rps(input) {
    if (!input) {
        input = prompt("Please enter rock, paper, or scissors: ").toLowerCase();
        if (input !== "rock" && input !== "paper" && input !== "scissors") {
            input = prompt("Please try again. Enter rock, paper, or scissors: ").toLowerCase();
        }
    }

    const choices = ["rock", "paper", "scissors"];
    let rand = Math.random() * 3;
    let cinput;

    switch (true) {
        case rand < 1:
            cinput = "rock";
            break;
        case rand < 2:
            cinput = "paper";
            break;
        default:
            cinput = "scissors";
    }

    let resultText;
    if (input === cinput) {
        resultText = "You tied!";
    } else if (
        (input === "rock" && cinput === "scissors") ||
        (input === "scissors" && cinput === "paper") ||
        (input === "paper" && cinput === "rock")
    ) {
        resultText = "You won!";
    } else {
        resultText = "You lost!";
    }

    console.log("User Choice: " + input);
    console.log("Computer Choice: " + cinput);
    console.log(resultText);

    if (!buttonInput) {
        if (confirm("Do you want to play again?")) {
            rps();
        } else {
            console.log("Hope to see you soon!");
        }
    } else {
        //This is part two from help with ChatGPT I used from the bottom. 
        // how do I use .textContent and use ${} to call an variable

//ChatGPT said:
//Great question! You can use .textContent to update the text inside an HTML element, and you can use ${} (template literals) to inject a variable directly into a string.
//Here's how to do it step-by-step:
//✅ Example Syntax:
//let name = "Alex";
//document.getElementById("myDiv").textContent = `Hello, ${name}!`;
        document.getElementById("user").textContent = `You chose: ${input}`;
        document.getElementById("computer").textContent = `Computer chose: ${cinput}`;
        document.getElementById("outcome").textContent = resultText;
    }
}

let buttonInput = false;
//I used chatGPT to help me with the eventlisteners and combined it with the section up above. 
//What would be the total syntax for an event listener that needs to call a variable from the function in js
//In JavaScript, if you want to set up an event listener that uses a variable from within a function, the syntax generally depends on where the variable is defined and how you want to access it.

//Here’s a basic example where a variable is defined inside a function, and that function also sets up the event listener using that variable:

//✅ Syntax Example:
//function setupListener() {
 // const message = "Hello from inside the function!";

  //document.getElementById("myButton").addEventListener("click", function () {
    // You can access 'message' here because it's in the closure
   // alert(message);
 // });
document.getElementById("rock").addEventListener("click", function() {
    buttonInput = true;
    rps("rock");
});
document.getElementById("paper").addEventListener("click", function() {
    buttonInput = true;
    rps("paper");
});
document.getElementById("scissors").addEventListener("click", function() {
    buttonInput = true;
    rps("scissors");
});