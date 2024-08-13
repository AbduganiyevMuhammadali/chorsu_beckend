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
  return db.addColumn("penalties_and_bonus", "summa", {
    type: 'decimal(17, 3)'
  })
};

exports.down = function(db) {
  return db.removeColumn("penalties_and_bonus", "summa");
};

exports._meta = {
  "version": 1
};
