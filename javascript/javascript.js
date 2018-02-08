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
                $('.playerOne').text(`${playerName}`);
            });
        }
        targetGame.gameStart = function (){
            $('button').on('click', function(){
                console.log('click')
                $('.start-screen').hide();
                $('.randomTarget').css('display','inline-block');
            });
        }

        // targetGame.gameStart = function(){
        //     $()
        // }



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
    // have targets (divs) that randomize location or slide in and out and a set time frame. set timeout set interval
    // targets x and y locations need to be relative to the users screen size.
    // use math.floor math.random to randomize for x and y
    let randomPosX = Math.floor((Math.random() * targetGame.randomTargetLocationX));
    let randomPosY = Math.floor((Math.random() * targetGame.randomTargetLocationY));
    $('.randomTarget').css('left', randomPosX);
    $('.randomTarget').css('top', randomPosY);
}
//get click function to be detected.
// on click the target disappears
targetGame.hitTarget = function() {
    $('.randomTarget').on('click', function(e){
        // stopPropagation Prevents further propagation of the current event in the capturing and bubbling phases
        e.stopPropagation();
        // if target is clicked and there are no bullets. score does not go up (score -1 ???) and prompt reload!
        // if player has no bullets, and player clicks on target, score does not go up.
        if(playerBullet <= 0) {
            console.log('no bullet no score');
            $('.reload-prompt').show();
            // else if score is 10, target show, score stays at 10.
        } else if (playerScore === 10){
            $('.randomTarget').show();
            playerScore = 10;
        } else {
            targetGame.randomizeTargets();
            playerScore += 1;
            targetGame.displayScore();
            playerBullet -= 1;
            targetGame.displayBullet();
        }
            //if score hits 10 you prompt you win
        if (playerScore === 10) {
                $('.win-prompt').show();
                playerBullet += 1;
                playerScore -= 0;
            };
    });
} //end targetGame.hitTarget Function

// once you get to 10 pts prompt you win
$('.win-prompt').find(':button').on('click', function () {
    //score and bullets gets reset back bullet + 1 to make up for the -1 on click.
    playerScore = 0;
    playerBullet = 6 + 1;
    // display new score and hide prompt
    targetGame.displayScore();
    targetGame.displayBullet();
    $('.win-prompt').hide();
})

targetGame.bulletUsed = function() {
    $('.container').on('click', function(){
        if(playerBullet !== 0) {
            playerBullet -= 1 ;
        } 
        targetGame.displayBullet();
    // if bulletis 0 prompt "no bullets, reload!"
        if(playerBullet === 0) {
            $('.reload-prompt').show();
        } else if (playerScore === 10) {
            playerBullet ++;
        }
    });
} //end targetGame.bulletUsed function

// if hit reload button. bullets reset to 6.
targetGame.reloadBullets = function() {
    $('.reload-btn').on('click',function(e){
        e.preventDefault();
        playerBullet = 6 ; 
        targetGame.displayBullet();

        // + 1 is make up for the 1 that is reduced during when the button is clicked
        $('.reload-prompt').hide();
    }); 
} // end targetGame.reloadBullets functoin.


// when click bullet -1. 

// this function to initialize all the functions of the game.
targetGame.init = function (){
    
    //calling the functions
    
    targetGame.setRandomContainer();
    targetGame.randomizeTargets();
    targetGame.displayScore();
    targetGame.displayBullet();
    targetGame.displayName();
    targetGame.gameStart();
    targetGame.hitTarget();
    targetGame.bulletUsed();
    targetGame.reloadBullets();
}
// calls targetGame.init to load the everything onto the page
$(function(){
    targetGame.init();
}); // end document ready

// when play again or next level button is pressed. change level or theme.
// when next level button is pressed. class is changed to aliens.
// when class is changed. changes: targets to aliens, change font, background change 
// score is reset to 0


//////////////bonus: ////////////
// add intro page with name input field.
// sound on click
// make moving targets
// have a nice visual with fancy targets animated bullets
// level 2
// visual bullets
