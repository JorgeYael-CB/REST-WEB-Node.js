import 'dotenv/config';
import { get } from 'env-var'; // especificidad a las variables de entorno


export const envs = {

    // PORT = puerto donde correo nuestro servidor
    port: get('PORT').required().asPortNumber(),

    // elements statics
    publicPath: get('PUBLIC_PATH').default('public').asString(),
}

