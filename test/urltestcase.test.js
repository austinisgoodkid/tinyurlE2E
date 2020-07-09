describe('the URL short funtion',()=>{

    test('Url input currect',async ()=>{

        await page.goto('https://tinyurl.com/')
        
        const inputUrlTextbux = '#url'
        await page.waitForSelector(inputUrlTextbux)
        await page.focus(inputUrlTextbux)
        await page.keyboard.type("https://picsee.co/?lang=zh-tw")

        const custUrladressTextbox ='#alias'
        await page.focus(custUrladressTextbox)
        await page.keyboard.type("PicSee")

        const makeUrlbtn ='input[type=submit]:nth-child(5)';
        await page.waitForSelector(makeUrlbtn)
        await page.click(makeUrlbtn)
        
        //check success message
        await page.waitForSelector('#contentcontainer > h1')
        const creatSuccMsg = await page.$eval('#contentcontainer > h1', e => e.innerText);
        expect(creatSuccMsg).toEqual('TinyURL was created!');
        
        //check expect url
        await page.waitForSelector('#contentcontainer > div:nth-child(4) > b')
        const resultUrl = await page.$eval('#contentcontainer > div:nth-child(4) > b', e => e.innerText);
        expect(resultUrl).toEqual('https://tinyurl.com/PicSee');

        //2nd gen short orther Url
        await page.waitForSelector(inputUrlTextbux)
        await page.focus(inputUrlTextbux)
        await page.keyboard.type("https://www.google.com/search?q=picsee&rlz=1C1MSIM_enTW642TW642&sxsrf=ALeKk03mCIDNRE26lvhpYHWbKvYFr5QTWw:1594274094815&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj9-OHovb_qAhVAyosBHcb0A9oQ_AUoAnoECAwQBA&biw=1920&bih=937")


        await page.waitForSelector(makeUrlbtn)
        await page.click(makeUrlbtn)

        //check success message
        await page.waitForSelector('#contentcontainer > h1')
        await page.$eval('#contentcontainer > h1', e => e.innerText);
        expect(creatSuccMsg).toEqual('TinyURL was created!');
        
        //check url gen normaily
        await page.waitForSelector('#contentcontainer > div:nth-child(4) > b')
        const Url2ndResult = await page.$$('#contentcontainer > div:nth-child(4) > b');
        expect(Url2ndResult).toHaveLength(1);
        
        //goto 2nd short URL
        const test2ndResultUrl = await page.$eval('#contentcontainer > div:nth-child(4) > b', e => e.innerText);
        await page.goto(test2ndResultUrl)
  

        //check 2nd URL is expect
        const title = await page.title()
        expect(title).toEqual('picsee - Google 搜尋')
        

    })
    test('Url input not Url',async ()=>{

        await page.goto('https://tinyurl.com/')
        
        const inputUrlTextbux = '#url'
        await page.waitForSelector(inputUrlTextbux)
        await page.focus(inputUrlTextbux)
        await page.keyboard.type("this input is for fail")

        const custUrladressTextbox ='#alias'
        await page.focus(custUrladressTextbox)
        await page.keyboard.type("PicSee")

        //click sumit btn to gen short Url
        const makeUrlbtn ='input[type=submit]:nth-child(5)';
        await page.waitForSelector(makeUrlbtn)
        await page.click(makeUrlbtn)

        await page.waitForSelector('#contentcontainer > p:nth-child(1) > b')
        const errMessageForUrl = await page.$eval('#contentcontainer > p:nth-child(1) > b', e => e.innerText);
        expect(errMessageForUrl).toEqual('Invalid URL');


    })

})