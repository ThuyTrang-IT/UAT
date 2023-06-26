const puppeteer = require('puppeteer');
const { expect } = require('chai');

let browser, page;

async function loginFailed({ username, password }) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
  await page.goto('https://app.gcalls.co');
  await page.type('#tenant', 'trang-test1234');
  await page.click("button[type='submit']");
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.waitForSelector('#username', { timeout: 60000 }) 
  await page.type('#username', username);
  await page.type('#password', password);
  await page.click('input[type="submit"]');
  
  const errorMessage = await page.$eval('#input-error', element => element.textContent.trim());
  
  await browser.close();
  
  return errorMessage === 'Invalid username or password.';
}

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
});
//case 2
it("Nhập tên tổng đài rỗng", async () => {
  await page.click("button[type='submit']");
  const doesExist = await page.evaluate(() => {
  const errorMessage = document.getElementById('tenantError');
  return errorMessage && errorMessage.innerText.includes('Tên tổng đài không được rỗng');
  });
  expect(doesExist).to.be.true;   
  });

//case 3
it("Sign in successfully", async () => {

    // Điền thông tin đăng nhập và bấm nút đăng nhập
    await page.type('#tenant', 'trang-test1234');
    await page.click("button[type='submit']");
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForSelector('#username', { timeout: 60000 }) 
    await page.type('#username', 'pham01000@gmail.com');
    await page.type('#password', '12345678910');
    await page.click("input[type='submit']");
    
    // Chờ cho trang chuyển hướng đến hoàn tất
    await page.waitForNavigation({ timeout: 60000, waitUntil: 'networkidle2' })
    // Kiểm tra xem trang hiện tại có phải là trang chủ hay không
    const result = await page.title();
    expect(result).to.equal('Gcalls - Trang chủ');
  
    // Đóng trình duyệt
    await browser.close();
  });

//case 4

it("Notifying missing email", async () => {
  const result = await loginFailed({
    username: "",
    password: "12345678910",
  });
    
  expect(result).to.equal(true);
});
//case 5

it("Notifying missing password", async () => {

  const result = await loginFailed({
    username: "pham01000@gmail.com",
    password: "",
  });
    
  expect(result).to.equal(true);
});
//case 6

it("Email does not exist", async () => {
  
  const result = await loginFailed({
    username: "wrong@test.com",
    password: "wrongpass",
  });
    
  expect(result).to.equal(true);
});
 //case 7 
it("Password is wrong", async () => {
  const result = await loginFailed({
    username: "wrong@test.com",
    password: "wrongpass",
  });
    
  expect(result).to.equal(true);
});
//case 8
it("Missing all fields", async () => {
  const result = await loginFailed({
    username: "",
    password: "",
  });
    
  expect(result).to.equal(true);
});
//case 9
it("Email without Local part", async () => {
  const result = await loginFailed({
    username: "@gmail.com",
    password: "12345678910",
  });
    
  expect(result).to.equal(true);
});

//case 10 

it("Email without @", async () => {
  const result = await loginFailed({
    username: "pham01000gmail.com",
    password: "12345678910",
  });
    
  expect(result).to.equal(true);
});

//case 11
it("Email without domain", async () => {
  const result = await loginFailed({
    username: "pham01000@",
    password: "12345678910",
  });
    
  expect(result).to.equal(true);
});

//case 12
it("Email with invalid domain", async () => {
  const result = await loginFailed({
    username: "pham01000@",
    password: "12345678910",
  });
    
  expect(result).to.equal(true);
});


after(async () => {
  await browser.close();
}); 