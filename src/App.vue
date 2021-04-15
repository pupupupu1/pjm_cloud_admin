<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    
import {Decrypt,Encrypt} from '@/utils/crypto';
export default {
    name: 'App',
    created() {
        // console.log(Decrypt("77+9Thrvv73vv71OTCsD77+9Cl/vv71tAg==","pjm",""))
    }
}
</script>

<style>
body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
li, ul, p, div, body, html, table {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html, body {
    height: 100%;
    overflow: hidden;
}
li {
    list-style: none;
}
#app {
    height: 100%;
}
</style>
