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
  return db.createTable("manual_rasxod_reagent_child", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    parent_id: {
      type: 'int',
    },
    reagent_id: {
      type: 'int',
    },
    ins_cat_id: {
      type: 'int'
    },
    count: {
      type: 'decimal(17, 3)',
    },
    balance: {
      type: 'decimal(17, 3)'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("manual_rasxod_reagent_child");
};

exports._meta = {
  "version": 1
};
