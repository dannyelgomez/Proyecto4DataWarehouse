const sequelize = require('../../store/conexionMysql');

function is_numeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) ? value : !isNaN(parseFloat(value)) && isFinite(value);
}

const userIdParams = (req, res, next) => {
    const id = req.params.id;
    if (!id || (id && !is_numeric(id))) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        next();
    }
};

const userExists = async(req, res, next) => {
    const id = parseInt(req.params.id);
    await sequelize.query(
            `SELECT 1 FROM users WHERE user_id=${id}`, { type: sequelize.QueryTypes.SELECT }
        )
        .then(result => {
            if (result && result.length > 0) {
                next();
            } else {
                res.status(404).json('User not found');
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const createUser = async(req, res) => {
    let { username, password, first_name, last_name, email, role, is_active } = req.body;
    if (!username || !password || !first_name || !last_name || !email || !role || !is_active) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`INSERT INTO users ( username, password, first_name, last_name, email, role, is_active ) 
        VALUES ('${username}','${password}','${first_name}','${last_name}','${email}','${role}','${is_active}')`)
            .then(response => {
                res.status(200).json('El usuario ha sido creado');
            }).catch(err => {
                res.status(500).json('Error al crear el usuario');
            });
    }
}

const getUserById = async(req, res) => {
    let id = req.params.id;
    await sequelize.query(`SELECT * FROM users WHERE user_id=${id}`, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const getUsers = async(req, res) => {
    await sequelize.query(`SELECT * FROM users`, {
            type: sequelize.QueryTypes.SELECT
        })
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.error(err);
            res.status(500).json('Error ejecutando el query');
        });
};

const updateUser = async(req, res) => {
    let id = req.params.id;
    let { username, password, first_name, last_name, email, role, is_active } = req.body;
    if (!username || !password || !first_name || !last_name || !email || !role || !is_active) {
        res.status(400).json('Petición incompleta o equivocada');
    } else {
        await sequelize.query(`UPDATE users SET username='${username}', password='${password}', first_name='${first_name}', last_name='${last_name}', email='${email}', role='${role}', is_active='${is_active}'
        WHERE user_id=${id}`)
            .then(result => {
                res.status(200).json('Registro actualizado correctamente');
            }).catch(err => {
                console.log(err);
                res.status(500).json('Error ejecutando el query');
            });
    }
};

const deleteUser = async(req, res) => {
    let id = req.params.id;
    await sequelize.query(`DELETE FROM users WHERE user_id =${id}`)
        .then(resul => {
            res.status(200).json('Usuario eliminado')
        }).catch(err => {
            res.status(500).json('Error ejecutando el query');
        })
};

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    userIdParams,
    userExists
}