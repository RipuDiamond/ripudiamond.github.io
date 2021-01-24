var request = new XMLHttpRequest();
var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var id, token, status;

function createID(email) {
    request.open('POST', 'https://api.test.paysafe.com/paymenthub/v1/customers');

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Basic cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ');
    request.setRequestHeader('Simulator', '"EXTERNAL"');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            id = this.responseText.id;
        }
    };

    var body = {
        'merchantCustomerId': email,
        'locale': 'en_US',
        'firstName': 'John',
        'middleName': 'James',
        'lastName': 'Smith',
        'dateOfBirth': {
            'year': 1981,
            'month': 10,
            'day': 24
        },
        'email': email,
        'phone': '777-444-8888',
        'ip': '192.0.126.111',
        'gender': 'M',
        'nationality': 'Canadian',
        'cellPhone': '777-555-8888'
    };

    request.send(JSON.stringify(body));
    return id;
}





function createToken(id, email) {
    request1.open('POST', 'https://api.test.paysafe.com/paymenthub/v1/customers/' + id + '/singleusecustomertokens');

    request1.setRequestHeader('Content-Type', 'application/json');
    request1.setRequestHeader('Authorization', 'Basic cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ');
    request1.setRequestHeader('Simulator', '"EXTERNAL"');
    
    request1.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            token = this.responseText.singleUseCustomerToken;
        }
    };
    
    var body = {
        'merchantRefNum': email,
        'paymentTypes': [
            'CARD'
        ]
    };
    
    request1.send(JSON.stringify(body));
    return token;
}




function makePayment(handle) {
    request2.open('POST', 'https://api.test.paysafe.com/paymenthub/v1/payments');

    request2.setRequestHeader('Content-Type', 'application/json');
    request2.setRequestHeader('Authorization', 'Basic cHVibGljLTc3NTE6Qi1xYTItMC01ZjAzMWNiZS0wLTMwMmQwMjE1MDA4OTBlZjI2MjI5NjU2M2FjY2QxY2I0YWFiNzkwMzIzZDJmZDU3MGQzMDIxNDUxMGJjZGFjZGFhNGYwM2Y1OTQ3N2VlZjEzZjJhZjVhZDEzZTMwNDQ');
    request2.setRequestHeader('Simulator', '"EXTERNAL"');
    
    request2.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            status = this.responseText.status;
        }
    };
    
    var body = {
        'merchantRefNum': 'merchantRefNum-108',
        'amount': 1900,
        'currencyCode': 'GBP',
        'dupCheck': true,
        'settleWithAuth': false,
        'paymentHandleToken': handle,
        'customerIp': '10.10.12.64',
        'description': 'Magazine subscription'
    };
    
    request2.send(JSON.stringify(body));
    return status;
}
