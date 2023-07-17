//userRoute.js
let express = require("express");
let router = express.Router();
let userControllers = require("../controllers/userController");

router.get("/", userControllers.getUsers);

router.get("/:id", userControllers.getUser);

router.post("/add", userControllers.addUser);

router.put("/update/:id", userControllers.updateUser);

router.delete("/delete/:id", userControllers.deleteUser);

module.exports = router;
