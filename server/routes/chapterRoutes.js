const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapterController");

router.get("/", chapterController.getChapters);
router.post("/", chapterController.createChapter);

module.exports = router;
