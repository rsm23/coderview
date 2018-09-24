<template>
    <div class="font-sans antialiased">
        <nav class="flex items-center justify-between flex-wrap bg-teal p-3">
            <div class="flex items-center flex-no-shrink text-white mr-6">
                <span class="font-semibold text-xl tracking-tight">Coderview</span>
            </div>
            <div class="block sm:hidden">
                <button @click="toggle"
                        class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>
                        Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-sm sm:flex-grow">
                    <a class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4"
                       href="/">
                        Home
                    </a>
                    <a class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4"
                       href="/about">
                        About
                    </a>
                    <a class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white"
                       href="/contact">
                        Contact
                    </a>
                </div>

                <div class="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow" v-if="!user">
                    <div class="flex items-stretch ml-auto justify-between">
                        <a href="/login" class="bg-teal-dark hover:bg-white hover:text-teal border border-white text-white py-2 px-4 rounded-full no-underline">Login</a>
                        <a href="/register" class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal font-bold text-white no-underline flex items-center hover:text-teal-darker">Register</a>
                    </div>
                </div>
                <div class="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow" v-else>
                    <div class="flex items-stretch ml-auto justify-between">
                        <a href="#" class="font-bold text-white no-underline hover:text-teal-darker">{{this.user}}</a>
                        <a href="/logout" class="text-red no-underline hover:text-red-dark font-bold ml-6">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        props: ['user'],
        data: () => ({
            open: false,
        }),
        methods: {
            toggle() {
                this.open = !this.open
            }
        }
    }
</script>