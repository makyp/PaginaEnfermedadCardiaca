import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDwQQistbDscPtMxDDMpn7rxTx4Wdb8Jr4",
    authDomain: "finalhtml-dc01a.firebaseapp.com",
    projectId: "finalhtml-dc01a",
    storageBucket: "finalhtml-dc01a.appspot.com",
    messagingSenderId: "140157187714",
    appId: "1:140157187714:web:d004302773da9eceb0269b",
    measurementId: "G-L8NSS2QCQL"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Obtén la instancia de Firestore

function setCookie(name, value, days) {
    const secureFlag = location.protocol === "https:" ? "; Secure" : "";
    const expires = days ? "; expires=" + new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString() : "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=None" + secureFlag;
}

const formularioRegistro = document.getElementById("formularioRegistro");

formularioRegistro.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const colesterolMalo = parseInt(document.getElementById("colesterol_malo").value);
    const colesterolBueno = parseInt(document.getElementById("colesterol_bueno").value);
    const hemoglobina = parseFloat(document.getElementById("hemoglobina").value);

    const paciente = {
        nombre,
        edad,
        peso,
        colesterolMalo,
        colesterolBueno,
        hemoglobina
    };
    try {
        await addDoc(collection(firestore, "FormularioEnfermedadCardiaca"), paciente);
        setCookie("formularioGuardado", "true", 30);
        alert("Datos guardados correctamente");
        document.getElementById("formularioRegistro").reset();
        console.log("datosEnviados");
    } catch (error) {
        console.error("Error al guardar el documento:", error);
        alert("Hubo un error al guardar los datos");
    }
});