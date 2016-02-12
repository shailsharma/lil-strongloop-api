module.exports = function(Quiz1) {
	Quiz1.beforeRemote('greet', function( context, modelInstance, next) { // modelInstance argument is unused here.. 
		console.log('Before Greetings');
		next();
	});
 
	Quiz1.greet = function(cb) {
		var msg = " Greetings ";
		console.dir(msg);
		cb(null, msg);
	};

	Quiz1.remoteMethod(
	    'greet',
	    {
	        http: {path: '/greet', verb: 'get'},
	        returns: {arg: 'results', type: 'string'}
	    }
	);
};
