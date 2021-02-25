const app = require("express")();
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.get("", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./HTML/index.html').pipe(res);
});

app.listen(PORT, () => {
  console.log(`App up at port ${PORT}`);
});