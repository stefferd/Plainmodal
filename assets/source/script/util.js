/**
 * Created by s.van.den.berg on 20-10-14.
 */
'use strict';

(function (window) {
    var util = {};
    util.version = '0.0.1';

    util.addClass = function (element, className) {
        if (element.className.indexOf(className) === -1) {
            if (element.className.length > 0) {
                element.className += ' ' + className;
            } else {
                element.className = className;
            }
        }
    };

    util.removeClass = function (element, className) {
        var appendedClasses = element.className,
            appendedClassesArray = appendedClasses.split(' '),
            foundAtIndex = -1,
            currentIndex = 0;

        if (appendedClasses.indexOf(className) > -1) {
            for (currentIndex; currentIndex < appendedClassesArray.length; currentIndex += 1) {
                if (appendedClassesArray[currentIndex] === className) {
                    foundAtIndex = currentIndex;
                    break;
                }
            }
            if (foundAtIndex > -1) {
                appendedClassesArray.splice(foundAtIndex, 1);
            }
            appendedClasses = appendedClassesArray.join(' ');
        }
        element.className = appendedClasses;
    };

    util.hasClass = function (element, className) {
        return (element.className.indexOf(className) > -1);
    };

    util.each = function (elements, callback) {
        return [].map.call(elements, callback);
    };

    util.search = function (selector) {
        var firstCharacter,
            searchQuery = '',
            foundElements = null;
        if (!selector) {
            return this;
        }
        // Handle HTML strings
        if (typeof selector === "string") {
            firstCharacter = selector.charAt(0);
            if (firstCharacter.indexOf('#') > -1) {
                // Search element by id
                searchQuery = selector.substr(1, selector.length);
                foundElements = document.getElementById(searchQuery);
            } else if (firstCharacter.indexOf('.') > -1) {
                // Search element(s) by class
                searchQuery = selector.substr(1, selector.length);
                foundElements = document.getElementsByClassName(searchQuery);
            } else {
                // Lookup by element
                searchQuery = selector;
                foundElements = document.getElementsByTagName(searchQuery);
            }
        }

        if (typeof foundElements.length === 'number') {
            if (foundElements.length === 1) {
                foundElements = foundElements[0];
            } else {
                foundElements = [].slice.call(foundElements);
            }
        }

        return foundElements;
    };
    util.searchInRange = function (selector, range) {
        var firstCharacter,
            searchQuery = '',
            foundElements = null;

        if (!selector || !range) {
            return this;
        }
        if (typeof selector === "string") {
            firstCharacter = selector.charAt(0);
            if (firstCharacter.indexOf('#') > -1) {
                // Search element by id
                searchQuery = selector.substr(1, selector.length);
                foundElements = range.getElementById(searchQuery);
            } else if (firstCharacter.indexOf('.') > -1) {
                // Search element(s) by class
                searchQuery = selector.substr(1, selector.length);
                foundElements = range.getElementsByClassName(searchQuery);
            } else {
                // Lookup by element
                searchQuery = selector;
                foundElements = range.getElementsByTagName(searchQuery);
            }
        }

        if (typeof foundElements.length === 'number') {
            if (foundElements && foundElements.length === 1) {
                foundElements = foundElements[0];
            } else {
                foundElements = [].slice.call(foundElements);
            }
        }

        return foundElements;
    };

    window.util = util;

})(window);