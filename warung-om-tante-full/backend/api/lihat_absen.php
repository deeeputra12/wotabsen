<?php
include 'koneksi.php';
$data = [];
$sql = mysqli_query($conn, "SELECT * FROM absen ORDER BY id DESC");
while ($row = mysqli_fetch_assoc($sql)) {
  $data[] = $row;
}
echo json_encode($data);
?>