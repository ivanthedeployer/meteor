var EJSON = require('meteor-standalone-ejson');
var global = Function('return this')();
var _ = require('underscore');

function getFns(LocalCollection) {

// Like _.isArray, but doesn't regard polyfilled Uint8Arrays on old browsers as
// arrays.
// XXX maybe this should be EJSON.isArray
var isArray = function (x) {
  return _.isArray(x) && !EJSON.isBinary(x);
};

// XXX maybe this should be EJSON.isObject, though EJSON doesn't know about
// RegExp
// XXX note that _type(undefined) === 3!!!!
var isPlainObject = LocalCollection._isPlainObject = function (x) {
  return x && LocalCollection._f._type(x) === 3;
};

var isIndexable = function (x) {
  return isArray(x) || isPlainObject(x);
};

// Returns true if this is an object with at least one key and all keys begin
// with $.  Unless inconsistentOK is set, throws if some keys begin with $ and
// others don't.
var isOperatorObject = function (valueSelector, inconsistentOK) {

  if (!isPlainObject(valueSelector))
    return false;

  var theseAreOperators = undefined;
  _.each(valueSelector, function (value, selKey) {
    var thisIsOperator = selKey.substr(0, 1) === '$';
    if (theseAreOperators === undefined) {
      theseAreOperators = thisIsOperator;
    } else if (theseAreOperators !== thisIsOperator) {
      if (!inconsistentOK)
        throw new Error("Inconsistent operator: " +
                        JSON.stringify(valueSelector));
      theseAreOperators = false;
    }
  });
  return !!theseAreOperators;  // {} has no operators
};


// string can be converted to integer
var isNumericKey = function (s) {
  return /^[0-9]+$/.test(s);
};

var fns = {
  isArray: isArray,
  isPlainObject: isPlainObject,
  isIndexable: isIndexable,
  isOperatorObject: isOperatorObject,
  isNumericKey: isNumericKey
};
  return fns;
}

if(global.LocalCollection){getFns(global.LocalCollection);}

module.exports = getFns;

