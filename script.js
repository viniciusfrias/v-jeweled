//Variables
let counter = 0;
let finishIDx = 0;
let startIDx = finishIDx - (counter - 1);
let score = 0;
let selection = []
let first;
let second;
let idFirst;
let idSecond;

//const themeOptions = [0,1,2];//indexes to link to the library of character elements
let timer = 30;


//Cached elements
//let hintButton = document.getElementById('hintID')
let rowsArray = document.querySelectorAll('tr');
let elementsArray = document.querySelectorAll('td');
let broker = document.createElement("td");


//Event listners
//hintButton.addEventListener('click', displayHint)
function dynamicListeners(){
for(let i = 0; i < 64; i++){
   elementsArray[i].addEventListener('click', function(evt){
       //elementsArray[i].style.border = 'solid 8px red';
       elementsArray[i].classList.toggle("applyBorder");
       elementsArray[i].setAttribute("id", i);
       selection.push(elementsArray[i]);
       movingSelectedChars();
   })
}
}

//Functions

//function to move the two selected elements over eeach others palceholders
function assignRandomChar(idx){
    let element = elementsArray[idx];    
    let x = Math.floor(5*Math.random());
    switch(x){
        case 0:
            element.innerHTML = "<img class='images' src='/icons/image0.png' />";
            break;
        case 1:
            element.innerHTML = "<img class='images' src='/icons/image1.png' />";
            break;
        case 2:
            element.innerHTML = "<img class='images' src='/icons/image2.png' />";
            break;
        case 3:
            element.innerHTML = "<img class='images' src='/icons/image3.png' />";
            break;
        case 4:
            element.innerHTML = "<img class='images'src='/icons/image4.png' />";
            break;
    }
}

function initTable(){
    for(i = 0; i<64; i++){
        assignRandomChar(i)
    }
    check3elem(); 
}

//This function checks if there is 3 instances of the same element in all rows or columns. If found, it replaces the element in the middle for another one, and run the function again.
function check3elem(){
    let x = 0;
    let z = 0;
    do{
        for(let y = 2 + x; y<8+x; y++){
            if(elementsArray[y-2].innerHTML === elementsArray[y-1].innerHTML && elementsArray[y-1].innerHTML === elementsArray[y].innerHTML){
                assignRandomChar(y-1);
                check3elem();
            }
        }
        x+=8
    }while(x<=56)
    
    do{    
    for(let y = 0 + z; y < 41 + z; y +=8){  
            if(elementsArray[y].innerHTML === elementsArray[y+8].innerHTML && elementsArray[y+8].innerHTML === elementsArray[y+16].innerHTML){
                assignRandomChar(y+8);
                check3elem();
            }
        }
        z+=1
    }while(z<=7)
       
}

function checkLineCombinations(){
    for(let i = 0; i < rowsArray.length; i++){
        let elementsPerRowArray = rowsArray[i].querySelectorAll('td')
        for(let j = 0; j < 6; j++){
            if(elementsPerRowArray[j].innerHTML === elementsPerRowArray[j + 1].innerHTML === elementsPerRowArray[j + 2].innerHTML){
                counter++;
                finishIDx = j + 2;
                
                if(j === 5){
                    score += 50 * counter;
                    timeIncrease();
                    if(i === 0){
                    for(let w = startIDx; w <= finishIDx; w++){
                        assignRandomChar(w)
                    }
                    counter = 0;
                    finishIDx = 0;
                }
            }
            else if(counter > 0){
                score += 50 * counter;
                timeIncrease();
                if(i === 0){
                    for(let w = startIDx; w <= finishIDx; w++){
                        assignRandomChar(w)
                    }
                }
                else{               
                    for(let z = startIDx; z <= finishIDx; z++){
                        for(i;i >= 0;i--){
                            if(i=0){
                                assignRandomChar(z)
                                break;
                            }
                            rowsArray[i].querySelectorAll('td')[z].innerHTML =  rowsArray[i - 1].querySelectorAll('td')[z].innerHTML
                        }
                    }
                }
                }
                counter = 0;
                finishIDx = 0;
            }
            
        }
    }
}

function movingSelectedChars(){
    let x = 0;
    first = selection[selection.length - 2];
    second = selection[selection.length - 1];
    idFirst = parseInt(first.id,10);
    idSecond = parseInt(second.id,10);

    if(idFirst === (idSecond + 8) || idFirst === (idSecond - 8)){
        broker.innerHTML = first.innerHTML;
        first.innerHTML = second.innerHTML;
        second.innerHTML = broker.innerHTML;
    }
    else if(idFirst === (idSecond + 1) || idFirst === (idSecond - 1)){
        do{
            if((idFirst >= (0 + x) && idFirst < (8 +x)) && (idSecond >= (0 + x) && idSecond < (8 + x))){
                broker.innerHTML = first.innerHTML;
                first.innerHTML = second.innerHTML;
                second.innerHTML = broker.innerHTML;
                break;
            }
            else{
                x+=8;
            }
        }
        while(x<=56);
    }
    else{
        alert("This is not a valid selection");    
    }
    //After the second selection, it will remove the border and purge the array that is reference for first and second variables
    if(second !== undefined){
        first.classList.toggle("applyBorder");
        second.classList.toggle("applyBorder");
        selection = [];
    }
    
    checkLineCombinations();
    //New function to check if 3 or more elements are found after the play in a row or column and apply score to player, if nothing is found, the elements whould return to their
    //positions, and it should just exit the initiator function movingSelectedChars)

    //If the above function finds combinations of 3 or more of the same element, a new function to fill up the board with new elements is called
    //(This one should not care if it will have 3 or more of the same, and then call the above function again, after
}

function displayHint(){
//probably based on the function that checks for 3 or more
}

function timeDecrease(){
//it will decrease the timer regularly 
}

function timeIncrease(){
//If score happens, add time
}

//Rendering
function render(){
    initTable();
    dynamicListeners();
}

initTable();
dynamicListeners();