const sequelize = require('../../store/conexionMysql');

function is_numeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) ? value : !isNaN(parseFloat(value)) && isFinite(value);
}

const createContact = async(req, res) => {
    let { name, lastName, email, position, channel, interest } = req.body;
    if (!name || !lastName || !email || !position || !channel || !interest) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`INSERT INTO contacts ( name, lastName, email, position, channel, interest ) 
            VALUES ('${name}','${lastName}','${email}','${position}','${channel}','${interest}')`)
            .then(response => {
                res.status(200).json('El contacto ha sido creado');
            }).catch(err => {
                res.status(500).json('Error al crear el contacto');

            });
    }
}

const getContact = async(req, res) => {
    let id = req.query.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`SELECT * FROM contacts WHERE contacts_id=${id}`, {
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

const updateContact = async(req, res) => {
    let id = req.query.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        let { nit, name, phone, email, address } = req.body;
        if (!nit || !name || !phone || !email || !address) {
            res.status(400).json('Petición incompleta o equivocada');
        } else {
            await sequelize.query(`UPDATE contacts SET nit='${nit}', name='${name}', phone='${phone}', email='${email}', address='${address}'
            WHERE contacts_id=${id}`)
                .then(result => {
                    res.status(200).json('Se ha actualizado correctamente');
                }).catch(err => {
                    console.log(err)
                    res.status(500).json('Error ejecutando el query');
                });

        }
    }
};

const deleteContact = async(req, res) => {
    let id = req.query.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        sequelize.query(`DELETE FROM contacts WHERE contacts_id =${id}`)
            .then(resul => {
                res.status(200).json('Usuario eliminado')
            }).catch(err => {
                res.status(500).json('Error ejecutando el query');
            })
    }
};

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact
}