const {
  newbook,
  allbooks,
  onebook,
  updateBook,
  deleteBook,
} = require("../controllers/bookcontroller");
const router = require("express").Router();

router.post("/", newbook);
router.get("/", allbooks);
router.get("/:id", onebook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
