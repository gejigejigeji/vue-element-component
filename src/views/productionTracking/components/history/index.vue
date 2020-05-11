<template>
    <MyContainer>
        <MyAction @on-reset="onReset" @on-search="onSearch">
            <MyButton :btn="'view'"  :disabled="multiple.length!=1" @click="hadnleInfo('detail')"></MyButton>
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


        <detail ref="detailView"></detail>
    </MyContainer>
</template>

<script>
    import {reactive, toRefs, watch, onMounted, ref} from "@vue/composition-api";
    import {useList, useExcel, useRoute} from "@/views/fn_api/list.js";
    import customPagination from '@/views/productionTracking/components/customPagination.vue'
    import detail from '@/views/productionTracking/components/history/detail.vue'

    export default {
        name: "productionHistory",
        components: {customPagination,detail},
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
            } = useList(ctx,'productionTracking/history');
            const {onExport} = useExcel();

            const state = reactive({
                detailView:ref(null),
                row: {}
            });
            watch(
                () => ctx.root.$route,
                (to, from) => {
                    console.log(to.query.data);
                    if (to.query.data) {
                        state.row=JSON.parse(to.query.data)
                    }
                }
            );
            onMounted(() => {
                getData({page_size:25,wip_id:state.row.id});
                getMeta();
            });
            const hadnleInfo = (type) => {
                switch (type) {
                    case 'detail':
                        state.detailView.getViewList({row:multiple.value[0],path:'history'});
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
