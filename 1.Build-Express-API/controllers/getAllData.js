import { startups } from "../data/data.js"

export const getAllData = (req, res) => {


  let filteredData = startups

  const { industry, country, continent, is_seeking_funding, has_mvp } = req.query;

  if (industry) {
    filteredData = filteredData.filter(f => f.industry.toLowerCase() === industry.toLowerCase())
  }

  if (country) {
    filteredData = filteredData.filter(f => f.country.toLowerCase() === country.toLowerCase())
  }

  if (continent) {
    filteredData = filteredData.filter(f => f.continent.toLowerCase() === continent.toLowerCase())
  }

  if (is_seeking_funding) {
    const seekingFundingBoo = is_seeking_funding === 'true'
    filteredData = filteredData.filter(f => f.is_seeking_funding === seekingFundingBoo)
  }

  if (has_mvp) {
    const mvpBoo = has_mvp === 'true'
    filteredData = filteredData.filter(f => f.has_mvp === mvpBoo)
  }

  res.json(filteredData)
}