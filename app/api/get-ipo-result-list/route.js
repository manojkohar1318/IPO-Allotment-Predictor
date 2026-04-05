import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  const targetUrl = "https://iporesult.cdsc.com.np/";
  
  try {
    const fetchWithFallback = async () => {
      const configs = [
        {
          url: targetUrl,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          }
        },
        {
          url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
          headers: { 
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            "Referer": "https://iporesult.cdsc.com.np/"
          }
        }
      ];

      let lastErr = null;
      for (const config of configs) {
        try {
          const res = await axios.get(config.url, { 
            timeout: 5000, 
            headers: config.headers,
            responseType: 'text'
          });
          if (res.data && typeof res.data === 'string' && res.data.includes('<select')) {
            return res.data;
          }
        } catch (e) {
          lastErr = e;
        }
      }
      throw lastErr || new Error("All fetch attempts failed");
    };

    const html = await fetchWithFallback();
    const $ = cheerio.load(html);
    const companies = [];

    // The CDSC result page has a select dropdown with company names and IDs
    $("select option").each((i, el) => {
      const name = $(el).text().trim();
      const companyId = $(el).val();

      if (name && companyId && companyId !== "0" && companyId !== "") {
        companies.push({
          name,
          companyId
        });
      }
    });

    if (companies.length === 0) {
      // Fallback dummy data if scraping fails
      const fallbackData = [
        { name: 'Upper Tamakoshi Hydropower', companyId: '1' },
        { name: 'Sarbottam Cement', companyId: '2' },
        { name: 'Himalayan Reinsurance', companyId: '3' }
      ];
      return NextResponse.json({ success: true, data: fallbackData, fallback: true });
    }

    return NextResponse.json({ success: true, data: companies });
  } catch (error) {
    console.error("Error in get-ipo-result-list:", error.message);
    return NextResponse.json({ success: false, message: "Could not load IPO result list", details: error.message }, { status: 500 });
  }
}
