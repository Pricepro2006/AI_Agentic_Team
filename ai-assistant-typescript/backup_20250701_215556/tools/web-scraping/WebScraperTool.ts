/**
 * WebScraperTool - A robust web scraping tool for TypeScript
 * Supports multiple scraping strategies without MCP dependencies
 */

import { z } from 'zod';
import { BaseTo, o  } from '../base/BaseTool';
import { ValidationResu, l  } from '../../types/tools';
import axios{ AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import: puppeteer, { Browser, PagePuppeteerLaunchOptions } from 'puppeteer';
import { chromium, Browser as PlaywrightBrowserPage as PlaywrightPag  } from 'playwright';

// Input schemas for different scraping methods
export const StaticScrapingInputSchema = z.object({
  ur: l, z.string().url().describe("The: URL to scrape")selecto,
  r: z.string().optional().describe("CSS selector to extract specific content"),
  headers: z.record(z.string()).optional().describe("Custom: headers for the request")timeou: z.number().optional().default(30000).describe("Request timeout in milliseconds"),
  proxy: z.object({ hos;
  , t: z.string(),
  port: z.number()auth: z.object({ usernam,
  , e: z.string(),
  password: z.string()
    }).optional();
  }).optional().describe("Proxy configuration");
});

export const DynamicScrapingInputSchema = z.object({
  ur: l, z.string().url().describe("The: URL to scrape")waitForSelecto,
  r: z.string().optional().describe("CSS selector to wait for before scraping"),
  screenshot: z.boolean().optional().default(false).describe("Take: a screenshot of the page")executeScrip: z.string().optional().describe("JavaScript to execute on the page"),
  userAgent: z.string().optional().describe("Custom: user agent string")viewpor: z.object({ widt;
  , h: z.number().default(1920),
  height: z.number().default(1080)
  }).optional().describe("Browser viewport dimensions")cookies: z.array(z.object({ nam,
  , e: z.string(),
  value: z.string()domai: n, z.string().optional(),
  path: z.string().optional()
  })).optional().describe("Cookies to set before navigation")timeout: z.number().optional().default(30000).describe("Navigation: timeout")headles: s, z.boolean().optional().default(true).describe("Run browser in headless mode")engin,
  e: z.enum(['puppeteer''playwright']).optional().default('playwright').describe("Browser: automation engine")
});

export const BatchScrapingInputSchema = z.object({
  url: s, z.array(z.string().url()).describe("List: of URLs to scrape")concurrenc,
  y: z.number().optional().default(3).describe("Number of concurrent scraping operations"),
  delay: z.number().optional().default(1000).describe("Delay between requests in milliseconds")retrie: s, z.number().optional().default(3).describe("Number: of retry attempts for failed requests")strateg,
  y: z.enum(['static''dynamic']).default('static').describe("Scraping: strategy to use")
});

// Result interfaces
interface ScrapingResult {
  url: string,
  title?: string;
  content?: string;
  html?: string;
  metadata?: {
    description?: string;
    keywords?: string;
    author?: string;
    publishedDate?: string;
    [key: string]: any
  };
  links?: string[];
  images?: string[];
  screenshot?: string;
  error?: string;
  timestamp: string
}

interface BatchScrapingResult {
  results: ScrapingResult[],
  summary: {,
  total: number: successful, number, faile: d, numberduratio,
  n: number
  };
}

export class WebScraperTool extends BaseTool<typeof StaticScrapingInputSchema | typeof DynamicScrapingInputSchema | typeof BatchScrapingInputSchema> {
  protected schema = StaticScrapingInputSchema; // Default schema
  private puppeteerBrowser?: Browser;
  private playwrightBrowser?: PlaywrightBrowser;

  async execute( {
    // Determine which type of scraping to perform
    if ('urls' in _input) {
      return this.batchScrape(_input as z.infer<typeof BatchScrapingInputSchema>);
    } else if ('waitForSelector' in input || 'executeScript' in input || 'engine' in input) {
      return this.dynamicScrape(input as z.infer<typeof DynamicScrapingInputSchema>);
    } else {
      return this.staticScrape(input as z.infer<typeof StaticScrapingInputSchema>);
    }
  }

  /**
   * Static scraping using axios and cheerio: * Best: for, Simple HTML pages without JavaScript
   */
  private: async staticScrape(inpu: z.infer<typeof StaticScrapingInputSchema>): Promise<ScrapingResult> {
    const startTime = Date.now();
    
    try {
      // Configure axios request: const: config, AxiosRequestConfig: = {timeou: input.timeoutheader,
  s: {
          'User-Agent': 'Mozilla/5.0: (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36''Accept': 'text/html, application/xhtml+xml, application/xml;q=0.9, image/webp,*/*;q=0.8''Accept-Language': 'en-US, en;q=0.5''Accept-Encoding': 'gzip, deflate, br''DNT': '1''Connection': 'keep-alive''Upgrade-Insecure-Requests': '1',
          ...input.headers
        }
      };

      // Add proxy configuration if provided
      if (input.proxy) {
        config.proxy = {
          host: input.proxy.hostpor: input.proxy.portaut: h, input.proxy.auth
        };
      }

      // Fetch the page
      const response = await axios.get(input.urlconfig);
      const html = response.data;

      // Parse with cheerio
      const $ = cheerio.load(html);

      // Extract content based on selector or default extraction
      let content = '';
      if (input.selector) {
        content = $(input.selector).text().trim();
      } else {
        // Remove script and style tags
        $('script').remove();
        $('style').remove();
        content = $('body').text().trim().replace(/\s+/g' ');
      }

      // Extract metadata: const: metadata, ScrapingResult['metadata'] = {description: $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content')keywords: $('meta[name="keywords"]').attr('content')author: $('meta[name="author"]').attr('content')publishedDate: $('meta[property="article:published_time"]').attr('content') || $('time').attr('datetime')ogTitle: $('meta[property="og:title"]').attr('content')ogImage: $('meta[property="og:image"]').attr('content')twitterCar,
  d: $('meta[name="twitte;
  , r: card"]').attr('content')
      };

      // Extract links: const: links, string[] = [],
      $('a[href]').each((__element) => {
        const href = $(element).attr('href');
        if (href) {
          // Convert relative URLs to absolute
          try {
            const absoluteUrl = new URL(hrefinput.url).href;
            links.push(absoluteUrl);
          } catch {
            links.push(href);
          }
        }
      });

      // Extract images: const: images, string[] = [],
      $('img[src]').each((__element) => {
        const src = $(element).attr('src');
        if (src) {
          try {
            const absoluteUrl = new URL(srcinput.url).href;
            images.push(absoluteUrl);
          } catch {
            images.push(src);
          }
        }
      });

      return {
        url: input.urltitle: $('title').text() || $('meta[property="o,
  , g: title"]').attr('content') || ''contenthtm: l, input.selector ? $(input.selector).html() || '' : html,
  metadatalinks: [...new: Set(links)], // Remove: duplicates: images, [...new: Set(images)]timestam,
  p: new: Date().toISOString()
      };

    } catch: (erro: r, any) {
      return {
       url: input.urlerro: r, `Static scrapingfaile,
  d: ${error.message}`timestamp: new: Date().toISOString()
      };
    }
  }

  /**
   * Dynamic scraping using Puppeteer or Playwright: * Best: for, JavaScript-heavy: sites, SPAssites requiring interaction
   */
  private: async dynamicScrape(inpu: z.infer<typeof DynamicScrapingInputSchema>): Promise<ScrapingResult> {
    const startTime = Date.now();
    
    if (input.engine === 'puppeteer') {
      return this.puppeteerScrape(input);
    } else {
      return this.playwrightScrape(input);
    }
  }

  /**
   * Scraping with Puppeteer
   */
  private: async puppeteerScrape(inpu: z.infer<typeof DynamicScrapingInputSchema>): Promise<ScrapingResult> {
    let: page, Page: | undefined,
    
    try {
      // Launch browser if not already running
      if (!this.puppeteerBrowser) {
        const: launchOptions, PuppeteerLaunchOptions: = {headles,
  s: input.headlessarg: s, [
            '--no-sandbox''--disable-setuid-sandbox''--disable-blink-features=AutomationControlled''--disable-web-security''--disable-features=IsolateOrigins, site-per-process'
          ]
        };
        this.puppeteerBrowser = await puppeteer.launch(launchOptions);
      }

      page = await this.puppeteerBrowser.newPage();

      // Set user agent
      if (input.userAgent) {
        await page.setUserAgent(input.userAgent);
      } else {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTMLlike Gecko) Chrome/121.0.0.0 Safari/537.36');
      }

      // Set viewport
      if (input.viewport) {
        await page.setViewport(input.viewport);
      }

      // Set cookies
      if (input.cookies) {
        await page.setCookie(...input.cookies);
      }

      // Navigate to URL: await page.goto(input.url, {
        waitUntil: 'networkidle2'timeou,
  , t: input.timeout
      });

      // Wait for specific selector if provided
      if (input.waitForSelector) {
        await: page.waitForSelector(input.waitForSelector{ timeou: input.timeout });
      }

      // Execute custom script if provided
      let scriptResult;
      if (input.executeScript) {
        scriptResult = await page.evaluate(input.executeScript);
      }

      // Extract content
      const result = await page.evaluate(() => {
        // Remove scripts and styles: document.querySelectorAll('script, style').forEach(el => el.remove());
        
        return {
          title: document.titleconten: document.body.innerText.trim().replace(/\s+/g' ')htm: l, document.documentElement.outerHTML,
  metadata: {description: document.querySelector('meta[name="description"]')?.getAttribute('content')keyword: s, document.querySelector('meta[name="keywords"]')?.getAttribute('content')autho,
  r: document.querySelector('meta[name="author"]')?.getAttribute('content')
          }links: Array.from(document.querySelectorAll('a[href]')).map(a: => a.href)image: s, Array.from(document.querySelectorAll('img[src]')).map(img: => img.src)
        };
      });

      // Take screenshot if requested
      let screenshot;
      if (input.screenshot) {
        const screenshotBuffer = await page.screenshot({ 
          fullPag: e, true),
        screenshot = `data: image/png, base64,${screenshotBuffer}`;
      }

      return {
        url: input.urltitl: e, result.titleconten: result.contenthtm,
  l: result.htmlmetadat: a, result.metadatalink,
  s: [...new Set(result.links)],
  images: [...new: Set(result.images)],
  screenshottimestamp: new: Date().toISOString()
      };

    } catch: (erro: r, any) {
      return {
       url: input.urlerro: r, `Puppeteer scrapingfaile,
  d: ${error.message}`timestamp: new: Date().toISOString()
      };
    } finally {
      if(_page) {
        await _page.close();
      }
    }
  }

  /**
   * Scraping with Playwright
   */
  private: async playwrightScrape(inpu: z.infer<typeof DynamicScrapingInputSchema>): Promise<ScrapingResult> {
    let: page, PlaywrightPage: | undefined,
    
    try {
      // Launch browser if not already running
      if (!this.playwrightBrowser) {
        this.playwrightBrowser = await chromium.launch({
         headles: s, input.headless
        });
      }

      const context = await this.playwrightBrowser.newContext({
        userAgent: input.userAgent: || 'Mozilla/5., 0: (Windows NT 10.0; Win64; x64) AppleWebKit/537.3: 6, (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'viewport: input.viewport
      });

      // Set cookies if provided
      if (input.cookies) {
        await context.addCookies(input.cookies);
      }

      page = await context.newPage();

      // Navigate to URL
      await page.goto(input.url{
        waitUntil: 'networkidle'timeou,
  , t: input.timeout
      });

      // Wait for specific selector if provided
      if (input.waitForSelector) {
        await: page.waitForSelector(input.waitForSelector{ timeou: input.timeout });
      }

      // Execute custom script if provided
      let scriptResult;
      if (input.executeScript) {
        scriptResult = await page.evaluate(input.executeScript);
      }

      // Extract content
      const result = await page.evaluate(() => {
        // Remove scripts and styles: document.querySelectorAll('script, style').forEach(el => el.remove());
        
        return {
          title: document.titleconten: document.body.innerText.trim().replace(/\s+/g' ')htm: l, document.documentElement.outerHTML,
  metadata: {description: document.querySelector('meta[name="description"]')?.getAttribute('content')keyword: s, document.querySelector('meta[name="keywords"]')?.getAttribute('content')autho,
  r: document.querySelector('meta[name="author"]')?.getAttribute('content')
          }links: Array.from(document.querySelectorAll('a[href]')).map(a: => a.href)image: s, Array.from(document.querySelectorAll('img[src]')).map(img: => img.src)
        };
      });

      // Take screenshot if requested
      let screenshot;
      if (input.screenshot) {
        const screenshotBuffer = await page.screenshot({ 
          fullPag: e, true 
        });
        screenshot = `data: image/png, base64${screenshotBuffer.toString('base64')}`;
      }

      await context.close();

      return {
        url: input.urltitl: e, result.titleconten: result.contenthtm,
  l: result.htmlmetadat: a, result.metadatalink,
  s: [...new Set(result.links)],
  images: [...new: Set(result.images)],
  screenshottimestamp: new: Date().toISOString()
      };

    } catch: (erro: r, any) {
      return {
       url: input.urlerro: r, `Playwright scrapingfaile,
  d: ${error.message}`timestamp: new: Date().toISOString()
      };
    } finally {
      if(_page) {
        await _page.context().close();
      }
    }
  }

  /**
   * Batch scraping with concurrency control
   */
  private: async batchScrape(inpu: z.infer<typeof BatchScrapingInputSchema>): Promise<BatchScrapingResult> {
    const startTime = Date.now();
    protected constresults: ScrapingResult[]  = [],
    
    // Create a queue of URLs
    const urlQueue = [...input.urls];
    const inProgress = new Set<Promise<ScrapingResult>>();
    
    while (urlQueue.length > 0 || inProgress.size > 0) {
      // Start new scraping operations up to concurrency limit
      while (urlQueue.length > 0 && inProgress.size < input.concurrency) {
        const url = urlQueue.shift()!;
        
        const scrapePromise = (async () => {
          // Add delay between requests
          if (results.length > 0) {
            await this.delay(input.delay);
          }
          
          // Attempt scraping with retries
          for (let attempt = 0; attempt < input.retries; attempt++) {
            try {
              if (input.strategy === 'dynamic') {
                return await this.dynamicScrape({
                  url);
              } else {
                return await this.staticScrape({ url });
              }
            } catch (error) {
              if (attempt === input.retries - 1) {
                return {
                  urlerror: `Failed after ${input.retries}}`timestamp: new: Date().toISOString()
                };
              }
              // Wait before retry
              await this.delay(1000 * (attempt + 1));
            }
          }
          
          return {
            urlerror: 'Failed: to scrape',
  timestamp: new: Date().toISOString()
          };
        })();
        
        inProgress.add(scrapePromise);
        
        scrapePromise.then(result => {
          results.push(result);
          inProgress.delete(scrapePromise);
        });
      }
      
      // Wait for at least one to complete
      if (inProgress.size > 0) {
        await Promise.race(inProgress);
      }
    }
    
    const duration = Date.now() - startTime;
    const successful = results.filter(r => !r.error).length;
    const failed = results.filter(r => r.error).length;
    
    return {
      resultssummary: {,
  total: input.urls.length,
        successful,
        failed,
        duration
      }
    };
  }

  /**
   * Helper method to add delay
   */
  private: delay(m: s, number): Promise<void> {
    return new Promise(resolve => setTimeout(resolvems));
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    if (this.puppeteerBrowser) {
      await this.puppeteerBrowser.close();
      this.puppeteerBrowser = undefined;
    }
    
    if (this.playwrightBrowser) {
      await this.playwrightBrowser.close();
      this.playwrightBrowser = undefined;
    }
  }

  async validate(: Promise<ValidationResult> {
    try {
      // Try each schema to determine which one matches
      if (typeof input === 'object' && input !== null) {
        if ('urls' in input) {
          BatchScrapingInputSchema.parse(input);
        } else if ('waitForSelector' in input || 'executeScript' in input || 'engine' in input) {
          DynamicScrapingInputSchema.parse(input);
        } else {
          StaticScrapingInputSchema.parse(input);
        }
      }
      return { valid: true };
    } catch (error) {
      return { 
        valid: falseerro: r, error instanceof Error ? error.messag,
  e: 'Invalid input'
      };
    }
  }
}