const { model } = require('mongoose');
const connMongoose = require('../../store/conexion');
const modelCompanies = require('../components/companies_comp/company');


function searchCompany(data) {
    modelCompanies.find({ nit: data })
        .then((result) => {
            if (!result) {
                console.log('La empresa existe');

            } else {

            }
        })
}