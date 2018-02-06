$(function(){


// have targets (divs) that randomize location or slide in and out and a set time frame. set timeout set interval
// targets x and y locations need to be relative to the users screen size.
// use math.floor math.random to randomize for x and y

//get click function to be detected.
// on click the target disappears

// set varibles with default values.
const player = {
    score: 0,
    bullet: 6,
};

    $('.target').on('click', function(){
        console.log(`target clicked`);
        $(this).hide();
        player.score ++;
        $('.scoreCount').append(`${player.score}`);
    });

    // console.log(score);

// when click on target score + 1
// when click bullet -1. 
// max 6 bullets.
// if bullets = 0 and click health - 10 and prompt no bullets.
// if hit reload button. bullets reset to 6.

// once you get to 10 pts prompt you win

//////////////bonus: ////////////
// make moving targets
// if no response within 10 secs. health - 10/100
// have a nice visual with fancy targets animated bullets
// upon 10 pts change background and target colours as a "new level"

}); // end document ready
