// set targetGame as main object for whole game.
const targetGame = {};
// set varibles with default values.
// score start at 0; start with and max 6 bullets .
targetGame.player = {
    score: 0,
    bullet: 6,
    timeLeft: 60000,
}; 
// declaring playerScore and playerBullet for to simplify variable
    let playerScore = targetGame.player.score;
    let playerBullet = targetGame.player.bullet;                
// function for main menu with instructions aka .mission
// when "accept" button is clicked, .mission is hidden and .start-screen will appear
    targetGame.pewMission = function (){
        $('.pew-accept').on('click', function(){
            $('.mission').hide();
            $('.start-screen').show();
        })
    }
    // function for start screen, name input.
    // on click hide .start-screen menu. and the game begins.
    // targets and invisible. will appear on click.
    // function bulletUsed starts here to prevent listening for clicks before game start.
    // playerBullet += 1 to make up for the bullets used on click when hit .play-game
    targetGame.gameStart = function (){
            $('.play-game').on('click', function(){
                $('.start-screen').hide();
                $('.randomTarget').css('visibility','visible');
                targetGame.bulletUsed();    
                targetGame.startCountdown();
                playerBullet += 1;
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
    targetGame.infoBoxHeight = $('.info-box').height();
    // randomTargetLocation is the location in which the targets are randomizing in. needed to detect the container width/height, then subtracted the target width and height so that it stays within the container.
    targetGame.randomTargetLocationY = targetGame.containerHeight - targetGame.targetHeight - targetGame.infoBoxHeight;
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
    }); 
} // end randomizeTargets function.

// function to change the alien img to a pew img and pew sound when hit.
targetGame.changePew = function(){
    $('.randomTarget img').attr('src',"images/pew.svg").fadeOut(300)
    let laserSound = new Audio('./sounds/351811_plasterbrain_laser.mp3')
    laserSound.play();
};
//get click function to be detected.
// on click the target disappears
targetGame.hitTarget = function() {
    $('.randomTarget').on('click', function(e){
        // stopPropagation Prevents further propagation of the current event in the capturing and bubbling phases
        e.stopPropagation();
        // if target is clicked and there are no bullets. score does not go up (score -1 ???) and prompt reload!
        // if player has no bullets, and player clicks on target, score does not go up.
        if(playerBullet <= 0) {
            $('.reload-prompt').show();
            $('.reload-btn').css({
                'background': '#32cd24',
                'color': '#040417'
            }),
            // else if score is 10, target show, score stays at 10.
            playerBullet ++ ;
            playerScore --;
        } else if (playerScore >= 9 || playerScore === 10){
            $('.randomTarget').show();
            playerScore = 10;
            targetGame.displayScore();
            targetGame.displayBullet();
            $('.win-prompt').show();
        } else {
            targetGame.changePew()
        setTimeout(function() {
            targetGame.randomizeTargets();
            playerScore += 1;
            playerBullet -= 1;
            targetGame.displayScore();
            targetGame.displayBullet();
        },300)
        targetGame.displayBullet();
        targetGame.displayScore();
    }
    }); 
    targetGame.displayBullet();
} //end targetGame.hitTarget Function

// bulletUsed function. when click anywhere on game container. bullets will get reduced by 1
targetGame.bulletUsed = function() {
    $('.container').on('click', function(){
        targetGame.displayBullet();
        // if bullet is within 1 - 10, on click bullets will reduce by 1 and a sound will played.
        if(playerBullet >= 1 && playerScore < 10) {
            playerBullet -= 1 ;
            let pewSound = new Audio('./sounds/417486__mentoslat__8-bit-death-sound.mp3')
            pewSound.play();
            targetGame.displayBullet ();
            // else if, bullet is 0. the reload prompt will show, and the reload button will turn green.
        } else if(playerBullet === 0) {
            // if bulletis 0 prompt "no bullets, reload!"
            $('.reload-prompt').show();
            $('.reload-btn').css({
                'background':'#32cd24',
                'color':'#040417'
            })
        }        
    });
} //end targetGame.bulletUsed function

// function to reset score when game restarts.
targetGame.resetScore = function(){
    playerBullet = 6;
    playerScore = 0;
    targetGame.displayBullet();
    targetGame.displayScore();
}

// if hit reload button. bullets reset to 6. and plays a recharge sound.
targetGame.reloadBullets = function() {
    $('.reload-btn').on('click',function(e){
        e.preventDefault();
        playerBullet = 6 ; 
        targetGame.displayBullet();
        $('.reload-btn').css({
            'background': '#040417',
            'color': '#32cd24'
        })  
        let rechargeSound = new Audio('./sounds/196907__dpoggioli__laser-gun-recharge.mp3')
        rechargeSound.play();
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

targetGame.startCountdown = function() {
  targetGame.countdown();
  window.setInterval(targetGame.countdown, 1)
}

targetGame.outOfTime = function() {
  targetGame.gameWin();
}

targetGame.countdown = function () {
  $('.timeLeft').text(`${targetGame.player.timeLeft}`);
  if (targetGame.player.timeLeft <= 0) {
    targetGame.outOfTime();
  }
  targetGame.player.timeLeft -= 1;
}

// this function to initialize all the functions of the game.
targetGame.init = function (){
    //calling the functions
    targetGame.pewMission();
    targetGame.hitTarget();
    targetGame.gameStart();
    targetGame.setRandomContainer();
    targetGame.randomizeTargets();
    targetGame.displayName();
    targetGame.displayScore();
    targetGame.displayBullet();
    targetGame.reloadBullets();
    targetGame.gameWin();
}
// calls targetGame.init to load the everything onto the page
$(function(){
    targetGame.init();
}); // end document ready
