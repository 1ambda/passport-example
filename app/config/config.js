
// mongo-db url example
// mongodb://id:passwd@localhost:port/db-name'

module.exports = {
  development : {
    db : 'mongodb://test-id:test-pw@localhost/test-db',
    mode: 'development',
    port: 3001,
    FACEBOOK_APP_ID: "240812856126072",
    FACEBOOK_APP_SECRET: "d8d0521ed1fc65a01c5a0d1dcbc5dd99",
    FACEBOOK_CALLBACK_URL: "http://localhost:3000/oauth/facebook/callback",
    OPENKNOWL_AUTHORIZATION_URL: "https://ac-dev.openknowl.com/api/token",
    OPENKNOWL_TOKEN_URL: "https://ac-dev.openknowl.com/api/token",
    OPENKNOWL_APP_ID: "passport",
    OPENKNOWL_APP_SECRET: "95BC146606969119158CB4F66C71F941",
    OPENKNOWL_CALLBACK_URL: "http://localhost:3001/oauth/openknowl/callback"
  }
};
