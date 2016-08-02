define(['can/control'], function(C) {
    'use strict';

    return C.extend({
        default: {
            model: null,
            template: null
        }
    },{
        init: function(el) {
            this.options.view = this.options.template(this.options.model);
            this.element.append(this.options.view);
            //this.on();
            this.log(this.element.data('example-message'));
        },
        log: function(message) {
            this.options.model.attr('message', message);
        },
        '{model} message': function(el, ev, val, oVal) {
            //console.log(arguments);
        }
    });
});
