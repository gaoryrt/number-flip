var webdriver = require('selenium-webdriver');

// Input capabilities
var capabilities = {
 'browserName' : 'IE',
 'browser_version' : '11.0',
 'os' : 'Windows',
 'os_version' : '10',
 'resolution' : '1024x768',
 'browserstack.user' : 'gaoryrt1',
 'browserstack.key' : 'GbeUymdgx398GTypHabx',
 'name' : 'Bstack-[Node] Sample Test',
 'browserstack.local' : 'true',
 'browserstack.debug': 'true'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

driver.get('https://ujzq9.codesandbox.io/').then(_ => {
  // driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log(title);
      driver.quit();
    });
  // });
});
