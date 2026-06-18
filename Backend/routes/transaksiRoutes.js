const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Konfigurasi Multer untuk upload bukti pembayaran
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// 1. RUTE: Checkout (Simpan transaksi & detail transaksi)
router.post('/', async (req, res) => {
    const { order_id, nama, noHp, alamat, pengiriman, pembayaran, totalHarga, items } = req.body;
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        const sqlTransaksi = `INSERT INTO transaksi 
            (kode_pesanan, nama_pelanggan, nomor_whatsapp, alamat_pengiriman, opsi_pengiriman, metode_pembayaran, total_bayar, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'Diterima')`;
        
        const [result] = await connection.execute(sqlTransaksi, [
            order_id, nama, noHp, alamat, pengiriman, pembayaran, totalHarga
        ]);
        
        const id_transaksi = result.insertId; 

        if (items && items.length > 0) {
            for (const item of items) {
                const sqlDetail = `INSERT INTO detail_transaksi 
                    (id_transaksi, id_produk, harga_satuan, jumlah_beli, subtotal_harga) 
                    VALUES (?, ?, ?, ?, ?)`;
                
                await connection.execute(sqlDetail, [
                    id_transaksi, 
                    item.id_produk, 
                    (item.subtotal / item.jumlah), 
                    item.jumlah, 
                    item.subtotal
                ]);
            }
        }
        await connection.commit();
        res.status(200).json({ message: "Pesanan berhasil dibuat!" });
    } catch (err) {
        await connection.rollback();
        console.error("Gagal simpan transaksi:", err);
        res.status(500).json({ error: "Database Error: " + err.message });
    } finally {
        connection.release();
    }
});

// 2. RUTE: Ambil Semua Transaksi (Untuk Tabel Admin) - UPDATED
router.get('/all', async (req, res) => {
    try {
        // PENTING: p.nama_varian disesuaikan dengan database Anda
        const sql = `
            SELECT 
                t.*, 
                GROUP_CONCAT(CONCAT(d.jumlah_beli, 'x ', p.nama_varian) SEPARATOR ', ') AS produk_dipesan
            FROM transaksi t
            LEFT JOIN detail_transaksi d ON t.id_transaksi = d.id_transaksi
            LEFT JOIN produk p ON d.id_produk = p.id_produk
            GROUP BY t.id_transaksi
            ORDER BY t.tanggal_waktu DESC
        `;
        const [rows] = await db.execute(sql);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Gagal ambil semua data:", err);
        res.status(500).json({ error: "Gagal mengambil data" });
    }
});

// 3. RUTE: Cari Pesanan (Untuk Halaman Tracking Pelanggan)
router.get('/cari/:kode_pesanan', async (req, res) => {
    try {
        const { kode_pesanan } = req.params;
        const [rows] = await db.execute("SELECT * FROM transaksi WHERE TRIM(kode_pesanan) = TRIM(?)", [kode_pesanan]);
        
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: "Pesanan tidak ditemukan" });
        }
    } catch (err) {
        console.error("Error saat mencari:", err);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

// 4. RUTE: Update Status Pesanan (Untuk Admin)
router.put('/update-status/:kode_pesanan', async (req, res) => {
    try {
        const { status } = req.body;
        const { kode_pesanan } = req.params;
        
        const sql = "UPDATE transaksi SET status = ? WHERE kode_pesanan = ?";
        await db.execute(sql, [status, kode_pesanan]);
        
        res.status(200).json({ message: "Status berhasil diupdate!" });
    } catch (err) {
        console.error("Gagal update status:", err);
        res.status(500).json({ error: "Gagal update status" });
    }
});

// 5. RUTE: Upload Bukti Pembayaran
router.post('/upload-bukti/:order_id', upload.single('bukti'), async (req, res) => {
    try {
        const { order_id } = req.params;
        if (!req.file) return res.status(400).json({ error: "File bukti tidak ditemukan" });

        const sqlUpdate = "UPDATE transaksi SET bukti_pembayaran = ? WHERE kode_pesanan = ?";
        await db.execute(sqlUpdate, [req.file.filename, order_id]);
        res.status(200).json({ message: "Upload berhasil!" });
    } catch (err) {
        console.error("Gagal upload bukti:", err);
        res.status(500).json({ error: "Gagal memproses file di server" });
    }
});

module.exports = router;