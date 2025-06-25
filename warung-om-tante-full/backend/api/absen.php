<?php
include 'koneksi.php';
$nama = $_POST['nama'];
$jabatan = $_POST['jabatan'];
$hari = $_POST['hari'];
$jam = $_POST['jam'];
$status = $_POST['status'];

$query = "INSERT INTO absen (nama, jabatan, hari, jam, status)
          VALUES ('$nama', '$jabatan', '$hari', '$jam', '$status')";

if (mysqli_query($conn, $query)) {
  echo "Sukses absen";
} else {
  echo "Gagal: " . mysqli_error($conn);
}
?>