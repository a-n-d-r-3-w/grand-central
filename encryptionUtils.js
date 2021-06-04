const crypto = require('crypto');

const encrypt = (plaintext, encryptionKey, iv = process.env.ENCRYPTION_INITIALIZATION_VECTOR) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encryptedText = cipher.update(plaintext, 'utf-8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText;
}

const decrypt = (encryptedText, encryptionKey, iv = process.env.ENCRYPTION_INITIALIZATION_VECTOR) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
    let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8');
    decryptedText += decipher.final('utf-8');
    return decryptedText;
};

module.exports = {
    encrypt,
    decrypt
};
