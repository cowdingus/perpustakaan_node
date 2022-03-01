const router = require("express").Router();
const controller = require("../controllers/pinjam");

router.route("/")
	.get(controller.getAll)
	.post(controller.post);

router.route("/:id")
	.get(controller.getId)
	.put(controller.put)
	.delete(controller.delete);

module.exports = router;
