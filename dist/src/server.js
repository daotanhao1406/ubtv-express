"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
require("dotenv/config");
const _mongdodb = require("./config/mongdodb");
const _asyncexithook = /*#__PURE__*/ _interop_require_default(require("async-exit-hook"));
const _environment = require("./config/environment");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const START_SERVER = ()=>{
    const app = (0, _express.default)();
    const port = process.env.PORT || 8017;
    app.get('/', (req, res)=>{
        res.send('Welcome to Express & TypeScript Server');
    });
    app.listen(_environment.env.LOCAL_DEV_APP_PORT, ()=>{
        console.log(`3. Server is Fire at http://localhost:${_environment.env.LOCAL_DEV_APP_PORT}`);
    });
    (0, _asyncexithook.default)(()=>{
        console.log('4. Disconnecting from MongoDB...');
        (0, _mongdodb.CLOSE_DB)();
        console.log('5. Disconnected from MongoDB');
    });
};
(async ()=>{
    try {
        console.log('1. Connecting to MongoDB...');
        await (0, _mongdodb.CONNECT_DB)();
        console.log('2. Connected to MongoDB');
        START_SERVER();
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
})();

//# sourceMappingURL=server.js.map