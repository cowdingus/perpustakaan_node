const router = require("express").Router();
const controller = require("../controllers/petugas");

router.route("/")
	.get(controller.getAll)
	.post(controller.post);

router.route("/:id")
	.get(controller.getId)
	.put(controller.put)
	.delete(controller.delete);

router.route("/login")
	.post(controller.login);

module.exports = router;
