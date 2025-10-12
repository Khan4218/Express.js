import { startups } from "../data/data.js"

export const getAllDataByPathParams = (req, res) => {
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