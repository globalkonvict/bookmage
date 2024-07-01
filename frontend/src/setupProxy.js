const { createProxyMiddleware } = require("http-proxy-middleware");

// This file is used to configure the proxy for the development server
// It is used to proxy requests to the backend server
// The backend server is running on port 5000
// The frontend server is running on port 3000
// The proxy is used to avoid CORS issues
// The proxy is used to avoid the need to configure CORS on the backend and frontend server
module.exports = function (app) {
  app.use(
    "/backend",
    createProxyMiddleware({
      target: "http://localhost:5000/",
      changeOrigin: true,
      followRedirects: true,
    })
  );
};
