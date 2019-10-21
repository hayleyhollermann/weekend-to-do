const express = require('express');
const taskRouter = express.Router();
// requires database from pool
const pool = require ('../modules/pool.js');

// GET
taskRouter.get('/', (req, res) => {
    console.log('in GET');
    // selecting all columns from tasks table in database
    const query = 'SELECT * FROM tasks ORDER BY "id";';
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET query', error);
        res.sendStatus(500);        
    });
});

// POST
taskRouter.post('/', (req, res) => {
    console.log('in POST');
    // adding new task to tasks table in database
    const query = `INSERT INTO "tasks" ("task")
	VALUES($1);`;
    pool.query(query, [req.body.task])
    .then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error making insert query', error);
        res.sendStatus(500);        
    });
})

// PUT
taskRouter.put('/:id', (req, res) => {
    console.log('in PUT');
    // updating default false value to true for complete in table
    const query = `UPDATE "tasks" SET "complete" = $1
    WHERE "id" = $2;`;
    pool.query(query, [req.body.changeComplete, req.params.id]).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in Put query`, error);
        res.sendStatus(500);
    });
})

// DELETE
taskRouter.delete('/:id', (req, res) => {
    console.log('in DELETE');
    // deletes from database
    const query = `DELETE FROM "tasks"
    WHERE "id" = $1;`;
    pool.query(query, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error making DELETE query', error);
            res.sendStatus(500);
        });
})

// exports
module.exports = taskRouter;