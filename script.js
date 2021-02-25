//Variables
let score = 0
let progress;
let countdown;
let board = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]]
let selected = []

//Cached elements
let img0 = "<img class='images' src='https://viniciusfrias.github.io/v-jeweled/icons/image0.png' />";
let img1 = "<img class='images' src='https://viniciusfrias.github.io/v-jeweled//icons/image1.png' />";
let img2 = "<img class='images' src='https://viniciusfrias.github.io/v-jeweled//icons/image2.png' />";
let img3 = "<img class='images' src='https://viniciusfrias.github.io/v-jeweled//icons/image3.png' />";
let img4 = "<img class='images' src='https://viniciusfrias.github.io/v-jeweled//icons/image4.png' />";
let table = document.querySelector("table");
let bar = document.getElementById("progress-bar")
let resetButton = document.createElement("BUTTON");
resetButton.innerText = "Click here to reset the game";
resetButton.setAttribute('id','reset-button')


// //Event listners
document.querySelector('table').addEventListener('click', function(event){
    if(event.target.parentNode.tagName !== 'TD'){
        return
    }
    let clickedEl = event.target.parentNode
    clickedEl.classList.toggle("applyBorder");
    selected.push(clickedEl.id)
    if(selected.length === 2){
        switchGems()
        
        document.getElementById(selected[0]).classList.toggle("applyBorder");
        document.getElementById(selected[1]).classList.toggle("applyBorder");
        selected = [];
        render();
        checkScoreComb();
    }      
})



//Functions
//Create the table dynamically and assign an id to all td elements and a number generated randomically by function "assignRandomCell()"
function createTable(table, data) {
    for(let x = 0; x < data.length; x++) {
        let row = table.insertRow();

        for(let y = 0; y < data[x].length; y++) {
            let cell = row.insertCell();
            cell.setAttribute('id', `cell${x}_${y}`);
            cell.innerHTML = assingRandomToCell(x,y);
        }
    }
}

//Assigns a random number to variable "number", evaluates the numnber via a switch. Depending on the number it will generate, a specific image html tag containing
//the path to one of the gems images will be assigned to the variable img and return the result to whatever called the function upon
function assingRandomToCell(x,y) {
    let number = Math.floor(5 * Math.random());
    board[x][y] = number;
}

//This function render the gems(symbols) to each cell by referencing them to a random number from 0 to 4.
function render(){
    board.forEach((row,x) => {
        row.forEach((cell, y) => {
            let temp = document.getElementById(`cell${x}_${y}`)

            switch(cell){
                case 0:
                    temp.innerHTML = img0;
                    break;
                case 1:
                    temp.innerHTML = img1;
                    break;
                case 2:
                    temp.innerHTML = img2;
                    break;
                case 3:
                    temp.innerHTML = img3;
                    break;
                default:
                    temp.innerHTML = img4;
                    break;
            }
        });
    });
}

//At start, it checks for more than 3 instances of the same gem on either a row or column.
//If more than 3 are found, it replaces the one in the middle for another random one and runs the function again
//until it gets to the desired setup
function checkCombAtStart() {
    let flag = false;
    for(let x = 0; x < board.length; x++) {
        for(let y = 0; y < board[x].length; y++) {
            if (y <= board[x].length - 3 &&
                board[x][y] === board[x][y+1] &&
                board[x][y] === board[x][y+2] && 
                board[x][y+1] === board[x][y+2]) {
                assingRandomToCell(x,y+1);
                flag = true;
            }
            
            if (x <= board.length - 3 &&
                board[x][y] === board[x+1][y] &&
                board[x][y] === board[x+2][y] &&
                board[x+1][y] === board[x+2][y]) {
                assingRandomToCell(x+1,y);
                flag = true;
            }
        }
    }
    if (flag) {
        checkCombAtStart();
    }
}

//This function sets the timer interval to 30 seconds
function moveProgressBar() {
    progress = 30;
    countdown = setInterval(move, 1000);
}

//This function changes the timer bar to reflect the seconds passed
function move(){
    if(progress === 0){
        clearInterval(countdown);
        document.getElementById('countdown').innerText = "Game Over";
        document.getElementById('id-progress').replaceChild(resetButton,document.getElementById('progress-bar'));
        document.getElementById('id-progress').addEventListener('click', function(event){
            window.location.reload();
        })
    }
    else{
        progress--;
        bar.setAttribute('value',progress);
        document.getElementById('countdown').innerText = progress;
    }
}

//This function makes the switch of gems when player selects 2 gems that are next to each other
function switchGems(){
    let broker = 0;
    let x1 = selected[0].split("_")[0][4];
    let y1 = selected[0].split("_")[1];
    let x2 = selected[1].split("_")[0][4];
    let y2 = selected[1].split("_")[1];

    if((x1 === x2) && (Math.abs(y1 - y2) === 1)){
        broker = board[x1][y1];
        board[x1][y1] = board[x2][y2]
        board[x2][y2] = broker;
    }
    else if((y1 === y2) && (Math.abs(x1 - x2) === 1)){
        broker = board[x1][y1];
        board[x1][y1] = board[x2][y2]
        board[x2][y2] = broker;
    }
    else{
        alert("Not a valid move, try again please")
    }    
}

//This function checks the score board for the possible combinations that could be a score combination
function checkScoreComb(){
    board.forEach((row,x) => {
        row.forEach((cell, y) => {
            //the following if statements check for combinations rows of same index, adds a score, moves the block of elements that are above the combination down one position
            //and check for another possible score combination that showed up after the elements were moved
            if(y < board[x].length - 7 &&
                board[x][y] === board[x][y + 1] && 
                board[x][y] === board[x][y + 2] && 
                board[x][y] === board[x][y + 3] && 
                board[x][y] === board[x][y + 4] && 
                board[x][y] === board[x][y + 5] && 
                board[x][y] === board[x][y + 6] && 
                board[x][y] === board[x][y + 7]){
                    score += 1000;
                    moveLinesDown(x, y, 8);
                    checkScoreComb();
                }
            else if(y < board[x].length - 6 &&
                board[x][y] === board[x][y + 1] && 
                board[x][y] === board[x][y + 2] && 
                board[x][y] === board[x][y + 3] && 
                board[x][y] === board[x][y + 4] && 
                board[x][y] === board[x][y + 5] && 
                board[x][y] === board[x][y + 6]){
                    score += 500;
                    moveLinesDown(x, y, 7);
                    checkScoreComb();
                }
            else if(y < board[x].length - 5 &&
                board[x][y] === board[x][y + 1] && 
                board[x][y] === board[x][y + 2] && 
                board[x][y] === board[x][y + 3] && 
                board[x][y] === board[x][y + 4] && 
                board[x][y] === board[x][y + 5]){
                    score += 400;
                    moveLinesDown(x, y, 6);
                    checkScoreComb();
                }
            else if(y < board[x].length - 4 &&
                board[x][y] === board[x][y + 1] && 
                board[x][y] === board[x][y + 2] && 
                board[x][y] === board[x][y + 3] && 
                board[x][y] === board[x][y + 4]){
                    score += 200;
                    moveLinesDown(x, y, 5);
                    checkScoreComb();
                }
            else if(y < board[x].length - 3 &&
                board[x][y] === board[x][y + 1] && 
                board[x][y] === board[x][y + 2] && 
                board[x][y] === board[x][y + 3]){
                    score += 100;
                    moveLinesDown(x, y, 4);
                    checkScoreComb();
                }
            else if(y < board[x].length - 2 &&
                board[x][y] === board[x][y + 1] && 
                board[x][y] === board[x][y + 2]){
                    score += 50;
                    addScore();
                    moveLinesDown(x, y, 3);
                    checkScoreComb();
                }
            
            //checks vor combinations in cells of same index, adds a score, moves the column of elements that are above the combination down the number of  positions the previous
            //score had and check for another possible score combination that showed up after the elements were moved
            if(x < board.length - 7 &&
                board[x][y] === board[x + 1][y] && 
                board[x][y] === board[x + 2][y] && 
                board[x][y] === board[x + 3][y] && 
                board[x][y] === board[x + 4][y] && 
                board[x][y] === board[x + 5][y] && 
                board[x][y] === board[x + 6][y] && 
                board[x][y] === board[x + 7][y]){
                    score += 1000;
                    moveOnelineDown(x,y,7);
                    checkScoreComb();
                }
            else if(x < board.length - 6 &&
                board[x][y] === board[x + 1][y] && 
                board[x][y] === board[x + 2][y] && 
                board[x][y] === board[x + 3][y] && 
                board[x][y] === board[x + 4][y] && 
                board[x][y] === board[x + 5][y] && 
                board[x][y] === board[x + 6][y]){
                    score += 500;
                    moveOnelineDown(x,y,6);
                    checkScoreComb();
                }
            else if(x < board.length - 5 &&
                board[x][y] === board[x + 1][y] && 
                board[x][y] === board[x + 2][y] && 
                board[x][y] === board[x + 3][y] && 
                board[x][y] === board[x + 4][y] && 
                board[x][y] === board[x + 5][y]){
                    score += 400;
                    moveOnelineDown(x,y,5);
                    checkScoreComb();
                }
            else if(x < board.length - 4 &&
                board[x][y] === board[x + 1][y] && 
                board[x][y] === board[x + 2][y] && 
                board[x][y] === board[x + 3][y] && 
                board[x][y] === board[x + 4][y]){
                    score += 200;
                    moveOnelineDown(x,y,4);
                    checkScoreComb();
                }
            else if(x < board.length - 3 &&
                board[x][y] === board[x + 1][y] && 
                board[x][y] === board[x + 2][y] && 
                board[x][y] === board[x + 3][y]){
                    score += 100;
                    moveOnelineDown(x,y,3);
                    checkScoreComb();
                }
            else if(x < board.length - 2 &&
                board[x][y] === board[x + 1][y] && 
                board[x][y] === board[x + 2][y]){
                    score += 50;
                    moveOnelineDown(x,y,2);
                    checkScoreComb();
                }
            render();
        });
    });
}

//Function to move the line or block of lines down once there was a row score
function moveLinesDown(x, y, maxIterations){
    let max = y + maxIterations
    for(y; y < max; y++){
        if(x > 0){
                for(let i = 0; i < x; i++){
                    board[x - i][y] = board[x - i - 1][y];
                }
                assingRandomToCell(0,y)
        }
        else{
                assingRandomToCell(0,y)
        }
    }
}

//Function to move the elements of a column down once there was a columns score
function moveOnelineDown(x,y,maxIterations){
    if(x > 0){
        let max = x + maxIterations;
        for(i = 0; i <= x - 1;i++){
            board[max - i][y] = board[(x - 1) - i][y];
        }
        assingRandomToCell(0,y);        
    }
    if(x === 0){
        for(j = 0; j <= maxIterations; j++){
            assingRandomToCell(j,y);
        }
    }
}
//This function renders the current score to the html elements
function addScore(){
    document.getElementById("points").textContent = score;
}

//Initiates the table and gets the game ready to be played
function initTable(){
    createTable(table, board);
    checkCombAtStart();
    render();
    moveProgressBar()
}

//Root function to call the other functions
initTable();

