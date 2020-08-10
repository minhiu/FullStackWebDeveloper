const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://phaminhieu.com');
    await driver.findElement(By.className('resume-button')).click();
  } finally {
    await driver.quit();
  }
})();
