const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("Hello, world");
});

app.use("/courses", routes);

app.listen(port, () => {
    console.log(`ポート番号${port}で立ち上がりました`);
});

