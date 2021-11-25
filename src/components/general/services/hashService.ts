import bcrypt from 'bcrypt';

const hashService = {
  /**
   * Hash password
   */
  hash: async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  },
  /**
   * Compare if entered password matches with hashed password
   */
  match: async (password: string, hash: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hash);
    return match;
  },
};

export default hashService;
