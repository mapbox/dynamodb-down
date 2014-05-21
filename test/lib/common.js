var dynalite = require('dynalite');

exports.setUp = function(t) {
    var dynalite = require('dynalite')({
        createTableMs: 0,
        updateTableMs: 0,
        deleteTableMs: 0
    });
    dynalite.listen(4567, function() {
        t.end();
    });
};

var dbidx = 0;

exports.location = function() {
    return 'dynamodb://localhost:4567/_db_test_' + dbidx++;
};
