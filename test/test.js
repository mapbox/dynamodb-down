var test = require('tap').test;
    common = require('./lib/common'),
    Dyn = require('../');

require('abstract-leveldown/abstract/leveldown-test').args(Dyn, test, common);
require('abstract-leveldown/abstract/open-test').setUp(test, common);
require('abstract-leveldown/abstract/open-test').args(Dyn, test, common);
require('abstract-leveldown/abstract/open-test').open(Dyn, test, common);
require('abstract-leveldown/abstract/open-test').tearDown(test, common);
require('abstract-leveldown/abstract/put-test').all(Dyn, test, common);
require('abstract-leveldown/abstract/del-test').all(Dyn, test, common);
require('abstract-leveldown/abstract/get-test').all(Dyn, test, common);
// require('abstract-leveldown/abstract/put-get-del-test').all(Dyn, test, common);
// require('abstract-leveldown/abstract/batch-test').all(Dyn, test, common);
// require('abstract-leveldown/abstract/chained-batch-test').all(Dyn, test, common);
test('setup', function(t) { common.setUp(t); });
require('abstract-leveldown/abstract/close-test').close(Dyn, test, common);
test('teardown', function(t) { common.tearDown(t); });
// require('abstract-leveldown/abstract/iterator-test').all(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/ranges-test').all(Dyn, test, common);
