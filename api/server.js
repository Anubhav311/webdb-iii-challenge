// Manage Roles (id, name)
const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('../routers/cohorts');
const studentsRouter = require('../routers/students');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;