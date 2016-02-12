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
      res.body.should.have.property('results');
      res.body.results.should.equal('Greetings Recieved');
      done();
     });
   });
});

describe('CRUD Operations', function(){
  var id;
  it('Adding data', function(done){
    url = 'http://localhost:3000/api';
    chai.request(url)
    .post('/accounts')
    .send({'email': 'test1@test.com'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('email');
      res.body.email.should.equal('test1@test.com');
      if(id == null){
        id = res.body.id;
      }
      done();
     });
   });

   it('Fetching data', function(done){
    url = 'http://localhost:3000/api/accounts/';
    chai.request(url)
    .get(id)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('email');
      res.body.email.should.equal('test1@test.com');
      done();
     });
   });

   it('Deleting data', function(done){
    url = 'http://localhost:3000/api/accounts/';
    chai.request(url)
    .delete(id)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('count');
      res.body.count.should.equal(1);
      done();
     });
   });

});
