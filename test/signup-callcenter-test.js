const puppeteer = require("puppeteer");
const expect = require("chai").expect;
describe("Testing signup page", () => {
  let page;
  let browser;
  before(async () => {
      browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      
      args: ["--start-maximized"],
      
      timeout: 60000
    });

  }); // Func called before all test

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://app.gcalls.co/");
    await page.click("a");
    await page.waitForSelector(".swal-overlay.swal-overlay--show-modal");
    await page.click(".swal-button--confirm");
  });

  //case 1
  it("Enter callcenter successfully", async function () {
    const email = "pham01000@gmail.com";
    const callCenter = "trang-test1234";

    await page.focus("#tenant");
    await page.keyboard.type(callCenter);
    await page.focus("#email");
    await page.keyboard.type(email);
    await page.click("button[type='submit']");
  });
  //case 2
  it("Enter callcenter have existed", async function () {
    const email = "pham01000@gmail.com";
    const callCenter = "trang-test1234";

    await page.focus("#tenant");
    await page.keyboard.type(callCenter);
    await page.focus("#email");
    await page.keyboard.type(email);
    await page.click("button[type='submit']");
    await page.waitForFunction(
      () => document.querySelector("#tenantError").textContent !== ""
    );
    const errorMessage = await page.$eval(
      "#tenantError",
      (element) => element.textContent
    );

    expect(errorMessage.trim()).to.equal("Tổng đài đã tồn tạ");
  });

  //case 3
  it("Enter missing email", async function () {
    const callCenter = "trang-test1234";
    const email ="";

    await page.focus("#tenant");
    await page.keyboard.type(callCenter);
    await page.focus("#email");
    await page.keyboard.type(email);
    await page.click("button[type='submit']");
    const doesExist = await page.evaluate(() => {
      const errorMessage = document.getElementById('emailError');
      return (
        errorMessage &&
        errorMessage.innerText.includes('Email Admin không được rỗng')
      );
    });
    expect(doesExist).to.be.true;
  });

 //case 4
  it("Email without Local part", async function () {
    const callCenter = "trang-test1234";
    const email = "@gmail.com";

    await page.focus("#tenant");
    await page.keyboard.type(callCenter);
    await page.focus("#email");
    await page.keyboard.type(email);
    await page.click("button[type='submit']");
    const doesExist = await page.evaluate(() => {
      const errorMessage = document.getElementById('emailError');
      return (
        errorMessage &&
        errorMessage.innerText.includes('Email Admin không đúng định dạng')
      );
    });
    expect(doesExist).to.be.true;
  });

  //case 5
  it("Email without @", async function () {
    const callCenter = "trang-test1234";
    const email = "pham01000gmail.com";

    await page.focus("#tenant");
    await page.keyboard.type(callCenter);
    await page.focus("#email");
    await page.keyboard.type(email);
    await page.click("button[type='submit']");
    const doesExist = await page.evaluate(() => {
      const errorMessage = document.getElementById('emailError');
      return (
        errorMessage &&
        errorMessage.innerText.includes('Email Admin không đúng định dạng')
      );
    });
    expect(doesExist).to.be.true;
  });

  //case 6
  it("Email without Domain", async function () {
    const callCenter = "trang-test1234";
    const email = "pham01000@";

    await page.focus("#tenant");
    await page.keyboard.type(callCenter);
    await page.focus("#email");
    await page.keyboard.type(email);
    await page.click("button[type='submit']");
    const doesExist = await page.evaluate(() => {
      const errorMessage = document.getElementById('emailError');
      return (
        errorMessage &&
        errorMessage.innerText.includes('Email Admin không đúng định dạng')
      );
    });
    expect(doesExist).to.be.true;
  });
  //case 7
  it("Email with invalid domain", async function () {
    const callCenter = "trang-test1234";
    const email = "pham01000@gmail";

    await page.focus("#tenant");
    await page.keyboard.type(callCenter);
    await page.focus("#email");
    await page.keyboard.type(email);
    await page.click("button[type='submit']");
    const doesExist = await page.evaluate(() => {
      const errorMessage = document.getElementById('emailError');
      return (
        errorMessage &&
        errorMessage.innerText.includes('Email Admin không đúng định dạng')
      );
    });
    expect(doesExist).to.be.true;
  });

  //case 8
  it("Clicking Sign in hyperlink when user is in signup screen", async function () {
    await page.click("a[href='/g/']");
    const url = await page.url();
        console.log(url);
        expect(url).to.equal("https://app.gcalls.co/g/")
  });


  
it("8/Sign up unsuccessfully with 33 characters", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);
  const password = "khongnhokhongnhokhongnhokhongnhoo";
  const re_password = "khongnhokhongnhokhongnhokhongnhoo";

  
  await page.focus("#password");
  await page.keyboard.type(password);
  await page.focus("#passwordConfirm")
  await page.keyboard.type(re_password);
  await page.click("button[type='submit']");
  await page.waitForFunction(
      () => document.querySelector('#passwordError').textContent !== ''
  );
  const errorMessage = await page.$eval('#passwordError', element => element.textContent);

  expect(errorMessage.trim()).to.equal('Mật khẩu không đúng định dạng');
});
it("9/Missing all fields", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);

  await page.click("button[type='submit']");
  await page.waitForFunction(
      () => document.querySelector('#passwordError').textContent !== ''
  );
  const errorMessage = await page.$eval('#passwordError', element => element.textContent);

  expect(errorMessage.trim()).to.equal('Mật khẩu không được rỗng');
});
it("10/Missing password field", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);
  const re_password = "12345678910";

  await page.focus("#passwordConfirm")
  await page.keyboard.type(re_password);
  await page.click("button[type='submit']");
  await page.waitForFunction(
      () => document.querySelector('#passwordError').textContent !== ''
  );
  const errorMessage = await page.$eval('#passwordError', element => element.textContent);

  expect(errorMessage.trim()).to.equal('Mật khẩu không được rỗng');
});
it("11/Missing confirm password field", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);
  const password = "12345678910";

  
  await page.focus("#password");
  await page.keyboard.type(password);
  await page.click("button[type='submit']");
  await page.waitForFunction(
      () => document.querySelector('#passwordConfirmError').textContent !== ''
  );
  const errorMessage = await page.$eval('#passwordConfirmError', element => element.textContent);

  expect(errorMessage.trim()).to.equal('Nhập lại mật khẩu không được rỗng');
});
it("12/Confirm password does not match the password", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);
  const password = "12345678910";
  const re_password = "123456789112323";

  
  await page.focus("#password");
  await page.keyboard.type(password);
  await page.focus("#passwordConfirm")
  await page.keyboard.type(re_password);
  await page.click("button[type='submit']");
  await page.waitForFunction(
      () => document.querySelector('#passwordConfirmError').textContent !== ''
  );
  const errorMessage = await page.$eval('#passwordConfirmError', element => element.textContent);

  expect(errorMessage.trim()).to.equal('Nhập lại mật khẩu không trùng khớp');
});
it("13/Sign up successfully with 8 characters", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);
  const password = "12345678";
  const re_password = "12345678";

  
  await page.focus("#password");
  await page.keyboard.type(password);
  await page.focus("#passwordConfirm")
  await page.keyboard.type(re_password);
  await page.click("button[type='submit']");

  await page.waitForNavigation();
  const urlSignin = await page.url();
  expect(urlSignin).to.equal("https://app.gcalls.co/g/login");
});
it("14/Sign up successfully", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);
  const password = "12345678910";
  const re_password = "12345678910";

  
  await page.focus("#password");
  await page.keyboard.type(password);
  await page.focus("#passwordConfirm")
  await page.keyboard.type(re_password);
  await page.click("button[type='submit']");

  await page.waitForNavigation();
  const urlSignin = await page.url();
  expect(urlSignin).to.equal("https://app.gcalls.co/g/login");
});
it("15/Sign up successfully with 32 characters", async function () {
  const url = "https://app.gcalls.co/b/confirm/7f4d92d0f55eafad589c7b987919246c9455ce79633172addee4f12f45e8ad95f3ea6ac601609f6e27cda559712cd3ebb42a7";
  await page.goto(url);
  const password = "12345678901234567890123456789012";
  const re_password = "12345678901234567890123456789012";

  
  await page.focus("#password");
  await page.keyboard.type(password);
  await page.focus("#passwordConfirm")
  await page.keyboard.type(re_password);
  await page.click("button[type='submit']");

  await page.waitForNavigation();
  const urlSignin = await page.url();
  expect(urlSignin).to.equal("https://app.gcalls.co/g/login");
});
afterEach(async () => {
  await page.close();
});

after(async () => {
  await browser.close();
});
});