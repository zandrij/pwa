function App() {
  async function onApplePayButtonClicked() {
    // Consider falling back to Apple Pay JS if Payment Request is not available.
    if (!PaymentRequest) {
      return;
    }

    try {
      // Define PaymentMethodData
      const paymentMethodData = [
        {
          supportedMethods: "https://apple.com/apple-pay",
          data: {
            version: 12,
            merchantIdentifier: "merchant.com.apdemo",
            merchantCapabilities: ["supports3DS"],
            supportedNetworks: ["amex", "discover", "masterCard", "visa"],
            countryCode: "US",
          },
        },
      ];
      // Define PaymentDetails
      const paymentDetails = {
        total: {
          label: "Disbursement Demo (Card is not charged)",
          amount: {
            value: "12.00",
            currency: "USD",
          },
        },
        modifiers: [
          {
            supportedMethods: "https://apple.com/apple-pay",
            data: {
              disbursementRequest: {},
              additionalLineItems: [
                {
                  label: "Total Amount",
                  amount: "12.00",
                },
                {
                  label: "Apple Pay Demo",
                  amount: "12.00",
                  disbursementLineItemType: "disbursement",
                },
              ],
            },
          },
        ],
      };
      // Define PaymentOptions

      // Create PaymentRequest
      const request = new PaymentRequest(paymentMethodData, paymentDetails);
      const response = await request.show();
      const status = "success";
      await response.complete(status);
    } catch (e) {
      console.log(e);
    }
  }

  async function google() {
    const paymentMethods = [
      {
        supportedMethods: "https://play.google.com/billing",
        data: {
          apiVersion: 2,
          sku: "6c26db3f_5ab0_4b92_aca7_f4bad5de9317",
        },
      },
    ];

    const paymentDetails = {
      total: {
        label: `Total`,
        amount: { currency: `USD`, value: `10` },
      },
    };

    const request = new PaymentRequest(paymentMethods, paymentDetails);
    try {
      const paymentResponse = await request.show();
      const { purchaseToken } = paymentResponse.details;
      console.log({ purchaseToken });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <>
      <button onClick={onApplePayButtonClicked}> payment</button>
      <button onClick={google}>android payment</button>
    </>
  );
}

export default App;
