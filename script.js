document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const pageSections = document.querySelectorAll(".page-section");

  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".btn-filter");
  const productCards = document.querySelectorAll(".product-card");
  const cartCountEl = document.getElementById("cartCount");
  const toastNotification = document.getElementById("toastNotification");

  // DETAIL PAGE ELEMENTS
  const detailTitle = document.getElementById("detailTitle");
  const detailImg = document.getElementById("detailImg");
  const detailPrice = document.getElementById("detailPrice");
  const detailDescription = document.getElementById("detailDescription");
  const btnBackToHome = document.getElementById("btnBackToHome");
  const detailAddCartBtn = document.getElementById("detailAddCartBtn");

  let activeCategory = "all";
  let currentDetailProduct = null;

  // DATA DESKRIPSI DETAIL LENGKAP PRODUK
  const productDetailsData = {
    "bmw218i": {
      name: "BMW 218i COUPE SPORT M2",
      price: 1453000000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
      description: "BMW 218i Gran Coupe Sport M Performance menawarkan perpaduan sempurna antara keanggunan coupe dan performa tinggi. Dilengkapi mesin 1.5-liter TwinPower Turbo 3-silinder yang sanggup menghasilkan tenaga melimpah serta efisiensi bahan bakar yang optimal. Interiornya didesain ultra-mewah dengan sistem navigasi terintegrasi, audio premium, dan kemudi berlapis kulit khas M Sport."
    },
    "porsche718": {
      name: "PORSCHE 718 CAIMAN",
      price: 1850000000,
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800",
      description: "Porsche 718 Cayman adalah penerus tradisi mobil balap murni. Posisi mesin di tengah (mid-engine) memberikan keseimbangan luar biasa saat melibas tikungan tajam. Ditenagai oleh mesin 2.0L Turbocharged Boxer yang gahar, Cayman memberikan akselerasi instan 0-100 km/jam dalam hitungan detik. Kabin didesain berpusat pada pengemudi untuk pengalaman berkendara paling intuitif."
    },
    "nissans15": {
      name: "NISSAN SILVIA S15",
      price: 850000000,
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800",
      description: "Iconic Japanese Domestic Market (JDM) legendaris. Nissan Silvia S15 Spec-R dilengkapi mesin SR20DET 2.0L Turbocharged yang ikonik serta transmisi manual 6-percepatan. Mobil ini dirancang khusus untuk para antusias motorsport dan drifting dengan distribusi bobot yang optimal, sasis kokoh, dan potensi modifikasi tanpa batas."
    },
  "porsche911": {
    name: "PORSCHE 911 CARRERA",
    price: 2750000000,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    description: "Legenda yang tidak pernah mati sejak 1963. Porsche 911 Carrera memakai mesin Boxer 3.0L Twin-Turbo 379 HP dengan karakter suara khas di belakang. Handling presisi, traksi sempurna, dan desain timeless membuatnya jadi patokan semua sports car di dunia. Cocok buat harian, tapi siap diajak ngebut di sirkuit."
  },
  "huracan": {
    name: "LAMBORGHINI HURACAN EVO",
    price: 8950000000,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
    description: "Lamborghini Huracan EVO dibekali mesin V10 5.2L Naturally Aspirated 640 HP tanpa turbo, jadi suara raungannya murni dan liar. Dilengkapi sistem LDVI yang bisa prediksi gaya berkendara pengemudi, rear-wheel steering, dan aerodinamika aktif. 0-100 km/jam hanya 2.9 detik, rasanya kayak naik jet tempur di jalan raya."
  },
  "ferrari488": {
    name: "FERRARI 488 GTB",
    price: 9850000000,
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800",
    description: "Ferrari 488 GTB adalah evolusi dari 458 Italia. Mesin V8 3.9L Twin-Turbo 661 HP dengan torsi 760 Nm, 0-100 km/jam cuma 3 detik. Aerodinamika diambil dari mobil F1, dengan S-Duct di depan dan blown spoiler di belakang. Setiap injakan gas terasa brutal tapi tetap sangat presisi dan mudah dikendalikan."
  },
  "mclaren720s": {
    name: "MCLAREN 720S",
    price: 9750000000,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
    description: "McLaren 720S memakai sasis Monocage II carbon fiber super ringan, beratnya cuma 1.283 kg. Mesin V8 4.0L Twin-Turbo 710 HP membuatnya tembus 341 km/jam. Pintu dihedral khas McLaren, suspensi Proactive Chassis Control II, dan visibilitas ke depan yang luas membuatnya jadi supercar paling nyaman sekaligus paling kencang di kelasnya."
  },
  "audir8": {
    name: "AUDI R8 V10",
    price: 7450000000,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
    description: "Audi R8 V10 Performance memakai mesin yang sama dengan Lamborghini Huracan, V10 5.2L 602 HP dengan penggerak Quattro AWD. Suara knalpotnya jadi salah satu yang terbaik di dunia otomotif. Interior full kulit, virtual cockpit 12.3 inci, dan handling yang sangat ramah buat pemula supercar."
  },
  "gtr35": {
    name: "NISSAN GT-R R35",
    price: 3750000000,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800",
    description: "Dijuluki Godzilla karena keganasannya. Nissan GT-R R35 dibekali mesin VR38DETT V6 3.8L Twin-Turbo 565 HP buatan tangan oleh Takumi. Sistem AWD ATTESA E-TS dan transmisi dual-clutch 6 percepatan membuatnya bisa mengalahkan supercar yang harganya 3x lipat. Legenda JDM yang paling ditakuti di drag race."
  },
  "bmwm4": {
    name: "BMW M4 COMPETITION",
    price: 2450000000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    description: "BMW M4 Competition adalah coupe paling buas dari BMW M. Mesin Inline-6 3.0L M TwinPower Turbo 510 HP, 0-100 km/jam 3.9 detik. Grille vertikal raksasa, atap carbon, jok bucket M, dan knalpot M Sport bikin tampilannya sangat agresif. Mode drift dan M Drive Professional sudah standar."
  },
  "amggt": {
    name: "MERCEDES-AMG GT",
    price: 3950000000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    description: "Mercedes-AMG GT dibuat dengan filosofi One Man One Engine, mesin V8 4.0L Bi-Turbo 585 HP dirakit satu orang dari awal sampai akhir. Desain long bonnet klasik ala 300SL, sasis aluminium ringan, dan distribusi bobot 47:53 membuatnya sangat stabil di kecepatan tinggi. Suara V8 AMG yang ngebass adalah ciri khasnya."
  },
  "mustanggt": {
    name: "FORD MUSTANG GT",
    price: 1650000000,
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800",
    description: "Muscle car Amerika sejati. Ford Mustang GT 5.0 memakai mesin V8 Coyote 5.0L 450 HP dengan suara garang khas Amerika. Ada mode Line Lock buat burnout, mode Drag Strip, dan knalpot aktif yang bisa diatur volumenya. Desain fastback ikonik sejak 1964, masih jadi simbol kebebasan di jalan."
  },
  "corvettec8": {
    name: "CHEVROLET CORVETTE C8",
    price: 2950000000,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
    description: "Corvette C8 adalah Corvette pertama yang pakai mesin tengah (mid-engine) setelah 67 tahun pakai mesin depan. Mesin V8 6.2L LT2 495 HP, 0-100 km/jam 2.9 detik dengan paket Z51. Harganya paling masuk akal di kelas supercar, tapi performanya bisa nempel Ferrari dan Lamborghini."
  },
  "supragr": {
    name: "TOYOTA SUPRA GR",
    price: 1350000000,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=800",
    description: "Legenda JDM lahir kembali. Toyota GR Supra memakai mesin Inline-6 3.0L Turbo 387 HP dari BMW, dengan sasis yang dikembangkan Gazoo Racing. Bobot ringan, wheelbase pendek, dan distribusi bobot 50:50 bikin Supra ini jadi mobil drift dan time attack paling fun. Lanjutan dari Supra MK4 yang melegenda di film Fast & Furious."
  },
  "lotusemira": {
    name: "LOTUS EMIRA",
    price: 2850000000,
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800",
    description: "Lotus Emira adalah sports car terakhir Lotus yang pakai mesin bensin. Tersedia V6 3.5L Supercharged 400 HP. Filosofi Lotus dari dulu: Simplify, then add lightness. Bobotnya cuma 1.458 kg, handlingnya disebut-sebut sebagai yang terbaik di dunia, lebih fun dari Porsche sekalipun. Desainnya mirip hypercar Evija."
  },
  "jaguarftype": {
    name: "JAGUAR F-TYPE R",
    price: 3250000000,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
    description: "Jaguar F-Type R memakai mesin V8 5.0L Supercharged 575 HP dengan knalpot aktif yang suaranya paling merdu di kelasnya, sampai ada mode Quiet Start biar gak dimarahin tetangga. Desain Inggris yang elegan, interior kulit mewah, dan penggerak AWD membuatnya kencang tapi tetap classy."
  },
  "astonvantage": {
    name: "ASTON MARTIN VANTAGE",
    price: 4950000000,
    image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800",
    description: "Mobilnya James Bond. Aston Martin Vantage memakai mesin V8 4.0L Twin-Turbo 510 HP dari AMG. Desain grille hunter yang agresif, bodi aluminium, dan interior handmade dari kulit dan Alcantara. Bukan cuma kencang, tapi Vantage adalah salah satu mobil paling ganteng yang pernah dibuat."
  },
  "bentleygt": {
    name: "BENTLEY CONTINENTAL GT",
    price: 6750000000,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800",
    description: "Bentley Continental GT adalah perpaduan kemewahan dan kecepatan. Mesin W12 6.0L Twin-Turbo 650 HP, 0-100 km/jam 3.6 detik, top speed 335 km/jam. Interiornya full jahitan tangan, jam Breitling, dan audio Naim 2.200 watt. Bisa ngebut 300 km/jam sambil tetap nyaman kayak duduk di sofa."
  },
  "maseratimc20": {
    name: "MASERATI MC20",
    price: 8950000000,
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800",
    description: "Maserati MC20 adalah kembalinya Maserati ke dunia supercar setelah MC12. Mesin Nettuno V6 3.0L Twin-Turbo 630 HP dengan teknologi pre-chamber dari mobil F1. Sasis carbon fiber, pintu butterfly, dan bobot di bawah 1.500 kg. 0-100 km/jam 2.9 detik, top speed 325 km/jam."
  },
  "taycan": {
    name: "PORSCHE TAYCAN TURBO S",
    price: 3450000000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
    description: "Porsche Taycan Turbo S adalah mobil listrik pertama Porsche yang beneran berasa Porsche. Dual motor 750 HP, 0-100 km/jam 2.8 detik, dengan suara khas Porsche Electric Sport Sound. Pengisian 800V bisa 5% ke 80% cuma 22 menit. Handlingnya tetap tajam kayak 911, bukan kayak mobil listrik biasa."
  },
  "teslaplaid": {
    name: "TESLA MODEL S PLAID",
    price: 2250000000,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
    description: "Tesla Model S Plaid memakai 3 motor listrik dengan total 1.020 HP. 0-100 km/jam cuma 1.99 detik, menjadikannya sedan produksi tercepat di dunia. Jarak tempuh 628 km, autopilot, layar 17 inci, dan setir Yoke yang futuristik. Akselerasinya bikin perut mual, saking gila nya."
  },
  "challenger": {
    name: "DODGE CHALLENGER SRT",
    price: 1950000000,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
    description: "Dodge Challenger SRT Hellcat memakai mesin V8 HEMI 6.2L Supercharged 717 HP, salah satu muscle car paling bertenaga yang pernah diproduksi massal. Desain retro ala tahun 1970, ban lebar, dan suara supercharger yang melengking. Jagoannya drag race 402 meter, 0-400 meter cuma 11 detik."
  },
  "subarubrz": {
    name: "SUBARU BRZ",
    price: 895000000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    description: "Subaru BRZ adalah mobil paling fun buat belajar drift dan balap. Mesin Boxer 2.4L 234 HP, penggerak roda belakang, bobot cuma 1.277 kg, dan pusat gravitasi sangat rendah. Harganya paling terjangkau di kelas sports car, tapi fun to drive nya ngalahin mobil yang harganya 3x lipat."
  },
  "miata": {
    name: "MAZDA MX-5 MIATA",
    price: 775000000,
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800",
    description: "Mazda MX-5 Miata adalah roadster terlaris sepanjang masa dan pemegang Guinness World Record. Mesin 2.0L 184 HP, bobot cuma 1.000 kg, dan atap bisa dibuka manual dalam 3 detik. Filosofinya Jinba Ittai, pengemudi dan mobil menyatu jadi satu. Bukan soal kencang, tapi soal senyum di setiap tikungan."
  },
  "typer": {
    name: "HONDA CIVIC TYPE R",
    price: 1250000000,
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800",
    description: "Honda Civic Type R FL5 adalah FWD tercepat di Nurburgring dengan catatan 7 menit 44 detik. Mesin K20C 2.0L VTEC Turbo 330 HP, transmisi manual 6 percepatan yang disebut sebagai manual terbaik di dunia. Spoiler GT, jok bucket merah, dan mode +R yang bikin setir dan suspensi jadi super tajam."
  },
  "audirs7": {
    name: "AUDI RS7 SPORTBACK",
    price: 3150000000,
    image: "https://images.unsplash.com/photo-1614026480209-cd9934144671?w=800",
    description: "Audi RS7 Sportback adalah sedan 4 pintu rasa supercar. Mesin V8 4.0L Bi-Turbo + Mild Hybrid 630 HP, 0-100 km/jam 3.4 detik. Desain sportback yang sleek, knalpot RS Sport Plus, dan interior full RS. Bisa bawa 4 orang nyaman, tapi bisa ngalahin Porsche di lampu merah."
  },
  "bmwm8": {
    name: "BMW M8 GRAN COUPE",
    price: 3850000000,
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
    description: "BMW M8 Gran Coupe adalah flagship dari divisi M. Mesin V8 4.4L M TwinPower Turbo 617 HP, penggerak M xDrive yang bisa diubah jadi RWD murni buat drift. Interior mewah full Merino, atap carbon, dan audio Bowers & Wilkins. Coupe 4 pintu paling mewah dan paling buas dari BMW."
  },
  "amgone": {
    name: "MERCEDES-AMG ONE",
    price: 45000000000,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800",
    description: "Mercedes-AMG ONE adalah mobil F1 yang dikasih plat nomor. Mesinnya beneran mesin F1 Lewis Hamilton, V6 1.6L Turbo Hybrid 1.063 HP yang bisa berputar sampai 11.000 RPM. Cuma dibuat 275 unit di dunia dan sudah sold out. Satu-satunya mobil jalan raya yang mesinnya harus di-rebuild tiap 50.000 km kayak mobil balap."
  },
  "sf90": {
    name: "FERRARI SF90 STRADALE",
    price: 15500000000,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800",
    description: "Ferrari SF90 Stradale adalah Ferrari plug-in hybrid pertama dan Ferrari jalan raya terkencang yang pernah dibuat. Kombinasi V8 4.0L Twin-Turbo + 3 motor listrik menghasilkan 1.000 HP. 0-100 km/jam 2.5 detik, bisa jalan mode listrik murni 25 km. Namanya SF90 untuk merayakan 90 tahun Scuderia Ferrari."
  },
  "aventador": {
    name: "LAMBORGHINI AVENTADOR SVJ",
    price: 12500000000,
    image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800",
    description: "Lamborghini Aventador SVJ adalah raja Nurburgring dengan catatan 6 menit 44 detik, rekor mobil produksi saat itu. Mesin V12 6.5L Naturally Aspirated 770 HP, sistem aerodinamika aktif ALA yang bisa mengatur downforce kiri dan kanan secara terpisah. Pintu gunting khas Lamborghini dan suara V12 yang tidak ada duanya."
  },
  "chiron": {
    name: "BUGATTI CHIRON",
    price: 55000000000,
    image: "https://images.unsplash.com/photo-1605515298946-d664fc23fe19?w=800",
    description: "Bugatti Chiron adalah raja kecepatan dunia. Mesin W16 8.0L Quad-Turbo 1.500 HP, top speed dibatasi 440 km/jam. 0-100 km/jam 2.4 detik, 0-300 km/jam cuma 13 detik. Setiap detailnya dibuat dengan tangan, dari jahitan kulit sampai emblem. Harga ganti ban nya saja bisa beli 1 mobil Avanza."
  },
  "jesko": {
    name: "KOENIGSEGG JESKO",
    price: 48000000000,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
    description: "Koenigsegg Jesko adalah hypercar Swedia yang dibuat untuk memecahkan rekor kecepatan 500 km/jam. Mesin V8 5.0L Twin-Turbo 1.600 HP dengan bahan bakar E85, transmisi Light Speed Transmission 9 percepatan tanpa kopling tradisional. Sayap belakang aktif raksasa menghasilkan downforce 1.400 kg. Cuma dibuat 125 unit."
  },
  "bmwx1": {
    name: "BMW X1 SDRIVE18I",
    price: 890000000,
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
    description: "BMW X1 sDrive18i adalah SUV kompak premium paling laris dari BMW. Mesin 1.5L Turbo 156 HP yang irit, tapi tetap fun dengan handling khas BMW. Cocok buat keluarga muda di kota, bagasi luas, ground clearance tinggi, dan fitur lengkap mulai dari power tailgate sampai Apple CarPlay wireless."
  },
  "bmwx3": {
    name: "BMW X3 XDRIVE30I",
    price: 1150000000,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800",
    description: "BMW X3 xDrive30i adalah SUV keluarga medium yang paling seimbang. Mesin 2.0L Turbo 252 HP dengan penggerak AWD xDrive, kabin lega untuk 5 orang, dan bagasi 550 liter. Suspensi adaptif dan jok kulit Vernasca bikin perjalanan jauh tetap nyaman. SUV yang enak dipakai harian sekaligus enak dipakai ngebut."
  },
  "bmwx5": {
    name: "BMW X5 XDRIVE40I",
    price: 2150000000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    description: "BMW X5 xDrive40i adalah SUV bongsor 7 seater dengan mesin 3.0L Turbo 381 HP + Mild Hybrid. Interior mewah dengan kristal Swarovski di tuas transmisi, panoramic roof, dan suspensi udara yang bisa naik turun. Nyaman buat keluarga besar, tapi tetap bisa diajak ngebut 0-100 km/jam dalam 5.5 detik."
  },
  "bmwx7": {
    name: "BMW X7 XDRIVE40I",
    price: 2850000000,
    image: "https://images.unsplash.com/photo-1614026480209-cd9934144671?w=800",
    description: "BMW X7 adalah flagship SUV BMW, paling besar dan paling mewah. 7 seater dengan captain seat di baris kedua, layar ganda 14.9 inci, dan audio Harman Kardon 16 speaker. Mesin 3.0L 381 HP terasa halus, suspensi udara bikin jalan jelek terasa kayak karpet. Lawan sepadan dari Mercedes GLS dan Range Rover."
  },
  "bmw320i": {
    name: "BMW 320I M SPORT",
    price: 1085000000,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
    description: "BMW 320i M Sport adalah sedan eksekutif paling populer di Indonesia. Mesin 1.6L Turbo 184 HP, transmisi 8 percepatan Steptronic yang super halus, dan paket M Sport dengan bodykit agresif, velg 18 inci, dan setir M. Handling 50:50 yang jadi ciri khas BMW membuatnya jadi sedan paling enak dikemudikan di kelasnya."
  },
  "bmw530e": {
    name: "BMW 530E M SPORT",
    price: 1565000000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    description: "BMW 530e adalah sedan plug-in hybrid yang iritnya gak masuk akal. Kombinasi mesin bensin 2.0L + motor listrik menghasilkan 292 HP, tapi konsumsi BBM bisa 1:50 kalau rajin ngecas. Bisa jalan mode listrik murni sampai 60 km tanpa bensin sama sekali. Cocok buat yang mau mewah, kencang, tapi tetap hemat dan ramah lingkungan."
  },
  "bmwi4": {
    name: "BMW I4 EDRIVE40",
    price: 1750000000,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
    description: "BMW i4 eDrive40 adalah sedan listrik murni dengan desain Gran Coupe yang sporty. Motor listrik 340 HP, 0-100 km/jam 5.7 detik, jarak tempuh 590 km dalam sekali cas. Pengisian cepat DC 200kW bisa 10% ke 80% dalam 31 menit. Interiornya futuristik dengan layar lengkung 14.9 inci dan suara buatan Hans Zimmer."
  },
  "bmwix": {
    name: "BMW IX XDRIVE50",
    price: 2350000000,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800",
    description: "BMW iX xDrive50 adalah SUV listrik flagship BMW yang bentuknya kayak mobil konsep. Dual motor 523 HP, 0-100 km/jam 4.6 detik, jarak tempuh 630 km. Interiornya minimalis dengan kayu, kristal, dan jok lounge. Tidak ada terowongan transmisi, jadi lantainya rata dan kabin terasa super lega buat keluarga."
  },
  "bmwxm": {
    name: "BMW XM HYBRID",
    price: 4250000000,
    image: "https://images.unsplash.com/photo-1605515298946-d664fc23fe19?w=800",
    description: "BMW XM adalah SUV pertama yang dibuat khusus oleh divisi M sejak M1 tahun 1978. Mesin V8 4.4L Twin-Turbo + motor listrik menghasilkan 748 HP, SUV BMW paling bertenaga yang pernah dibuat. Desainnya sangat kontroversial dan nyentrik, dengan lampu split dan knalpot hexagonal. 0-100 km/jam 3.8 detik untuk SUV seberat 2.7 ton."
  },
  "zenix": {
    name: "TOYOTA INNOVA ZENIX HYBRID",
    price: 625000000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    description: "Toyota Innova Zenix Hybrid adalah mobil keluarga sejuta umat versi modern. Mesin 2.0L Hybrid 186 HP dengan konsumsi BBM 1:20, jauh lebih irit dari Innova bensin lama. Platform TNGA baru bikin kabin lebih lega, suspensi lebih nyaman, dan ada varian 7 seater dengan captain seat. Paling aman buat keluarga Indonesia."
  },
  "alphard": {
    name: "TOYOTA ALPHARD HYBRID",
    price: 1650000000,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
    description: "Toyota Alphard Hybrid dijuluki MPV Sultan karena jadi mobil wajib para pejabat dan pengusaha. Mesin 2.5L Hybrid 250 HP yang halus dan irit, captain seat dengan ottoman dan pijat, atap panoramic, dan pintu geser elektrik. Naik Alphard itu rasanya kayak naik first class pesawat, tapi di jalan raya."
  },
  "crvhybrid": {
    name: "HONDA CR-V HYBRID",
    price: 825000000,
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800",
    description: "Honda CR-V RS e:HEV adalah SUV keluarga hybrid paling canggih dari Honda. Mesin 2.0L + 2 motor listrik menghasilkan 207 HP dengan konsumsi BBM 1:20. Desainnya gagah dan modern, ada Honda Sensing lengkap, Bose 12 speaker, dan bagasi super luas. Irit, bertenaga, dan fitur keselamatan paling lengkap di kelasnya."
  }
};

  // 1. UPDATE BADGE JUMLAH KERANJANG
  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
  }
  updateCartBadge();

  // 2. SHOW TOAST NOTIFICATION
  function showToast(message) {
    toastNotification.textContent = message;
    toastNotification.classList.add("show");
    setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 2500);
  }

  // 3. FUNGSI ADD TO CART
  function addToCart(productData) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === productData.id);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ ...productData, qty: 1, selected: true });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    showToast(`${productData.name} dimasukkan ke keranjang!`);
  }

  // 4. MOBILE DRAWER TOGGLE
  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // 5. NAVIGASI SPA
  function navigateTo(targetPage) {
    navLinks.forEach(l => l.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-link[data-page="${targetPage}"]`);
    if (activeLink) activeLink.classList.add("active");

    pageSections.forEach(section => {
      if (section.id === `${targetPage}-page`) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    navMenu.classList.remove("open");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute("data-page");
      navigateTo(targetPage);
    });
  });

  btnBackToHome.addEventListener("click", () => {
    navigateTo("home");
  });

  // 6. FILTER PRODUK & SEARCH REAL-TIME
  function applyFilterAndSearch() {
    const query = searchInput.value.toLowerCase().trim();

    productCards.forEach(card => {
      const categories = card.getAttribute("data-category").split(" ");
      const title = card.querySelector("h3").textContent.toLowerCase();

      const matchesCategory = (activeCategory === "all" || categories.includes(activeCategory));
      const matchesSearch = title.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  filterButtons.forEach(tombolbtn => {
    tombolbtn.addEventListener("click", () => {
      if (tombolbtn.classList.contains("nav-link")) return;

      filterButtons.forEach(b => b.classList.remove("active"));
      tombolbtn.classList.add("active");

      activeCategory = tombolbtn.getAttribute("data-category");
      applyFilterAndSearch();
    });
  });

  searchInput.addEventListener("input", applyFilterAndSearch);

  // 7. EVENT LISTENER BINDING UNTUK PRODUK CARD
  productCards.forEach(card => {
    const btnAdd = card.querySelector(".btn-add-keranjang");
    const btnDetail = card.querySelector(".detail-ket");

    const pId = card.getAttribute("data-id");
    const pName = card.getAttribute("data-name");
    const pPrice = parseInt(card.getAttribute("data-price"));
    const pImg = card.querySelector("img").src;

    // EVENT TOMBOL MASUKKAN KERANJANG
    btnAdd.addEventListener("click", () => {
      addToCart({ id: pId, name: pName, price: pPrice, img: pImg });
    });

    // EVENT TOMBOL DETAIL
    btnDetail.addEventListener("click", () => {
      const detailKey = btnDetail.getAttribute("data-detail");
      const data = productDetailsData[detailKey];

      if (data) {
        currentDetailProduct = { id: pId, name: data.name, price: data.price, img: data.image };
        detailTitle.textContent = data.name;
        detailImg.src = data.image;
        detailPrice.textContent = `RP ${data.price.toLocaleString('id-ID')}.00`;
        detailDescription.textContent = data.description;

        navigateTo("ket");
      }
    });
  });

  // TOMBOL KERANJANG DI HALAMAN DETAIL
  detailAddCartBtn.addEventListener("click", () => {
    if (currentDetailProduct) {
      addToCart(currentDetailProduct);
    }
  });
});