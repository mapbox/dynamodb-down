var AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN,
    AWS = require('aws-sdk'),
    url = require('url'),
    tableLayout = require('./table.json'),
    util = require('util');

function toKey(key) {
    return typeof key === 'string' ? key : JSON.stringify(key);
}

function Dyn(location) {
    if (!(this instanceof Dyn)) return new Dyn(location);
    AbstractLevelDOWN.call(this, location);
    var parsed = url.parse(location);
    AWS.config.update({
        accessKeyId: 'fake',
        secretAccessKey: 'fake',
        region: 'us-east-1'
    });
    this._endpoint = 'http://' + parsed.hostname + ':' + parsed.port;
    this._client = new AWS.DynamoDB({
        endpoint: new AWS.Endpoint(this._endpoint)
    });
    this._table = parsed.path.split('/')[1];
    this._hash = parsed.path.split('/')[2];
}

util.inherits(Dyn, AbstractLevelDOWN);

Dyn.prototype._open = function (options, callback) {
    tableLayout.TableName = this._table;
    ensureTableExists(this._client, tableLayout, function() {
        console.log(arguments);
        callback();
    });
};

Dyn.prototype._close = function (callback) {
    process.nextTick(function() {
        callback();
    });
};

Dyn.prototype._put = function (key, value, options, callback) {
    this._client.putItem({
        TableName: this._table,
        Item: {
            id: { S: key },
            hash: { S: this._hash },
            value: { S: value }
        }
    }, function(err) {
        callback();
    });
};

Dyn.prototype._get = function (key, options, callback) {
    this._client.getItem({
        Key: {
            id: { S: key },
            hash: { S: this._hash }
        },
        TableName: this._table,
        ConsistentRead: true
    }, onload);

    function onload(err, resp) {
        if (err) return callback(err);
        if (resp && resp.Item && resp.Item.value) {
            if (options && options.asBuffer === false) {
                callback(err, resp.Item.value.S);
            } else {
                callback(err, new Buffer(resp.Item.value.S));
            }
        } else {
            callback(new Error('NotFound'));
        }
    }
};

Dyn.prototype._del = function (key, options, callback) {
    this._client.deleteItem({
        Key: {
            id: { S: key },
            hash: { S: this._hash }
        },
        TableName: this._table
    }, onload);

    function onload(err, resp) {
        if (err) return callback(err);
        callback(err);
    }
};

Dyn.prototype._batch = function (array, options, callback) {
    callback();
};

Dyn._siblingResolver = function (key, siblings, options, callback) {
    callback(null, siblings[0].value);
};

module.exports = Dyn;

function ensureTableExists(client, table, cb) {
    function check() {
        client.describeTable({TableName: table.TableName}, function (err, data) {
            if (err && err.code === 'ResourceNotFoundException') {
                client.createTable(table, function (err) {
                    if (err) return cb(err);
                    setTimeout(check, 0);
                });
            } else if (err) {
                cb(err);
            } else if (data.Table.TableStatus === 'ACTIVE') {
                cb();
            } else {
                setTimeout(check, 1000);
            }
        });
    }
    check();
}
