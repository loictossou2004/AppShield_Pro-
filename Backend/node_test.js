// const redis = require('redis');

// // Créer un client Redis

// const client = redis.createClient();
// client.connect()

// // Gestion des erreurs de connexion à Redis
// client.on('error', function (err) {
//     console.error('Erreur de connexion Redis:', err);
// });
// client.on('connect', function () {
//     console.error('Good');
// });

// // Définir la clé "ma_clé" avec la valeur "ma_valeur" et une expiration de 10 secondes
//     client.set("ma_cl", "ma_valeur", {
//         EX: 5,
//     });


// const redis = require('redis');

// const client = redis.createClient();

   
// (async () => {
//     await client.connect();
// })();

// client.on('connect', () => console.log('Redis Client Connected'));
// client.on('error', (err) => console.log('Redis Client Connection Error', err));

// const test = client.get('ma_cle')
// console.log(test)


const redis = require('redis');

const client = redis.createClient();

// (async () => {
//     await client.connect();
//     console.log('Redis Client Connected');

//     client.on('error', (err) => console.log('Redis Client Connection Error', err));

//     try {
//         const value = await client.get('loic.tossou45@gmail.com');
//         console.log('Valeur récupérée :', value);
//     } catch (err) {
//         console.error('Erreur lors de la récupération de la valeur :', err);
//     }
// })();

// (async () => {
//     await client.connect();
// })();

// client.on('connect', () => console.log('Redis Client Connected'));
// client.on('error', (err) => console.log('Redis Client Connection Error', err));

// const test = client.get('ma_cle')
// console.log(test)

const express = require('express');

const app = express();

const connectToRedis = () => {
    return new Promise((resolve, reject) => {
        client.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log('Redis Client Connected');
                resolve();
            }
        });
    });
};

const getValueFromRedis = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
};

app.get('/route1', async (req, res) => {
    try {
        await connectToRedis();
        const value = await getValueFromRedis('cle1');
        console.log('Valeur récupérée pour route1 :', value);
        res.send('Valeur récupérée pour route1 : ' + value);
    } catch (err) {
        console.error('Erreur lors de la récupération de la valeur pour route1 :', err);
        res.status(500).send('Erreur lors de la récupération de la valeur pour route1');
    }
});

app.get('/route2', async (req, res) => {
    try {
        await connectToRedis();
        const value = await getValueFromRedis('cle2');
        console.log('Valeur récupérée pour route2 :', value);
        res.send('Valeur récupérée pour route2 : ' + value);
    } catch (err) {
        console.error('Erreur lors de la récupération de la valeur pour route2 :', err);
        res.status(500).send('Erreur lors de la récupération de la valeur pour route2');
    }
});

app.listen(5000, () => {
    console.log('Serveur démarré sur le port 5000');
});
