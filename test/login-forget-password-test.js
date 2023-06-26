/* const puppeteer = require('puppeteer');
const { expect } = require('chai');

let browser, page;


beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
  await page.goto('https://app.gcalls.co');
  
});

//case 1
it('should navigate to the login page successfully', async () => {
  const title = await page.title();
  expect(title).to.equal('Gcalls - Đăng nhập');
  await page.type('#tenant', 'trang-test1234');
  await page.click("button[type='submit']");
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.waitForSelector('#username', { timeout: 60000 }) 
  await page.type('#username', 'pham01000@gmail.com');
  await page.click('#forgotPassword');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.click('.forgot-password');
  // Điền email vào form lấy lại mật khẩu và gửi yêu cầu
await page.waitForSelector('#forgot-email');
await page.type('#forgot-email', 'Địa chỉ email của bạn');
await page.click('#btnForgotPass');
// Kiểm tra kết quả và đóng trình duyệt
const successResult = 'Đã gửi yêu cầu lấy lại mật khẩu thành công. Vui lòng kiểm tra email của bạn.';
const result = await page.$eval('.noty_body', el => el.innerText);
console.log(result === successResult ? 'Thành công' : 'Thất bại');
await browser.close();
});
 */