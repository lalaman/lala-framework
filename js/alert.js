(function() {

    // constructor
    this.Lalalert = function() {

        // globals
        this.container = null;
        this.alert = null;
        this.message = '';
        this.status = 'info';
        this.duration = 0;
        this.timeout = null;

        var defaults = {
            message: '',
            status: 'info',
            duration: 5000
        };

        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0]);
            this.message = defaults.message;
            this.status = defaults.status;
            this.duration = defaults.duration;
        } else {
            this.init();
        }

    };

    Lalalert.prototype.init = function() {
        var alerts = document.querySelectorAll('[lala-alert]');
        for (var i = 0; i < alerts.length; i++) {
            var status = alerts[i].attributes['lala-alert'].value;
            var message = alerts[i].attributes['lala-alert-msg'].value;
            var duration = parseInt(alerts[i].attributes['lala-alert-dur'].value);
            alerts[i].addEventListener('click', show_alert.bind(alerts[i], status, message, duration));
        }

        function show_alert(status, message, duration) {
            new Lalalert({
                status: status,
                message: message,
                duration: duration
            }).show();
        }
    };

    // add alert to view
    Lalalert.prototype.show = function() {
        // create container if it doesn't exist already
        var container = document.querySelectorAll('.lala-alert-container')[0];
        if (!container) {
            this.container = document.createElement('div');
            this.container.classList.add('lala-alert-container');
            document.body.appendChild(this.container);
        } else {
            this.container = container;
        }

        // create alert
        this.alert = document.createElement('div');
        this.alert.classList.add('lala-alert');
        this.alert.classList.add(this.status);
        this.alert.innerHTML = this.message;

        // create close button
        var close_button = document.createElement('button');
        close_button.classList.add('la-alert-close');
        var icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.innerHTML = 'close';
        close_button.appendChild(icon);

        // add close button to alert
        this.alert.appendChild(close_button);

        // add alert to container
        this.container.insertBefore(this.alert, this.container.firstChild);
        setTimeout(function() { this.alert.classList.add('appear'); }.bind(this), 50);
        this.alert.addEventListener('mouseover', pause.bind(this));
        this.alert.addEventListener('mouseout', destroy.bind(this));
        this.alert.addEventListener('click', instadestroy.bind(this));
        destroy.call(this);
    };

    // remove alert after duration
    function destroy() {
        this.timeout = setTimeout(function() {
            this.alert.classList.remove('appear');
            this.timeout = setTimeout(function() {
                if (this.timeout) {
                    this.alert.parentNode.removeChild(this.alert);

                    // check if this is the last alert
                    var remaining = document.querySelectorAll('.lala-alert');
                    if (remaining.length < 1) {
                        this.container.parentNode.removeChild(this.container);
                    }
                }
            }.bind(this), 500);
        }.bind(this), this.duration);
    }

    function instadestroy() {
        clearTimeout(this.timeout);
        this.alert.classList.remove('appear');
        setTimeout(function() {
            if (this.timeout) {
                this.alert.parentNode.removeChild(this.alert);

                // check if this is the last alert
                var remaining = document.querySelectorAll('.lala-alert');
                if (remaining.length < 1) {
                    this.container.parentNode.removeChild(this.container);
                }
            }
        }.bind(this), 500);
    }

    // pause alert removal
    function pause() {
        clearTimeout(this.timeout);
    }
})();
