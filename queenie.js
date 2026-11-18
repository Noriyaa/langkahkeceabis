const bagianForm = document.getElementById("bagianForm");
const formBooking = document.getElementById("formBooking");
const bagianInvoice = document.getElementById("bagianInvoice");
const pesanError = document.getElementById("pesanError");

const inputNama = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputJumlah = document.getElementById("jumlah");
const inputBerangkat = document.getElementById("berangkat");

const dataPaket = {
  "Magical Girl": { durasi: "3 Hari 2 Malam", malam: 2, harga: 2450000 },
  "The Queen of Hatred": { durasi: "2 Hari 1 Malam", malam: 1, harga: 1350000 },
  "In the name of Justice" : { durasi: "4 Hari 3 Malam", malam: 3, harga: 5750000 },
  "In the name of Love" : { durasi: "3 Hari 2 Malam", malam:2, harga: 3950000},
};

// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}


// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tanggal) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

formBooking.addEventListener("submit", function(event) {
    event.preventDefault();
    const nama = inputNama.value;
    const paket = inputPaket.value;
    const jumlah = inputJumlah.value;
    const berangkat = inputBerangkat.value;
    const daftarError= [];
    const tglBerangkat = new Date(berangkat);
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    if (nama === "") {
        daftarError.push("The Magical Girl needs your name!");
    } else if (nama.length < 3){
        daftarError.push("Your name is too short! The magic needs longer name, you know?");
    } else if (/\d/.test(nama)) {
    daftarError.push("You do know names doesnt include numbers, right?");
    } else if (nama === "Queenie"){
      daftarError.push("Hey! You cant use my name..");
    }

    if (paket === ""){
      daftarError.push("Really? Just pick one pack!");
    }


    if (jumlah === ""){
      daftarError.push("As if no one is coming here! Haha! Someone is coming right? Please say yes...");
    }else if (Number(jumlah) > 20){
      daftarError.push("Okay, Thats too many. There's only one of me, you know!?");
    }

    if (berangkat === ""){
      daftarError.push("Pick a date first, so i know to get ready!");
    } else if (tglBerangkat < hariIni){
      daftarError.push("Are you Time Travelling? Cmon, just pick the date right..");
    }

    if (daftarError.length > 0){
      pesanError.innerHTML = daftarError.join("<br>");
      pesanError.classList.remove("d-none");
      return;
    }

    const detail = dataPaket[dataPaket];
    const total = detail.harga * jumlah;

    document.getElementById("outNama").textContent = nama
    document.getElementById("outPaket").textContent = paket
    document.getElementById("outBerangkat").textContent = formatTanggal (berangkat);
    document.getElementById("outDurasi").textContent = detail.durasi

    bagianForm.classList.add("d-none")
    bagianInvoice.classList.remove("d-none")
});