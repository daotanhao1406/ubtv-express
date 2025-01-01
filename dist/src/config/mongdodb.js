"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CLOSE_DB: function() {
        return CLOSE_DB;
    },
    CONNECT_DB: function() {
        return CONNECT_DB;
    },
    GET_DB: function() {
        return GET_DB;
    }
});
const _mongodb = require("mongodb");
let ubtvDatabaseInstance = null;
const mongoClientInstance = new _mongodb.MongoClient(process.env.MONGODB_URI || 'mongodb+srv://daotanhao9h:Xm2thlvSnb5Ebtgg@cluster-learn-be.43yr4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-learn-be', {
    serverApi: {
        version: _mongodb.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
const CONNECT_DB = async ()=>{
    await mongoClientInstance.connect();
    ubtvDatabaseInstance = mongoClientInstance.db(process.env.DATABASE_NAME || 'ubtv');
};
const GET_DB = ()=>{
    if (!ubtvDatabaseInstance) throw new Error('MongoDB connection returns undefined');
    return ubtvDatabaseInstance;
};
const CLOSE_DB = async ()=>{
    await mongoClientInstance.close();
};

//# sourceMappingURL=mongdodb.js.map