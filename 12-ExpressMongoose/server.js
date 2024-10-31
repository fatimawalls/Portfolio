const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const mongoUrl = "mongodb://127.0.0.1:27017/f1";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Middleware to load data when landing on the root path
app.get("/", (req, res) => {
  Driver.find({}, (err, drivers) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching drivers');
    }
    res.render("index", { drivers }); // Pass drivers to EJS template
  });
});

// Add driver to DB
app.post('/driver', (req, res) => {
    const { num, code, forename, surname, dob, url, nation, team } = req.body;

    const newDriver = new Driver({
        num: Number(num),
        code,
        forename,
        surname,
        dob,
        nationality: nation,
        url,
        team: { name: team },
    });

    newDriver.save().then(() => {
        res.redirect('/');
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error saving driver');
    });
});

// Edit driver logic
app.post('/driver/edit/:id', (req, res) => {
    Driver.findById(req.params.id, (err, driver) => {
        if (err) return res.status(500).send('Driver not found');
        
        // Update fields based on request body
        driver.num = req.body.num;
        driver.code = req.body.code;
        driver.forename = req.body.forename;
        driver.surname = req.body.surname;
        driver.dob = req.body.dob;
        driver.nationality = req.body.nation;
        driver.url = req.body.url;
        driver.team.name = req.body.team;

        driver.save().then(() => {
            res.redirect('/');
        }).catch(err => {
            console.error(err);
            res.status(500).send('Error updating driver');
        });
    });
});

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});
