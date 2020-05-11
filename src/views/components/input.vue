<template>
    <input  ref="value" placeholder="请输入型号"  @input="$emit('a',$event.target.value)">
    </input>
</template>

<script>
    export default {
        name: "inputs",
        data() {
            return{
                value:''
            }
        },
        props:['childValue'],
        model: {
            prop:'childValue',
            event:'a'
        }
    }
</script>

<style scoped>

</style>