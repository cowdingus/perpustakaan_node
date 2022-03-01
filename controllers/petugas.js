const models = require("../models");
const Petugas = models.Petugas;

const bcrypt = require("bcryptjs");

const { hasUndefinedProps } = require("../utilities");
const {sign} = require("jsonwebtoken");

module.exports = {
  getAll(_req, res) {
    Petugas.findAll()
      .then((petugas) => {
        res.status(200).json({ petugas });
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  getId(req, res) {
    const id = req.params.id;

    Petugas.findOne({ where: { kode: id } })
      .then((petugas) => {
        res.status(200).json(petugas);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  post(req, res) {
    const petugas = {
      kode: req.body.kode,
      nama: req.body.nama,
      jabatan: req.body.jabatan,
      tlpn: req.body.tlpn,
      email: req.body.email,
      password: req.body.password
    };

    if (hasUndefinedProps(petugas)) {
      return res.status(400).send("Missing values in request body");
    }

    petugas.password = bcrypt.hashSync(petugas.password, 10);

    Petugas.create(petugas).then((petugas) => {
      res.status(200).json({ petugas });
    });
  },

  put(req, res) {
    const petugas = {
      kode: req.body.kode,
      nama: req.body.nama,
      jabatan: req.body.jabatan,
      tlpn: req.body.tlpn,
      email: req.body.email,
      password: req.body.password
    };

    const id = req.params.id;

    if (hasUndefinedProps(petugas)) {
      return res.status(400).send("Missing values in request body");
    }

    petugas.password = bcrypt.hashSync(petugas.password, 10);

    Petugas.update(petugas, { where: { kode: id } })
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

    Petugas.destroy({ where: { kode: id } })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  login(req, res) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    };

    if (hasUndefinedProps(credentials)) {
      return res.status(400).send("Missing values in request body");
    }

    Petugas.findOne({where: {email: credentials.email}})
      .then((petugas) => {
        if (!petugas) return res.status(401).send("Email or password is wrong");

        if (bcrypt.compareSync(credentials.password, petugas.password)) {
          const payload = { ...petugas, password: undefined };
          const token = sign(payload, process.env['SECRET_KEY'], { expiresIn: "1h" });

          return res.status(200).json({ token });
        } else {
          return res.status(401).send("Email or password is wrong");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },
};
