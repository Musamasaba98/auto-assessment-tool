## BASIC FOLLOW UP TUTORIAL FOR THE PROJECT

This is all about the steps and ideas I may need to note down as i work on the project

### Steps for working on the project

1. Create a puppeteer to fetch HTML content from project URL
   ```bash
   import puppeteer from "puppeteer"
   const fetchService=asyncHandler(async(url)=>{
       const browser=await puppeteer.launch() //launch new browser instance
       const page=await browser.newPage() //creates a new tab in the browser
       try{
           await page.goto(url,{waitUntil:"networkidle2"}) //when network is idle,navigate url
           const htmlContent = await page.content();
           return htmlContent;
       }catch(error){
           console.error(`Error fetching HTML from ${url}:`, error);
           return null;
       }
   })
   ```
2. HTML parse service, to analyse HTML structure of the project

   ```bash
   import  * as cheerio from "cheerio" //cheerio is deprecated we has to import all as cheerio
   export const htmlParseService=asyncHandler(async(htmlContent)=>{
       const $=cheerio.load(htmlContent)
       const hasHeader=$('header').length>0
       return {
           hasHeader,
       }
   })
   ```
