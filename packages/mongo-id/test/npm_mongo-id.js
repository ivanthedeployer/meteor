require('strict-mode')(function () {


var should = require('chai').should(),
    _ = require('underscore'),
    MongoID = require('../id.js');

// Minimal test to make sure there are no errors in compiling file
describe('build test', function(){
    it('verifies file build', function(){
      (_.isObject(MongoID)).should.equal(true);
      (_.isFunction(MongoID.ObjectID)).should.equal(true);
    });
});

});
