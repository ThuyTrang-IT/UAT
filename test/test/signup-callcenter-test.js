/* const puppeteer = require("puppeteer");
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


  afterEach(async () => {
    await page.close();
  });

  after(async () => {
    await browser.close();
  });
});
 */