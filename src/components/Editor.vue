<template>
    <div id="main">
        <p contenteditable>
        {{stringtext}}
        </p>
    </div>
</template>

<script>
import fs from "fs"
export default {
    props: {
        text: Object,
        file: String
    }
    ,
    methods: {
        save(){
            var contenteditable = document.querySelector('[contenteditable]'),
                text = contenteditable.textContent;
            console.log(text, this.file)
            fs.writeFile("./files/"+this.file, text, function (err) {
                if (err) return console.log("Błąd zapisywania") ;
                    
                });
                this.$emit('refresh');
        }
    },
    computed: {
        stringtext() {
            return new TextDecoder('utf-8').decode(this.text.data);
        }
    }
}
</script>

<style scoped>
    #main {
        background-color: white;
        height: 100%;
        width: 150%;
    }
</style>