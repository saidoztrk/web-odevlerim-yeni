import React, { useEffect, useRef, useState } from "react";

const API_BASE = "http://localhost:3000";

interface ProfileType {
  id: number;
  name: string;
}

interface Profile {
  id: number;
  username: string;
  email: string;
  photo: string;
  profileType: ProfileType;
}

const emptyForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  profileTypeId: "",
};

function App() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profileTypes, setProfileTypes] = useState<ProfileType[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    try {
      const [typesRes, profilesRes] = await Promise.all([
        fetch(`${API_BASE}/profileTypes`),
        fetch(`${API_BASE}/profiles`),
      ]);

      if (!typesRes.ok || !profilesRes.ok) {
        throw new Error(`Backend hatası: ${typesRes.status || profilesRes.status}`);
      }

      const types = await typesRes.json();
      const profs = await profilesRes.json();
      setProfileTypes(types);
      setProfiles(profs);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Backend bağlantı hatası. Backend'in çalıştığından emin olun (http://localhost:3000)");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingProfile(null);
    setMessage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleEdit = (p: Profile) => {
    setEditingProfile(p);
    setForm({
      username: p.username,
      email: p.email,
      password: "",
      confirmPassword: "",
      profileTypeId: p.profileType?.id?.toString() || "",
    });
    if (fileRef.current) fileRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu profili silmek istediğine emin misin?")) return;

    try {
      const res = await fetch(`${API_BASE}/profiles/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        let errorMessage = "Silme işlemi başarısız.";
        try {
          const data = await res.json();
          errorMessage = data.message || errorMessage;
        } catch {
          errorMessage = `Backend hatası: ${res.status} ${res.statusText}`;
        }
        setMessage(errorMessage);
        return;
      }

      setMessage("Profil silindi.");
      await loadData();
    } catch (err) {
      console.error(err);
      setMessage("Backend bağlantı hatası. Backend'in çalıştığından emin olun.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // ProfileTypeId validasyonu
      if (!form.profileTypeId || form.profileTypeId === "") {
        setMessage("Lütfen bir profil tipi seçin.");
        setLoading(false);
        return;
      }

      const profileTypeIdNum = parseInt(form.profileTypeId, 10);
      if (isNaN(profileTypeIdNum) || profileTypeIdNum < 1) {
        setMessage("Geçerli bir profil tipi seçin.");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      fd.append("username", form.username);
      fd.append("email", form.email);
      fd.append("profileTypeId", profileTypeIdNum.toString());

      if (form.password) {
        fd.append("password", form.password);
        fd.append("confirmPassword", form.confirmPassword);
      }

      const file = fileRef.current?.files?.[0];
      if (!editingProfile && !file) {
        setMessage("Yeni kayıt için fotoğraf seçmelisin.");
        setLoading(false);
        return;
      }
      if (file) fd.append("photo", file);

      const url = editingProfile
        ? `${API_BASE}/profiles/${editingProfile.id}`
        : `${API_BASE}/profiles`;
      const method = editingProfile ? "PATCH" : "POST";

      const res = await fetch(url, { method, body: fd });

      if (!res.ok) {
        let errorMessage = "İşlem sırasında bir hata oluştu.";
        try {
          const data = await res.json();
          errorMessage = data.message || errorMessage;
        } catch {
          errorMessage = `Backend hatası: ${res.status} ${res.statusText}`;
        }
        setMessage(errorMessage);
        setLoading(false);
        return;
      }

      const data = await res.json();

      setMessage(
        editingProfile
          ? "Profil başarıyla güncellendi."
          : "Profil başarıyla oluşturuldu.",
      );
      await loadData();
      resetForm();
    } catch (err) {
      console.error(err);
      setMessage("İstek sırasında beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="shell">
        <header className="page-header">
          <div>
            <div className="page-kicker">Muhammed Said ÖZTÜRK • CENG307</div>
            <h1 className="page-title">Ödev 4 – Profile Management</h1>
            <p className="page-subtitle">
              NestJS + React ile kullanıcı profili yönetimi. Aşağıdan profil
              oluşturabilir, güncelleyebilir ve silebilirsin.
            </p>
          </div>
          <div className="page-badge">React + NestJS</div>
        </header>

        <main className="grid">
          {/* SOL TARAF – FORM */}
          <section className="card">
            <div className="card-header">
              <span className="chip-dot" />
              <span className="card-title">
                {editingProfile ? "Profili Güncelle" : "Yeni Profil Oluştur"}
              </span>
              <span className="card-pill">
                {editingProfile ? "Edit Mode" : "Create Mode"}
              </span>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="username">Kullanıcı Adı</label>
                  <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={updateField}
                    placeholder="örn. admin_user"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="ornek@mail.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="password">
                    Şifre{" "}
                    <span className="muted">
                      {editingProfile ? "(boş bırakırsan değişmez)" : ""}
                    </span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={updateField}
                    placeholder="Aa12345!"
                  />
                </div>
                <div className="field">
                  <label htmlFor="confirmPassword">Şifre Tekrar</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={updateField}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="profileTypeId">Profile Type</label>
                  <select
                    id="profileTypeId"
                    name="profileTypeId"
                    value={form.profileTypeId}
                    onChange={updateField}
                    required
                  >
                    <option value="">Seçiniz...</option>
                    {profileTypes.map((pt) => (
                      <option key={pt.id} value={pt.id}>
                        {pt.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="photo">Profil Fotoğrafı</label>
                  <input
                    id="photo"
                    type="file"
                    ref={fileRef}
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading
                    ? "Gönderiliyor..."
                    : editingProfile
                      ? "Profili Güncelle"
                      : "Profili Oluştur"}
                </button>
                {editingProfile && (
                  <button
                    type="button"
                    className="ghost"
                    onClick={resetForm}
                  >
                    Yeni Kayıt Moduna Dön
                  </button>
                )}
              </div>

              <p className="hint">
                Şifre en az <strong>1 büyük harf</strong>, <strong>1 küçük</strong>,{" "}
                <strong>1 rakam</strong> ve <strong>1 sembol</strong> içermelidir.
                DTO&apos;lar disiplinli, şakaya gelmiyor. 🙃
              </p>

              {message && <p className="status-message">{message}</p>}
            </form>
          </section>

          {/* SAĞ TARAF – TABLO */}
          <section className="card list-card">
            <div className="card-header">
              <span className="chip-dot chip-dot-green" />
              <span className="card-title">Kayıtlı Profiller</span>
              <span className="card-pill subdued">
                {profiles.length} kayıt
              </span>
            </div>

            {profiles.length === 0 ? (
              <div className="empty-state">
                Henüz profil yok. Soldan ilk kaydı oluştur. 🚀
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Kullanıcı</th>
                      <th>Email</th>
                      <th>Tür</th>
                      <th>Foto</th>
                      <th>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profiles.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.username}</td>
                        <td>{p.email}</td>
                        <td>{p.profileType?.name}</td>
                        <td>
                          {p.photo && (
                            <a
                              href={`${API_BASE}${p.photo}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Gör
                            </a>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="table-btn"
                            onClick={() => handleEdit(p)}
                          >
                            Düzenle
                          </button>
                          <button
                            type="button"
                            className="table-btn danger"
                            onClick={() => handleDelete(p.id)}
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <footer className="footer-note">
              <span>Backend: NestJS • Frontend: React + Vite</span>
              <span>Bu ekran doğrudan CENG307 Ödev 4 sunumuna girebilir. 💼</span>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
