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

const express = require('express');

// const data = require('./data/db');
// const router = require('./Router/Router')

const server = express();

server.use(express.json());

// server.use('/api/posts', router);

port = 5000
  
// watch for connections on port 5000
server.listen(port, () =>
console.log(`Server running on http://localhost:${port}`)
);

server.get('/', (req, res) => {
    res.send('Its working from index');
  });