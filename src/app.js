const express = require('express')
const path = require('path')
const app = express();
const hbs = require('hbs'); // need to add hbs to nodemon to detect changes in hbs files as well for partials to work
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const staticPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials'); // just like react components to be reused

const port = process.env.PORT || 3000;
//Setting up handlebars engine and views location
app.set('views', viewsPath) // setting up the views directory for handlebars
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setting up static directory to serve
app.use(express.static(staticPath));

// express checks the get routes one by one before reaching the 404 condition
app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        message: "This is the home page",
        name: "Sarang"
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        message: "This is the help page",
        name:"Sarang"
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        message: "This is the about page",
        name:"Sarang"
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help error",
        helpText: "This is the help page",
        name:"Sarang"
    })
});

app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address",
        })
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error,
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error: error,
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    });
});

app.get('*', (req, res) => {  // * is a wildcard character
    res.render('404', {
        title: "404 error page",
        message: "Page not found",
        name:"Sarang"
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
}); // another parameter which is a callback function which runs when the server is setup