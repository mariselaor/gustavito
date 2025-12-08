import { db } from "../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

// Crear usuario
export async function crearUsuario(uid, data) {
  return await setDoc(doc(db, "usuarios", uid), data);
}

// Crear nivel
export async function crearNivel(data) {
  return await addDoc(collection(db, "niveles"), data);
}

// Crear palabra
export async function crearPalabra(data) {
  return await addDoc(collection(db, "palabras"), data);
}

// Crear actividad
export async function crearActividad(data) {
  return await addDoc(collection(db, "actividades"), data);
}

// Guardar progreso
export async function guardarProgreso(uid, actividadId, data) {
  return await setDoc(doc(db, "usuarios", uid, "progreso", actividadId), data);
}
