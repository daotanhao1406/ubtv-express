"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "env", {
    enumerable: true,
    get: function() {
        return env;
    }
});
require("dotenv/config");
const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_APP_HOST,
    LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_APP_PORT
};

//# sourceMappingURL=environment.js.map