import { writeFile } from 'fs';
import dotenv from 'dotenv';

const envFilePath = `./src/environments/environment.development.ts`;
dotenv.config({path: '.okta.env'});

if (process.env.ISSUER && process.env.CLIENT_ID) {
  const envFile = `export const environment = {
    clientID: '${process.env.CLIENT_ID}',
    issuer: '${process.env.ISSUER}'
  };
  `;

  writeFile(envFilePath, envFile, (err) => {
    if (err) {
      throw console.error(err);
    }
  });
} else {
  throw console.error(`Set ISSUER and CLIENT_ID in .okta.env`);
}
