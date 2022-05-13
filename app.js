const PORT = process.env.PORT;
const path = require("path");
const logger = require("./lib/log/logger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const accesslogger = require("./lib/log/accesslogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const { connect } = require("http2");
const app = express();

//ejsを使うための決まり文句
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Static resource rooting
app.use(favicon(path.join(__dirname, "/public/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "/public")));
  
// Set access log
app.use(accesslogger());

// Dynamic resource rooting
app.use("/", require("./routes/index.js"));
app.use("/test", async (req, res, next) => {
  const { MySQLClient, sql } = require("./lib/database/client.js");
  var data;

  try {
    data = await MySQLClient.executeQuery(await sql("SELECT_SHOP_BASIC_BY_ID"), [1]);
    console.log(data);
  } catch (err) {
    next(err);
  }

  res.end("OK");
});

// Set application log.
app.use(applicationlogger());

app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});