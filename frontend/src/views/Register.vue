<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-blue-700">Crear Cuenta</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block mb-1 font-semibold">Nombre de Usuario</label>
          <input v-model="username" type="text" class="w-full border p-2 rounded" required>
        </div>

        <div class="mb-4">
          <label class="block mb-1 font-semibold">Correo</label>
          <input v-model="email" type="email" class="w-full border p-2 rounded" required>
        </div>

        <div class="mb-4">
          <label class="block mb-1 font-semibold">Contraseña</label>
          <input v-model="password" type="password" class="w-full border p-2 rounded" required>
        </div>

        <button class="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
          Registrarme
        </button>
      </form>

      <p class="text-center mt-4">
        ¿Ya tienes cuenta?
        <router-link to="/" class="text-blue-600 font-semibold">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth, db } from "../router/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const username = ref('')
const router = useRouter()

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      username: username.value,
      email: email.value,
      createdAt: new Date()
    })

    alert("Usuario registrado exitosamente ✨")
    router.push("/home")
  } catch (error) {
    alert("Error: " + error.message)
  }
}
</script>
