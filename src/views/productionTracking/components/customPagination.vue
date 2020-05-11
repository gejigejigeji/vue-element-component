<template>
    <div class="customePagination">
        <el-pagination
                @size-change="handleSize"
                :page-sizes="[25, 50, 100]"
                :page-size="25"
                layout="sizes">
        </el-pagination>
        <i class="el-icon-caret-left" @click="handlePrevioud"></i>
        <i class="el-icon-caret-right" @click="handleNext"></i>
    </div>
</template>

<script>
    import {getApi} from '@/views/fn_api/utils/require.js'
    import {megSuc, megError} from '@/utils/notice'

    export default {
        name: "customPagination",
        props: ['previoud','next'],
        setup(props,ctx) {
            const {root} = ctx;
            let {
                loading
            } = root.$store.getters;
            const {previoud,next} = getApi('productionTracking');
            const handleSize = (val) => {
                ctx.emit('on-change',val);
            };
            const handlePrevioud = () => {
                if(props.previoud==null){
                    megSuc('no data');
                    return;
                };
                let path = props.previoud.replace('http://gc-scm-alpha.wochacha.cn', '');
                loading.all = true;
                previoud({path}).then(res => {
                    ctx.emit('on-pageUpdate', res.data);
                    loading.all=false
                });
            };
            const handleNext = () => {
                let path = props.next.replace('http://gc-scm-alpha.wochacha.cn', '');
                loading.all = true;
                next({path}).then(res => {
                    ctx.emit('on-pageUpdate', res.data);
                    loading.all=false
                });
            };

            return{
                handleSize,
                handlePrevioud,
                handleNext
            }

        }
    }
</script>

<style scoped>

</style>