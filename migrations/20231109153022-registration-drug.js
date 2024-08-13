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
  return db.createTable("registration_drug", {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    reg_id: {
      type: 'int',
      notNull: true
    },
    user_id: {
      type: 'int',
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable("registration_drug");
};

exports._meta = {
  "version": 1
};
