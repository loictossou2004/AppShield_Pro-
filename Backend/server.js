const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const otpGenerator = require('otp-generator');
const redis = require('redis');
const crypto = require('crypto');
dotenv.config();


const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
const port = 5000;


let client = redis.createClient();
client.connect()
client.on("connect", function () {
    console.log("Connection Successful!!");
});


const key = Buffer.from(`${process.env.KEY_CRYPTO}`.padEnd(32, '\0'), 'utf8');

function encryptAES(text, key) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.alloc(16, 0)); 
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptAES(ciphertext, key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.alloc(16, 0));
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

 

async function sendOTPByEmail(email) {
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

    let OTPCode = otpGenerator.generate(6, { 
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    });
    console.log('OTP TOTP généré:', OTPCode);

    let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: 'Code de vérification pour la connexion',
        text: `Votre code de vérification est : ${OTPCode}`
    };

    await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès !');

    const maintenant = new Date();
    const date = maintenant.toLocaleDateString();
    const heure = maintenant.toLocaleTimeString();
    const dateTimeString = `${date} ${heure}`;
    const OTPCrypt = encryptAES(OTPCode, key)
    

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
    const codeOTPSend = "48305"

    let getValueRedis = await client.get(emailOTP)
    const elements = getValueRedis.split(";");

    const GetOTPCodeEncrypt = elements[0].trim().split(" ");
    const GetOTPCodeDecrypt = decryptAES (GetOTPCodeEncrypt[1], key);

    const attemptsElement = elements[2].trim().split(" ");
    let attemptValue = parseInt(attemptsElement[attemptsElement.length - 1]);
    console.log(GetOTPCodeDecrypt)
    console.log(elements)
    console.log(attemptsElement)
    console.log(attemptValue)
    
    if (GetOTPCodeDecrypt != codeOTPSend) {
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

app.get('/Next', async(req, res) => {
    res.send('Hello World!');
    const sharedSecret = "Your secret"

    client.set("ma_clé", "ma_valeur", 'EX', 10, function(err, reply) {
        if (err) {
            console.error('Erreur lors de la définition de la clé:', err);
        } else {
            console.log('Clé définie avec succès. Réponse du serveur Redis:', reply);
        }
    
        // Terminer la connexion Redis
        client.quit();
    });

    
}),

app.listen(port, async() => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);

    
});
