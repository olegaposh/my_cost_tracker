const exphbs = require("express-handlebars")
const express = require("express")
const db = require("./models")
const costController = require("./controllers/cost-controller")
const verifyController = require("./controllers/verify-controller")

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


app.use(costController);
app.use(verifyController);

const startServer = async () => {

  await db.sequelize.sync({force: true});

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`);
  });
}

startServer();
