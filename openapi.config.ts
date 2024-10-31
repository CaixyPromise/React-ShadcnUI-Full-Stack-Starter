const { generateService } = require("@umijs/openapi");

generateService({
    requestLibPath: "import request from '@/lib/request'",
    schemaPath: "http://localhost:7529/api/v2/api-docs",
    serversPath: "./src",
});
