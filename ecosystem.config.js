module.exports = {
  apps: [
    {
      name: 'PwnStationWeb',
      port: 3000,
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      cwd: '/opt/pwnstation-web',
      autorestart: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
