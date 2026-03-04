const { ERROR_PAGE } = require("@Helpers/contants");
const router = require("express").Router();
const axios = require("axios");
const config = require("@Config");
const helpers = require("@Helpers/helpers");

router.get("/", async (req, res) => {
  try {
    const session = req.session;
    if (session.isLogin && session.accessToken) {
      const requestApi = await axios({
        method: "get",
        url: `${config.MAIN_API}/api/auth/me`,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const resApi = requestApi.data;
      if (resApi.status) {
        session.isLogin = true;
        session.user = resApi.user;
        session.accessToken = resApi.access_token;
        const dataPage = {
          title: "Trang Tổng Quan",
          session,
          helpers,
          config,
        };
        res.render("index", {
          dataPage: dataPage,
        });
      } else {
        const dataPage = {
          title: "Trang Tổng Quan",
          session,
          helpers,
          config,
        };
        res.render("index", {
          dataPage: dataPage,
        });
      }
    } else {
      const dataPage = {
        title: "Trang Tổng Quan",
        session,
        helpers,
        config,
      };
      res.render("index", {
        dataPage: dataPage,
      });
    }
  } catch (e) {
    res.status(500).json({
      status: false,
      msg: e.message,
    });
  }
});

module.exports = router;
