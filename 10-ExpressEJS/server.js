const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [];
let name;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});

// Login endpoint (GET and POST)
app.post("/login", (req, res) => {
  name = req.body.name;
  res.render("test", { name: name, securityLevel: "secured" });
});

app.get("/login", (req, res) => {
  name = req.query.name; // Unsecured way (for example, using URL parameters)
  res.render("test", { name: name, securityLevel: "unsecured" });
});

// Home route to display posts
app.get("/home", (req, res) => {
  if (!name) {
    return res.sendFile(path.join(__dirname, "public/html/index.html"));
  }
  res.render("home", { name: name, posts: posts });
});

// Endpoint to add a new post
app.post("/posts", (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/home");
});

// Start the server
app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Listening on port 3000");
  }
});
