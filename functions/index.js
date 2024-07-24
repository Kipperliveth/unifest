const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

// Replace with your Paystack secret key
const PAYSTACK_SECRET = "sk_test_f63f11b014421da1f177565d4101e35bf6498d25";

exports.paystackWebhook = functions.https.onRequest((req, res) => {
  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET)
      .update(JSON.stringify(req.body)).digest("hex");

  if (hash === req.headers["x-paystack-signature"]) {
    const event = req.body;

    console.log("Event received: ", event);

    res.status(200).send("Webhook received");
  } else {
    res.status(400).send("Invalid signature");
  }
});
