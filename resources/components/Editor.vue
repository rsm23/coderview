<template>
    <div class="lg:flex rounded shadow-lg">
        <div class="sm:w-full md:w-full lg:w-3/5 bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden">
            <div class="codemirror">
                <!-- codemirror -->
                <codemirror :options="cmOption" v-model="code"></codemirror>
            </div>
        </div>
        <chat :username="this.username" :room="this.room"></chat>
    </div>
</template>

<script>
    // language
    import 'codemirror/mode/php/php.js'
    // theme css
    import 'codemirror/theme/cobalt.css'
    // require active-line.js
    import 'codemirror/addon/selection/active-line.js'

    export default {
        props: ['username','room'],
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
                }
            }
        }
    }
</script>