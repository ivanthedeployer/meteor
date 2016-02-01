require('strict-mode')(function () {
    var Tinytest = require('meteor-standalone-npm-tinytest');
    Tinytest.add("passes strict mode", function (test) {
        test.isTrue(true);
    });
    Tinytest.runNpm();
});
