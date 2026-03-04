const { ERROR_PAGE } = require("@Helpers/contants");
const { base64String } = require("@Helpers/String");
const router = require("express").Router();
const MainRouter = require("@HttpRouters/MainRouter");
const AuthRouter = require("@HttpRouters/AuthRouter");
const AccountRouter = require("@HttpRouters/AccountRouter");
const AgencyInforRouter = require("@HttpRouters/AgencyInforRouter");
const GameRouter = require("@HttpRouters/GameRouter");
const GameLobbyRouter = require("@HttpRouters/GameLobbyRouter");
const VipRouter = require("@HttpRouters/VipRouter");
const PromotionRouter = require("@HttpRouters/PromotionRouter");

router.use("/", MainRouter);
router.use("/auth", AuthRouter);
router.use("/account", AccountRouter);
router.use("/thongTinDaiLy", AgencyInforRouter);
router.use("/game", GameRouter);
router.use("/gamelobby", GameLobbyRouter);
router.use("/vip-privileges", VipRouter);
router.use("/Promotion", PromotionRouter);

// Redirect Router
router.get("/Redirect", async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            res.status(200).json({
                status: false,
                error: "Url is empty!"
            });
        } else {
            // const redirectUrl = base64String.Decode(url);
            // res.redirect(redirectUrl);
            res.render("pages/redirect", { url });
        }
    } catch (e) {
        res.status(200).json({
            status: false,
            error: "Url invalid!"
        });
    }
});

module.exports = router;
