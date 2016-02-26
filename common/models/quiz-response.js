module.exports = function (QuizResponse) {

    QuizResponse.updateResponse = function (data, cb) {
        console.log("assignmentId" + data.assignmentId);
        console.log("submittedBy" + data.submittedBy);
        console.log("quizId" + data.quizId);

        QuizResponse.find({ where: { and: [{ assignmentId: data.assignmentId }, { submittedBy: data.submittedBy }, { quizId: data.quizId }] } }, function (err, instance) {
            console.log("Instance Object :" + instance);

            if (instance == "") {
                QuizResponse.create(data, function (err, instance) {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(null, instance);
                    }
                });
            } else {
                for (var dataIndex in data.questionResponses) {
                    
                    console.log("QOID from data" + dataIndex);
                    console.log("QOID from DB" + instance[0]["questionResponses"]);
                    console.log("exsist" + instance[0]["questionResponses"][dataIndex]);

                    if(instance[0]["questionResponses"][dataIndex] == undefined){
                    	console.log( " Value:"+ data.questionResponses[dataIndex]);
                    	instance[0]["questionResponses"][dataIndex] = data.questionResponses[dataIndex];
                    	//data.questionResponses = instance[0]["questionResponses"];
					 } else {
					 	
					 	var dummyArray = instance[0]["questionResponses"][dataIndex];
					 	console.log("dummyArray" + dummyArray);
					 	var finalAttemptsArray = dummyArray.concat(data.questionResponses[dataIndex]);
					 	instance[0]["questionResponses"][dataIndex] = finalAttemptsArray;
					 	//data.questionResponses = instance[0]["questionResponses"];
					 	 
					 }
				}
				QuizResponse.upsert(instance[0],function(err, instance) {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(null, instance);
                    }
                });

      		}
                //cb(null, instance);
            
        });
		
    };

    QuizResponse.remoteMethod(
        'updateResponse',
        {
            http: { path: '/updateResponse', verb: 'post' },
            accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
            returns: { arg: 'quizResponse', type: 'string' }
        }
        );

};
