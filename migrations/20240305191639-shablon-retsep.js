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
  return db.createTable('shablon_recipe', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    parent_id: {
      type: 'int'
    },
    doctor_id:{
      type: 'int'
    },
    pill_id:{
      type: 'int'
    },
    time:{
      type: 'int',
    },
    day:{
      type: 'int',
    },
    comment:{
      type: 'string',
    },
    name: {
      type: 'string',
    }
  });
};

exports.down = function(db) {
  return db.dropTable('shablon_recipe');
};

exports._meta = {
  "version": 1
};
