window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() { // Everything will be inside domLoaded
   const fInput = document.getElementById("fInput");
   const cInput = document.getElementById("cInput");
   const convertButton = document.getElementById("convertButton");
   const errorMessage = document.getElementById("errorMessage");
   const weatherImage = document.getElementById("weatherImage");

//Converting celsius to fahrenheit
function convertCel(degreesCelsius) { // I put degreesCelius in params because it is not defined yet
   return degreesCelsius * (9/5) + 32; 
}
//Convert fahrenheit to celsius
function convertFah(degreesFahrenheit) {
   return (degreesFahrenheit - 32) * (5/9);
  
}
//Changes the weather image based on the input 
function changeImage(ff) {
   if (ff < 32) {
         weatherImage.src = "images/cold.png"
         weatherImage.alt = "Cold";
      } else if (ff <= 50) {
         weatherImage.src = "images/cool.png";
         weatherImage.alt = "Cool";
      } else {
         weatherImage.src = "images/warm.png";
         weatherImage.alt = "Warm";
      }
   }
//When the user button is clicked, do this action/fucntion
convertButton.addEventListener("click", function() {
   const c = parseFloat(cInput.value); //cInput.value gets the input from celsius box as a string
   const f = parseFloat(fInput.value); // parseFloat converts the string into a number

   if (cInput.value !== "") {
     if (isNaN(c)) { // if celsius is not a number
      errorMessage.textContent = `${cInput.value} is not a number`; //Error message
      return;
   }

   //Convert C to F 
   const final = convertCel(c); 
   fInput.value = final;
   changeImage(final);
   errorMessage.textContent = "";
} else if (fInput.value !== "") {
   if (isNaN(f)) {
      //If not a num, show this error
      errorMessage.textContent = `${fInput.value} is not a number`;
      return;
   }
   //Convet F to C
   const final = convertFah(f);
   cInput.value = final;
   changeImage(f); // pass f/fahrenheit to change image
   errorMessage.textContent = "";
} else { // If both text fields are empty
   errorMessage.textContent = "Enter a valid number to convert";
}
})
}


