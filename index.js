const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const encoder = bodyParser.urlencoded();
const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  tls: true,
  auth: {
    user: "userEmail",
    pass: "userPassword",
  },
});

app.set("view engine", "hbs");
app.use(express.static("public"));

hbs.registerPartials(path.join(__dirname, "views/partials"));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact", { show: false });
});

app.post("/contact", encoder, (req, res) => {
  let mailOptions = {
    from: "karmadjango@gmail.com",
    to: req.body.email,
    subject: "Confirmation : Industro",
    text: `
                  Hello ${req.body.name}
                  Your Query Received!!!
                  Our Team Will Contact You Soon!!!
                  Team Industro
              `,
  };
  transporter.sendMail(mailOptions, (error) => {
//     console.log(error)
  });

  mailOptions = {
    from: "karmadjango@gmail.com",
    to: "karmadjango@gmail.com",
    subject: "Query Received : Industro",
    html: `
                  <h3>One Query Received</h3>
                  <p>Followings are the Details</p>
                  <table border="2px" cellpadding="10px">
                      <tbody>
                          <tr>
                              <th>Name</th>
                              <td>${req.body.name}</td>
                          </tr>
                          <tr>
                              <th>Email</th>
                              <td>${req.body.email}</td>
                          </tr>
                          <tr>
                              <th>Phone</th>
                              <td>${req.body.phone}</td>
                          </tr>
                          <tr>
                              <th>Subect</th>
                              <td>${req.body.subject}</td>
                          </tr>
                          <tr>
                              <th>Message</th>
                              <td>${req.body.message}</td>
                          </tr>
                      </tbody>
                  </table>
              `,
  };
  transporter.sendMail(mailOptions, (error) => {
//     console.log(error)
  });
  res.render("contact", { show: true });
});

app.get("/feature", (req, res) => {
  res.render("feature");
});
app.get("/project", (req, res) => {
  res.render("project");
});
app.get("/service", (req, res) => {
  res.render("service");
});
app.get("/team", (req, res) => {
  res.render("team");
});
app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});
app.get("/*", (req, res) => {
  res.render("404");
});

app.listen(8006, () => {
  console.log("server is running port http://localhost:8006");
});
