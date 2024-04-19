import args from "../args.js";

const persistence = args.env || "prod";
let logger;

switch (persistence) {
    case "prod":
        const { default: winstonMem } = await import("./winstonProd.js");
        logger = winstonMem
        break;
    case "test":
        const { default: winstonTest } = await import("./winstonTest.js");
        logger = winstonTest
        break;
    default:
    case "dev":
        const { default: winstonDev } = await import("./winstonDev.js");
        logger = winstonDev
        break;
}
export default logger;