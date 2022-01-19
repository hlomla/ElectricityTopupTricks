const express = require('express');
const exphbs  = require('express-handlebars');
const ElectricityMeters = require('./electricity-meters');
const pg = require('pg');
const Pool = pg.Pool;

const app = express();

// var electricityMeters = ElectricityMeters(pool);

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/topups_db';

const pool = new Pool({
    connectionString  
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const electricityMeters = ElectricityMeters(pool);

app.get('/', async function(req, res) {
	
	res.redirect('/streets');
});

app.get('/streets/meters/:id', async function(req, res) {
	const streetId = req.params.id
	const showStreet = await electricityMeters.streetMeters(streetId);
	const streets = await electricityMeters.streets();
	
	console.log(streets);
	console.log(showStreet)
	res.render('streets', {
		streets,
		showStreet
	});
});

app.get('/meter/:street_id', async function(req, res) {

	// use the streetMeters method in the factory function...
	// send the street id in as sent in by the URL parameter street_id - req.params.street_id

	// create  template called street_meters.handlebars
	// in there loop over all the meters and show them on the screen.
	// show the street number and name and the meter balance

	res.render('street_meters', {
		meters
	});
});

app.get('/meter/use/:meter_id', async function(req, res) {

	// show the current meter balance and select the appliance you are using electricity for
	res.render('use_electicity', {
		meters
	});
});

app.post('/meter/use/:meter_id', async function(req, res) {

	// update the meter balance with the usage of the appliance selected.
	res.render(`/meter/user/${req.params.meter_id}`);

});

const PORT =  process.env.PORT || 3017;
// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});