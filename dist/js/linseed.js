define(function () {
    'use strict';

    function id(name) {
        return '[data-'.concat(name.replace(/\W?([A-Z])/g, '-$1')
            .replace(/\W/g, '-').toLowerCase(), ']');
    }

    function sprout(Obj, $, $e, options) {
        if ($.isFunction(Obj)) {
            if (!Obj.hasOwnProperty('prototype')) {
                return Obj($e);
            }
            return new Obj($e, options);
        } else if ($.isPlainObject(Obj)) {
            $.extend(Obj, options);
            return $e.data(Obj);
        } else if ($.isArray(Obj)) {
            return $.append.apply($e.data(options), Obj);
        } else {
            return $e;
        }
    }

    return {
        load: function (name, req, onLoad, conf) {
            if (conf.isBuild) {
                req([name]);
                onLoad();
            } else {
                req(['jquery', name], function ($, Value) {
                    onLoad(function (binding) {
                        return {
                            seed: function () {
                                if ($('[data-' + binding + ']').length > 0) {
                                    return [sprout(Value, $, $(id(binding)))];
                                }
                            },
                            seedEach: function (options) {
                                var exports = [];
                                $(id(binding)).each(function (i, e) {
                                    exports.push(sprout(Value, $, $(e), options));
                                });
                                return exports;
                            }
                        };
                    });
                });
            }
        }
    };
});
