const puppeteer = require('puppeteer');
const { expect } = require('chai');

let browser, page;



beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
  await page.setViewport({width:1220, height:680});
  await page.goto('https://app.gcalls.co');
  await page.waitForNavigation();
  
});

//case 1
it("Enter email successfully", async () => {
  await page.click("a[href='/g/signup']");
  await page.waitForSelector('.swal-overlay.swal-overlay--show-modal');
  await page.click('.swal-button--confirm');
  await page.waitForNavigation();
  
  await page.type('#tenant', 'trang-test12348');
  await page.type('#email','pham01000@gmail.com');
  await page.click("button[type='submit']");
  
  await page.waitForNavigation(); // đợi cho trang web chuyển hướng

  const title = await page.title();
  expect(title).to.equal('Gcalls - Đăng ký');
});

//case 2
it("Enter email successfully", async () => {
  await page.click("a[href='/g/signup']");
  await page.waitForSelector('.swal-overlay.swal-overlay--show-modal');
  await page.click('.swal-button--confirm');

  await page.type('#tenant', 'trang-test1234');
  await page.type('#email','pham01000@gmail.com');
  await page.click("button[type='submit']");
  
  await page.waitForNavigation(); // đợi cho trang web chuyển hướng

  await page.waitForFunction(
    () => document.querySelector('#tenantError').textContent !== ''
);
const errorMessage = await page.$eval('#tenantError', element => element.textContent);

expect(errorMessage.trim()).to.equal('Tổng đài đã tồn tạ');


afterEach(async () => {
  await page.close();
})

after(async () => {
  await browser.close();
})

});











