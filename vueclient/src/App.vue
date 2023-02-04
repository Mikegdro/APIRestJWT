<template>
    <div class="rounded-lg py-10 gap-10 justify-center items-center bg-black/10 bg flex flex-col backdrop-blur-md w-full xl:w-1/2">
        <h1 class="font-Work font-regular text-4xl text-center">Inserta tus credenciales</h1>
        
        <form class="flex flex-col w-4/5 gap-10">
            <input v-model="email" class="p-2 hover:cursor-text hover:text-black/40" type="text" placeholder="Introduce tu Email aquí">
            <input v-model="nombre" class="p-2 hover:cursor-text" type="text" placeholder="Introduce tu Nombre aquí">
            <input v-model="password" class="p-2 hover:cursor-pointer" type="password" placeholder="Introduce tu Contraseña aquí">
        </form>

        <div class="flex gap-10 my-5 flex-col sm:flex-row">
            <button @click="login" class="py-1 px-10 rounded-full bg-teal-100 hover:bg-teal-900 transition-all hover:px-20 hover:text-white">Login</button>
            <button @click="register" class="py-1 px-10 rounded-full bg-teal-100 hover:bg-teal-900 transition-all hover:px-20 hover:text-white">Register</button>
        </div>

    </div>
</template>

<style>

.active {
    background-color: turquoise;
}

</style>

<script>
export default {
    data() {
        return {
            email: "",
            nombre: "",
            password: "",
            isRegister: false,
            isActive: "login"
        }
    },
    methods: {
        login() {
            
        },
        register() {
            
        }
    },
    mounted() {

    }
}
</script>

