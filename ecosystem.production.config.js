module.exports = {
  apps: [
    {
      name: "fea-production",
      cwd: "/var/www/fea-production",
      script: "node_modules/.bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 2,
      exec_mode: "cluster",
      max_memory_restart: "512M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "/var/log/pm2/fea-production-error.log",
      out_file: "/var/log/pm2/fea-production-out.log",
      merge_logs: true,
    },
  ],
};
