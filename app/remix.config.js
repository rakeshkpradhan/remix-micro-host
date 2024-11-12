const { server } = require("typescript");

module.exports = {
    serverBuildTarget: "node-cjs",
    server: "./server.js",
    ignoreRouteFiles: ["**/*"],
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    serverBuildPath: "build/index.js",
    publicPath: "/build/",
    routes: async (defineRoutes) => {
        return defineRoutes((route) => {
            route("/", "root");
        });
    },
};