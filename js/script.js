
const selectionsDiv = document.querySelectorAll('.icon-div');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
// Array of selections
const SELECTIONS = [
    {
        name: 'rock',
        src: 'img/rock.png',
        beats: 'scissors'
    },
    {
        name: 'paper',
        src: 'img/paper.png',
        beats: 'rock'
    },
    {
        name: 'scissors',
        src: 'img/scissors.png',
        beats: 'paper'
    }

];

// Add event listener for each icon.
selectionsDiv.forEach(selection => {
    selection.addEventListener('click', e => {
        const selectionObj = SELECTIONS.find(s => s.name === selection.id);//find the selection that click
        makeSelections(selectionObj);
        biggerScore();
    });
});

/**
 * Function make the selections of computer and user.
 * @param {*} selection 
 */
function makeSelections(selection){

    const computer = computerSelection();
    const youWinner = isWinner(selection, computer);
    const computerWinner = isWinner(computer, selection);

    addSelectResult(computer, computerWinner);
    addSelectResult(selection, youWinner);

    if (youWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan) 
}

/**
 * Functions add the select result to the div results.
 * @param {*} selection 
 * @param {boolean} winner 
 */
function addSelectResult(selection, winner){
    const div = document.createElement('div');

    let img = document.createElement("img");
    img.src = selection.src;

    div.append(img);
    div.classList.add('result-selection');

    if (winner) div.classList.add('winner');
    finalColumn.after(div)
}

/**
 * Function return true if the selection beats the opponent selection (selection.beats === opponentSelection.name).
 * @param {*} selection 
 * @param {*} opponentSelection 
 */
function isWinner(selection, opponentSelection){
    return selection.beats === opponentSelection.name;
}

/**
 * Function random computer selection.
 */
function computerSelection(){
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

/**
 * Function increment the score of the winner.
 * @param {*} scoreSpan 
 */
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

/**
 * Function color in green the bigger score.
 */
function biggerScore(){

    if(parseInt(yourScoreSpan.innerText) > parseInt(computerScoreSpan.innerText)){
        yourScoreSpan.style.color = "green";
        computerScoreSpan.style.color = "red";
    }

    else if(parseInt(yourScoreSpan.innerText) < parseInt(computerScoreSpan.innerText)){
        yourScoreSpan.style.color = "red";
        computerScoreSpan.style.color = "green";
    }

    else {
        yourScoreSpan.style.color = "gray";
        computerScoreSpan.style.color = "gray";
    }
}