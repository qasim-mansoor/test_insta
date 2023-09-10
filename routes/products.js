const express = require("express");
const router = express.Router();

router.use(express.json());

const {getImg, getVid} = require("../controllers/products");

router.route("/").post(getVid);
router.route("/img").post(getImg);

module.exports = router;