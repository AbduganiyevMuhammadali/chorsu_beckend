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
    `ALTER TABLE surgery_registration
      ADD COLUMN before_sur_text text,
      ADD COLUMN after_sur_text text
    ;`,
    callback
  );
};

exports.down = function(db, callback) {
  db.runSql(
    `ALTER TABLE surgery_registration
      DROP COLUMN before_sur_text,
      DROP COLUMN after_sur_text
    ;`,
    callback
  );
};

exports._meta = {
  "version": 1
};
