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

exports.up = function(db, callback) {
  db.runSql(
    `ALTER TABLE register_palata
      ADD COLUMN summa_type DECIMAL(10, 0),
      ADD COLUMN pay_type varchar(255)
    ;`,
    callback
  );
};

exports.down = function(db, callback) {
  db.runSql(
    `ALTER TABLE register_palata
      DROP COLUMN summa_type,
      DROP COLUMN pay_type
    ;`,
    callback
  );
};

exports._meta = {
  "version": 1
};
