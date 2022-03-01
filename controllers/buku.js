const models = require("../models");
const Buku = models.Buku;

const { hasUndefinedProps } = require("../utilities");

module.exports = {
  getAll(_req, res) {
    Buku.findAll()
      .then((buku) => {
        res.status(200).json({ buku });
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  getId(req, res) {
    const id = req.params.id;

    Buku.findOne({ where: { kode: id } })
      .then((buku) => {
        res.status(200).json(buku);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  post(req, res) {
    const buku = {
      kode: req.body.kode,
      nama: req.body.nama,
      pengarang: req.body.pengarang,
      penerbit: req.body.penerbit,
      stok: req.body.stok
    };

    if (hasUndefinedProps(buku)) {
      return res.status(400).send("Missing values in request body");
    }

    Buku.create(buku).then((buku) => {
      res.status(200).json({ buku });
    });
  },

  put(req, res) {
    const buku = {
      kode: req.body.kode,
      nama: req.body.nama,
      pengarang: req.body.pengarang,
      penerbit: req.body.penerbit,
      stok: req.body.stok
    };

    const id = req.params.id;

    if (hasUndefinedProps(buku)) {
      return res.status(400).send("Missing values in request body");
    }

    Buku.update(buku, { where: { kode: id } })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  delete(req, res) {
    const id = req.params.id;

    Buku.destroy({ where: { kode: id } })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },
};
