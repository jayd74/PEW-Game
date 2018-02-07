$(function(){


// have targets (divs) that randomize location or slide in and out and a set time frame. set timeout set interval
// targets x and y locations need to be relative to the users screen size.
// use math.floor math.random to randomize for x and y

//get click function to be detected.
// on click the target disappears

// set varibles with default values.
// score start at 0;
// start with and max 6 bullets .
    const player = {
        score: 0,
        bullet: 6,
    };
    $('.scoreCount').html(`${player.score}`);
    $('.bulletCount').html(`${player.bullet}`);


    $('.target').on('click', function(){
        console.log(`target clicked`);
        $(this).hide();

        // when click on target score + 1
        player.score ++;
        $('.scoreCount').html(`${player.score}`);

        // if target is clicked and there are no bullets. score does not go up (score -1 ???) and prompt reload!
 
    });
    
    // when click bullet -1. 
    $('body').on('click', function(){
        // console.log('click')
        player.bullet --;
        $('.bulletCount').html(`${player.bullet}`);
        
    // if bullet is 0 prompt "no bullets, reload!"
        if(player.bullet === 0) {
            player.bullet ++;
            $('.reload-prompt').show();
            console.log('no bullets, Reload!');
        }
    });

    // if hit reload button. bullets reset to 6.
    $('.reload-btn').on('click',function(e){
        e.preventDefault();
        player.bullet = 6 + 1; 
        $('.reload-prompt').hide();

        // + 1 is to make up for the 1 that is reduced during when the button is clicked

        // console.log('button pressed')
    }); 
        
    // console.log(score);

// if bullets = 0 and click health - 10 and prompt no bullets.

// once you get to 10 pts prompt you win

//////////////bonus: ////////////
// make moving targets
// if no response within 10 secs. health - 10/100
// have a nice visual with fancy targets animated bullets
// upon 10 pts change background and target colours as a "new level"

}); // end document ready
