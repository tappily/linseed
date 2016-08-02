define(['jquery', 'typekit-load', 'control/stylesheet'], function ($, tkload, SS) {
    'use strict';

    return function (element) {
        var id = element.data('tk-id');
        var loadingCss = element.data('tk-loading');
        if (loadingCss) {
            var noTypeCss = new SS.CSSStyleSheet(loadingCss);
            noTypeCss.enable($('head')[0]);
            var cb = $.proxy(noTypeCss.disable, noTypeCss);
            tkload(id, cb, cb);
        } else {
            tkload(id);
        }
    };
});
