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
    `ALTER TABLE registration_pay
      ADD COLUMN status varchar(255),
      ADD COLUMN doctor_id INT,
      ADD COLUMN hodim_id INT
    ;`,
    callback
  );
};

exports.down = function(db, callback) {
  db.runSql(
    `ALTER TABLE registration_pay
      DROP COLUMN status,
      DROP COLUMN doctor_id,
      DROP COLUMN hodim_id
    ;`,
    callback
  );
};

exports._meta = {
  "version": 1
};
