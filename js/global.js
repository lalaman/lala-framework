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

function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

(function(window){
    if(window.Package){
        Lala = {};
    } else {
        window.Lala = {};
    }
})(window);

Lala.modal = function(options) {
    if (!options) {
        new LaModal();
    } else {
        new LaModal(options);
    }
};

Lala.alert = function(message, status, duration) {
    if (!message) {
        new Lalalert();
    } else {
        new Lalalert({
            message: message,
            status: status,
            duration: duration
        }).show();
    }
};

Lala.modal();
Lala.alert();
