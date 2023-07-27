import { badrequest, created, notfound, ok } from '../handlers/response.handlers.js';
import express from 'express';
import stripe from 'stripe';
import { config } from 'dotenv';
config();

const router = express.Router();
const apiKey = process.env.API_KEY;
const secretKey = process.env.API_SECRET;
const configuredStripe = await stripe(secretKey);

router.get('/config', async (req, res, next) => {
  res.send({
    publishableKey: `${apiKey}`,
  });
});

router.get('/balance', async (req, res, next) => {
  try {
    const balance = await configuredStripe.balance.retrieve();

    res.send({ balance });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.get('/payment_links', async (req, res, next) => {
  try {
    let links = [];
    const { data } = await configuredStripe.paymentLinks.list({
      limit: 10,
    });

    data.map(
      async ({ id }) =>
        await configuredStripe.paymentLinks.listLineItems(
          id,
          {
            limit: 10,
          },
          function (err, lineItems) {
            if (err) err.message;
            links.push(lineItems);

            if (links.length === data.length) res.send({ info: data, details: links });
          }
        )
    );
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.get('/payment-intents', async (req, res, next) => {
  try {
    const paymentIntents = await configuredStripe.paymentIntents.list({
      limit: 10,
    });

    res.send({ paymentIntents });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.get('/create-payment-intent', async (req, res, next) => {
  try {
    const paymentIntent = await configuredStripe.paymentIntents.create({
      currency: 'EUR',
      amount: 1,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.post('/cancel-payment-intent/:id', async (req, res, next) => {
  try {
    const paymentIntents = await configuredStripe.paymentIntents.cancel(req.params.id);
    res.send({ paymentIntents });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.get('/refunds', async (req, res, next) => {
  try {
    const refunds = await configuredStripe.refunds.list({
      limit: 5,
    });

    res.send(refunds);
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

router.post('/refunds/:id', async (req, res, next) => {
  let { amount } = req.body;
  const { id } = req.params;

  try {
    if (typeof amount === 'undefined' || amount === null) amount = 1;
    const paymentIntent = await configuredStripe.paymentIntents.retrieve(id);

    if (paymentIntent.status !== 'succeeded')
      return res.status(400).send({
        error: {
          message: 'Payment is not succeeded. Try another one',
        },
      });

    const refund = await configuredStripe.refunds.create({
      charge: paymentIntent.latest_charge,
      amount: amount * 100,
    });

    res.send(refund);
  } catch (error) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

export default router;
