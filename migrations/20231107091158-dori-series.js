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
  return db.createTable("dori_series", {
    id:{
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    date_time:{
      type: 'int'
    },
    dori_id: {
      type: 'int',
      notNull: true
    },
    price:{
      type: 'decimal'
    },
  });
};

exports.down = function(db) {
  return db.dropTable("dori_series");
};

exports._meta = {
  "version": 1
};
