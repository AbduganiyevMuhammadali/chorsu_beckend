'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.addColumn("registration_drug_child", "count", {
    type: 'int'
  })
};

exports.down = function(db) {
  return db.removeColumn("registration_drug_child", "count");
};

exports._meta = {
  "version": 1
};
