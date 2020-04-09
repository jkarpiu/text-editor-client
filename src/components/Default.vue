<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <Toolbar id="toolbar" />
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <Recent ref="recent" v-on:loadFile="load"/>
            </div>
            <div class="col-9">
                <Editor ref="editor" v-on:refresh="$refs.recent.refresh()" :file="file" :text="{data}"/>
            </div>
        </div>
    </div>
</template>

<script>
import fs from "fs"
import Editor from "./Editor"
import Recent from "./Recent"
import Toolbar from "./Toolbar"
const { ipcRenderer } = require('electron'); 
export default {
    components: {
        Editor,
        Recent,
        Toolbar
    },
    data () {
        return {
            data: this.data,
            file: this.file = ""
        }
    },
    methods: {
        load(file) {
            fs.readFile("./files/" + file, (err, data) => {
                if (err) throw err;
                this.data = data;
            }
            );
            console.log(this.data);
            this.file = file;
        }
    },
    mounted: function () {
    this.$nextTick(function () {
        ipcRenderer.on('NEW_DOCUMENT_NEEDED', () => {
            this.$refs.recent.new()
        });
        ipcRenderer.on('SAVE_REQUIRED', () => {
            this.$refs.editor.save()
        });
    });
}

}
</script>

<style scoped>
    #toolbar {
        width: 100vw;
        margin: 0;
        background: green;
    }
    .container {
        margin: 0px !important;
        padding: 0px !important;
    }
    .col-12, .col-9, .col-3 {
        padding: 0;
    }
</style>