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
  return db.createTable("user_face_id_history", {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey:true,
      notNull: true
    },
    ipaddress: {
      type: 'string'
    },
    major: {
      type: 'int',
      notNull: false,
    },
    minor: {
      type: "int",
      notNull: false
    },
    time: {
      type: 'datetime',
      notNull: false
    },
    cardType: {
      type: 'string',
      notNull: false
    },
    name: {
      type: 'string',
      notNull: false
    },
    cardReaderNo: {
      type: 'string',
      notNull: false
    },
    doorNo: {
      type: "string",
      notNull: false
    },
    employeeNoString: {
      type: 'string',
      notNull: false
    },
    type: {
      type: "int"
    },
    serialNo: {
      type: 'string',
      notNull: false
    },
    userType: {
      type: 'string',
      notNull: false
    },
    currentVerifyMode: {
      type: 'string',
      notNull: false
    },
    mask: {
      type: 'string',
      notNull: false
    }
  });
};

exports.down = function(db) {
  return db.dropTable("user_face_id_history");
};

exports._meta = {
  "version": 1
};
