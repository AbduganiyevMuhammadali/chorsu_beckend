'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("inspection_reagent_calc", {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    inspection_id: {
      type: 'int',
      notNull: true,
    },
    inspection_child_id: {
      type: 'int',
      notNull: true
    },
    reagent_id: {
      type: 'int',
      notNull: true
    },
    count: {
      type: 'decimal',
      default: 0
    },
  });
};

exports.down = function (db) {
  return db.dropTable("inspection_reagent_calc");
};

exports._meta = {
  "version": 1
};
