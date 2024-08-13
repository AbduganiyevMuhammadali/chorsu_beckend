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
  return db.createTable("a4_images", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    image_name: {
      type: 'string',
    },
    key: {
      type: 'string',
    }
  });
};

exports.down = function(db) {
  return db.dropTable("a4_images");
};

exports._meta = {
  "version": 1
};
