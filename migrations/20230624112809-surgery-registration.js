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
  return db.createTable("surgery_registration", {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    doctor_id: {
      type: 'int'
    },
    registration_id: {
      type: 'int',
      notNull: true
    },
    status:{
      type: 'boolean'
    },
    surgery_id: {
      type: 'int',
      notNull: true
    },
    type: {
      type: 'int',
      notNull: true
    },
    date_time: {
      type: 'int',
      notNull: true
    },
    all_summa: {
      type: 'decimal'
    }
  });
};

exports.down = function (db) {
  return db.dropTable("surgery_registration");
};

exports._meta = {
  "version": 1
};
