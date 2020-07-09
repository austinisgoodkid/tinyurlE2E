module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    devtools: false,
    ignoreHTTPSErrors: true,
  },
  browser: 'chromium',
  browserContext: 'default',
  args: [
    '--disable-notifications',
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process'
  ]
}
