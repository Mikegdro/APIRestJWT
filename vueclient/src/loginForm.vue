<template>
    <form @submit.prevent="$emit('login', {email, nombre, password})" class="flex flex-col w-4/5 gap-10">
        <input v-model="email" class="p-2 hover:cursor-text hover:text-black/40" type="text" placeholder="Introduce tu Email aquí">
        <input v-model="nombre" class="p-2 hover:cursor-text" type="text" placeholder="Introduce tu Nombre aquí">
        <input v-model="password" class="p-2 hover:cursor-pointer" type="password" placeholder="Introduce tu Contraseña aquí">
    </form>

    <div class="flex gap-10 my-5 flex-col sm:flex-row">
        <button @click="$emit('login', {email, nombre, password})" class="py-1 px-10 rounded-full bg-teal-100 hover:bg-teal-900 transition-all hover:px-20 hover:text-white">Login</button>
        <button @click="$emit('register')" class="py-1 px-10 rounded-full bg-teal-100 hover:bg-teal-900 transition-all hover:px-20 hover:text-white registerButton">Register</button>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                email: "",
                nombre: "",
                password: "",
                isRegister: false,
                isActive: "login",
            };
        },
        emits: [
            'login',
            'submit'
        ],
        
        mounted() {},
    }

</script>