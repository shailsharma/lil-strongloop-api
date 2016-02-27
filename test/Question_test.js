var request = require('request');
var describe = require('mocha').describe;
var it = require('mocha').it;
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Get /Questions', function(){

  it('Get list of Questions', function(done){
  	url = 'http://localhost:3000/api/questions';
    request(url, function(error, response, body) {
    	expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('CRUD Operations on Question Model', function(){
  var id;
  it('Adding question', function(done){
    url = 'http://localhost:3000/api';
    chai.request(url)
    .post('/questions')
    .send({'order':2 , 'display':'Multiple Choice'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('order');
      res.body.should.have.property('display');
      res.body.order.should.equal(2);
      res.body.display.should.equal("Multiple Choice");
      if(id == null){
        id = res.body.id;
      }
      done();
     });
   });

  it('Fetching Question Data', function(done){
    url = 'http://localhost:3000/api/questions/';
    chai.request(url)
    .get(id)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('order');
      res.body.should.have.property('display');
      res.body.order.should.equal(2);
      res.body.display.should.equal("Multiple Choice");
      done();
     });
   });

  it('Updating Question Data', function(done){
    url = 'http://localhost:3000/api/questions/';
    chai.request(url)
    .put(id)
    .send({'order':3})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.have.status(200);
      res.should.be.json;
      console.log("Id:" + id)
      console.log("Body" + res.body);
      res.body.should.have.property('id');
      res.body.should.have.property('order');
      res.body.should.have.property('display');
      res.body.order.should.equal(3);
      res.body.display.should.equal("Multiple Choice");
      done();
     });
   });

  it('Deleting Question Data', function(done){
    url = 'http://localhost:3000/api/questions/';
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
