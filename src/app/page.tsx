"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  ShieldCheck, 
  UserCheck, 
  Wallet, 
  FileText, 
  HeartHandshake, 
  Sparkles, 
  Shield, 
  Moon,
  Clock,
  MessageSquare,
  Plus,
  X,
  Upload,
  Send,
  ChevronLeft
} from "lucide-react";

interface Album {
  id: string;
  title: string;
  count: string;
  coverImage: string;
  images: string[];
}

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
}

export default function Home() {
  // Timer Tahun Baru WITA (UTC+8)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const witaOffset = 8 * 60 * 60 * 1000;
      const nowWita = new Date(utc + witaOffset);
      const nextYearWita = nowWita.getFullYear() + 1;
      const targetWitaTime = new Date(Date.UTC(nextYearWita, 0, 1, 0, 0, 0) - witaOffset).getTime();
      const difference = targetWitaTime - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pesan & Kesan
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "Anonim", text: "Sukses terus buat VII Informatika, solid selalu!", time: "Baru saja" },
    { id: "2", sender: "Ketua Kelas", text: "Jangan lupa kerjakan tugas ya teman-teman 👍", time: "1 jam lalu" }
  ]);
  const [senderInput, setSenderInput] = useState("");
  const [textInput, setTextInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: senderInput.trim() || "Anonim",
      text: textInput,
      time: "Baru saja"
    };

    setMessages([newMessage, ...messages]);
    setSenderInput("");
    setTextInput("");
  };

  // State Album Kenangan ala iOS Photos
  const [albums, setAlbums] = useState<Album[]>([
   {
    id: "momen-kelas",
    title: "Momen Kelas",
    count: "5 Foto",
    coverImage: "/images/momen1.jpg",
    images: [
      "/images/momen1.jpg",
      "/images/momen2.jpg",
      "/images/momen3.jpg",
      "/images/momen4.jpg",
      "/images/momen5.jpg",
    ],
  },
  {
    id: "17-agustus",
    title: "17 Agustus",
    count: "2 Foto",
    coverImage: "/images/agustus1.jpg",
    images: [
      "/images/agustus1.jpg",
      "/images/agustus2.jpg",
    ],
  },
  {
    id: "gugus-4",
    title: "GUGUS 4",
    count: "1 Foto",
    coverImage: "/images/gugus4.jpg",
    images: [
      "/images/gugus4.jpg",
    ],
  },
  ]);
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumCover, setNewAlbumCover] = useState("");

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl || !activeAlbum) return;

    const updatedImages = [...activeAlbum.images, newPhotoUrl];
    const updatedAlbum = {
      ...activeAlbum,
      images: updatedImages,
      count: `${updatedImages.length} Foto`
    };

    setAlbums(albums.map((a) => (a.id === activeAlbum.id ? updatedAlbum : a)));
    setActiveAlbum(updatedAlbum);
    setNewPhotoUrl("");
    setShowAddPhoto(false);
  };

  const handleCreateAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumTitle || !newAlbumCover) return;

    const newAlbum: Album = {
      id: Date.now().toString(),
      title: newAlbumTitle,
      count: "1 Foto",
      coverImage: newAlbumCover,
      images: [newAlbumCover]
    };

    setAlbums([...albums, newAlbum]);
    setNewAlbumTitle("");
    setNewAlbumCover("");
    setShowAddAlbum(false);
  };

  const members = [
    { role: "Wali Kelas", name: "Khusnul Khatimah Jauharud", icon: ShieldCheck, color: "text-amber-400" },
    { role: "Ketua Kelas", name: "Aqilah Zahrani Alhabsyi", icon: UserCheck, color: "text-blue-400" },
    { role: "Wakil Ketua Kelas", name: "Zulfikar Putra Wahyudin", icon: UserCheck, color: "text-sky-400" },
    { role: "Bendahara", name: "Haura Nafizah Hamzah", icon: Wallet, color: "text-emerald-400" },
    { role: "Sekretaris", name: "Priya Gazza Naraya", icon: FileText, color: "text-purple-400" },
    { role: "Wakil Sekretaris", name: "Kayla Aura Ramadhani", icon: HeartHandshake, color: "text-pink-400" },
    { role: "Kord Kebersihan (Cowo)", name: "Andi Ahmad Fatra Yusri Tanra", icon: Sparkles, color: "text-teal-400" },
    { role: "Kord Kebersihan (Cewe)", name: "Aisyah Naqiyah Hafizhah", icon: Sparkles, color: "text-teal-300" },
    { role: "Kord Keamanan (Cowo)", name: "Alfian Nuril", icon: Shield, color: "text-red-400" },
    { role: "Kord Keamanan (Cewe)", name: "Syifa Sauqiyah", icon: Shield, color: "text-rose-400" },
    { role: "Kord Ibadah (Cowo)", name: "MUH. Rashif Adarra Fadli", icon: Moon, color: "text-indigo-400" },
    { role: "Kord Ibadah (Cewe)", name: "Renata Alisha Ramadhani putri Yarham", icon: Moon, color: "text-violet-400" },
  ];

  const schedule = [
    { day: "Senin", subjects: ["1. IPA Terpadu (Rahmayani, S.Pd)", "2. Qur'an Hadits (Radiatul Adawiyah, S.Pd.I)", "3. MATEMATIKA (Rizkiani Novianti Mukhlis, S.Si)", "4. SKI (Juski S, S.Pd.I., M.Pd)"] },
    { day: "Selasa", subjects: ["1. Bahasa Arab (Dra. Musdiratia)", "2. IPS Terpadu (Drs. Alias)", "3. Informatika (Khusnul Khatimah Jauharuddin, S.Pd)"] },
    { day: "Rabu", subjects: ["1. Fiqih (H. Tamrin, S.Ag, MA)", "2. IPA Terpadu (Rahmayani, S.Pd)", "3. Seni Budaya (Ummi Kaltzum, S.Pd)", "4. Juz Amma (Rosmiati, S.Pd.I)"] },
    { day: "Kamis", subjects: ["1. Akidah Akhlak (Rosmiati, S.Pd.I)", "2. Bhs. Indonesia (NUR ASMAUNNISA, S.Pd)", "3. Penjaskes (Usman. T, S.Pd)", "4. Koding (Khusnul Khatimah Jauharuddin, S.Pd)"] },
    { day: "Jumat", subjects: ["1. MATEMATIKA (Rizkiani Novianti Mukhlis, S.Si)", "2. Bhs. Indonesia (NUR ASMAUNNISA, S.Pd)", "3. Bahasa Inggris (Mufthihaturrahmah. M. S.Pd., M.Pd.)", "4. PPKn (MUKHLIS SYUKUR, SH)"] },
  ];

  const dutyRoster = [
    { day: "Senin", names: ["Syakila Humairah", "Syifa Sauqiyah", "Andi Ratu Shofiyyah", "Raidah Fakhira Amran", "Fadlan Mubarak Sangaji", "Muhammad Nur Faiz", "Muhammad Al-Fatih", "Abidzar Ahmad Kaysan"] },
    { day: "Selasa", names: ["Sri Wahyuni Syam", "Aisyah Naqiyah Hafizhah", "Aqilah Zahrani Alhabsyi", "Haura Nafizah Hamzah", "Muhammad Naufal Teguh Pribadi", "Dava Ibnu Rafael", "Raditya Mirza Sakura", "Rafie Arkana Alim"] },
    { day: "Rabu", names: ["Aqila Zhafira Naila Mahdi", "Farah Fritzi Oi", "Andi Ratu Rania", "Renata Alisha Ramadhani Putri Yarham", "Airanata Zacharya Nurachmad Hadid", "Rasya Muhammad Athaya", "Adzka Fatir Dirgantara Radjab", "Muhammad Alaric Syawal Agus"] },
    { day: "Kamis", names: ["Akifah Majwa Yuanita", "Ayu Syifa Anwar", "Ghaziyah Razky Shaleha", "Kayla Aura Ramadhani", "Andi Ahmad Fatra Yusri Tanra", "Muh. Rashif Adarra Fadli", "Priya Gazza Naraya", "Muhammad Farras Ansyar"] },
    { day: "Jumat", names: ["Firzanah Widya Wirottama", "Salsabila Putri Rabbani", "Shafia Salsabila Khairunnisa", "Shyeiqa Az-Zahra Quinn", "Muhammad Ali Riza Rahman", "Naufal Faeyza Alfarizki MD", "Zulfikar Putra Wahyudin", "Alfian Nuril"] },
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black scroll-smooth">
      {/* Navigasi */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">MTsN 1 MAKASSAR • VII INFORMATIKA</span>
          <div className="flex gap-6 text-sm text-neutral-400">
            <a href="#about" className="hover:text-white transition">Beranda</a>
            <a href="#members" className="hover:text-white transition">Pengurus</a>
            <a href="#schedule" className="hover:text-white transition">Jadwal</a>
            <a href="#duty" className="hover:text-white transition">Piket</a>
            <a href="#gallery" className="hover:text-white transition">Album Kenangan</a>
            <a href="#messages" className="hover:text-white transition">Pesan & Kesan</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-16 px-6 max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
            Portal Resmi Kelas MTsN 1 Makassar
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-4 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
            VII-INFORMATIKA.
            
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl mx-auto font-light">
            Ruang digital terpadu untuk koordinasi, jadwal pelajaran, album kenangan, dan informasi kelas kita.
          </p>
        </motion.div>

        {/* Bento Grid Quick Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-16 text-left">
          <a href="#members" className="p-6 rounded-3xl bg-neutral-900/50 border border-white/10 hover:border-white/20 transition group cursor-pointer block">
            <Users className="w-7 h-7 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-base font-semibold">Struktur Kelas</h3>
            <p className="text-neutral-400 text-xs mt-1">Daftar Wali Kelas & pengurus.</p>
          </a>

          <a href="#schedule" className="p-6 rounded-3xl bg-neutral-900/50 border border-white/10 hover:border-white/20 transition group cursor-pointer block">
            <Calendar className="w-7 h-7 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-base font-semibold">Jadwal Pelajaran</h3>
            <p className="text-neutral-400 text-xs mt-1">Roster mata pelajaran.</p>
          </a>

          <a href="#duty" className="p-6 rounded-3xl bg-neutral-900/50 border border-white/10 hover:border-white/20 transition group cursor-pointer block">
            <BookOpen className="w-7 h-7 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-base font-semibold">Jadwal Piket</h3>
            <p className="text-neutral-400 text-xs mt-1">Daftar petugas kebersihan.</p>
          </a>

          <a href="#gallery" className="p-6 rounded-3xl bg-neutral-900/50 border border-white/10 hover:border-white/20 transition group cursor-pointer block">
            <Sparkles className="w-7 h-7 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-base font-semibold">Album Kenangan</h3>
            <p className="text-neutral-400 text-xs mt-1">Galeri foto khas Apple iOS.</p>
          </a>

          <a href="#messages" className="p-6 rounded-3xl bg-neutral-900/50 border border-white/10 hover:border-white/20 transition group cursor-pointer block">
            <MessageSquare className="w-7 h-7 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-base font-semibold">Pesan & Kesan</h3>
            <p className="text-neutral-400 text-xs mt-1">Kirim pesan rahasia/anonim.</p>
          </a>
        </div>
      </section>

      {/* Section Pengurus Kelas */}
      <section id="members" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Pengurus Kelas</h2>
          <p className="text-neutral-400 text-sm mt-2">Struktur organisasi resmi VII-INFORMATIKA</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/20 transition flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-neutral-500 uppercase font-mono tracking-wider">{item.role}</span>
                  <h4 className="text-base font-semibold text-white mt-0.5">{item.name}</h4>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Section Jadwal Pelajaran */}
      <section id="schedule" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Jadwal Pelajaran</h2>
          <p className="text-neutral-400 text-sm mt-2">Roster Semester Ganjil</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold">{item.day}</h3>
              </div>
              <ul className="space-y-2 text-sm text-neutral-300">
                {item.subjects.map((sub, i) => (
                  <li key={i} className="p-2 rounded-lg bg-white/5 border border-white/5">
                    {sub}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Jadwal Piket */}
      <section id="duty" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Jadwal Piket Kelas</h2>
          <p className="text-neutral-400 text-sm mt-2">Kelas bersih, belajar jadi lebih asyik!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dutyRoster.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/20 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold">{item.day}</h3>
              </div>
              <ul className="space-y-1.5 text-sm text-neutral-300">
                {item.names.map((name, i) => (
                  <li key={i} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Album Kenangan Tampilan iPhone / Apple Photos */}
      <section id="gallery" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Album Saya</h2>
            <p className="text-neutral-400 text-xs mt-1">Galeri Foto VII Informatika</p>
          </div>
          <button
            onClick={() => setShowAddAlbum(true)}
            className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 hover:bg-neutral-700 text-blue-400 flex items-center justify-center transition"
            title="Tambah Album Baru"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Grid Album Bergaya iOS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              onClick={() => setActiveAlbum(album)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg group-hover:scale-[1.02] transition-transform duration-300">
<img
  src={album.coverImage || "https://via.placeholder.com/600"}
  alt={album.title}
  className="w-full h-full object-cover"
/>
              </div>
              <div className="mt-2.5 px-1">
                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors leading-tight">
                  {album.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">{album.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tampilan Detail Album ala iOS Photos (Fullscreen Navigation View) */}
      <AnimatePresence>
        {activeAlbum && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 bg-black overflow-y-auto"
          >
            {/* Header iOS Style */}
            <div className="sticky top-0 z-20 backdrop-blur-xl bg-black/70 border-b border-white/10 px-4 h-16 flex items-center justify-between">
              <button
                onClick={() => setActiveAlbum(null)}
                className="flex items-center gap-1 text-blue-400 font-medium text-base hover:opacity-80 transition"
              >
                <ChevronLeft className="w-6 h-6" /> Album
              </button>
              <div className="text-center">
                <h3 className="text-sm font-bold text-white">{activeAlbum.title}</h3>
                <p className="text-[10px] text-neutral-400">{activeAlbum.count}</p>
              </div>
              <button
                onClick={() => setShowAddPhoto(true)}
                className="text-blue-400 font-medium text-base hover:opacity-80 transition"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            {/* Grid Foto iOS Photos */}
            <div className="p-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 max-w-6xl mx-auto">
              {activeAlbum.images.map((imgUrl, i) => (
                <div key={i} className="aspect-square bg-neutral-900 overflow-hidden relative group">
                  <img src={imgUrl} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Sheet Tambah Foto (iOS Action Sheet Style) */}
      <AnimatePresence>
        {showAddPhoto && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-neutral-900 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-6 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Tambah Foto Baru</h3>
                <button
                  onClick={() => setShowAddPhoto(false)}
                  className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">URL Foto (Link Gambar)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Simpan ke Album
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Sheet Buat Album Baru (iOS Action Sheet Style) */}
      <AnimatePresence>
        {showAddAlbum && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-neutral-900 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-6 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Album Baru</h3>
                <button
                  onClick={() => setShowAddAlbum(false)}
                  className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleCreateAlbum} className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Judul Album</label>
                  <input
                    type="text"
                    placeholder="Judul Album..."
                    value={newAlbumTitle}
                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">URL Foto Sampul</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newAlbumCover}
                    onChange={(e) => setNewAlbumCover(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-xl transition"
                >
                  Buat Album
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Section Pesan & Kesan Interaktif */}
      <section id="messages" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white">💬 Pesan & Kesan Kelas</h2>
          <p className="text-neutral-400 text-sm mt-2">Tulis ucapan, motivasi, atau pesan rahasia untuk teman sekelas!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10">
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Nama (Boleh dikosongkan/Anonim)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Teman Bangku Belakang" 
                  value={senderInput}
                  onChange={(e) => setSenderInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Pesan Kamu</label>
                <textarea 
                  rows={3} 
                  placeholder="Tulis pesanmu di sini..." 
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 text-sm resize-none"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Kirim Pesan
              </button>
            </form>
          </div>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 rounded-xl bg-neutral-900/40 border border-white/10 flex justify-between items-start">
                <div>
                  <span className="text-xs font-semibold text-emerald-400">{msg.sender}</span>
                  <p className="text-sm text-neutral-300 mt-1">{msg.text}</p>
                </div>
                <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Hitung Mundur Tahun Baru (WITA / Makassar) */}
      <section id="event" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-neutral-900/60 to-emerald-950/40 border border-emerald-500/20 text-center relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">🎉 Hitung Mundur Tahun Baru</h2>
          <p className="text-neutral-400 text-sm mb-6">Penghitung waktu otomatis menuju 1 Januari (WITA / Makassar)!</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-3xl font-extrabold text-emerald-400 block">{timeLeft.days}</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Hari</span>
            </div>
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-3xl font-extrabold text-emerald-400 block">{timeLeft.hours}</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Jam</span>
            </div>
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-3xl font-extrabold text-emerald-400 block">{timeLeft.minutes}</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Menit</span>
            </div>
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-3xl font-extrabold text-emerald-400 block">{timeLeft.seconds}</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Detik</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-neutral-600">
        <p>© 2026 MTsN 1 Makassar • VII-INFORMATIKA . Designed with Apple Aesthetics.</p>
      </footer>
    </main>
  );
}