define(['model/example', 'view/example', 'linseed!control/example'], function (M, v, seeder) {
    'use strict';

    seeder('seed-example').seedEach({
        template: v,
        model: new M()
    });
});