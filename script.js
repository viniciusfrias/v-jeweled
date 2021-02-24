//Variables
let score = 0;
let timer = 30;
let board = [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]]
let selectedGems = [0,0]
//Cached elements
let img0 = "<img class='images' src='/icons/image0.png' />";
let img1 = "<img class='images' src='/icons/image1.png' />";
let img2 = "<img class='images' src='/icons/image2.png' />";
let img3 = "<img class='images' src='/icons/image3.png' />";
let img4 = "<img class='images' src='/icons/image4.png' />";
let table = document.querySelector("table");

// //Event listners
document.querySelector('table').addEventListener('click', function(){
    selectedGems[0] = document.querySelector
})

//Functions

//Function creates the table 8x8 using the board 2d array as a reference, sets an ID to each cell and assing a image html tag with the path to one of the gems images to be displayed
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

//function to move the two selected elements over eeach others palceholders
//board[0][0] = document.getElementById('cell0_0').innerHTML;

//Assigns a random number to variable "number", evaluates the numnber via a switch. Depending on the number it will generate, a specific image html tag containing
//the path to one of the gems images will be assigned to the variable img and return the result to whatever called the function upon
function assingRandomToCell(x,y) {
    let number = Math.floor(5*Math.random());
    let img = '';

    switch(number){
        case 0:
            img = img0;
            break;
        case 1:
            img = img1;
            break;
        case 2:
            img = img2;
            break;
        case 3:
            img = img3;
            break;
        default:
            img = img4;
            break;
    }

    return img;
}

//At start, it checks for more than 3 instances of the same gem on either a row or column.
//If more than 3 are found, it replaces the one in the middle for another random one and runs the function again
//until it gets to the desired setup
function checkCombAtStart() {
    let flag = false;
    for(let x = 0; x < board.length; x++) {
        for(let y = 0; y < board[x].length; y++) {
            if (y <= board[x].length - 3 &&
                board[x][y].innerHTML === board[x][y+1].innerHTML &&
                board[x][y].innerHTML === board[x][y+2].innerHTML && 
                board[x][y+1].innerHTML === board[x][y+2].innerHTML) {
                board[x][y+1].innerHTML = assingRandomToCell(x,y+1);
                flag = true;
            }
            
            if (x <= board.length - 3 &&
                board[x][y].innerHTML === board[x+1][y].innerHTML &&
                board[x][y].innerHTML === board[x+2][y].innerHTML &&
                board[x+1][y].innerHTML === board[x+2][y].innerHTML) {
                board[x+1][y].innerHTML = assingRandomToCell(x+1,y);
                flag = true;
            }
        }
    }

    if (flag) {
        checkCombAtStart();
    }
}

//Initiates the table and gets the game ready to be played
function initTable(){
    createTable(table, board);
    assignElementToBoard();
    checkCombAtStart();
}

//Root function to call the other functions
function render(){
    initTable();
}

//Rendering
render();