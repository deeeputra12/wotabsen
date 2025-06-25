<?php
include 'koneksi.php';
$data = [];
$sql = mysqli_query($conn, "SELECT * FROM karyawan");
while ($row = mysqli_fetch_assoc($sql)) {
  $data[] = $row;
}
echo json_encode($data);
?>