app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/w3.css", (req, res) => {
  res.sendFile(__dirname + "/views/w3.css");
});