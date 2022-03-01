const router = require("express").Router();
const controller = require("../controllers/anggota");

const { checkToken } = require("../middlewares/token_validation");

router.route("/")
	.get(controller.getAll)
	.post(checkToken, controller.post);

router.route("/:id")
	.get(controller.getId)
	.put(checkToken, controller.put)
	.delete(checkToken, controller.delete);

module.exports = router;
