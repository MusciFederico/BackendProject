import crypto from "crypto";
import args from "../utils/args.js";
import { createHash } from "../utils/hash.js";

class UserDTO {
    constructor(data) {
        args.env !== "prod" && (this._id = crypto.randomBytes(12).toString('hex'))
        this.name = data.name,
            this.email = data.email,
            this.password = createHash(data.password),
            this.role = data.role || 0,
            args.env !== "prod" && (this.updatedAt = new Date())
        args.env !== "prod" && (this.createdAt = new Date())
    }
}

export default UserDTO;