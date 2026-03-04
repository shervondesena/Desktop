const config = require("@Config");
const helpers = require("@Helpers/helpers");



module.exports = {
    profile: async (req, res) => {
      try {
        const dataPage = {
          title: "",
          config,
          session: req.session,
          helpers,
          location: "agency",
        };
        res.render("pages/agency/agency", {
          dataPage,
        });
      } catch (e) {
        res.status(200).json({
          status: false,
          msg: e.message,
        });
      }
    },
   
  };