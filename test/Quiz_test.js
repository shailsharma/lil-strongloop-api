var request = require('request');
var describe = require('mocha').describe;
var it = require('mocha').it;
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('CRUD Operations on Quiz Model', function(){
  var id;
  it('Adding quiz along with questions', function(done){
    url = 'http://localhost:3000/api';
    chai.request(url)
    .post('/quizzes')
    .send({'stage': 'Draft' , 'questions':[{'id': '56c69e0671b066f823677d28', 'order': 1,'type': 'Multiple-Choice'}]})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('stage');
      res.body.should.have.property('questions');
      res.body.questions[0].should.have.property('id');
      res.body.questions[0].should.have.property('order');
      res.body.questions[0].should.not.have.property('type');
      res.body.stage.should.equal('Draft');
      res.body.questions[0].id.should.equal('56c69e0671b066f823677d28');
      res.body.questions[0].order.should.equal(1);
      if(id == null){
        id = res.body.id;
      }
      done();
     });
   });

  it('Fetching Quiz Data', function(done){
    url = 'http://localhost:3000/api/quizzes/';
    chai.request(url)
    .get(id)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('stage');
      res.body.should.have.property('questions');
      res.body.questions[0].should.have.property('id');
      res.body.questions[0].should.have.property('order');
      res.body.stage.should.equal('Draft');
      res.body.questions[0].id.should.equal('56c69e0671b066f823677d28');
      res.body.questions[0].order.should.equal(1);
      done();
     });
   });

  it('Updating Quiz Data', function(done){
    url = 'http://localhost:3000/api/quizzes/';
    chai.request(url)
    .put(id)
    .send({'stage':'Saved', 'questions':[{'id': '56c69e0671b066f823677d28', 'order': 9}]})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('id');
      res.body.should.have.property('stage');
      res.body.should.have.property('questions');
      res.body.questions[0].should.have.property('id');
      res.body.questions[0].should.have.property('order');
      res.body.stage.should.equal('Saved');
      res.body.questions[0].id.should.equal('56c69e0671b066f823677d28');
      res.body.questions[0].order.should.equal(9);
      done();
     });
   });

  it('Deleting Quiz Data', function(done){
    url = 'http://localhost:3000/api/quizzes/';
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
