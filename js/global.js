function bodyNoScroll(status) {
    if (status) {
        document.body.style.overflow = 'hidden';
        if (window.innerWidth > 600) {
            document.body.style.paddingRight = '17px';
        }
    } else {
        document.body.style.overflow = 'auto';
        if (window.innerWidth > 600) {
            document.body.style.paddingRight = '0';
        }
    }
}

function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

function createOverlay() {
    var overlay = document.createElement('div');
    overlay.className = 'la-overlay';
    return overlay;
}

(function(window){
    if(window.Package){
        Lala = {};
    } else {
        window.Lala = {};
    }
})(window);

Lala.modal = function(selector) {
    if (!selector) new LaModal();
    else new LaModal({selector: selector});
};

Lala.alert = function(message, status, duration) {
    if (!message) new Lalalert();
    else new Lalalert({message: message, status: status, duration: duration}).show();
};

Lala.nav = function(selector) {
    if (!selector) new LaNav();
    else new LaNav({selector: selector});
};
