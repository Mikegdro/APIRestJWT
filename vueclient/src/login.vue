<template>
    <div
        class="rounded-lg py-10 gap-10 justify-center items-center bg-black/10 bg flex flex-col backdrop-blur-md w-full xl:w-1/2"
    >
        <h1 class="font-Work font-regular text-4xl text-center">
            Inserta tus credenciales
        </h1>

        <loginForm v-if="isLogin" @login="login()"/>
        <regexForm v-else/>
        
    </div>
</template>

<style>
    .active {
        background-color: turquoise;
    }
</style>

<script>

import loginForm from './loginForm.vue';
import regexForm from './regex.vue';

export default {
    data() {
        return {
            isLogin: true
        }
    },
    components: {
        loginForm,
        regexForm
    },
    methods: {
        login() {
            this.isLogin = false;
            console.log("login")
        },
        register() {

        }
    }
};
</script>
