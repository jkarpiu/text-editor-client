<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <Editor ref="editor" v-on:refresh="$refs.recent.refresh()" :file="file" :text="{data}"/>
            </div>
        </div>
    </div>
</template>

<script>
import Editor from "./Editor"
const { ipcRenderer } = require('electron'); 
export default {
    components: {
        Editor
    },
    data () {
        return {
            data: this.data,
            file: this.file = ""
        }
    },
    methods: {
        load(file) {

            
            console.log(this.data);
            this.file = file;
        }
    },
    mounted: function () {
    this.$nextTick(function () {
        ipcRenderer.on('NEW_DOCUMENT_NEEDED', () => {
            this.data = new TextEncoder('utf-8').encode(" ")
        });
        ipcRenderer.on('SAVE_REQUIRED', () => {
            this.$refs.editor.save()
        });
         ipcRenderer.on('DOCUMENT_NEEDS_TO_OPEN', (event, data) => {
           this.data = data.file;
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