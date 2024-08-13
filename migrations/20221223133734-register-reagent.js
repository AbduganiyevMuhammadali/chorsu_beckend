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
  return db.createTable("register_reagent", {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey: true,
      notNull: true
    },
    reagent_id:{
      type: 'int',
      notNull: true
    },
    date_time:{
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal(17, 3)',
      notNull: true
    },
    count:{
      type: 'decimal(17, 3)'
    },
    summa:{
      type: 'decimal(17, 3)'
    },
    doc_id:{
      type: 'int'
    },
    doc_type:{
      type: 'string'
    },
    type: {
      type: 'boolean'
    },
    sereis_id: {
      type: 'int',
    },
    reg_inspection_key: {
      type: 'string',
      notNull: false
    },
    reg_inspection_child_id: {
      type: 'int',
      notNull: false
    },
    ins_cat_id: {
      type: 'int',
      notNull: false
    },
    inspection_id: {
      type: 'int',
      notNull: false
    }
  });
};

exports.down = function(db) {
  return db.dropTable("register_reagent");
};

exports._meta = {
  "version": 1
};
