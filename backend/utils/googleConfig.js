import { google} from 'googleapis';
import dotenv from "dotenv";
dotenv.config();
const GOOGLE_CLIENT_ID = process.env.clientId;
const GOOGLE_CLIENT_SECRET = process.env.clientSecret;

const oauth2client = new google.auth.OAuth2(
    process.env.clientId,process.env.clientSecret,
'postmessage')

export { oauth2client };