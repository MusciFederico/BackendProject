// import { genSaltSync, hashSync, compareSync } from "bcrypt";

// const createHash = (password) => hashSync(password, genSaltSync(10));

// const verifyHash = (req, db) => compareSync(req, db);

// export { createHash, verifyHash }

import bcrypt from "bcryptjs";

const createHash = (password) => bcrypt.hashSync(password, 10);

const verifyHash = (req, db) => bcrypt.compareSync(req, db);

export { createHash, verifyHash };
