
const targetGame = {};

// finding the container height and width

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

// Display Scores and Bullet Count
$('.scoreCount').html(`${playerScore}`);
$('.bulletCount').html(`${playerBullet}`);

// have targets (divs) that randomize location or slide in and out and a set time frame. set timeout set interval
// targets x and y locations need to be relative to the users screen size.
// use math.floor math.random to randomize for x and y
// set targetGame as main object for whole game.

// let randomPosX = Math.floor((Math.random() * containerWidth));
// let randomPosY = Math.floor((Math.random() * containerHeight));

//     $('.target').css('left', randomPosX);
//     $('.target').css('top', randomPosY);




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

        } else {
            console.log(`score +1`);
            let randomPosX = Math.floor((Math.random() * targetGame.randomTargetLocationX));
            let randomPosY = Math.floor((Math.random() * targetGame.randomTargetLocationY));

            $('.randomTarget').css('left', randomPosX);
            $('.randomTarget').css('top', randomPosY);       
            // when click on target score + 1
            playerScore += 1;
            $('.scoreCount').html(`${playerScore}`);
            playerBullet -= 1;
            $('.bulletCount').html(`${playerBullet}`);
        }
    });
} //end targetGame.hitTarget Function
// when click bullet -1. 
targetGame.bulletUsed = function() {
    $('body').on('click', function(){
        if(playerBullet !== 0) {
            playerBullet -= 1   ;
        }
        $('.bulletCount').html(`${playerBullet}`);
        // if bulletis 0 prompt "no bullets, reload!"
        if(playerBullet === 0) {
            $('.reload-prompt').show();
        } 
    });
} //end targetGame.bulletUsed function

// if hit reload button. bullets reset to 6.
targetGame.reloadBullets = function() {
    $('.reload-btn').on('click',function(e){
        e.preventDefault();
        playerBullet = 6 + 1; 
        // + 1 is make up for the 1 that is reduced during when the button is clicked
        $('.reload-prompt').hide();
    }); 
} // end targetGame.reloadBullets functoin.
        


// console.log(score);

// if bullets = 0 and click health - 10 and prompt no bullets.

// once you get to 10 pts prompt you win

//////////////bonus: ////////////
// make moving targets
// if no response within 10 secs. health - 10/100
// have a nice visual with fancy targets animated bullets
// upon 10 pts change background and target colours as a "new level"

// this function to initialize all the functions of the game.
    targetGame.init = function (){
        // declaring height and width of targets and containers here. this way the page will load in order to get the correct values of the container and the widths/heights of the targets
        targetGame.targetWidth = $('.randomTarget').width();
        targetGame.targetHeight = $('.randomTarget').height();
        targetGame.containerHeight = $('.container').height();
        targetGame.containerWidth = $('.container').width(); 
        
        targetGame.randomTargetLocationY = targetGame.containerHeight - targetGame.targetHeight;
        targetGame.randomTargetLocationX = targetGame.containerWidth - targetGame.targetWidth;
        
        

        // console.log (targetGame.containerHeight, targetGame.containerWidth, targetGame.targetHeight, targetGame.targetWidth)


        targetGame.hitTarget();
        targetGame.bulletUsed();
        targetGame.reloadBullets();
    }
    
// calls targetGame.init to load the everything onto the page
$(function(){
    targetGame.init();
}); // end document ready
