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

//Cached elements
let img0 = "<img class='images' src='/icons/image0.png' />";
let img1 = "<img class='images' src='/icons/image1.png' />";
let img2 = "<img class='images' src='/icons/image2.png' />";
let img3 = "<img class='images' src='/icons/image3.png' />";
let img4 = "<img class='images' src='/icons/image4.png' />";

// let row0 = document.getElementById('row0');
// let row1 = document.getElementById('row1');
// let row2 = document.getElementById('row2');
// let row3 = document.getElementById('row3');
// let row4 = document.getElementById('row4');
// let row5 = document.getElementById('row5');
// let row6 = document.getElementById('row6');
// let row7 = document.getElementById('row7');
// let rowArray = [row0, row1, row2, row3, row4, row5, row6, row7];
let trArray = document.querySelectorAll('tr');

// //Event listners
document.querySelector('table').addEventListener('click', function(){
    
})


//Functions
function createIDs(){
    for(let x=0;x<8;x++){
        for(let y=0; y < 8; y++){
            trArray[x].querySelectorAll('td')[y].setAttribute('id', `cell${x}_${y}`)
        }
    }
}

//function to move the two selected elements over eeach others palceholders
//board[0][0] = document.getElementById('cell0_0').innerHTML;

function assignElementToBoard(){   
    board.forEach((row,x) => {  
        row.forEach((cell,y) => {
            board[x][y] = document.getElementById(`cell${x}_${y}`);
            assingRandomToCell(x,y);
        })    
    })
}

function assingRandomToCell(x,y){
    let number = Math.floor(5*Math.random());
            switch(number){
                case 0:
                    board[x][y].innerHTML = img0;
                    break;
                case 1:
                    board[x][y].innerHTML = img1;
                    break;
                case 2:
                    board[x][y].innerHTML = img2;
                    break;
                case 3:
                    board[x][y].innerHTML = img3;
                    break;
                case 4:
                    board[x][y].innerHTML = img4;
                    break;
            }
}

function checkCombAtStart(){
    for(let x = 0; x < board.length; x++){
        for(let y = 0; y < board[x].length; y++){
            if(board[x][y].innerHTML === board[x][y+1].innerHTML === board[x][y+2].innerHTML){
                assingRandomToCell(x,y+1);
                checkCombAtStart();
            }
            else if(board[x][y].innerHTML === board[x+1][y].innerHTML === board[x+2][y].innerHTML){
                assingRandomToCell(x+1,y);
                checkCombAtStart();
            }
        }
    }
}

function initTable(){
    createIDs();
    assignElementToBoard();
    checkCombAtStart();
}

function render(){
    initTable();
}

//Rendering
render();