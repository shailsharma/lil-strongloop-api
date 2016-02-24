module.exports = function(Quiz) {
		var app = require('../../server/server');	
		Quiz.observe('before save', function getQuestions(ctx, next) {
			if (ctx.instance) {
				var quesModel = app.models.Question;
				console.log("Question from context" + ctx.instance.questions);
				for(var question in ctx.instance.questions){
					quesModel.upsert(ctx.instance.questions[question] , function (err, quesInstance) {
						if(err){
							console.log(err);
						}else {
							 console.log("Question Instance" + quesInstance);
						}
					}); 
				}
				for(var questionIndex in ctx.instance.questions){
					var question = ctx.instance.questions[questionIndex];
					var id = question.id;
					var order = question.order;
					var tmpQuestion = {};
					tmpQuestion.id = id;
					tmpQuestion.order = order;
					ctx.instance.questions[questionIndex] = tmpQuestion;
				}
			} else if(ctx.data.questions){
				var quesModel = app.models.Question;
				for(var quesIndex in ctx.data.questions){
					quesModel.upsert(ctx.data.questions[quesIndex], 
							function (err, quesInstance) {
							if(err){
								console.log(err);
							}else {
								 console.log("question Instance" + quesInstance);
							}
						}); 
					}
			}
			next();
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

		Quiz.remoteMethod(
		    'greet',
		    {
		        http: {path: '/greet', verb: 'get'},
		        returns: {arg: 'results', type: 'string'}
		    }
		);
};
