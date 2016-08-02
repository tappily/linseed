/*
 * ADOBE CONFIDENTIAL
 * ==================
 * Copyright 2013 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

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