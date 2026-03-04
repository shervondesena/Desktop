const router = require("express").Router();
const AgencyInforController = require("@HttpControllers/AgencyInforController");


router.get("/profile", (req, res) => {
    AgencyInforController.profile(req, res);
  });

module.exports = router;