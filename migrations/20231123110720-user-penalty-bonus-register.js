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
  return db.createTable("user_penalty_bonus_register", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    doc_id: {
      type: 'int',
    },
    type: {
      type: 'string'
    },
    type_come: {
      type: 'string'
    },
    summa: {
      type: 'decimal(17, 3)',
    },
  });
};

exports.down = function(db) {
  return db.dropTable("user_penalty_bonus_register");
};

exports._meta = {
  "version": 1
};
