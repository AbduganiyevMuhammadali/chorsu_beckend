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
  return db.addColumn("user", "come_time", {
    type: 'time'
  })
};

exports.down = function(db) {
  return db.removeColumn("user", "come_time");
};

exports._meta = {
  "version": 1
};
