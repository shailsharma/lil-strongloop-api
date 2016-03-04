module.exports = function(Quiz) {
	var app = require('../../server/server');
	Quiz.observe('before save', function getQuestions(ctx, next) {
		var dummyQuesInstance = [];
		var counter = 1;
		if (ctx.instance) {
			var quesModel = app.models.Question;
			for(var question in ctx.instance.questions){
				quesModel.upsert(ctx.instance.questions[question] , function (err, quesInstance) {
					if(err){
						console.log(err);
					}else {
						var id = quesInstance.id;
						var order = quesInstance.order;
						var dummyObject = {};
						dummyObject.id = id;
						dummyObject.order = order;
						dummyQuesInstance.push(dummyObject);
						if(counter == ctx.instance.questions.length){
							ctx.instance.questions = dummyQuesInstance;
							next();
						} 
						counter = counter + 1;
					}
					
				}); 
			}	
		} else if(ctx.data.questions){
			var quesModel = app.models.Question;
			for(var quesIndex in ctx.data.questions){
				quesModel.upsert(ctx.data.questions[quesIndex], 
					function (err, quesInstance) {
					if(err){
						console.log(err);
					}else {
						var id = quesInstance.id;
						var order = quesInstance.order;
						var dummyObject = {};
						dummyObject.id = id;
						dummyObject.order = order;
						dummyQuesInstance.push(dummyObject);
						if(counter == ctx.data.questions.length){
							ctx.data.questions = dummyQuesInstance;
							next();
						} 
						counter = counter + 1;
					}
				}); 
			}
		}
	});

	Quiz.beforeRemote('greet', function( context, modelInstance, next) { // modelInstance argument is unused here.. 
			console.log('Before Greetings');
			next();
		});
	 
	Quiz.greet = function(cb) {
		var msg = " Greetings ";
		console.dir(msg);
		cb(null, msg);
	};

	Quiz.fetchQuesData = function(id, cb) {
		var msg = id;
		console.log(msg);
		Quiz.findById(id , function(err,quizInstance){
			if(err)
			cb(null, err);
			else {
				console.log("Hi");
				console.log("Questions" + JSON.stringify(quizInstance.questions));
				var quesModel = app.models.Question;
				var dummyQuesInstance = [];
				var counter = 1;
				for(var quesIndex in quizInstance.questions){
					console.log("indexxxx" +quesIndex);
					var quesId = quizInstance.questions[quesIndex].id;
					quesModel.findById(quesId, function(err, quesInstance){
						dummyQuesInstance.push(quesInstance);
						console.log("quesInstance "+JSON.stringify(quesInstance));
						counter = counter + 1;
						if(counter == quizInstance.questions.length){
							console.log("counter" + counter + "length" + quizInstance.questions.length);
							quizInstance.questions = dummyQuesInstance;
							console.log("quizInstance.questions "+JSON.stringify(quizInstance.questions));
							console.log("dummyQuesInstance" + JSON.stringify(dummyQuesInstance));
							cb(null, quizInstance);
						}
					});
				}
				

				
			}
		});
		
	};

	Quiz.remoteMethod(
	    'greet',
	    {
	        http: {path: '/greet', verb: 'get'},
	        returns: {arg: 'results', type: 'string'}
	    }
	);

	Quiz.remoteMethod(
	    'fetchQuesData',
	    {
	    	accepts:{arg: 'id', type: 'string', required: true},
            http: {path: '/:id/fetchQuesData', verb: 'get'},
	        returns: {arg: 'results', type: 'string'}
	    }
	);

};
