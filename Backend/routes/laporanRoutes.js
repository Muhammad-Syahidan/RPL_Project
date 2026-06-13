const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                t.id_transaksi, 
                p.nama_produk AS namaProduk, 
                t.total_bayar, 
                t.tanggal_waktu AS tanggal, 
                t.status
            FROM transaksi t
            JOIN detail_transaksi dt ON t.id_transaksi = dt.id_transaksi
            JOIN produk p ON dt.id_produk = p.id_produk
            ORDER BY t.tanggal_waktu DESC
        `;
        const [rows] = await db.execute(query);
        res.json(rows);
    } catch (err) {
        console.error("Gagal mengambil laporan:", err);
        res.status(500).json({ error: "Database Error" });
    }
});

module.exports = router;