const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const otpGenerator = require('otp-generator');
const redis = require('redis');
const crypto = require('crypto');
dotenv.config();

// Permettre les requêtes
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const port = 5000;

// Connection au redis
let client = redis.createClient();
client.connect()
client.on("connect", function () {
    console.log("Connection Successful!!");
});

// Fonction de hash SHA-256
function createSHA256Hash(plaintext) {
    return crypto.createHash('sha256').update(plaintext).digest('hex')
}
 

async function sendOTPByEmail(email) {
    // Setting des paramètres de celui qui envoie le mail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: "rcxk lgup tcqv hoow "
        }
    });

    // Génération du code OTP avec des chiffres
    let OTPCode = otpGenerator.generate(6, { 
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    });
    console.log('OTP TOTP généré:', OTPCode);

    // Setting des paramètres du mail à envoyer
    let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Code de vérification pour la connexion',
        text: `Votre code de vérification est : ${OTPCode}`
    };

    // Envoie du mail
    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès !');

    // Récupération de la date et de l'heure
    const Time = new Date();
    const date = Time.toLocaleDateString();
    const heure = Time.toLocaleTimeString();
    const dateTimeString = `${date} ${heure}`;
    
    // Hash du code envoyé
    const OTPCrypt = createSHA256Hash(OTPCode)
    

    // Enregistrement dans le serveur redis
    client.set(`${email}`, `Code: ${OTPCrypt}; Date: ${dateTimeString}; attempts: 0`, (err, stu) => {
        if (err) console.log(err);
        else console.log(stu);
    });

}

app.get('/', async(req, res) => {
  res.send('Hello World!');
  console.log(process.env.SMTP_MAIL);

  try {
        await sendOTPByEmail("loic.tossou45@gmail.com");
        console.log('OTP envoyé avec succès à l\'adresse e-mail :', "yanntossou@gmail.com");
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'OTP par e-mail :', error);
    }

}),

app.get('/verif', async(req, res) => {
    res.send('Hello World!');

    const emailOTP = "loic.tossou45@gmail.com"
    let codeOTPSend = createSHA256Hash("868549")

    let getValueRedis = await client.get(emailOTP)
    const elements = getValueRedis.split(";");

    let GetOTPCodeEncrypt = elements[0].trim().split(" ");

    const attemptsElement = elements[2].trim().split(" ");
    let attemptValue = parseInt(attemptsElement[attemptsElement.length - 1]);

    console.log(elements)
    console.log(attemptsElement)
    console.log(attemptValue)
    
    if (GetOTPCodeEncrypt[1] !== codeOTPSend) {
        attemptValue++;
        if (attemptValue > 3) {
            console.error("Trop d'attempt tu seras redirigé sur le formulaire d'auth")
            client.del(emailOTP)
        }
        else {
            elements[2] = ` attempts: ${attemptValue}`;
            console.log(attemptsElement)
            getValueRedis = elements.join(";");
            client.set(emailOTP, getValueRedis);
            console.error("Réessaye encore !!!")
        }
    }
    else {
        console.log('Vérification réussie')
    }

}),

app.listen(port, async() => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);   
});
