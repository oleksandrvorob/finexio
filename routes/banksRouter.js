const express = require('express');
const bodyParser = require('body-parser');
const utilGeneral = require('util992/functions/general');
const utilAirtable = require('util992/functions/airtable');

const v = require('./../values');

const banksRouter = express.Router();
banksRouter.use(bodyParser.json());

banksRouter
  .route('/:routingNumber')
  .all((req, res, next) => {
    res.status(200).setHeader('Content-Type', 'application/json');
    res.status(200).setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .get((req, res, next) => {
    getBankName(req, res);
  })
  .post((req, res, next) => {
    res
      .status(404)
      .send(
        utilGeneral.endpointNotSupported(
          'post',
          'message',
          'This end point is not supported'
        )
      );
  });

async function getBankName(req, res) {
  let bankName = '';
  const routingNumber = req.params.routingNumber;
  try {
    const airtableRes = await utilAirtable.get.records(
      'Routing Numbers',
      1,
      undefined,
      `{Routing Number} = ${routingNumber}`
    );
    if (airtableRes.body.length > 0)
      bankName = airtableRes.body[0].fields['Bank Name'];

    res.status(200).send({
      bank: bankName,
    });
  } catch (err) {
    console.log(err);
    utilGeneral.constructResponse(
      false,
      404,
      'Failed in retrieving bank name.',
      err
    );
  }
}

module.exports = banksRouter;
