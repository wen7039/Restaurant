const express = require("express")
const exphbs = require("express-handlebars")
const restaurantsList = require("./restaurant.json").results
const app = express()
const port = 3000

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index", { restaurantsList: restaurantsList })
})

app.get("/search", (req, res) => {


  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  const filteredRestaurants = restaurantsList.filter(
    list =>
      list.name.toLowerCase().includes(keyword) ||
      list.category.includes(keyword)
  )

  res.render("index", { restaurantsList: filteredRestaurants, keywords })
})

app.get("/restaurants/:restaurant_id", (req, res) => {
  const { restaurant_id } = req.params
  const restaurantList = restaurantsList.find(
    list => list.id.toString() === restaurant_id

  )
  res.render("show", { restaurantList })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})