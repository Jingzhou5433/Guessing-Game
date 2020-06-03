
/*
Functions:
- Player must guess a number between the min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- let player choose to play again
*/

//  let ran_num = Math.floor(Math.random() * 10)+1;
//  console.log(ran_num);

let min = 1,
    max = 10,
    win_num = getRan();
    guess_left = 2;

//UI element
const game = document.getElementById('game'),
      min_num = document.querySelector('.min-num'),
      max_num = document.querySelector('.max-num'),
      guess_btn = document.getElementById('guess-btn'),
      guess_input = document.getElementById('guess-input'),
      message = document.querySelector('.message');


min_num.textContent = min;
max_num.textContent = max;

guess_btn.addEventListener('click', function(e){
    
    if (guess_btn.value === 'Play Again'){
        reset();
        return
    }
    
    checkNum();
    e.preventDefault();
});

function checkNum(){
    
    let input_num = parseInt(guess_input.value);
    //console.log(guess_left);
    
    guess_input.value = '';

    if(input_num > max || input_num < min || isNaN(input_num)){
        showMessage(`Please enter a number between ${min} and ${max}!`, 'red');
        //guess_left -= 1; 
        return;
    }
    if (input_num === win_num) {
        gameOver(true, `${win_num} is correct!`);
        
        return
    }else {

        if(guess_left === 0){
            gameOver(false, `You loose... The correct number is ${win_num}`);     
            return;
        } 

        showMessage(`Wrong guess. ${guess_left} times left`, 'red');
        guess_left -= 1;
        
    }  
    
}

function showMessage(msg,color){
    
    message.textContent = msg;
    message.style.color = color;
    //setTimeout(removeMessage, 2000);
}

function gameOver(win, msg){
    let color;
    win === true? color='green' : color='red';
    guess_input.disabled = true;
    guess_input.style.borderColor = color;
    guess_btn.value = 'Play Again';
    guess_left = 2;
    showMessage(msg,color);
}

function reset(){
    guess_input.disabled = false;
    guess_btn.value = 'Submit';
    guess_input.style.borderColor = 'black';
    message.textContent = '';
    win_num = getRan();
}

function getRan(){
    let ran_num = Math.floor(Math.random() * 10)+1;
    console.log(ran_num);
    return ran_num;
}