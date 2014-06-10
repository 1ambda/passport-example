
// mongo-db url example
// mongodb://id:passwd@localhost:port/db-name'

module.exports = {
  development : {
    db : 'mongodb://test-id:test-pw@localhost/test-db',
    mode: 'development',
    port: 3000,
    FACEBOOK_APP_ID: "240812856126072",
    FACEBOOK_APP_SECRET: "d8d0521ed1fc65a01c5a0d1dcbc5dd99",
    FACEBOOK_CALLBACK_URL: "http://localhost:3000/oauth/facebook/callback"
  }
};
