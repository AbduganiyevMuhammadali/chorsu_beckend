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
  return db.createTable("register_salary_user", {
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
    type: {
      type: "boolean"
    },
    doc_type: {
      type: 'string'
    },
    doc_id: {
      type: 'int'
    },
    pay_type: {
      type: 'string',
    },
    comment: {
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("register_salary_user");
};

exports._meta = {
  "version": 1
};
