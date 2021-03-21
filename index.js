const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const CronJob = require('cron').CronJob;
const utilConfig = require('util992/config');
const utilGeneral = require('util992/functions/general');

require('dotenv').config();

const v = require('./values');

utilConfig.g.hitInHouseEndpointBaseURL(v.dev.hostURL);
utilConfig.airtable.apiKey(process.env.airtableAPIKey);
utilConfig.airtable.baseId(process.env.airtableBaseId);

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

const banksRouter = require('./routes/banksRouter');
app.use('/bank', banksRouter);

// awake the service every X minutes
// var job = new CronJob('* * * * * *', async function () {
//   try {
//     console.log(
//       await utilGeneral.hitInHouseEndpoint('/sample', 'get', {test: 'test'})
//     );
//   } catch (err) {
//     console.log(
//       await utilGeneral.constructResponse(
//         false,
//         err.code,
//         `Couldn't awake the service on ${Date()}`,
//         err
//       )
//     );
//   }
// });
// job.start();

app.use((req, res, next) => {
  console.log(req.headers);
  res.status(200).setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});

// const testFuncs = require('./playGround');
// testFuncs.testFuncs.general();
