/**
 * Created by s.van.den.berg on 17-10-14.
 */
'use strict';

(function (window) {

    function setTrigger(instance) {
        var trigger = util.search(instance.options.trigger);
        trigger.addEventListener('click', function () {
            instance.openByTrigger();
        });
    }

    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    function appendToBody(instance, element) {
        var modalContainer = document.createElement('div'),
            closeButton = null;
        if (instance.options.className) {
            util.addClass(modalContainer, instance.options.className);
            modalContainer.id = element.id;
            instance.currentIndex = '#' + element.id;
            if (instance.options.trigger === null) {
                util.addClass(modalContainer, 'show');
            } else {
                util.addClass(modalContainer, 'trigger');
                setTrigger(instance);
            }
        }
        modalContainer.innerHTML = element.innerHTML;
        if (instance.options.closeButton) {
            closeButton = document.createElement('button');
            closeButton.id = element.id + '-button';
            closeButton.addEventListener('click', function () {
                instance.close();
            });
            modalContainer.appendChild(closeButton);
        }
        util.search('body').appendChild(modalContainer);
        if (!instance.options.keepInDom) {
            element.remove();
        }
    }

    function create(instance) {
        var source = util.search(instance.options.selector);
        util.addClass(source, 'hidden');

        if (typeof source.length === 'number' && source) {
            util.each(source, function (element) {
                appendToBody(instance, element);
            });
        } else {
            appendToBody(instance, source);
        }
    }
    var first = 0,
        Modal = function () {
            var self = this,
                defaults = {
                    closeOnEsc: true,
                    closeOnClick: true,
                    closeButton: true,
                    overlay: true,
                    width: 800,
                    height: 600,
                    selector: '.modal-source',
                    trigger: null,
                    className: 'modal',
                    currentIndex: '',
                    animation: 'fromLeft',
                    animationInvert: 'toTop',
                    keepInDom: false
                },
                neededArgumentsIndex = 0,
                parameters = arguments[neededArgumentsIndex];

            // Create options by extending defaults with the passed in arugments
            if (parameters && typeof parameters === "object") {
                self.options = extendDefaults(defaults, arguments[first]);
            } else {
                self.options = defaults;
            }
            create(self);
        };

    Modal.prototype.openByTrigger = function () {
        var self = this,
            body = util.search('body'),
            createdModal = util.search(self.currentIndex);

        util.addClass(body, 'noscroll');
        if (self.options.animation) {
            util.addClass(createdModal, self.options.animation);
        }
        createdModal.addEventListener('animationend', function () {
            util.removeClass(createdModal, self.options.animation);
            util.removeClass(body, 'noscroll');
            console.log('Animation is ended');
        });
        util.removeClass(createdModal, 'trigger');
        util.addClass(createdModal, 'show');
    };

    Modal.prototype.close = function () {
        var self = this,
            createdModal = util.search(self.currentIndex),
            body = util.search('body');

        util.addClass(body, 'noscroll');
        if (self.options.animationInvert) {
            util.removeClass(createdModal, self.options.animation);
            util.addClass(createdModal, self.options.animationInvert);
            createdModal.addEventListener('animationend', function () {
                if (util.hasClass(createdModal, self.options.animationInvert)) {
                    util.removeClass(createdModal, self.options.animationInvert);
                    util.removeClass(createdModal, 'show');
                    if (self.options.trigger !==  null) {
                        util.addClass(createdModal, 'trigger');
                    } else {
                        util.addClass(createdModal, 'hidden');
                    }
                    util.removeClass(body, 'noscroll');
                    console.log('Animation is ended');
                }
            });
        }
    };

    window.Modal = Modal;

}(window));
