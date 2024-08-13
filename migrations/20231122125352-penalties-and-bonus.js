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
  return db.createTable("penalties_and_bonus", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    min_time: {
      type: 'int',
    },
    max_time: {
      type: 'int',
    },
    cause: {
      type: 'text',
    },
    type: {
      type: 'string',
    }
  });
};

exports.down = function(db) {
  return db.dropTable("penalties_and_bonus");
};

exports._meta = {
  "version": 1
};
