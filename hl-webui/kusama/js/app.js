$(document).ready(function() {
    
    /* This is not working right, but worthy.
    var href = window.location.href;
    switch (href) {
        case 'life.html':
            $('#lifeContent').css('display', 'block');
            break;
        case 'work.html':
            $('#workContent').css('display', 'block');
            break;
        case 'exhibition.html':
            $('#expoContent').css('display', 'block');
            break;
        default:
            $('#lifeContent').css('display', 'block');
            break;
    }*/

    $('.rope').click(function() {
        $(this).blur();
        if (buttonClicked == false) {
            $(this).stop().animate({top: '0px'}, {queue: false, duration: 350, easing: 'easeOutBounce'});
            window.location.href = $(this).find('a').attr('href');
            buttonClicked = true;
        } else {
            $(this).stop().animate({top: '-48px'}, {queue: false, duration: 350, easing: 'easeOutBounce'});
            window.location.href = $(this).find('a').attr('href');
            buttonClicked = false;
        }
        
        return false;
    });
});