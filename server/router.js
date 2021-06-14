const router = require("express").Router();
const {
  getAll,
  createUser,
  deleteUser,
  createItem,
  getOne,
  moveUp,
  moveDown,
  deleteItem,
  getOneMobile,
} = require("./controllers/controller");

router.get("", getAll);

router.post("", createUser);

router.delete("/:id", deleteUser);

router.get("/login/:userName/:password", getOne);

router.post("/item/:UserId", createItem);
router.put("/item/up/:id", moveUp);
router.put("/item/down/:id", moveDown);
router.delete("/item/delete/:id", deleteItem);
router.get("/menu/:userName", getOneMobile);

module.exports = router;
