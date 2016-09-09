var body = document.getElementsByTagName('body')[0];

function bodyNoScroll(status) {
    if (status) {
        body.style.overflow = 'hidden';
        if (window.innerWidth > 600) {
            body.style.paddingRight = '17px';
        }
    } else {
        body.style.overflow = 'auto';
        if (window.innerWidth > 600) {
            body.style.paddingRight = '0';
        }
    }
}

window.onload = function() {

    // init all modals
    new LaModal();
};
