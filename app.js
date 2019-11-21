var globalScore, currentScore, diceValue, activePlayer, gamePlaying;

init();

//Roll Dice button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        diceValue = Math.floor(Math.random() * 6) + 1;
        //dice should be hidden in the begnining of the game 
        //and should only be enabled after clicking on roll dice button
        var diceStyle = document.querySelector('.dice');
        diceStyle.style.display = 'block';
        diceStyle.src = 'dice-' + diceValue + '.png';

        if(diceValue != 1){
            currentScore += diceValue;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        }
        else{
            //Pass to Next Player
            nextPlayer();
        }
    }
});

//Hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        globalScore[activePlayer] += currentScore;
        document.querySelector('#score-' + activePlayer).textContent = globalScore[activePlayer];

        // Check if player won the game
        if (globalScore[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.btn-roll').classList.add('disabled');
            gamePlaying = false;
        } 
        else{
            nextPlayer();
        }
    }
});

//New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    globalScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //every figure should be at zero-zero at the begnining of the game;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    document.querySelector('.btn-roll').classList.remove('disabled');


    //dice should be hidden in the begnining of the game 
    //and should only be enabled after clicking on roll dice button
    var diceStyle = document.querySelector('.dice').style.display = 'none';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;

    document.querySelector('.dice').style.display = 'none';
    
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
