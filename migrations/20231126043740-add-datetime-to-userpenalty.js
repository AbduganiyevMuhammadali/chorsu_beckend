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
  return db.addColumn("user_penalty_bonus", "datetime", {
    type: 'int'
  })
};

exports.down = function(db) {
  return db.removeColumn("user_penalty_bonus", "datetime");
};

exports._meta = {
  "version": 1
};
