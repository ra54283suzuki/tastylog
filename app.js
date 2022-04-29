const PORT = process.env.PORT;
const path = require("path");
const logger = require("./lib/log/logger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

//ejsを使うための決まり文句
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Static resource rooting
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));

//index.jsの呼び出し
app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
  logger.console.info(`Application listening at ${PORT}`);
});