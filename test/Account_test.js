var request = require('request');
var describe = require('mocha').describe;
var it = require('mocha').it;
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Mocha tests', function(){

  it('should say hello', function(){
    var message = 'Hello Strong Loop';
    expect(message).to.equal('Hello Strong Loop');
  });

});

describe('Get /greet', function(){
  it('Greet user', function(done){
  	url = 'http://localhost:3000/api/accounts/greet';
    request(url, function(error, response, body) {
    	expect(response.statusCode).to.equal(200);
    	expect(body).to.equal('{"results":" Greetings "}');
    	console.log("Body:" + body);
    	console.log("Response:" + response);
    	done();
    });
  });
});

describe('Post /sendGreet', function(){
  it('Send Greetings via Post', function(done){
  	url = 'http://localhost:3000/api/accounts';
    chai.request(url)
    .post('/sendGreet')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
   });  
  });
});