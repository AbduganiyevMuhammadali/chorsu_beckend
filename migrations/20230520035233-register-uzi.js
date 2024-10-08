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
  return db.createTable('register_uzi', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    date_time:{
      type: 'int'
    },
    vazvrat: {
      type: "boolean"
  },
    type:{
      type: 'int'
    },
    price:{
      type: 'decimal'
    },
    doc_type:{
      type: 'string'
    },
    doc_id:{
      type: 'int'
    },
    user_id: {
      type: 'int'
    },
    inspection_id:{
      type: 'int'
    },
    inspection_category:{
      type: 'int'
    },
    comment:{
      type: 'string'
    },
    place:{
      type: 'string'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('register_uzi');
};

exports._meta = {
  "version": 1
};
