const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    const { startDate, endDate } = req.query;
    
    try {
        let query = `
            SELECT 
                t.id_transaksi, 
                p.nama_produk AS namaProduk, 
                t.total_bayar, 
                t.tanggal_waktu AS tanggal, 
                t.status
            FROM transaksi t
            JOIN detail_transaksi dt ON t.id_transaksi = dt.id_transaksi
            JOIN produk p ON dt.id_produk = p.id_produk
        `;

        const params = [];

        // Tambahkan filter WHERE jika startDate dan endDate ada
        if (startDate && endDate) {
            query += ` WHERE DATE(t.tanggal_waktu) BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        }

        query += ` ORDER BY t.tanggal_waktu DESC`;

        // Eksekusi query dengan parameter
        const [rows] = await db.execute(query, params);
        res.json(rows);
    } catch (err) {
        console.error("Gagal mengambil laporan:", err);
        res.status(500).json({ error: "Database Error" });
    }
});

module.exports = router;