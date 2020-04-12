<template>
    <div id="main">
        <p contenteditable>
        {{stringtext}}
        </p>
        <div class="stats">
            <Stats ref="stats" :data="{statData}"/>
        </div>
    </div>
</template>

<script>
import Stats from "./Stats"
const { ipcRenderer } = require('electron'); 
export default {
    props: {
        text: Object,
        file: String,
    },  
    data() {
        return {
            statData: this.statData
        }
    },
    components: {
        Stats
    },
    methods: {
        save(){
            var contenteditable = document.querySelector('[contenteditable]'),
                text = contenteditable.textContent;
            ipcRenderer.send("STORE_FILE", {text})
            var cache = "";
            var list = [];
            var letterCache = "";
            for (var i = 0; i <= text.length; i++) {
                if ( text[i] == " " && letterCache !== " ") {
                    list.push(cache);
                    cache = "";
                }else if ((text[i] || letterCache) == ("," || "." ||"/" || "("|| ")" || ":" || ";" || "!" || "?" || "-"))   {
                    i++;
                    i--;
                }else if ( i == text.length ) 
                    list.push(cache);
                else 
                    cache = cache + text[i];
                letterCache = text[i]
            }
            this.countAndSend(list);
        
        },
        countAndSend(list){
            var counted = {}
            var countedWords = [];
            list.forEach(element => {
                for (var i = 0; i < list.length; i++ ) {
                    if (element == list[i] && !this.checkifexists(element, countedWords)) {
                        if (counted[element] == undefined)
                            counted[element] = 1;
                        else 
                            counted[element]++
                    }
            }
            countedWords.push(element);
            });
            this.statData = counted;
            this.$refs.stats.showStats();
            
        },
        checkifexists(word, list) {
            for(var i = 0; i < list.length; i++) {
                if (list[i] == word) 
                    return true;
            }
            return false;
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
        width: 100vw;
    }
</style>