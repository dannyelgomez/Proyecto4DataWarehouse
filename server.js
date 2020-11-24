const express = require('express');
const app = express();

const usersRouter = require('./components/users_comp');
const companiesRouter = require('./components/companies_comp');
const contactsRouter = require('./components/contacts_comp');

app.use(express.json());
const router = express.Router();

app.use(router);

router.use('/users', usersRouter);
router.use('/', companiesRouter);
router.use('/', contactsRouter);


app.listen(3000, function() {
    console.log('listening on 3000')
})