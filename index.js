/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

require('dotenv').config()
const express = require('express');
const helmet = require('helmet')
const defaults = require('./config/default')

const projects = require('./Routes/Projects')
const actions = require('./Routes/Actions')

const server = express();

server.use(express.json());

server.use(helmet())
server.use('/api/projects', projects);
server.use('/api/actions', actions);
  
// watch for connections on port 5000
server.listen(defaults.port, () => {
    console.log(`\n*** Server Running on http://localhost${defaults.port} ***\n`);
  });
  

server.get('/', (req, res) => {
    res.send('Welcome to the projects API');
  });