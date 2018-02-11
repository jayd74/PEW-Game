// set targetGame as main object for whole game.
const targetGame = {};

// set varibles with default values.
// score start at 0;
// start with and max 6 bullets .
targetGame.player = {
    score: 0,
    bullet: 6,
}; 
// declaring playerScore and playerBullet for to simplify variable
    
    let playerScore = targetGame.player.score;
    let playerBullet = targetGame.player.bullet;                

    targetGame.pewMission = function (){
        $('.pew-accept').on('click', function(){
            $('.mission').hide();
            $('.start-screen').show();
        })
    }

    targetGame.gameStart = function (){
            $('.play-game').on('click', function(){
                console.log('click')
                $('.start-screen').hide();
                $('.randomTarget').css('visibility','visible');
                targetGame.resetScore();
                targetGame.bulletUsed();
            });
        }

        // Display Scores and Bullet Count functions 
        targetGame.displayScore = function(){
            $('.scoreCount').text(`${playerScore}`);
        }
        targetGame.displayBullet = function(){
            $('.bulletCount').text(`${playerBullet}`);
        } 
        // get name from player and input it to the player field
        targetGame.displayName = function(){
            $('form').on('submit', function(e){ 
                e.preventDefault();
                let playerName = $('input').val();
                  if(playerName !== ''){
                    $('input').val('');               
                    $('.playerOne').text(`${playerName}`);    
                }
            });
        }
      
targetGame.setRandomContainer = function () {
     // declaring height and width of targets and containers here. this way the page will load in order to get the correct values of the container and the widths / heights of the targets
    // finding the container height and width
    targetGame.targetWidth = $('.randomTarget').width();
    targetGame.targetHeight = $('.randomTarget').height();
    targetGame.containerHeight = $('.container').height();
    targetGame.containerWidth = $('.container').width();
    // randomTargetLocation is the location in which the targets are randomizing in. needed to detect the container width/height, then subtracted the target width and height so that it stays within the container.
    targetGame.randomTargetLocationY = targetGame.containerHeight - targetGame.targetHeight;
    targetGame.randomTargetLocationX = targetGame.containerWidth - targetGame.targetWidth;
} // end setRandomContainer


targetGame.randomizeTargets = function(){
    //randomAlien generates a number on click. .randomTarget changes based off results.
    let randomAlien = 0;
        randomAlien = Math.floor((Math.random() * 5 + 1));
        if (randomAlien === 1) {
            $('.randomTarget').html(`<img src="images/alien-01.svg" alt="orange alien">`);
        } else if (randomAlien === 2) {
            $('.randomTarget').html(`<img src="images/alien-02.svg" alt="red alien">`);
        } else if (randomAlien === 3) {
            $('.randomTarget').html(`<img src="images/alien-03.svg" alt="blue alien">`);
        } else if (randomAlien === 4) {
            $('.randomTarget').html(`<img src="images/alien-04.svg" alt="lightblue alien">`);
        } else if (randomAlien === 5) {
            $('.randomTarget').html(`<img src="images/alien-05.svg" alt="pink alien">`);
        }  

    // have targets (divs) that randomize location or slide in and out and a set time frame. set timeout set interval
    // targets x and y locations need to be relative to the users screen size.
    // use math.floor math.random to randomize for x and y
    let randomPosX = Math.floor((Math.random() * targetGame.randomTargetLocationX));
    let randomPosY = Math.floor((Math.random() * targetGame.randomTargetLocationY));
    // append the css properties to .randomTarget. did a fade an fade out to mimic disappearing target.
    $('.randomTarget').css({
        'left':randomPosX+'px',
        'top':randomPosY+'px',
        'display':'inline-block'
    }).appendTo('.container').fadeIn(500).delay(2000).fadeOut(500, function () {
        $(this).show();
        targetGame.randomizeTargets();
    }); // $('.randomTarget').css('top', randomPosY); 
} // end randomizeTargets function.

// function to change the alien img to a pew img when hit.
targetGame.changePew = function(){
    $('.randomTarget img').attr('src',"images/pew.svg")
};

//get click function to be detected.
// on click the target disappears
targetGame.hitTarget = function() {
    $('.randomTarget').on('click', function(e){
        // stopPropagation Prevents further propagation of the current event in the capturing and bubbling phases
        e.stopPropagation();
        targetGame.displayBullet();
        // if target is clicked and there are no bullets. score does not go up (score -1 ???) and prompt reload!
        // if player has no bullets, and player clicks on target, score does not go up.
        if(playerBullet <= 0) {
            console.log('no bullet no score');
            $('.reload-prompt').show();
            // else if score is 10, target show, score stays at 10.
        } else if (playerScore === 10){
            $('.randomTarget').show();
            // playerBullet += 1;
            // playerScore += 1;
            // targetGame.displayScore();
            // targetGame.displayBullet();
            //if score hits 10 you prompt you win
            $('.win-prompt').show();
        } else {  
            console.log('hey')
            targetGame.changePew()
            setTimeout(function() {
                targetGame.randomizeTargets();
                playerScore += 1;
                playerBullet -= 1;
            },300)
        }
        targetGame.displayScore();
    }); 
    targetGame.displayBullet();
    targetGame.displayScore();
} //end targetGame.hitTarget Function

// targetGame.restartGame = function (){

// }

targetGame.bulletUsed = function() {
    $('.container').on('click', function(){
        targetGame.displayBullet();
        if(playerBullet !== 0) {
            playerBullet -= 1 ;
              
            console.log(playerBullet)
        } else if(playerBullet === 0) {
            // if bulletis 0 prompt "no bullets, reload!"
            $('.reload-btn').css({
                'background':'#32cd24',
                'color':'#040417'
            })     
            $('.reload-prompt').show();
        } else if (playerScore === 10) {
            playerBullet ++;
        }        
    });
} //end targetGame.bulletUsed function

targetGame.resetScore = function(){
    playerBullet = 6;
    playerScore = 0;
    targetGame.displayBullet();
    targetGame.displayScore();
}
// if hit reload button. bullets reset to 6.
targetGame.reloadBullets = function() {
    $('.reload-btn').on('click',function(e){
        e.preventDefault();
        playerBullet = 6 ; 
        $('.reload-btn').css({
            'background': '#040417',
            'color': '#32cd24'
        })  
        targetGame.displayBullet();
        $('.reload-prompt').hide();
    }); 
} // end targetGame.reloadBullets functoin.

// once you get to 10 pts prompt you win
targetGame.gameWin = function(){

    $('.play-again').on('click', function () {
        location.reload();
        // reset score and hide prompt      
        targetGame.resetScore();
        $('.win-prompt').hide();
    })
}
// this function to initialize all the functions of the game.
targetGame.init = function (){
    //calling the functions
    targetGame.pewMission();
    targetGame.gameStart();
    targetGame.setRandomContainer();
    targetGame.randomizeTargets();
    targetGame.displayName();
    targetGame.displayScore();
    targetGame.displayBullet();
    targetGame.hitTarget();
    // targetGame.bulletUsed();
    targetGame.reloadBullets();
    targetGame.gameWin();
}
// calls targetGame.init to load the everything onto the page
$(function(){
    targetGame.init();
}); // end document ready

//design cue feedback
// - add restart button 

//completed design que tasks
// make instructions
//- make border full - bleed
// - make scorcard bigger 
//- give feedback on the recharge button when charge hits zero - more margin between button and border 

//////////////bonus: ////////////
// sound on click
// make moving targets
// have a nice visual with fancy targets animated bullets
// visual bullets

// when next level button is pressed. class is changed to aliens.
// when class is changed. changes: targets to aliens, change font, background change 
