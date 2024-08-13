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
  return db.createTable("reg_statsionar_doctor", {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    reg_stat_id: {
      type: 'int',
      notNull: true
    },
    statsionar_text: {
      type: 'text'
    },
    text: {
      type: 'text'
    },
    reg_id: {
      type: 'int',
      notNull: true
    },
    doctor_id: {
      type: 'int',
      notNull: true
    },
  });
};

exports.down = function (db) {
  return db.dropTable("reg_statsionar_doctor");
};

exports._meta = {
  "version": 1
};
