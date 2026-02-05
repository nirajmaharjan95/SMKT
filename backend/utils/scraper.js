import axios from "axios";
import * as cheerio from "cheerio";
import { cleanNumber } from "./utils.js";

export const scrapeCompanies = async () => {
  const { data: html } = await axios.get(
    "https://www.sharesansar.com/live-trading",
    { headers: { "User-Agent": "Mozilla/5.0" } },
  );

  const $ = cheerio.load(html);
  const companies = [];

  $("table tbody tr").each((i, row) => {
    const cols = $(row).find("td");

    const symbol = $(cols[1]).text().trim();

    if (symbol) {
      companies.push({
        symbol,
        ltp: cleanNumber($(cols[2]).text()),
        point_change: cleanNumber($(cols[3]).text()),
        percent_change: cleanNumber($(cols[4]).text()),
        open: cleanNumber($(cols[5]).text()),
        high: cleanNumber($(cols[6]).text()),
        low: cleanNumber($(cols[7]).text()),
        volume: cleanNumber($(cols[8]).text()),
        prev_close: cleanNumber($(cols[9]).text()),
      });
    }
  });

  return companies;
};
