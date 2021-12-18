import hashService from '../general/services/hashService';
import jwtService from '../general/services/jwtService';
import usersService from '../users/service';

const loginService = {
  login: async (email:string, password: string) => {
  /**
    * Kas kasutaja eksisteerib?
    */
    const user = await usersService.getUserByEmail(email);
    if (!user) return false;
    /**
     * Kas sisestatud parool matchib salvestatud parooliga?
     */
    const match = await hashService.match(password, user.password);
    if (!match) return false;
    /**
     * Return jwtoken to confirm login if entered password matches with hashed password
     */
    const token = await jwtService.sign(user);

    return token;
    // return token;
  },
};

export default loginService;
