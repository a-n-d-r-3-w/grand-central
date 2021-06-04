const { encrypt, decrypt } = require('./encryptionUtils');

let printableCharacters = '';
for (var i = 32; i <= 126; i++) {
    printableCharacters += String.fromCharCode(i);
};

test.each([
    printableCharacters,
    '\n',
    ''
])('Encrypt and decrypt %s', plaintext => {
    const encryptionKey = '3803ee1690559d6f2fad58bf1657508d';
    const initializationVector = 'd7fe764a74a6ac20';

    const encryptedText = encrypt(plaintext, encryptionKey, initializationVector);
    expect(encryptedText).not.toBe(plaintext);

    const decryptedText = decrypt(encryptedText, encryptionKey, initializationVector);
    expect(decryptedText).toBe(plaintext);
})
