<?php
include 'koneksi.php';
$nama = $_POST['nama'];
$jabatan = $_POST['jabatan'];

$query = "INSERT INTO karyawan (nama, jabatan) VALUES ('$nama', '$jabatan')";
if (mysqli_query($conn, $query)) {
  echo "Sukses tambah karyawan";
} else {
  echo "Gagal: " . mysqli_error($conn);
}
?>