const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
const fetch = require("node-fetch");

admin.initializeApp();

// Replace with your Paystack secret key
const PAYSTACK_SECRET = "sk_test_f63f11b014421da1f177565d4101e35bf6498d25";

exports.paystackWebhook = functions.https.onRequest(async (req, res) => {
  // Log request details for debugging
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  if (req.method !== "POST") {
    res.status(400).send("Invalid request method");
    return;
  }

  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET)
      .update(JSON.stringify(req.body)).digest("hex");

  if (hash === req.headers["x-paystack-signature"]) {
    const event = req.body;

    console.log("Event received: ", event);

    // If the event type is charge.success, verify the transaction
    if (event.event === "charge.success") {
      const reference = event.data.reference;

      try {
        const verificationResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${PAYSTACK_SECRET}`,
          },
        });

        const verificationResult = await verificationResponse.json();

        if (verificationResult.data.status === "success") {
          res.status(200).send("Payment verified");
        } else {
          res.status(400).send("Payment verification failed");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(200).send("Event received");
    }
  } else {
    res.status(400).send("Invalid signature");
  }
});
