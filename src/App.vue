<template>
    <div class="root">
        <custom-header />
        <main>
            <div class="browser-message alert alert-warning" v-if="browser == 'ie'">
                This site does not support Internet Explorer, some functionality may not work as expected
            </div>
            <router-view />
        </main>
        <custom-footer />
    </div>
</template>

<script>
import { detect } from 'detect-browser'

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
    components: {
        'custom-header': Header,
        'custom-footer': Footer,
    },
    data: () => ({
        browser: '',
    }),
    created: function() {
        this.browser = detect().name
    }
}
</script>

<style scoped>
main {
    flex: 1 0 auto;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
}

.root {
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.aristotle-logo {
    margin-top: 5px;
}

.browser-message {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
