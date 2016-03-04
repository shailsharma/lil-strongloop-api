module.exports = function(Assignment) {
	var app = require('../../server/server');	
	Assignment.observe('before save', function getQuiz(ctx, next) {
		var dummyQuizInstance = [];
		var counter = 1;
		if (ctx.instance) {
		var quizModel = app.models.Quiz;
		for(var quizIndex in ctx.instance.UID_Quiz){
				quizModel.upsert(ctx.instance.UID_Quiz[quizIndex] , function (err, quizInstance) {
					if(err){
						console.log(err);
					}else {
						var id = quizInstance.id;
						var order = quizInstance.order;
						var dummyObject = {};
						dummyObject.id = id;
						dummyObject.order = order;
						dummyQuizInstance.push(dummyObject);
						if(counter == ctx.instance.UID_Quiz.length){
							ctx.instance.UID_Quiz = dummyQuizInstance;
							next();
						} 
						counter = counter + 1;
					}
				}); 
			}
		}else if(ctx.data.UID_Quiz){
			var quizModel = app.models.Quiz;
			for(var quizIndex in ctx.data.UID_Quiz){
				quizModel.upsert(ctx.data.UID_Quiz[quizIndex], 
					function (err, quizInstance) {
					if(err){
						console.log(err);
					}else {
						var id = quizInstance.id;
						var order = quizInstance.order;
						var dummyObject = {};
						dummyObject.id = id;
						dummyObject.order = order;
						dummyQuizInstance.push(dummyObject);
						if(counter == ctx.data.UID_Quiz.length){
							ctx.data.UID_Quiz = dummyQuizInstance;
							next();
						} 
						counter = counter + 1;
					}
				}); 
			}
		}
	});
};
