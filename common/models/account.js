module.exports = function(Account) {
 Account.greet = function(cb) {
    var msg = 'User';
    cb(null, 'grettings.... ' + msg );
 };
 
 Account.remoteMethod(
    'greet',
    {
        http: {path: '/greet', verb: 'get'},
//        accepts: {arg: 'msg', type: 'string'},
        returns: {arg: 'greeting', type: 'string'}
    }
 );
};
