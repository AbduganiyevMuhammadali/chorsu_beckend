const db = require('../db/db-sequelize');

module.exports = async function(){
    try {
        await db.authenticate();
	    // await db.query('SET GLOBAL sql_mode=TRADITIONAL')
        console.log('Connection has been established successfully.');
    }catch(error) {
        console.error('Unable to connect to the database:', error);
    }
}
