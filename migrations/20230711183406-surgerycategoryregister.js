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
  return db.createTable('register_surgery_category', {
    id: { 
      type: 'int', 
      primaryKey: true, 
      autoIncrement: true, 
      notNull: true
    },
    date_time:{
      type: 'int'
    },
    price:{
      type: 'decimal'
    },
    all_price: {
      type: 'decimal'
    },
    doc_id:{
      type: 'int'
    },
    category_id: {
      type: 'int'
    },
    surgery_id: {
      type: 'int'
    },
    doc_type:{
      type: 'string'
    },
    place: {
      type: 'string',
    }
  });
};

exports.down = function(db) {
  return db.dropTable('register_surgery_category');
};

exports._meta = {
  "version": 1
};
