const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

let db = new sqlite3.Database('./products.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the products database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        price TEXT,
        quantity TEXT,
        calories TEXT
    )`);
});

//Produkte abrufen
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

//hinzufügen
app.post('/products', (req, res) => {
    const { name, category, price, quantity, calories } = req.body;
    const sql = 'INSERT INTO products (name, category, price, quantity, calories) VALUES (?, ?, ?, ?, ?)';
    db.run(sql, [name, category, price, quantity, calories], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.status(201).json({ id: this.lastID });
    });
});

//bearbeiten
app.put('/products/:id', (req, res) => {
    const { name, category, price, quantity, calories } = req.body;
    const sql = 'UPDATE products SET name = ?, category = ?, price = ?, quantity = ?, calories = ? WHERE id = ?';
    db.run(sql, [name, category, price, quantity, calories, req.params.id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ updatedID: req.params.id });
    });
});

//löschen
app.delete('/products/:id', (req, res) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.status(204).send();
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
