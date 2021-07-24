module.exports = {
  apps: [
    {
      name: 'PwnStationWeb',
      port: 3000,
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      cwd: '/opt/pwnstation-web',
      watch: true,
      max_memory_restart: "512M",
      instance_var: 'PwnPanelInstance',
      autorestart: true,
      env: {
        PORT: 3000,
        HOST: '0.0.0.0',
        WS_URL: 'ws://pwn.panel',
        NODE_ENV: 'production',
        CWD_DIR: '/home/pi/',
        SHUTDOWN_COMMAND: JSON.stringify({"cmd": "sudo", "args": ["x728softsd.sh"]}),
        REBOOT_COMMAND: JSON.stringify({"cmd": "sudo", "args": ["reboot"]})
      },
      env_production: {
        PORT: 3000,
        HOST: '0.0.0.0',
        WS_URL: 'ws://pwn.panel',
        NODE_ENV: 'production',
        CWD_DIR: '/home/pi/',
        SHUTDOWN_COMMAND: JSON.stringify({"cmd": "sudo", "args": ["x728softsd.sh"]}),
        REBOOT_COMMAND: JSON.stringify({"cmd": "sudo", "args": ["reboot"]})
      }
    }
  ]
}
