const express = require('express')
const router = express.Router()
const controller = require("../controllers/ingredients.controller")

router.post("/ingredient", controller.addIngredient)
router.get("/ingredients", controller.getIngredients)
router.put("/ingredient/:id", controller.updateIngredient)
router.delete("/ingredients", controller.deleteAllIngredients)
router.delete("/ingredient/:id", controller.deleteIngredient)

module.exports = router