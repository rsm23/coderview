<template>
    <div class="lg:flex rounded shadow-lg">
        <div class="sm:w-full md:w-full lg:w-3/4 bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden">
            <div class="codemirror">
                <!-- codemirror -->
                <codemirror :options="cmOption" v-model="code"></codemirror>
            </div>
        </div>
        <div class="sm:w-full md:w-full lg:w-1/4 border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between">
            <div class="mb-8 flex justify-between">
                <div class="text-black font-bold">ChatBox</div>
                <div class="text-grey text-xs" v-text="this.username ? this.username : generateUsername()"></div>
            </div>
            <div class="messages" v-for="(msg, index) in messages" :key="index">
                <p class="text-grey-darker text-base"><span class="font-bold">{{ msg.user }} </span>: {{ msg.message }}</p>
            </div>
            <div class="flex items-center">
                <form class="w-full max-w-sm" @submit.prevent="sendMessage">
                    <div class="flex items-center">
                        <input aria-label="Full name"
                               class="w-full text-grey-darker border-blue-darkest border-2 text-sm py-3 rounded-l-lg px-3 focus:outline-none shadow-md"
                               placeholder="Jane Doe" type="text" v-model="message">
                        <button class="flex-no-shrink bg-blue-darkest border-blue-darkest text-sm py-3 text-white px-2 border-2 rounded-r-lg focus:outline-none shadow-md"
                                type="button">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    // language
    import 'codemirror/mode/php/php.js'
    // theme css
    import 'codemirror/theme/cobalt.css'
    // require active-line.js
    import 'codemirror/addon/selection/active-line.js'
    // Socket.IO Client
    import io from 'socket.io-client';

    export default {
        props: ['username'],
        data() {
            const code =
                `<?php
  $a = array('a' => 1, 'b' => 2, 3 => 'c');
  echo "$a[a] \${a[3] /* } comment */} {$a[b]} $a[a]";
  function hello($who) {
    return "Hello $who!";
  }
?>
<p>The program says <?= hello("World") ?>.</p>`
            return {
                code,
                cmOption: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    line: true,
                    mode: 'application/x-httpd-php',
                    lineWrapping: true,
                    theme: 'cobalt'
                },
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

                this.socket.emit('chatMessage', {
                    user: this.username,
                    message: this.message
                });
                this.message = ''
            }
        },
        mounted() {
            this.socket.on('Message', (data) => {
                this.messages = [...this.messages, data];
            });
        }
    }
</script>