module.exports = function(Quiz) {
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
