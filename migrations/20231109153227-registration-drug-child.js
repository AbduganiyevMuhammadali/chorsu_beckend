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
  return db.createTable("registration_drug_child", {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    parent_id: {
      type: "int",
      notNull: true
    },
    dori_id: {
      type: 'int',
      notNull: true,
    },
    day: {
      type: "date",
    },
    status:  {
      type: 'boolean'
    },
    comment: {
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable("registration_drug_child");
};

exports._meta = {
  "version": 1
};
