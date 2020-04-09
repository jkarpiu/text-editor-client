<template>
    <div id="main">
        <ul class="list-group titles bg-dark">
            <li class="list-group-item bg-dark" v-if="adding == true">
                <form v-on:submit="newfile">
                    <p><input type="text" v-model="filename" placeholder="Nazwa..."> <input type="submit" value="OK"></p>
                </form>
            </li>
            <li :key="file" v-for="file in this.files" @click="$emit('loadFile', file)"
                class="list-group-item bg-dark" :class="{'active':(file == filename)}">{{ file }}</li>
        </ul>
    </div>
</template>

<script>
    import fs from "fs"
import { ipcRenderer } from 'electron';
    export default {

        created() {
            this.files = fs.readdirSync('./files');
            this.adding = false;

        },
        data() {
            return {
                active: false,
                files: this.files,
                adding: this.adding,
                filename: this.filename
            }
        },
        methods: {
            newfile() {
                this.adding = false;
                ipcRenderer.send("FILE_NEW");
                this.refresh();
            },
            refresh() {
                this.$emit('loadFile', this.filename);
                this.files = fs.readdirSync('./files');
            }
        },
    }
</script>

<style scoped>
    #main {
        height: 80vh;
        width: 100%;

    }

    li {
        cursor: pointer;
        color: whitesmoke;
    }
</style>