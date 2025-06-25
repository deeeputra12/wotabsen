import { useState, useEffect } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [hari, setHari] = useState("");
  const [jam, setJam] = useState("");
  const [status, setStatus] = useState("on duty");
  const [karyawanList, setKaryawanList] = useState([]);
  const [absenList, setAbsenList] = useState([]);

  const handleRegister = () => {
    if (username && password) {
      const existing = users.find((u) => u.username === username);
      if (!existing) {
        setUsers([...users, { username, password }]);
        setIsRegistering(false);
        setUsername("");
        setPassword("");
        alert("Registrasi berhasil! Silakan login.");
      } else {
        alert("Username sudah terdaftar");
      }
    }
  };

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setUsername("");
      setPassword("");
    } else {
      alert("Login gagal. Username atau password salah.");
    }
  };

  const handleTambahKaryawan = async () => {
    if (nama && jabatan) {
      await fetch("http://localhost/api/tambah_karyawan.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ nama, jabatan }),
      });

      setNama("");
      setJabatan("");
      fetchKaryawan();
    }
  };

  const handleAbsen = async () => {
    if (nama && jabatan && hari && jam) {
      await fetch("http://localhost/api/absen.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ nama, jabatan, hari, jam, status }),
      });

      setHari("");
      setJam("");
      setStatus("on duty");
      fetchAbsen();
    }
  };

  const fetchKaryawan = async () => {
    const res = await fetch("http://localhost/api/lihat_karyawan.php");
    const data = await res.json();
    setKaryawanList(data);
  };

  const fetchAbsen = async () => {
    const res = await fetch("http://localhost/api/lihat_absen.php");
    const data = await res.json();
    setAbsenList(data);
  };

  useEffect(() => {
    fetchKaryawan();
    fetchAbsen();
  }, []);

  if (!currentUser) {
    return (
      <div>
        <h2>{isRegistering ? "Daftar Akun" : "Login"}</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button onClick={isRegistering ? handleRegister : handleLogin}>
          {isRegistering ? "Daftar" : "Login"}
        </button>
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Sudah punya akun? Login" : "Belum punya akun? Daftar"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Manajemen Karyawan Warung Om & Tante</h1>

      <h2>Tambah Karyawan</h2>
      <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama" />
      <input value={jabatan} onChange={(e) => setJabatan(e.target.value)} placeholder="Jabatan" />
      <button onClick={handleTambahKaryawan}>Tambah</button>

      <h2>Absen</h2>
      <input value={hari} onChange={(e) => setHari(e.target.value)} placeholder="Hari" />
      <input value={jam} onChange={(e) => setJam(e.target.value)} type="time" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="on duty">On Duty</option>
        <option value="off duty">Off Duty</option>
      </select>
      <button onClick={handleAbsen}>Absen</button>

      <h2>Daftar Karyawan</h2>
      <ul>
        {karyawanList.map((k, i) => (
          <li key={i}>{k.nama} - {k.jabatan}</li>
        ))}
      </ul>

      <h2>Jadwal Absen</h2>
      <ul>
        {absenList.map((a, i) => (
          <li key={i}>{a.nama} ({a.jabatan}) - {a.hari} {a.jam} ({a.status})</li>
        ))}
      </ul>
    </div>
  );
}
