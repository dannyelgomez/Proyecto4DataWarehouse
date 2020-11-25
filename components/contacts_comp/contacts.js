const sequelize = require('../../store/conexionMysql');

function is_numeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) ? value : !isNaN(parseFloat(value)) && isFinite(value);
}

const contactIdParams = (req, res, next) => {
    const id = req.params.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        next();
    }
};

const contactExists = async(req, res, next) => {
    const id = parseInt(req.params.id);
    await sequelize.query(
            `SELECT 1 FROM contacts WHERE contacts_id=${id}`, { type: sequelize.QueryTypes.SELECT }
        )
        .then(result => {
            if (result && result.length > 0) {
                next();
            } else {
                res.status(404).json('Contact not found');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const createContact = async(req, res) => {
    let { id, fullName, email, position, channel, interest, companies_id } = req.body;
    if (!id || !fullName || !email || !position || !channel || !interest || !companies_id) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`INSERT INTO contacts ( id, fullName, email, position, channel, interest, companies_id) 
            VALUES ('${id}','${fullName}','${email}','${position}','${channel}','${interest}','${companies_id}')`)
            .then(response => {
                res.status(200).json('El contacto ha sido creado');
            }).catch(err => {
                res.status(500).json('Error al crear el contacto');
            });
    }
}

const getContactById = async(req, res) => {
    let id = req.params.id;
    await sequelize.query(`SELECT * FROM contacts WHERE contacts_id=${id}`, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const getContacts = async(req, res) => {
    await sequelize.query(`SELECT * FROM contacts`, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const updateContact = async(req, res) => {
    let id = req.params.id;
    let { fullName, email, position, channel, interest, companies_id } = req.body;
    if (!fullName || !email || !position || !channel || !interest || !companies_id) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`UPDATE contacts SET fullName='${fullName}', email='${email}', position='${position}', channel='${channel}', interest='${interest}', companies_id='${companies_id}'
            WHERE contacts_id=${id}`)
            .then(result => {
                res.status(200).json('Contacto actualizado correctamente');
            }).catch(err => {
                console.log(err)
                res.status(500).json('Error ejecutando el query');
            });
    }
};

const deleteContact = async(req, res) => {
    let id = req.params.id;
    await sequelize.query(`DELETE FROM contacts WHERE contacts_id =${id}`)
        .then(resul => {
            res.status(200).json('Contacto eliminado')
        }).catch(err => {
            res.status(500).json('Error ejecutando el query');
        })
};

module.exports = {
    createContact,
    getContactById,
    getContacts,
    updateContact,
    deleteContact,
    contactIdParams,
    contactExists
}