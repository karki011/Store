var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

exports.sendEmail = function (fromAddress, subject, content) {
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [
                {
                    to: [
                        {
                            email: 'karki011@gmail.com',
                        },
                        {
                            email: 'adlettow@gmail.com',
                        },
                        {
                            email: 'jessepayne@gmail.com'
                        }
                    ],
                    subject: subject
                }
            ],
            from: {
                email: fromAddress
            },
            content: [
                {
                    type: 'text/html',
                    value: content
                }
            ]
        }
    });

    return sg.API(request);
}

exports.sendReceipt = function(toAddress, content) {
    var receipt = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [
                {
                    to: [
                        {
                            email: toAddress
                        }
                    ],
                    subject: 'Receipt for Depot/U Purchase'
                }
            ],
            from: {
                email: 'noreply@depotu.com'
            },
            content: [
                {
                    type: 'text/html',
                    value: 'Thank you for puchasing an item from the Depot/U store! For your reference, your transaction ID is: ' + content.transactionId + ' for the product purchased for: $' + content.price + '. Thank you for shopping with us!'
                }
            ]
        }
    });

    return sg.API(receipt);
}

