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
  return db.createTable("user_penalty_bonus", {
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
    cause_id: {
      type: 'int',
    },
    summa: {
      type: 'decimal(17, 3)',
    },
    is_resonably: {
      type: 'boolean',
    },
    comment: {
      type: 'text'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("user_penalty_bonus");
};

exports._meta = {
  "version": 1
};
