const models = require("../models");
const Anggota = models.Anggota;

const { hasUndefinedProps } = require("../utilities");

module.exports = {
  getAll(_req, res) {
    Anggota.findAll()
      .then((anggota) => {
        res.status(200).json({ anggota });
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  getId(req, res) {
    const id = req.params.id;

    Anggota.findOne({ where: { kode: id } })
      .then((anggota) => {
        res.status(200).json(anggota);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  post(req, res) {
    const anggota = {
      kode: req.body.kode,
      nama: req.body.nama,
      alamat: req.body.alamat,
      tlpn: req.body.tlpn,
    };

    if (hasUndefinedProps(anggota)) {
      return res.status(400).send("Missing values in request body");
    }

    Anggota.create(anggota).then((anggota) => {
      res.status(200).json({ anggota });
    });
  },

  put(req, res) {
    const anggota = {
      kode: req.body.kode,
      nama: req.body.nama,
      alamat: req.body.alamat,
      tlpn: req.body.tlpn,
    };

    const id = req.params.id;

    if (hasUndefinedProps(anggota)) {
      return res.status(400).send("Missing values in request body");
    }

    Anggota.update(anggota, { where: { kode: id } })
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

    Anggota.destroy({ where: { kode: id } })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },
};
