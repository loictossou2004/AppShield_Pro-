// const express = require('express');
// const redis = require('redis');

// const app = express();
// const client = redis.createClient();
// client.connect()
// client.on('connect', () => console.log('Redis Client Connected'));
// client.on('error', (err) => console.log('Redis Client Connection Error', err));

// app.get('/verif', async (req, res) => {
//     try {
//         const value =  client.get('loic.tossou45@gmail.com');
//         console.log('Valeur récupérée :', value);
//         res.send('Valeur récupérée : ' + value);
//     } catch (err) {
//         console.error('Erreur lors de la récupération de la valeur :', err);
//         res.status(500).send('Erreur lors de la récupération de la valeur');
//     }
// });

// app.listen(5000, () => {
//     console.log('Serveur démarré sur le port 5000');
// });

// let chaine = "Code: 250623; Date: 4/6/2024 7:39:57 PM; attempts: 5";
// const elements = chaine.split(";");
// const attemptsElement = elements[2].trim().split(" ");
// let attemptValue = parseInt(attemptsElement[attemptsElement.length - 1]);
// attemptValue++;

// elements[2] = ` attempts: ${attemptValue}`;
// chaine = elements.join(";");
// console.log(chaine);

const crypto = require('crypto');

const key = Buffer.from('4pp5h13ld_pr0'.padEnd(32, '\0'), 'utf8'); // Remplir la clé avec des zéros pour atteindre une longueur de 32 octets

const plaintext = '321123';
function encryptAES(text, key) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0)); // Utilisation de AES-256 en mode CBC
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const ciphertext = encryptAES(plaintext, key);
console.log('Texte chiffré:', ciphertext);

// Fonction pour déchiffrer avec AES
function decryptAES(ciphertext, key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.alloc(16, 0)); // Utilisation de AES-256 en mode CBC
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Déchiffrer le texte
const decryptedText = decryptAES(ciphertext, key);
console.log('Texte déchiffré:', decryptedText);
