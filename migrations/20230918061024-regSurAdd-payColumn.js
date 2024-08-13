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
      ADD COLUMN backlog DECIMAL(10, 0),
      ADD COLUMN discount DECIMAL(10, 0),
      ADD COLUMN pay_summa DECIMAL(10, 0),
      ADD COLUMN \`key\` varchar(255)
    ;`,
    callback
  );
};

exports.down = function(db, callback) {
  db.runSql(
    `ALTER TABLE surgery_registration
      DROP COLUMN backlog,
      DROP COLUMN discount,
      DROP COLUMN pay_summa,
      DROP COLUMN key
    ;`,
    callback
  );
};

exports._meta = {
  "version": 1
};
