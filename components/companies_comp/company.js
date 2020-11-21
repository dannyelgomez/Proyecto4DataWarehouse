/* const { is_numeric } = require('./index'); */
const sequelize = require('../../store/conexionMysql');

function is_numeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) ? value : !isNaN(parseFloat(value)) && isFinite(value);
}

const createCompany = async(req, res) => {
    let { nit, name, phone, email, address, cities_id } = req.body;
    debugger
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

const getCompany = async(req, res) => {
    let id = req.query.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`SELECT * FROM users WHERE user_id=${id}`, {
                type: sequelize.QueryTypes.SELECT
            })
            .then(result => {
                res.status(200).json(result);
            }).catch(err => {
                console.error(err);
                console.log(err);
                res.status(500).json('Error ejecutando el query');
            });
    }
};

const updateCompany = async(req, res) => {
    let id = req.query.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        let { nit, name, phone, email, address } = req.body;
        if (!nit || !name || !phone || !email || !address) {
            res.status(400).json('Petición incompleta o equivocada');
        } else {
            await sequelize.query(`UPDATE users SET username='${username}', password='${password}', first_name='${first_name}', last_name='${last_name}', email='${email}', role='${role}', is_active='${is_active}'
            WHERE user_id=${id}`)
                .then(result => {
                    res.status(200).json('Se ha actualizado correctamente');
                }).catch(err => {
                    console.log(err)
                    res.status(500).json('Error ejecutando el query');
                });

        }
    }
};

const deleteCompany = async(req, res) => {
    let id = req.query.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        sequelize.query(`DELETE FROM users WHERE user_id =${id}`)
            .then(resul => {
                res.status(200).json('Usuario eliminado')
            }).catch(err => {
                res.status(500).json('Error ejecutando el query');
            })
    }
};

module.exports = {
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany
}




























/* 
const sequelize = require('../../store/conexionMysql');


const createCompany = async(req, res) => {
    let { nit, name, phone, email, address } = req.body;
    if (!nit || !name || !phone || !email || !address) return res.status(400).json('parametros mal enviados');
    await companies.findOne({ nit: nit })
        .then((result) => {
            if (result != null) {
                return res.status(404).json('La empresa existe');
            } else {
                let objAddComp = {
                    nit,
                    name,
                    phone,
                    email,
                    address
                }
                console.log(objAddComp);
                const addCompany = new companies(objAddComp);
                addCompany.save();
                res.status(200).json({ objAddComp });
            }
        })
        .catch((err) => {
            console.error(err);
        });

};

const readCompany = async(req, res, next) => {
    companies.find()
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((err) => {
            console.error(err);
        });
};

const updateCompany = async(req, res, next) => {
    let { nit, name, phone, email, address } = req.body;
    if (!nit || !name || !phone || !email || !address) return res.status(400).json('parametros mal enviados');
    companies.findOne({ nit: nit })
        .then((result) => {
            if (result) {
                result.name = name;
                result.phone = phone;
                result.email = email;
                result.address = address;
                result.save();
                res.status(200).json('Actualización correcta');
            } else {
                return res.status(400).json('No se puede actualizar esta compañia');
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

const deleteCompany = async(req, res, next) => {
    let { nit } = req.body;
    if (!nit) return res.status(400).json('parametros mal enviados');
    companies.deleteOne({ nit: nit })
        .then((result) => {
            console.log(result);
            res.status(200).json('Compañía eliminada correctamente');
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = {
    createCompany,
    readCompany,
    updateCompany,
    deleteCompany,
} */