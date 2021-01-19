/*
 * Create a list that holds all of your cards
*/

let cards = [...document.querySelectorAll('.card')];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let initialGame = () => {
    //Select old ul[calss='deck']
    const deck = document.querySelector('.deck');

    //Remove hard coded html cards
    deck.innerHTML = '';

    //Make new shuffled cards
    shuffledCards = shuffle(cards);
    
    shuffledCards.map((shuffledCard) => {

        //Append new shuffled cards into html
        deck.appendChild(shuffledCard);

        shuffledCard.addEventListener('click', flipCard);
    });
}

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    classState('toggle', this, 'open', 'show');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    matching();
}

//Matching the cards
function matching(){

    let isCardsMatching = firstCard.innerHTML === secondCard.innerHTML;

    isCardsMatching ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    classState('add', firstCard, 'match');
    classState('add', secondCard, 'match');
}

function unflipCards(){
    setTimeout(() => {
        classState('remove', firstCard, 'show', 'open');
        classState('remove', secondCard, 'show', 'open');
    }, 800);
}







function classState(state, element, firstClass = null, secondClass = null){
    if(state === 'add'){
        element.classList.add(firstClass);
        element.classList.add(secondClass);
    }else if(state === 'toggle'){
        element.classList.toggle(firstClass);
        element.classList.toggle(secondClass);
    }else if (state === 'remove'){
        element.classList.remove(firstClass);
        element.classList.remove(secondClass);
    }
}

initialGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

