const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, wolrd!</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<p>phaminhieu.dev@gmail.com</p>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1>")
})

app.get("/hobbies", (req, res) => {
  res.send("<h1>Hobbies</h1>");
})
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
