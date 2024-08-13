import pg from 'pg';

const Pool = pg.Pool;
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'wimf',
    password: 'password',
    port: 5432,
});

// Postgres queries for CRUD operations

async function getUser(req, res) {
    const email = req.params.email;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]); 
        res.status(200).json(result.rows);
    } catch (err) {
        throw err;
    }
}

async function createUser(req, res) {
    const { email, name } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *', [email, name]);
        res.status(201).send(`User added with ID: ${result.rows[0].id}`);
    } catch (err) {
        console.error('Error creating ingredient:', err);
        res.status(500).json({ error: `Failed to create ingredient: ${email}` });
    }
}

async function getIngredients(req, res) {
    const { email } = req.body;
    try {
        console.log(email);
        const result = await pool.query('SELECT * FROM ingredients WHERE owner=$1 ORDER BY exp ASC', [email]); 
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        throw err;
    }
}

async function getIngredientsByName(req, res) {
    const { email, name } = req.body;
    console.log("query: ", name);
    try {
        const result = await pool.query('SELECT * FROM ingredients WHERE owner=$1 AND LOWER(name) LIKE LOWER($2) ORDER BY exp ASC', [email, `%${name}%`]); 
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error finding ingredient:', err);
        res.status(500).json({ error: `Failed to find ingredient: ${name}` });
    }
}

async function createIngredient(req, res) {
    const { name, exp, bought, owner } = req.body;
    try {
        const result = await pool.query('INSERT INTO ingredients (name, exp, bought, owner) VALUES ($1, $2, $3, $4) RETURNING *', [name, exp, bought, owner]);
        res.status(201).send(`Ingredient added with ID: ${result.rows[0].id}`);
    } catch (err) {
        console.error('Error creating ingredient:', err);
        res.status(500).json({ error: `Failed to create ingredient: ${name}` });
    }
}

async function updateIngredient(req, res) {
    const id = parseInt(req.params.id);
    const { name, exp, bought } = req.body;
    try {
        await pool.query('UPDATE ingredients SET name = $1, exp = $2, bought = $3 WHERE id = $4', [name, exp, bought, id]);
        res.status(200).send(`Ingredient modified with ID: ${id}`);
    } catch (err) {
        console.error('Error updating ingredient:', err);
        res.status(500).json({ error: `Failed to update ingredient: ${id}` });
    }
}

async function deleteIngredient(req, res) {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM ingredients WHERE id = $1', [id]);
        res.status(200).send(`Ingredient deleted with ID: ${id}`);
    } catch (err) {
        console.error('Error deleting ingredient:', err);
        res.status(500).json({ error: `Failed to delete ingredient: ${id}` });
    }
}


export default { getUser, createUser, getIngredients, getIngredientsByName, createIngredient, deleteIngredient, updateIngredient };