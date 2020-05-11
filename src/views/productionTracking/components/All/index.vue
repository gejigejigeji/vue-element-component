<template>
    <MyContainer>
        <MyAction @on-reset="onReset" @on-search="onSearch">
            <MyButton :btn="'not'" title="Hold" :disabled="multiple.length<1" @click="hadnleInfo('hold')"></MyButton>
            <MyButton :btn="'view'"  :disabled="multiple.length!=1" @click="hadnleInfo('detail')"></MyButton>
            <MyButton :btn="'not'" title="History"  :disabled="multiple.length!=1" @click="hadnleInfo('history')"></MyButton>
            <MyButton :btn="'export'" :disabled="tableData.length<1" @click="onExport({data:tableData})"></MyButton>
            <MyButton :btn="'refresh'" @click="onSearch()"></MyButton>
        </MyAction>

        <WccTable v-if="columnData.length>0" :tableData="tableData" :form="form" :column="columnData" ref="wccTable"
                  @on-multiple="handleRow">
            <template v-slot:processes="scope">
                <div>
                    <span v-for="a in scope.data.row.processes" style="margin-right: 5px">{{a.name}}</span>
                </div>
            </template>

            <template v-slot:contacts="scope">
                <div>
                    <span v-for="a in scope.data.row.contacts" style="margin-right: 5px">{{a.name}}</span>
                </div>
            </template>
        </WccTable>

        <customPagination @on-change="handlePageChange" :previoud="apiResponse.previous" :next="apiResponse.next" @on-pageUpdate="handlePageUpdate"></customPagination>


    </MyContainer>
</template>

<script>
    import {reactive, toRefs, watch, onMounted, ref} from "@vue/composition-api";
    import {useList, useExcel, useRoute} from "@/views/fn_api/list.js";
    import customPagination from '@/views/productionTracking/components/customPagination.vue'

    export default {
        name: "productionAll",
        components: {customPagination},
        props: [],
        setup(props, ctx) {
            const {root} = ctx;
            const {
                columnData,
                tableData,
                form,
                onReset,
                onSearch,
                multiple,
                handleState,
                wccTable,
                handleRow,
                getData,
                getMeta,
                apiResponse,
                pageChange
            } = useList(ctx,'productionTracking/All');
            const {onExport} = useExcel();
            const {handleRoute} = useRoute(ctx);

            const state = reactive({
                holdView:ref(null),
                detailView:ref(null)
            });
            watch(
                () => ctx.root.$route,
                (to, from) => {
                    if (to.query.type == 'reset') {
                        onReset();
                    }
                }
            );
            onMounted(() => {
                getData({page_size:25});
                getMeta();
            });
            const hadnleInfo = (type) => {
                switch (type) {
                    case 'hold':
                        ctx.emit('createView',{
                            list:multiple.value,
                            type:'All'
                        });
                        break;
                    case 'detail':
                        ctx.emit('getViewList',{
                            row:multiple.value[0],
                            path:'All'
                        });
                        break;
                    case 'history':
                        handleRoute({type, open: 'productionHistory', close: 'productionHistory',data:multiple.value[0]});
                        break;
                }
            };
            const handlePageUpdate = (data) => {
                tableData.value = data.list;
                apiResponse.value = data;
                root.$delete(form.value,'page')
            };
            const handlePageChange = (val) => {
                pageChange({pageSize:val})
            };

            return {
                columnData,
                tableData,
                form,
                onReset,
                handlePageChange,
                onSearch,
                multiple,
                onExport,
                handleState,
                wccTable,
                handleRow,
                hadnleInfo,
                ...toRefs(state),
                apiResponse,
                handlePageUpdate,
            }
        }
    }
</script>
