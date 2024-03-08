const express = require('express');
const db = require('./dbConfig');
const app = express();
const port = 3001;

app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
