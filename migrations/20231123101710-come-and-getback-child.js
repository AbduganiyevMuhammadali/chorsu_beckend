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
  return db.createTable("come_and_get_back_child", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    parent_id: {
      type: 'int',
    },
    type: {
      type: 'string'
    },
    datetime: {
      type: 'int',
    },
  });
};

exports.down = function(db) {
  return db.dropTable("come_and_get_back_child");
};

exports._meta = {
  "version": 1
};
