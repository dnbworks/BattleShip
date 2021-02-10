
// shortcut function to grab elements ById
function $(id) {
    return document.getElementById(id);
}

var view = {  
    displayMessage: function(msg) {
          var MessageArea = document.getElementById("messageArea");
             MessageArea.textContent = msg;
      },  
    displayHit: function(location) {
        var cell = document.getElementById(location);
             cell.setAttribute("class", "hit");
      },  
    displayMiss: function(location) {
         var cell = document.getElementById(location);
             cell.setAttribute("class", "miss");
      }
  };
  
var model = {
    boardSize: 7,
    numShips:3,
    ShipSunk:0,
    ShipLength:3,
    ships: [ 
    { locations: ["10", "11", "12"], hits: ["", "", ""] },  
    { locations: ["14", "21", "28"], hits: ["", "", ""] },  
    { locations: ["44", "45", "46"], hits: ["", "", ""] } 
    ],
    
    fire: function(guess) {
         for(var i=0; i<this.numShips; i++){
              var ship = this.ships[i];
              var index = ship.locations.indexOf(guess);
                  if(index >= 0){
                      ship.hits[index] = "hit";
                      view.displayHit(guess);
                      view.displayMessage("Hit");
                      
                      if (this.isSunk(ship)) {  
                      view.displayMessage("You sank my battleship!");
                      this.shipsSunk++;
                      }
                      return true;
                  }
              
         }
         view.displayMiss(guess);
         view.displayMessage("You missed.");
         return false;
    },
    
    isSunk: function(ship) {
          for(var i = 0;i<this.ShipLength; i++){
              if(ship.hits[i] !== "hit"){
                   return false;
              }
          }
             return true;
    }

};

var controller = {
    guesses:0,
    processGuesses: function(guess){
    var location = parseGuess(guess);
       if(location){
         this.guesses++;
         var hit = model.fire(location);
         if (hit && model.shipsSunk === model.numShips) { 
             view.displayMessage("You sank all my battleships, in " +  this.guesses + " guesses");
          }
       }
    }
    
};

function parseGuess(guess) {  
   var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
   if (guess === null || guess.length !== 2) {  
       alert("Oops, please enter a letter and a number on the board.");
    } else {  
        firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar); 
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {  
           alert("Oops, that isn't on the board.");
         } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) { 
            alert("Oops, that's off the board!");
         } else {  
         return row + column;
        }  
}
    return null;
}

function init(){
   var fireButton = document.getElementById("fireButton");
       fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
        guessInput.onkeypress = handleKeyPress;
}

function handleFireButton(){
 var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuesses(guess);
     guessInput.value = "";
}

function handleKeyPress(e) {  
var fireButton = document.getElementById("fireButton");
if (e.keyCode === 13) { 
 fireButton.click();
  return false;
}
}

window.onload = init;