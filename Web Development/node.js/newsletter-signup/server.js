const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

// Initalize express and body parser
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/html/signup.html`);
})

app.post('/', (req, res) => {
    const {firstName, lastName, email} = req.body;
    const body = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const options = {
        method: "POST",
        auth: "phaminhieu:9e7d964521633f9b933a9d110240e973-us1"
    }

    const bodyJson = JSON.stringify(body);

    const url = "https://us1.api.mailchimp.com/3.0/lists/93c4b495d3"

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(`${__dirname}/public/html/success.html`);
        } else {
            res.sendFile(`${__dirname}/public/html/failure.html`);
        }
    });

    request.write(bodyJson);
    request.end();

});

app.post("/failure", (req, res) => {
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
})