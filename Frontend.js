var xhr = new XMLHttpRequest();
var handle;
var email = paysafe.checkout.email;

function checkout() {
    paysafe.checkout.setup("cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ", {
        "singleUseCustomerToken	": token,
        "customerId": id,
        "currency": "USD",
        "amount": 10000,
        "locale": "en_US",
        "customer": {
            "firstName": "John",
            "lastName": "Dee",
            "email": "johndee@paysafe.com",
            "phone": "1234567890",
            "dateOfBirth": {
                "day": 1,
                "month": 7,
                "year": 1990
            }
        },
        "billingAddress": {
            "nickName": "John Dee",
            "street": "20735 Stevens Creek Blvd",
            "street2": "Montessori",
            "city": "Cupertino",
            "zip": "95014",
            "country": "US",
            "state": "CA"
        },
        "environment": "TEST",
        "merchantRefNum": "1559900597607",
        "canEditAmount": false,
        "merchantDescriptor": {
            "dynamicDescriptor": "XYZ",
            "phone": "1234567890"
        },
        "displayPaymentMethods": ["card"],
        "paymentMethodDetails": {
            "paysafecard": {
                "consumerId": "1232323"
            }
        }
    }, function (instance, error, result) {
        if (result && result.paymentHandleToken) {
            console.log(result.paymentHandleToken);
            // make AJAX call to Payments API
            handle = result.paymentHandleToken;
            xhr.open("POST", "Backend.js\makePayment()", true);
        }
        else {
            console.error(error);
            // Handle the error
        }
    }, function (stage, expired) {
        switch (stage) {
            case "PAYMENT_HANDLE_NOT_CREATED": // Handle the scenario
            case "PAYMENT_HANDLE_CREATED": // Handle the scenario
            case "PAYMENT_HANDLE_REDIRECT": // Handle the scenario
            case "PAYMENT_HANDLE_PAYABLE": // Handle the scenario
            default: // Handle the scenario
        }
    });
}
