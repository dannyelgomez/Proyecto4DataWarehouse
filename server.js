const express = require('express');
const cors = require('cors');
const app = express();

const usersRouter = require('./components/users_comp');
const companiesRouter = require('./components/companies_comp');
const contactsRouter = require('./components/contacts_comp');
const regionsRouter = require('./components/regions_comp');
const countriesRouter = require('./components/countries_comp');
const citiesRouter = require('./components/cities_comp');

app.use(express.json());
const router = express.Router();

app.use(cors());
app.use(router);

router.use('/users', usersRouter);
router.use('/companies', companiesRouter);
router.use('/contacts', contactsRouter);
router.use('/regions', regionsRouter);
router.use('/countries', countriesRouter);
router.use('/cities', citiesRouter);

app.listen(3000, function() {
    console.log('listening on 3000')
})