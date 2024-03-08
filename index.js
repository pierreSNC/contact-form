const express = require('express');
const cors = require('cors');

const db = require('./dbConfig');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/send-message', async (req, res) => {
    const { email, firstname, lastname, message } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO messages (email, firstname, lastname, message) VALUES (?, ?, ?, ?)',
            [email, firstname, lastname, message]
        );
        res.send({ message: 'Message envoyé avec succès', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de l\'envoie du message' });
    }
});

app.get('/get-messages', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Erreur lors de la récupération des messages' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
