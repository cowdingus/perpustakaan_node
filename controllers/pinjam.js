const models = require("../models");
const Pinjam = models.Pinjam;
const Buku = models.Buku;
const Anggota = models.Anggota;
const Petugas = models.Petugas;

const { hasUndefinedProps } = require("../utilities");

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

module.exports = {
  getAll(_req, res) {
    Pinjam.findAll()
      .then((pinjam) => {
        res.status(200).json({ pinjam });
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  getId(req, res) {
    const id = req.params.id;

    Pinjam.findOne({ where: { no: id } })
      .then((pinjam) => {
        res.status(200).json(pinjam);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  async post(req, res) {
    const durasi = parseInt(req.body.durasi);
    const now = new Date();
    const returnDate = addDays(new Date(), durasi);

    const pinjam = {
      no: req.body.no,
      kodeAnggota: req.body.kodeAnggota,
      kodePetugas: req.body.kodePetugas,
      kodeBuku: req.body.kodeBuku,
      tglPinjam: now,
      tglBalik: returnDate
    };

    if (hasUndefinedProps(pinjam)) {
      return res.status(400).send("Missing values in request body");
    }

    const buku = await Buku.findOne({ where: { kode: pinjam.kodeBuku } });
    const anggota = await Anggota.findOne({ where: { kode: pinjam.kodeAnggota } });
    const petugas = await Petugas.findOne({ where: { kode: pinjam.kodePetugas } });

    if (!buku) return res.status(404).send("Book Can't Be Found");
    else if (buku.stok < 1) return res.status(404).send("Book Ran Out");

    if (!anggota) return res.status(404).send("Anggota Can't Be Found");
    if (!petugas) return res.status(404).send("Petugas Can't Be Found");

    const result = await Pinjam.create(pinjam);

    if (result) {
      await buku.decrement("stok");
      return res.status(200).json({ pinjam });
    }
  },

  put(req, res) {
    const pinjam = {
      no: req.body.no,
      kodeAnggota: req.body.kodeAnggota,
      kodePetugas: req.body.kodePetugas,
      kodeBuku: req.body.kodeBuku,
      tglPinjam: req.body.tglPinjam,
      tglBalik: req.body.tglBalik
    };

    const id = req.params.id;

    if (hasUndefinedProps(pinjam)) {
      return res.status(400).send("Missing values in request body");
    }

    Pinjam.update(pinjam, { where: { no: id } })
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  },

  async delete(req, res) {
    const id = req.params.id;

    const pinjam = await Pinjam.findOne({ where: { no: id } });
    if (!pinjam) return res.status(404).send("No such peminjaman with that kode");

    const buku = await Buku.findOne({ where: { kode: pinjam.kodeBuku } });

    try {
      await pinjam.destroy();
      await buku.increment("stok");

      res.status(200).send("Return of book successful");
    } catch (err) {
        console.error(err);
        res.status(500);
    }
  },
};
