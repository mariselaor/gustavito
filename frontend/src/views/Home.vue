<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Bienvenid@ {{ username }}</h1>
    <p class="text-lg">Holis, estamos en el home.vue</p>

    <button @click="logout" class="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition">
      Cerrar Sesión
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from "../router/firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'vue-router'

const username = ref('')
const router = useRouter()

const logout = async () => {
  await signOut(auth)
  router.push("/") // Volver al login
}

// Obtener datos del usuario logueado
onMounted(async () => {
  if (auth.currentUser) {
    const docRef = doc(db, "usuarios", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      username.value = docSnap.data().username
    } else {
      username.value = "Usuario"
    }
  } else {
    router.push("/") // si no hay usuario logueado, volver al login
  }
})
</script>
