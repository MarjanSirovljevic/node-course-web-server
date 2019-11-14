const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Enabling partials in our handlebar views.
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// Creating our server app.
const app = express();

// Setting view engine to be used for dynamic html.
app.set('view engine', 'hbs');

// app.use(...) - for registering middlewares
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now} ${req.method} ${req.url}`;

    fs.appendFileSync('server.log', log + '\n');

    console.log(log);
    
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// Enabling static html pages on requests - registering static middleware.
app.use(express.static(__dirname + '/public'));

// Handling root route.
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    const error = {
        errorMessage: 'Error handling request'
    };
    res.send(error);
});

// Putting our app servers to work.
app.listen(3000, () => {
    console.log('Listening on port 3000.');
});

// Example of returning plain html to the user (text/html)
// =======================================================
// app.get('/', (req, res) => {
//     res.send('<h1>Welcome to Express !</h1>');
// });


// Example of returning json file to the user (aplication/json)
// ============================================================
// app.get('/', (req, res) => {
//     res.send({
//         name: 'Marjan',
//         age: 42,
//         likes: ['Sport', 'Computers', 'Food', 'Traveling']
//     });
// });
