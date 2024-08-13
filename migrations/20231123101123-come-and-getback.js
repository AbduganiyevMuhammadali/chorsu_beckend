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
  return db.createTable("come_and_get_back", {
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
    real_come_time: {
      type: 'int',
      notNull: false
    },
    real_leave_time: {
      type: 'int',
      notNull: false
    },
    come_time: {
      type: 'int',
      notNull: false
    },
    leave_time:  {
      type: "int",
      notNull: false
    },
    do_not_come: {
      type: 'boolean'
    },
  });
};

exports.down = function(db) {
  return db.dropTable("come_and_get_back");
};

exports._meta = {
  "version": 1
};
