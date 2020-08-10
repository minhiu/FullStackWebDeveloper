const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/bmicalculator', (req, res) => {
  res.sendFile(__dirname + "/bmi-calculator.html");
});

app.post('/bmicalculator', (req, res) => {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var bmi = weight / Math.pow(height, 2);
  res.send("Your BMI score is : " + bmi);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
