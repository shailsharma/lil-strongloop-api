var describe = require('mocha').describe;
var it = require('mocha').it;
var expect = require('chai').expect;

describe('Mocha tests', function(){

  it('should say hello', function(){
    var message = 'Hello';
    expect(message).to.equal('Hello');
  });

});
