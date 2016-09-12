(function() {

    // the constructor
    this.LaNav = function() {

        // global element references
        this.nav = null;
        this.selector = null;
        this.overlay = null;

        this.init();
    };

    LaNav.prototype.init = function() {
        var i, modal_buttons;

        // init all the navs
        if (!this.selector) {
            nav_buttons = document.querySelectorAll('[la-nav-for]');
            for(i = 0; i < nav_buttons.length; i++) {
                // find corresponding modal
                var selector_for = nav_buttons[i].attributes['la-nav-for'].value;
                var corresponding_nav = findNav.call(this, selector_for);

                nav_buttons[i].addEventListener('click', openNav.bind(nav_buttons[i], corresponding_nav));
            }
        }
        // only init selected nav
        else {
            // bind selector to open modal
            this.selector = document.querySelectorAll(this.selector);
            if (nav_buttons.length === 0) { return; }
            var selector = nav_buttons[0].attributes['la-nav-for'].value;
            this.nav = findNav(selector);

            this.selector.addEventListener('click', openNav.bind(this, this.nav));
        }
    };

    // private methods
    function findNav(selector) {
         return document.querySelectorAll('[la-nav="' + selector + '"]')[0];
    }

    // toggle nav open
    function openNav(nav) {
        nav.classList.add('nav-open');
        if (nav.classList.contains('nav-open')) {
            if (!this.overlay) {
                this.overlay = createOverlay();
                nav.parentNode.insertBefore(this.overlay, nav);
                this.overlay.addEventListener('click', closeNav.bind(this, nav));
            }
        }
    }

    function closeNav(nav) {
        nav.classList.remove('nav-open');
        nav.parentNode.removeChild(this.overlay);
        this.overlay = null;
    }


})();
