const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(function (req, res, next) {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', function (err) {
        if (err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});

// app.use(function (req, res, next) {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text) {
    return text.toUpperCase();
});

app.get('/', function (req, res) {
    //res.send('<H1>Hello Express!</H1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my home page. This is the root of the site. Stay around for a while and relax'
    });
});

app.get('/about', function (req,res) {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/project', function (req, res) {
    res.render('project.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', function (req,res) {
    res.send({
        errorMessage: "Unable to process request"
    });
});

app.listen(port, function () {
    console.log(`Server is up on port ${port}...`);
});