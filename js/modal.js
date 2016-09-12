(function() {

    // the constructor
    this.LaModal = function() {

        // global element references
        this.selector = null;

        var defaults = {
            selector: ''
        };

        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0]);
            if (this.options.selector) {
                this.selector = this.options.selector;
            }
        }

        this.init();
    };

    LaModal.prototype.init = function() {
        var i, modal_buttons;

        // init all the modals
        if (!this.selector) {
            modal_buttons = document.querySelectorAll('[la-modal-for]');
            for(i = 0; i < modal_buttons.length; i++) {
                // find corresponding modal
                var selector_for = modal_buttons[i].attributes['la-modal-for'].value;
                var corresponding_modal = findModal.call(this,selector_for);

                // create overlay and attach close event listener to it
                buildOverlay.call(this, corresponding_modal);

                // add event listeners for opening modal
                activateOpenButtons.call(this, modal_buttons[i], corresponding_modal);

                // add event listeners for closing modal
                activateCloseButtons.call(this, corresponding_modal);
            }
        }
        // only init selected modal
        else {
            // bind selector to open modal
            modal_buttons = document.querySelectorAll(this.selector);
            if (modal_buttons.length === 0) { return; }
            var selector = modal_buttons[0].attributes['la-modal-for'].value;
            var modal = findModal(selector);
            buildOverlay.call(this, modal);

            for (i = 0; i < modal_buttons.length; i++) {
                activateOpenButtons.call(this, modal_buttons[i], modal);
            }

            activateCloseButtons.call(this, modal);
        }
    };

    // open modal
    LaModal.prototype.open = function(modal) {

        // add animations
        if (modal.classList.contains('open')) {
            return;
        } else {
            bodyNoScroll(true);
            modal.style.display = 'block';
            setTimeout(function() {
                modal.classList.add('open');
            }, 10);
        }
    };

    LaModal.prototype.close = function(modal) {
        if (modal.classList.contains('open')) {
            bodyNoScroll(false);
            modal.classList.remove('open');
            setTimeout(function() {
                modal.style.display = 'none';
            }, 250);
        }
    };

    // private methods

    function findModal(selector) {
         return document.querySelectorAll('[la-modal="' + selector + '"]')[0];
    }

    // build dark overlay
    function buildOverlay(modal) {
        var overlay = createOverlay();
        overlay.addEventListener('click', this.close.bind(null, modal));
        modal.insertBefore(overlay, modal.firstChild);
        return;
    }

    // make all open modal buttons active
    function activateOpenButtons(button, modal) {
        button.addEventListener('click', this.open.bind(null, modal));
        return;
    }

    // find all close buttons and activate them
    function activateCloseButtons(modal) {
        var close_buttons = modal.querySelectorAll('[la-modal-close]');
        for (var i = 0; i < close_buttons.length; i++) {
            close_buttons[i].addEventListener('click', this.close.bind(null, modal));
        }
        return;
    }

})();
