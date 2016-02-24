module.exports = function(Assignment) {
		var app = require('../../server/server');	
		Assignment.observe('before save', function getQuiz(ctx, next) {
			if (ctx.instance) {
			var quizModel = app.models.Quiz;
			for(var quizIndex in ctx.instance.UID_Quiz){
					quizModel.upsert(ctx.instance.UID_Quiz[quizIndex] , function (err, quizInstance) {
						if(err){
							console.log(err);
						}else {
							 console.log("quiz Instance" + quizInstance);
						}
					}); 
				}
			for(var quizIndex in ctx.instance.UID_Quiz){
				var quiz = ctx.instance.UID_Quiz[quizIndex];
				var id = quiz.id;
				var order = quiz.order;
				var tmpquiz = {};
				tmpquiz.id = id;
				tmpquiz.order = order;
				ctx.instance.UID_Quiz[quizIndex] = tmpquiz;
				}
			}
			next();
		});
};
