<template>
    <div>
        <h1 class="mb-16 text-grey-darker">Contact Us</h1>
        <hr/>
        <form @submit.prevent="checkForm" class="w-full" v-if="!submitted">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                           for="grid-full-name">
                        Full Name
                    </label>
                    <input :class="{ 'border border-red' : errors.has('name') }"
                           class="appearance-none block w-full bg-grey-lighter text-grey-darker rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                           id="grid-full-name" placeholder="Jane"
                           type="text"
                           name="name"
                           v-model="fullName" v-validate="'required'">
                    <p class="text-red text-xs italic" v-if="errors.has('name')">The name field is required.</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                           for="grid-email">
                        Email
                    </label>
                    <input :class="{ 'border border-red' : errors.has('email') }"
                           class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                           id="grid-email"
                           placeholder="email@server.com" type="email"
                           name="email"
                           v-model="email" v-validate="'email|required'">
                    <p class="text-red text-xs italic" v-if="errors.has('email')">The email field is required.</p>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                           for="message">
                        Your Message
                    </label>
                    <textarea
                            :class="{ 'border border-red' : errors.has('message') }"
                            class="appearance-none block w-full h-64 bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                            id="message"
                            name="message" v-model="message"
                            v-validate="'required'"></textarea>
                    <p class="text-red text-xs italic" v-if="errors.has('message')">The message field is required.</p>
                </div>
            </div>
            <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                Send
            </button>
        </form>

        <div v-if="submitted">
            <div class="bg-teal-lightest border-t-4 border-teal rounded-t text-teal-darkest px-4 py-3 shadow-md"
                 role="alert">
                <div class="flex">
                    <div class="py-1">
                        <svg class="fill-current h-6 w-6 text-teal mr-4" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="font-bold">Message has been sent</p>
                        <p class="text-sm">You'll hear back from us in the ASAP.</p>
                    </div>
                </div>
            </div>
            <div class="flex justify-between shadow-md">
                <a class="bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded-bl flex-1 no-underline text-center"
                   href="/">
                    Home
                </a>
                <a class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded-br flex-1 no-underline text-center"
                   href="/contact">
                    Contact Page
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            fullName: '',
            email: '',
            message: '',
            submitted: false
        }),
        methods: {
            checkForm: function () {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let body = {
                            name : this.fullName,
                            email : this.email,
                            message: this.message
                        };
                        axios.post('/contact', body)
                            .then(data => {
                                console.log(data)
                                this.submitted = true;
                            })
                            .catch(error => { });
                        return;
                    }

                    alert('Correct them errors!');
                });
            }
        }
    }
</script>