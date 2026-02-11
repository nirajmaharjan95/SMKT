import axios from "axios";
import * as cheerio from "cheerio";
import { supabase } from "../config/supabase.js";
import { cleanNumber } from "./utils.js";

export const scrapeCompanies = async () => {
  try {
    const { data: html } = await axios.get(
      "https://www.sharesansar.com/live-trading",
      {
        headers: { "User-Agent": "Mozilla/5.0" },
      },
    );

    const $ = cheerio.load(html);
    const companies = [];

    // 2️⃣ Extract "As of" date - Try multiple selectors
    let asOfDate;

    // Try different date extractors
    let asOfText = $("h5").text().trim() || "";

    let dateMatch = asOfText.match(/\d{4}-\d{2}-\d{2}/);

    if (!dateMatch) {
      // Try extracting from page title or other elements
      const pageText = $("body").text();
      dateMatch = pageText.match(/\d{4}-\d{2}-\d{2}/);
    }

    if (dateMatch) {
      asOfDate = dateMatch[0];
    } else {
      // Fallback: get latest from DB or use today
      const { data: previousData } = await supabase
        .from("live_data")
        .select("as_of_date")
        .order("as_of_date", { ascending: false })
        .limit(1);

      asOfDate =
        previousData && previousData.length > 0
          ? previousData[0].as_of_date
          : new Date().toISOString().split("T")[0];
    }

    // Try different table selectors
    let tableRows = $("table tbody tr");
    if (tableRows.length === 0) {
      console.log(
        "⚠️  No rows found in 'table tbody tr', trying alternative selectors...",
      );
      tableRows = $("table tr");
    }
    if (tableRows.length === 0) {
      console.log(
        "⚠️  No rows found in 'table tr', trying 'div' based tables...",
      );
      tableRows = $("div.table-responsive table tr");
    }

    console.log(`📊 Found ${tableRows.length} table rows`);

    tableRows.each((i, row) => {
      const cols = $(row).find("td");

      if (cols.length < 10) {
        console.log(
          `⚠️  Row ${i} has only ${cols.length} columns, skipping...`,
        );
        return;
      }

      const symbol = $(cols[1]).text().trim();

      if (!symbol) {
        return; // skip empty rows
      }

      const company = {
        symbol,
        ltp: cleanNumber($(cols[2]).text()),
        point_change: cleanNumber($(cols[3]).text()),
        percent_change: cleanNumber($(cols[4]).text()),
        open: cleanNumber($(cols[5]).text()),
        high: cleanNumber($(cols[6]).text()),
        low: cleanNumber($(cols[7]).text()),
        volume: cleanNumber($(cols[8]).text()),
        prev_close: cleanNumber($(cols[9]).text()),
      };

      companies.push(company);

      if (companies.length <= 3) {
        console.log(`📈 Sample data for ${symbol}:`, company);
      }
    });

    console.log(`✅ Total companies scraped: ${companies.length}`);

    if (companies.length === 0) {
      console.warn(
        "⚠️  WARNING: No companies were scraped. Check the website structure.",
      );
    }

    return companies;
  } catch (error) {
    console.error("❌ Error in scrapeCompanies:", error.message);
    console.error("📋 Full error:", error);
    return [];
  }
};
