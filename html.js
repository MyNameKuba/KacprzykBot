const app = require("express")();

const PORT = process.env.PORT || 3000;

app.get("", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(html/index.html).pipe(res);
});

app.listen(PORT, () => {
  console.log(`App up at port ${PORT}`);
});