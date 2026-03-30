const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// Connexion à la base de données (VM2)
const db = mysql.createPool({
    host: '192.168.10.10', // IP de la VM base de données
    user: 'nodeuser',
    password: 'password',
    database: 'cloud_project'
});

// Servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour récupérer les utilisateurs depuis MySQL
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur base de données");
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
