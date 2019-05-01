const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3',
  },
  useNullAsDefault: true, // needed for sqlite
};

const db = knex(knexConfig);


// list all roles
router.get('/', async (req, res) => {
    // get the roles from the database
    try {
      const roles = await db('cohorts'); // all the records from the table
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json(error);
    }
      // res.status(200).json('working')
  });
  
  // list a role by id
  router.get('/:id', async (req, res) => {
    // get the roles from the database
    try {
      const role = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  const errors = {
    '19': 'Another record with that value exists',
  };
  
  // create roles
  router.post('/', async (req, res) => {
    try {
      const [id] = await db('cohorts').insert(req.body);
  
      const role = await db('cohorts')
        .where({ id })
        .first();
  
      res.status(201).json(role);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });
  // update roles
  router.put('/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const role = await db('cohorts')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(role);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });
  
  // remove roles (inactivate the role)
  router.delete('/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });

module.exports = router;