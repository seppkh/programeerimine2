/* eslint-disable max-len */
/**
 * npm install jsonwebtoken
 * npm install @types/jsonwebtoken
 * for typescript: npm --save-dev @types/jsonwebtoken
 */
import jwt from 'jsonwebtoken';
import { dbUser } from '../../users/interface';

const jwtSecret = 'mfu20t9#er0h83rfe';
const jwtService = {
  sign: async (user: dbUser) => {
    /**
     * https://www.npmjs.com/package/jsonwebtoken
     * jwt.sign(payload, secretOrPrivateKey, [options, callback])
     *
     * Tulemusena peab token ütlema user.id ja user.role. Salvestan need jwt payloadi alla, mida saab tokeni abil tagastada.
     */
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    return token;
  },
  verify: async (token: string) => {
    /* const verify = await jwt.verify(token, jwtSecret);
    console.log(verify);
    return verify; */
    try {
      const verify = await jwt.verify(token, jwtSecret); // vastuseks payload: { id: 1, role: 'Admin', iat: 1638026585, exp: 1638030185 }
      return verify;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};

export default jwtService;
