const express = require('express');
const app = express();

/* const companiesRouter = require('./components/companies_comp'); */
const usersRouter = require('./components/users_comp');
const companiesRouter = require('./components/companies_comp');

/* const contactsRouter = require('./components/contacts_comp'); */

app.use(express.json());
const router = express.Router();

app.use(router);

/* app.use('/v1', companiesRouter); */
router.use('/', usersRouter);
router.use('/', companiesRouter);

/* app.use('/v1', contactsRouter); */

app.listen(3000, function() {
    console.log('listening on 3000')
})