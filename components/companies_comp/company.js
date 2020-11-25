const sequelize = require('../../store/conexionMysql');

function is_numeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) ? value : !isNaN(parseFloat(value)) && isFinite(value);
}

const companyIdParams = async(req, res, next) => {
    let id = req.params.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        next();
    }
};

const companyExists = async(req, res, next) => {
    const id = parseInt(req.params.id);
    await sequelize.query(
            `SELECT 1 FROM companies WHERE companies_id=${id}`, { type: sequelize.QueryTypes.SELECT }
        )
        .then(result => {
            if (result && result.length > 0) {
                next();
            } else {
                res.status(404).json('Company not found');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const createCompany = async(req, res) => {
    let { nit, name, phone, email, address, cities_id } = req.body;
    if (!nit || !name || !phone || !email || !address || !cities_id) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`INSERT INTO companies ( nit, name, phone, email, address, cities_id ) 
            VALUES ('${nit}','${name}','${phone}','${email}','${address}','${cities_id}')`)
            .then(response => {
                res.status(200).json('La compañía ha sido creada');
            }).catch(err => {
                res.status(500).json('Error al crear la compañía');
            });
    }
}

const getCompanyById = async(req, res) => {
    let id = req.params.id;
    await sequelize.query(`SELECT * FROM companies WHERE companies_id=${id}`, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const getCompanies = async(req, res) => {
    await sequelize.query(`SELECT * FROM companies`, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const updateCompany = async(req, res) => {
    let id = req.params.id;
    let { nit, name, phone, email, address } = req.body;
    if (!nit || !name || !phone || !email || !address) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`UPDATE companies SET nit='${nit}', name='${name}', phone='${phone}', email='${email}', address='${address}'
            WHERE companies_id=${id}`)
            .then(result => {
                res.status(200).json('Se ha actualizado correctamente');
            }).catch(err => {
                console.log(err)
                res.status(500).json('Error ejecutando el query');
            });
    }
};

const deleteCompany = async(req, res) => {
    let id = req.params.id;
    await sequelize.query(`DELETE FROM companies WHERE companies_id =${id}`)
        .then(resul => {
            res.status(200).json('Compañía eliminada')
        }).catch(err => {
            res.status(500).json('Error ejecutando el query');
        })
};

module.exports = {
    createCompany,
    getCompanyById,
    getCompanies,
    updateCompany,
    deleteCompany,
    companyIdParams,
    companyExists
}