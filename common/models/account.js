module.exports = function(Account) { 
	Account.sendGreet = function(cb) {
        var msg = "Greetings Recieved";
        console.dir(msg);
        cb(null, msg);
    };

	Account.beforeRemote('greet', function( context, modelInstance, next) { // modelInstance argument is unused here.. 
		console.log('Before Greetings');
		next();
	});
 
	Account.greet = function(cb) {
		var msg = " Greetings ";
		console.dir(msg);
		cb(null, msg);
	};

	Account.staticQuery1 = function(cb) {
		Account.find({ where: {subject : 'sub1'} } , function (err, instance) {
			// console.dir("Instance Object:" + instance);
			cb(null, instance);
		});
	};

	Account.argQuery1 = function(sub, cb) {
		Account.find({ where: {subject : sub} } , function (err, instance) {
			// console.dir("Instance Object:" + instance);
			cb(null, instance);
		});
	};

	 
	Account.remoteMethod(
	    'greet',
	    {
	        http: {path: '/greet', verb: 'get'},
	        returns: {arg: 'results', type: 'string'}
	    }
	);

	Account.remoteMethod(
	    'staticQuery1',
	    {
	        http: {path: '/staticQuery1', verb: 'get'},
			//  accepts: {arg: 'msg', type: 'string'},
	        returns: {arg: 'results', type: 'string'}
	    }
	);

	Account.remoteMethod(
	    'argQuery1',
	    {
			http: {path: '/argQuery1', verb: 'get'},
			accepts: {arg: 'sub', type: 'string', http: { source: 'query' } },
			returns: {arg: 'results', type: 'string'}
	    }
	);

	Account.remoteMethod(
        'sendGreet',
        {
            http: {path: '/sendGreet', verb: 'post'},
            returns: {arg: 'results', type: 'string'}
        }
    );

 };
