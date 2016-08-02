define(function () {
    'use strict';
    var exports = {

        /**
         * Attach a new stylesheet to the document
         * @author Brian Tapley <btapley#adobe.com>
         * @param {HTMLHeadElement} htmlheadelement
         * @param {String} href
         * @returns {CSSStyleSheet}
         */
        createStyleSheet: function (htmlheadelement, href) {
            if (typeof htmlheadelement === 'undefined' || htmlheadelement.nodeType !== 1) {
                throw(new TypeError('argument is not an element'));
            }
            if (htmlheadelement.nodeName !== 'HEAD') {
                throw(new TypeError('element argument must be a <head> tag'));
            }
            if (href === undefined) {
                throw(new TypeError('argument is undefined'));
            }

            var sheet = null,
                doc = htmlheadelement.ownerDocument || htmlheadelement.document;

            if (doc.createStyleSheet) {
                doc.createStyleSheet(href);
                sheet = doc.styleSheets[doc.styleSheets.length - 1];
            } else if (doc.createElement) {
                sheet = doc.createElement('link');
                sheet.setAttribute('rel', 'stylesheet');
                sheet.setAttribute('href', href);
                htmlheadelement.appendChild(sheet);
            }

            return sheet;
        },
        /**
         * Find stylesheets with a native property in the current document
         * @author Brian Tapley <btapley#adobe.com>
         * @param {Document} doc document object to search
         * @param prop
         * @returns {Array} CSSStylesheet array
         */
        getStyleSheetsByProperty: function (doc, prop) {
            var sheets = [];
            for (var i = 0, l = doc.styleSheets.length;
                 i < l;
                 i++) {
                if (doc.styleSheets[i].hasOwnProperty(prop)) {
                    sheets.push(doc.styleSheets[i]);
                }
            }
            return sheets;
        },
        /**
         * Set the disabled property to true
         * @author Brian Tapley <btapley#adobe.com>
         * @param {CSSStyleSheet} sheet
         * @returns {CSSStyleSheet}
         */
        disableStyleSheet: function (sheet) {
            if (sheet === undefined || sheet === null) {
                return sheet;
            }

            sheet.disabled = true;

            return sheet;
        },
        /**
         * Remove the disabled attribute and set the disabled property to false
         * @author Brian Tapley <btapley#adobe.com>
         * @param {CSSStyleSheet} sheet
         * @returns {CSSStyleSheet}
         */
        enableStyleSheet: function (sheet) {
            if (typeof sheet === 'undefined' || sheet === null) {
                return sheet;
            }

            sheet.disabled = false;

            if (sheet.removeAttribute) {
                sheet.removeAttribute('disabled');
            }

            return sheet;
        }
    };

    /**
     * @class
     * Wrap a the StyleSheet element with cross-browser methods
     * @author Brian Tapley <btapley#adobe.com>
     * @param {String} href Set the href property to be used when the StyleSheet is enabled
     */
    exports.CSSStyleSheet = function (href) {
        this.setHref(href);
        this.disabled = false;
        this.element = null;
    };

    exports.CSSStyleSheet.prototype = {
        /**
         * Set the href property to be used when the StyleSheet is enabled
         * @author Brian Tapley <btapley#adobe.com>
         * @param {String} href
         */
        setHref: function (href) {
            this.href = href.toString();
        },
        /**
         * Attach this StyleSheet to the dom or set disabled to false on the element and set disabled property on this object
         * @param {HTMLHeadElement} htmlheadelement
         */
        enable: function (htmlheadelement) {
            if (this.element === null) {
                this.element = exports.createStyleSheet(htmlheadelement, this.href);
            } else {
                exports.enableStyleSheet(this.element);
            }
            this.disabled = false;
        },
        /**
         * Set the disabled attribute on the stylesheet element and the disabled property on this object
         * @author Brian Tapley <btapley#adobe.com>
         * @returns {void} nothing
         */
        disable: function () {
            exports.disableStyleSheet(this.element);
            this.disabled = true;
        },
        /**
         * @returns {String} '[Object InlineStyleSheet]'
         */
        toString: function () {
            return '[Object InlineStyleSheet]';
        }
    };

    return exports;
});

