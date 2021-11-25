/* eslint-disable max-len */
/**
 * npm install jsonwebtoken
 * npm install @types/jsonwebtoken
 * for typescript: npm --save-dev @types/jsonwebtoken
 */
import jwt from 'jsonwebtoken';
import { User } from '../../users/interface';

const jwtSecret = 'mfu20t9#er0h83rfe';
const jwtService = {
  sign: async (user: User) => {
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
  // verify: async (token: string) => {
  // const match = jwt.verify(token, jwtSecret);

};

export default jwtService;
