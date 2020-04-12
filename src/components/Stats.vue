<template>
    <div>
        
    </div>
</template>

<script>
export default {
    props: {
        statData: Object
    },
    data() {
        return {
            
        }
    },
    methods: {
        showStats() {
            console.log(this.$attrs.data.statData[0]);
        }
    }
}
</script>