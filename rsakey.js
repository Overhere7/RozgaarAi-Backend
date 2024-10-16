import forge from 'node-forge';
import fs from 'fs';

// Check if keys already exist, if not generate new ones
if (!fs.existsSync('privateKey.pem') || !fs.existsSync('publicKey.pem')) {
  const keypair = forge.pki.rsa.generateKeyPair(2048);

  // Convert keys to PEM format and save them
  const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

  // Save the keys to files
  fs.writeFileSync('publicKey.pem', publicKeyPem);
  fs.writeFileSync('privateKey.pem', privateKeyPem);

  console.log('RSA Keypair generated and saved as PEM files');
} else {
  console.log('RSA Keypair already exists');
}
