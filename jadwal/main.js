import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNYqYJVYPTZRIK7pKZ4shbQ4igjseQpLM",
  authDomain: "insan-cemerlang-d724d.firebaseapp.com",
  projectId: "insan-cemerlang-d724d",
  storageBucket: "insan-cemerlang-d724d.appspot.com",
  messagingSenderId: "630693962922",
  appId: "1:630693962922:web:a9447f760b858bcf781cd3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarMapel() {
  const refDokumen = collection(db, "jadwal");
  const kueri = query(refDokumen, orderBy("hari"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      waktu: dok.data().waktu,
      kelas: dok.data().kelas,
      mapel: dok.data().mapel,
      gurumapel: dok.data().gurumapel,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahjadwalmapel(hari, waktu, kelas, mapel, gurumapel) {
  try {
    const dokRef = await addDoc(collection(db, 'jadwal'), {
      hari: hari,
      waktu: waktu,
      kelas: kelas,
      mapel: mapel,
      gurumapel: gurumapel
    });
    console.log('Berhasil menambah jadwal ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah jadwal' + e);
  }
}
//fungsi hapus untuk data
export async function hapusMapel(docId) {
  await deleteDoc(doc(db, "jadwal", docId));
}

export async function ubahdaftarmapel(docId, hari, waktu, kelas, mapel, gurumapel) {
  await updateDoc(doc(db, "jadwal", docId), {
    hari: hari,
    waktu: waktu,
    kelas: kelas,
    mapel: mapel,
    gurumapel: gurumapel
  });
}

export async function ambilmapel(docId) {
  const docRef = await doc(db, "jadwal", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}