// jest.config.js
module.exports = {
  setupFiles: ["./tests/setEnvVars.js"],
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/", "/images/", "/Certificate"],

};
