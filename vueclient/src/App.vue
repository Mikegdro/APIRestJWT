<template>
    <div class="rounded-lg py-10 w-100 gap-10 justify-center items-center bg-black/10 bg flex flex-col backdrop-blur-md">
        <h1 class="font-Work font-regular text-4xl">LOGIN FORM</h1>
        <input v-bind="state" class="p-2 hover:cursor-text w-4/6" type="text" placeholder="Introduce tu email">
        <input class="p-2 hover:cursor-text w-4/6" type="text" placeholder="Introduce tu nombre">
        <input class="p-2 hover:cursor-pointer w-4/6" type="password" placeholder="Introduce tu contraseña">
        
        <div class="flex gap-10 my-5">
            <button class="py-1 px-10 rounded-full bg-teal-100 hover:bg-teal-900 hover:text-white">Login</button>
            <button @click="" class="py-1 px-10 rounded-full bg-teal-100 hover:bg-teal-900 hover:text-white">Register</button>
        </div>

    </div>
</template>


<script>
    const login = createApp({
        data: function() {
            return {
                
            }
        },
        methods: {

        }
    })
</script>

