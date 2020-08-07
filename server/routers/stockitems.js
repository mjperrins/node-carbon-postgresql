const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()

module.exports = function(app) {
  var router = express.Router();

  router.get('/connection', function (req, res, next) {

    // Return the Connection information for the database
    res.json({host: process.env.PGHOST, username: process.env.PGUSER, database: process.env.PGDATABASE, port: process.env.PGPORT});

  });

  router.get('/items', async (req, res) => {

    // Query the whole table, be careful of large data sets use cursors
    const { rows } = await db.query('SELECT * FROM stock_items ')
    res.send(rows[0])
  })

  router.get('/items:id', async (req, res) => {

    // Get the ID on the query String
    const { id } = req.params

    // Query a single items from the database
    const { rows } = await db.query('SELECT * FROM stock_items WHERE sku_id = $1', [id])
    res.send(rows[0])
  })

  app.use("/stock", router);
}
