import express from "express";
import { startups } from "./data/data.js";

const PORT = 8000;

const app = express()

app.get('/api', (req, res) => {


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
})


app.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`);
})

app.get('/api/:field/:term', (req, res) => {
  let filteredData = startups
  const { field, term } = req.params

  const allowedFields = ['country', 'continent', 'inudstry']

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Search field not allowed. Please use only 'country', 'continent', 'industry'" })
  }

  if (field && term) {
    filteredData = filteredData.filter(fil => fil[field]?.toLowerCase() === term.toLowerCase())
  }

  res.json(filteredData)
}
)

