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
  return db.createTable("calculate_payment_user_table", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    datetime: {
      type: 'int',
    },
    user_id: {
      type: 'int',
      notNull: true
    },
    summa: {
      type: 'decimal(17, 3)',
    },
    bonus: {
      type: 'decimal(17, 3)',
    },
    comment: {
      type: 'string',
    }
  });
};

exports.down = function(db) {
  return db.dropTable("manual_rasxod_reagent");
};

exports._meta = {
  "version": 1
};
