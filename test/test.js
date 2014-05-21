var test = require('tap').test;
    common = require('./lib/common'),
    Dyn = require('../');

require('abstract-leveldown/abstract/leveldown-test').args(Dyn, test, common);
require('abstract-leveldown/abstract/open-test').args(Dyn, test, common);
// require('abstract-leveldown/abstract/open-test').open(Dyn, test, common);
// require('abstract-leveldown/abstract/put-test').all(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/del-test').all(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/get-test').all(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/put-get-del-test').all(DynaDown, test, testCommon, testBuffer, process.browser && Uint8Array);
// require('abstract-leveldown/abstract/batch-test').all(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/chained-batch-test').all(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/close-test').close(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/iterator-test').all(DynaDown, test, testCommon);
// require('abstract-leveldown/abstract/ranges-test').all(DynaDown, test, testCommon);
