require('strict-mode')(function(){

var should = require('chai').should(),
    _ = require('underscore'),
    IdMap = require('../id-map.js');

// Minimal test to make sure there are no errors in compiling file
describe('build test', function(){
    it('verifies file build', function(){
      (_.isFunction(IdMap)).should.equal(true);
    });
});

});
