var dynalite = require('dynalite');

var dynalite = require('dynalite')({
    createTableMs: 0,
    updateTableMs: 0,
    deleteTableMs: 0
});

exports.setUp = function(t) {
    dynalite.listen(4567, function() {
        t.end();
    });
};

exports.tearDown = function(t) {
    dynalite.close();
    t.end();
};

var dbidx = 0;
var layerid = 0;

exports.location = function() {
    return 'dynamodb://localhost:4567/_db_test_' + dbidx++ + '/layer_' + layerid++;
};
