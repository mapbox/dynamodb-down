var AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN,
    AWS = require('aws-sdk'),
    url = require('url'),
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
    this._client = new AWS.DynamoDB({
        endpoint: new AWS.Endpoint('http://localhost:4567')
    });
    this._table = parsed.path.split('/')[1];
}

util.inherits(Dyn, AbstractLevelDOWN);

Dyn.prototype._open = function (options, callback) {
};

Dyn.prototype._close = function (callback) {
    process.nextTick(function () {
        callback();
    });
};

Dyn.prototype._put = function (key, value, options, callback) {
    callback();
};

Dyn.prototype._get = function (key, options, callback) {
    callback();
};

Dyn.prototype._del = function (key, options, callback) {
    callback();
};

Dyn.prototype._batch = function (array, options, callback) {
    callback();
};

Dyn._siblingResolver = function (key, siblings, options, callback) {
    callback(null, siblings[0].value);
};

module.exports = Dyn;
