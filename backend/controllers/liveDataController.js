import { supabase } from "../config/supabase.js";
import { scrapeCompanies } from "../utils/scraper.js";

export const fetchAndSaveCompanies = async (req, res) => {
  try {
    const liveData = await scrapeCompanies();
    console.log("🚀 ~ fetchAndSaveCompanies ~ liveData:", liveData);

    const { error } = await supabase.from("live_data").upsert(liveData, {
      onConflict: ["symbol"],
    });

    if (error) throw error;

    res.json({
      success: true,
      count: liveData.length,
      message: "Companies saved to DB",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLiveData = async (req, res) => {
  try {
    const { data, error } = await supabase.from("live_data").select("*");

    if (error) throw error;

    res.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
