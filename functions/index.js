// index.js (Firebase Functions)

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.paystackWebhook = functions.https.onRequest(async (req, res) => {
  // Verify the webhook signature
  const event = req.body;

  // Verify the event signature (for added security)
  // Use the Paystack secret key to verify the webhook
  const paystackSecret = "sk_test_f63f11b014421da1f177565d4101e35bf6498d25";

  const crypto = require("crypto");
  const hash = crypto.createHmac("sha512", paystackSecret)
      .update(req.rawBody).digest("hex");
  if (req.headers["x-paystack-signature"] !== hash) {
    return res.status(400).send("Invalid signature");
  }

  // Handle the event
  switch (event.event) {
    case "charge.success":
      // Handle successful payment
      console.log("Payment was successful:", event.data);
      // Update order status, etc.
      break;
    case "charge.failed":
      // Handle failed payment
      console.log("Payment failed:", event.data);
      break;
    default:
      console.log("Unhandled event type:", event.event);
    // Handle other events
  }

  // Respond to Paystack
  res.status(200).send("Event received");
});
