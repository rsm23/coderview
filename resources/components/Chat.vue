<template>
    <div class="sm:w-full md:w-full lg:w-2/5 border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between">
        <div class="mb-2 flex justify-between">
            <div class="text-black font-bold">ChatBox</div>
            <div class="text-grey text-xs" v-text="this.username ? this.username : generateUsername()"></div>
        </div>
        <div :class="{'flex bg-blue-darkest rounded p-2' : displayName(msg.user)}"
             :key="index" v-for="(msg, index) in messages" class="mb-2">
            <div class="w-1/2" v-if="displayName(msg.user)"><p
                    class="font-bold text-blue-darkest inline-block bg-white rounded p-2">
                {{getName(msg.user)}}</p>
            </div>
            <div :class="{'w-1/2' : displayName(msg.user)}" class="break-words"><p
                    :class="{'bg-grey-dark p-2 rounded' : !displayName(msg.user)}"
                    class="block overflow-auto text-white">
                {{msg.message }}</p></div>
        </div>
        <form @submit.prevent="sendMessage" class="w-full">
            <div class="flex items-center mt-3">
                <input aria-label="Full name"
                       class="w-full text-grey-darker border-blue-darkest border-2 text-sm py-3 rounded-l-full px-3 shadow-md focus:outline-none"
                       placeholder="Jane Doe" type="text" v-model="message">
                <button class="flex-no-shrink bg-blue-darkest border-blue-darkest text-sm py-3 text-white px-2 border-2 rounded-r-full shadow-md focus:outline-none"
                        type="button">
                    Send
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import io from 'socket.io-client';

    export default {
        props: ['username', 'room'],
        data() {
            return {
                message: '',
                messages: [],
                socket: io('localhost:3000')
            }
        },
        methods: {
            generateUsername() {
                let userId = Math.floor(Math.random() * 9999).toString();
                return `User ${userId}`;
            },
            sendMessage(e) {
                e.preventDefault();
                if (this.message === '') return;
                this.socket.emit('chatMessage', {
                    user: this.username,
                    message: this.message
                });
                this.message = ''
            },
            getName(msgname) {
                return this.username == msgname ? 'Me' : msgname;
            },
            displayName(msgname) {
                return this.username == msgname ? false : true;
            }
        },
        mounted() {
            this.socket.emit('joinRoom', {room: this.room});
            this.socket.on('message', (data) => {
                this.messages = [...this.messages, data];
            });
        }
    }
</script>