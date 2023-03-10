const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AnonymizeUAPlugin = require('puppeteer-extra-plugin-anonymize-ua');


puppeteer.use(StealthPlugin());
puppeteer.use(AnonymizeUAPlugin());

const launchBrowser = async (userprofile) => {
  const browser = await puppeteer.launch({
    headless: false,
    // devtools: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    userDataDir: "C:/Users/ruhka/AppData/Local/Google/Chrome/User Data",
    ignoreDefaultArgs: ["--disable-extensions",
                        "--enable-automation",
                        "--disable-blink-features=AutomationControlled"],
    args: [
      userprofile, 
      '--start-maximized',
      "--disable-extensions",
      '--disable-sync'
    ]
  });
  return browser;
};

const profiles = [
  'Profile 62',
  'Profile 27',
  'Profile 58',
  'Profile 61', 
  'Profile 42', 
  'Profile 12',
  'Profile 51', 
  'Profile 60', 
  'Profile 22', 
  'Profile 44', 
  'Profile 16', 
  'Profile 15', 
  'Profile 46',
  'Profile 25', 
  'Profile 53', 
  'Profile 34', 
  'Profile 3' , 
  'Profile 24',
  'Profile 33',
  'Profile 14', 
  'Profile 8' , 
  'Profile 47', 
  'Profile 36', 
  'Profile 39', 
  'Profile 52', 
  'Profile 45', 
  'Profile 41', 
  'Profile 31', 
  'Profile 38', 
  'Profile 50', 
  'Profile 10', 
  'Profile 64', 
  'Profile 37', 
  'Profile 20', 
  'Profile 56', 
  'Profile 28', 
  'Profile 59', 
  'Profile 40', 
  'Profile 29', 
  'Profile 13', 
  'Profile 49', 
  'Profile 26', 
  'Profile 17', 
  'Profile 43', 
  'Profile 23', 
  'Profile 32', 
  'Profile 21', 
  'Profile 6' ,
];


async function runchrome() {
  for (let i = 0; i < profiles.length; i++) {
    const browser = await launchBrowser(`--profile-directory=${profiles[i]}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768,deviceScaleFactor:1 });

    await page.goto('https://testnet.veax.com/');
    console.log(`Open Website....`);
    try {
      const isConnected = await page.waitForSelector("#root > div > div > div._body_135gp_96 > header > div > div._header__right_1hp6b_46 > div._button_bnxhq_1._button_17lik_1._active_bnxhq_207._button__secondary_bnxhq_38._button__small_bnxhq_114",{ timeout: 1500 });
      if (isConnected){
        console.log('sudah konek lanjut garap gess')
      }
    }catch (error) {
      console.log("koneksi ke wallet")
      await page.waitForSelector("#root > div > div > div._body_135gp_96 > header > div > div._header__right_1hp6b_46 > div._button_bnxhq_1._button_17lik_1._active_bnxhq_207._button__primary_bnxhq_10._button__small_bnxhq_114 > div");
      // await page.waitForTimeout(5000);
      await page.click("#root > div > div > div._body_135gp_96 > header > div > div._header__right_1hp6b_46 > div._button_bnxhq_1._button_17lik_1._active_bnxhq_207._button__primary_bnxhq_10._button__small_bnxhq_114 > div");
      console.log("click")
      await page.waitForTimeout(1500);

      await page.waitForSelector("#root")

      await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(4)");
      await page.waitForTimeout(1500);
      
      console.log("berpindah ke extension");

      const extensionTarget = await browser.waitForTarget(target => target.url().startsWith('chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/'), {timeout: 15000});
      const extensionPage = await extensionTarget.page();
      if (!extensionPage) {
        console.log("Error: Extension tidak terbuka");
        return;
      } else {
        console.log("success open")
      }
      await extensionPage.waitForSelector('#app-container');
      console.log("load extension page ");
      
      //login
      await extensionPage.type('#app-container > div > div.sc-jSMfEi.dDcmPc.password-input.MuiBox-root.css-0 > div > input[type=password]', 'password');
      await extensionPage.waitForTimeout(1500);
      await extensionPage.click('#app-container > div > div.MuiBox-root.css-18l9n56 > button');
      await extensionPage.waitForTimeout(1500);
      console.log("sukses login")
      console.log(extensionPage)
      // halaman selanjutnya
      const nextPageTarget = await browser.waitForTarget(target => target.url().startsWith('chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/dapp/sign-in'), {timeout: 15000});
      const nextPageSession = await nextPageTarget.createCDPSession();
      await nextPageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/dapp/sign-in'});
    // console.log(nextPageSession)

      const nextExtPage = await nextPageTarget.page();
      console.log(nextPageSession);
      await nextExtPage.click("#app-container > div > div.buttons.MuiBox-root.css-0 > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.sc-gsnTZi.guhSZv.button.css-1jzl15x");
      await nextExtPage.waitForTimeout(1500);
      console.log("berhasil login wallet")
      await nextPageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/'});
      await page.bringToFront();
      console.log(`Open Website....`);
      await nextExtPage.waitForTimeout(5000);
  }


    // eksekusi testnet faucet
    await page.waitForSelector("._link_1q0a5_1[data-active='false'][data-test-id='nav-to-mint'][href='/mint']")
    await page.click("._link_1q0a5_1[data-active='false'][data-test-id='nav-to-mint'][href='/mint']")
    await page.waitForTimeout(1500)

    const selectors = ["#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(1)",
                       "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(2)", 
                       "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(3)",
                       "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(4)",
                       "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(5)",
                       "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(6)"
                    ]; 
    let j = 0;
    while (j < selectors.length) {
      try {
        await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > form > div._form__inputs_i4au7_10 > div > div._button_ms2ts_1._button_1fjwg_32._button_clickable_ms2ts_12")
        await page.waitForTimeout(1500);
        await page.waitForSelector(selectors[j]);
        await page.click(selectors[j]);
        await page.waitForTimeout(1500);
        await page.click("._button__colored_bnxhq_66");
        await page.waitForTimeout(1500);
        const extensionTarget = await browser.waitForTarget(target => target.url().startsWith('chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/'), {timeout: 1500});
        const extensionPage = await extensionTarget.page();
        await extensionPage.waitForSelector('#app-container');
        console.log("load extension page ");
        
        try {
          const login = await extensionPage.waitForSelector("#app-container > div > div.MuiBox-root.css-18l9n56 > button",{ visible: true, timeout: 1500 })
          if (login) {
            await extensionPage.type('#app-container > div > div.sc-jSMfEi.dDcmPc.password-input.MuiBox-root.css-0 > div > input[type=password]', 'password');
            await extensionPage.waitForTimeout(1500);
            await extensionPage.click('#app-container > div > div.MuiBox-root.css-18l9n56 > button');
            await extensionPage.waitForTimeout(1500);
            console.log("sukses login");

            //next page 
            
            const nextPageTarget = await browser.waitForTarget(target => target.url().startsWith('chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/dapp/approve-transaction'), {timeout: 1500});
            const nextPageSession = await nextPageTarget.createCDPSession();
            await nextPageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/dapp/approve-transaction'});
            const nextExtPage = await nextPageTarget.page();
            await nextExtPage.waitForTimeout(1500);
            await nextExtPage.click("#app-container > div > div.buttons.MuiBox-root.css-0 > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.sc-gsnTZi.guhSZv.button.css-1jzl15x")            
            await nextExtPage.waitForTimeout(1500);
            console.log("faucet sukses login")
            await nextPageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/'});
            await page.bringToFront();
            }
          } catch (log){
            console.log("\nsudah login");
            // console.error("Error pada indeks ke-" + j + ": " + log);
            await extensionPage.waitForTimeout(1500);
            const pageSession = await extensionTarget.createCDPSession();
            // await extensionPageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/dapp/approve-transaction'});
            await extensionPage.click("#app-container > div > div.buttons.MuiBox-root.css-0 > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.sc-gsnTZi.guhSZv.button.css-1jzl15x")
            await pageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/'});
            await extensionPage.waitForTimeout(1500);
            console.log("faucet sukses")
            await page.bringToFront();
        }
        j++;
      } catch (error) {
        console.error(error);
        console.log(`Open Website....`);
        await page.waitForTimeout(5000);
        break;
      }
    }

    //add liquidity
    // await page.waitForTimeout(1500)
    await page.waitForSelector("._link_1q0a5_1[data-active='false'][data-test-id='nav-to-pool'][href='/pool']")
    await page.click("._link_1q0a5_1[data-active='false'][data-test-id='nav-to-pool'][href='/pool']")
    await page.waitForTimeout(1500)
    console.log("add liquidity")
    await page.waitForTimeout(1500)
    const selectors1 = [
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(1)",
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(3)",
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(5)"
    ]
    const selecctors2 = [
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(2)",
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(4)",
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(6)"
    ]
    let liq = 0;
    while (liq < selectors1.length){
      try {
        await page.waitForSelector("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-pool'][href='/pool']")
        await page.click("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-pool'][href='/pool']")
        await page.waitForTimeout(1500)
        await page.waitForSelector("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div._header_1emtv_1 > div")
        await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div._header_1emtv_1 > div")
        await page.waitForTimeout(1500)
        await page.waitForSelector("#root > div > div > div._body_135gp_96 > main > div > div > div:nth-child(2) > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > div._wrapper_1cj1u_1 > div:nth-child(1) > div._wrapper_1y60e_2 > div > div:nth-child(1)")
        await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div:nth-child(2) > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > div._wrapper_1cj1u_1 > div:nth-child(1) > div._wrapper_1y60e_2 > div > div:nth-child(1)")
        await page.waitForTimeout(1500)
        await page.waitForSelector(selectors1[liq])
        await page.click(selectors1[liq])
        await page.waitForTimeout(1500)
        await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div:nth-child(3) > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > div._wrapper_1cj1u_1 > div:nth-child(1) > div._wrapper_1y60e_2 > div > div:nth-child(2)")
        await page.waitForSelector(selecctors2[liq])
        await page.click(selecctors2[liq])
        await page.waitForTimeout(1500)
        await page.type("#root > div > div > div._body_135gp_96 > main > div > div > div:nth-child(3) > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > div._wrapper_1cj1u_1 > div:nth-child(2) > div._wrapper_77rdd_1 > div > div:nth-child(1) > input","5")
        await page.type("#root > div > div > div._body_135gp_96 > main > div > div > div:nth-child(3) > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > div._wrapper_1cj1u_1 > div:nth-child(2) > div._wrapper_77rdd_1 > div > div:nth-child(2) > input","1")
        await page.waitForTimeout(1500)
        await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div:nth-child(3) > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > div._wrapper_1cj1u_1 > div:nth-child(2) > div._button_bnxhq_1._button_9333t_1._active_bnxhq_207._full_width_bnxhq_211._button__colored_bnxhq_66._button__large_bnxhq_94")
        await page.waitForTimeout(1500)
        const extensionTarget = await browser.waitForTarget(target => target.url().startsWith('chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/dapp/approve-transaction'), {timeout: 1500});
        const pageSession = await extensionTarget.createCDPSession();
        const extensionPage = await extensionTarget.page();
        await extensionPage.waitForSelector("#app-container > div > div.buttons.MuiBox-root.css-0 > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.sc-gsnTZi.guhSZv.button.css-1jzl15x")
        await page.waitForTimeout(1500)
        await extensionPage.click("#app-container > div > div.buttons.MuiBox-root.css-0 > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.sc-gsnTZi.guhSZv.button.css-1jzl15x")
        await page.waitForTimeout(1500)
        console.log("liquidity sukses")
        await pageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/'});
        await page.bringToFront();
        await page.waitForTimeout(1500)
        await page.waitForSelector("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-pool'][href='/pool']")
        await page.click("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-pool'][href='/pool']")
        liq++
      } catch (error){
        console.error("Error pada indeks ke-" + j + ": " + error);
        await page.bringToFront();
        console.log(`Open Website....`);
        await page.waitForTimeout(5000);
        break;
      }
    }


    //swap
    await page.waitForSelector("._link_1q0a5_1[data-active='false'][data-test-id='nav-to-swap'][href='/swap']")
    await page.click("._link_1q0a5_1[data-active='false'][data-test-id='nav-to-swap'][href='/swap']")
    console.log("swap")
    const selector1 = [
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(1)",
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(4)"
    ]
    const selector2 = [
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(5)",
      "#root > div > div > div._body_135gp_96 > main > div > div > div._section_1yrbq_1._section__shadow_1yrbq_23._section__hover_1yrbq_14 > div._content_1yrbq_89._content__defaultBG_1yrbq_97 > div > div:nth-child(1) > div._select__options_5g304_59 > div:nth-child(6)"
    ]
    const values = [
      "5",
      "7"
    ]
    let s = 0;
    while (s < selector1.length ){
      try {
          await page.waitForSelector("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-swap'][href='/swap']")
          await page.click("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-swap'][href='/swap']")
          await page.waitForSelector("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > form > div._form__inputs_1ofsr_11 > div:nth-child(1) > div._button_ms2ts_1._button_1fjwg_32._button_clickable_ms2ts_12")
          await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > form > div._form__inputs_1ofsr_11 > div:nth-child(1) > div._button_ms2ts_1._button_1fjwg_32._button_clickable_ms2ts_12",{timeout:1500})
          await page.waitForTimeout(1500);
          await page.waitForSelector(selector1[s]);
          await page.click(selector1[s]);
          await page.waitForTimeout(1500);
          await page.type("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > form > div._form__inputs_1ofsr_11 > div:nth-child(1) > input",values[s])
          await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > form > div._form__inputs_1ofsr_11 > div:nth-child(3) > div._button_ms2ts_1._button_1fjwg_32._button_clickable_ms2ts_12")
          await page.waitForTimeout(1500);
          await page.waitForSelector(selector2[s]);
          await page.click(selector2[s]);
          await page.waitForTimeout(1500);
          await page.waitForSelector("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > form > div._button_bnxhq_1._form__button_1ofsr_19._active_bnxhq_207._full_width_bnxhq_211._button__colored_bnxhq_66._button__large_bnxhq_94")
          await page.click("#root > div > div > div._body_135gp_96 > main > div > div > div > div._content_1yrbq_89._content__transparentBG_1yrbq_103._content__trimmedCorner_1yrbq_106 > div > form > div._button_bnxhq_1._form__button_1ofsr_19._active_bnxhq_207._full_width_bnxhq_211._button__colored_bnxhq_66._button__large_bnxhq_94")
          
          const extensionTarget = await browser.waitForTarget(target => target.url().startsWith('chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/dapp/approve-transaction'), {timeout: 1500});
          const pageSession = await extensionTarget.createCDPSession();
          const extensionPage = await extensionTarget.page();
          await extensionPage.waitForSelector('#app-container');
          console.log("load extension page ");
          await extensionPage.waitForTimeout(1500);
          await extensionPage.waitForSelector("#app-container > div > div.buttons.MuiBox-root.css-0 > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.sc-gsnTZi.guhSZv.button.css-1jzl15x")
          await extensionPage.click("#app-container > div > div.buttons.MuiBox-root.css-0 > button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.sc-gsnTZi.guhSZv.button.css-1jzl15x")            
          await extensionPage.waitForTimeout(1500);
          console.log("swap sukses")
          await pageSession.send('Page.navigate', {url: 'chrome-extension://epapihdplajcdnnkdeiahlgigofloibg/popup.html#/'});
          await page.bringToFront();
          const tomb = await page.waitForSelector("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-swap'][href='/swap']",{timeout:2000})
          if (tomb){
            await page.click("._link_1q0a5_1[data-active='true'][data-test-id='nav-to-swap'][href='/swap']")
          }else {
            await page.click("._link_1q0a5_1[data-active='false'][data-test-id='nav-to-swap'][href='/swap']")
          }
          await extensionPage.waitForTimeout(5000)
          s++;
      } catch(log) {
        console.error("Error pada indeks ke-" + s + ": " + log);
        break;
      }
    }

    await page.waitForTimeout(5000)
    console.log(`\n${profiles[i]}`, `sukses\n`);
    await browser.close();
    }

}

runchrome();

