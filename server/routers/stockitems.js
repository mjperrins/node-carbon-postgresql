const Router = require('express-promise-router')
const db = require('./db')
const { Pool, Client } = require('pg')
const util = require('util')
const assert = require('assert');

const router = new Router()

// Initialise the
// load local VCAP configuration  and service credentials
let pgcert;
let pguri;
try {
  pgcert = Buffer(process.env.PGCERT, 'base64');
  pguri= process.env.PGURI;
  console.log("Loaded Environment Varaibles");
} catch (e) {
  console.log(e)
}

// This check ensures there is a services for PostgreSQL databases
assert(!util.isUndefined(pgcert) && !util.isUndefined(pguri), "Must have PostGreSQL configuration");

// We want to parse connectionString to get username, password, database name, server, port
// So we can use those to connect to the database
const parse = require('pg-connection-string').parse;
console.log(pguri);
let config = parse(pguri);

// Add some ssl
config.ssl = {
  ca: pgcert
}

// set up a new PG client using our config details
let pool = new Pool(config);

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})


module.exports = function(app) {
  var router = Router();

  router.get('/connection', function (req, res, next) {

    // Return the Connection information for the database
    res.json({certificate: process.env.PGCERT, uri: process.env.PGURI});

  });

  router.get('/items', async (req, res) => {

    console.log("Querying All Stock Items...")

    // Simple
    /*
    const sql = 'SELECT * FROM stock_items';
    const result = await pool.query(sql);
    res.send(result.rows)
    */

    pool
        .query('SELECT s.* \
                   FROM stock_items s \
                   LIMIT 100')
        .then( function(results) {
          res.send(results.rows)
        })
        .catch( function(err) {
          console.error('Error executing query', err.stack)
          res.error(500, err);
        });

    // Simple Query
    //const { rows } = await db.query('SELECT * FROM stock_items')
    //res.send(rows[0])

  })

  router.get('/items/:id', async (req, res) => {

    // Get the ID on the query String
    const { id } = req.params

    console.log("Querying Just one Stock Item ..."+id)

    // Query a single items from the database
    const { rows } = await db.query('SELECT * FROM stock_items WHERE sku_id = $1', [id])
    res.send(rows[0])

  })

  app.use("/stock", router);
}
