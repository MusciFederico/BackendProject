import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => hashSync(password, genSaltSync(10));

const verifyHash = (password, hashedPassword) => compareSync(password, hashedPassword);

export { createHash, verifyHash }

// import bcrypt from "bcryptjs";

// const createHash = (password) => bcrypt.hashSync(password, 10);

// const verifyHash = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

// export { createHash, verifyHash };
