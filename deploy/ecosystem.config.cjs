// pm2 process definition for mortgages.plus
// Usage on the server:
//   cd /var/www/mortgages && pm2 start deploy/ecosystem.config.cjs && pm2 save
module.exports = {
  apps: [
    {
      name: "mortgagesplus",
      cwd: "/var/www/mortgages",
      script: "npm",
      args: "start",
      env: { PORT: "3010" },
      autorestart: true,
    },
  ],
};
