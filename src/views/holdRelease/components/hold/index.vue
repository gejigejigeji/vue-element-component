<template>
    <MyContainer>
        <MyAction @on-reset="onReset" @on-search="onSearch">
            <MyButton :btn="'view'"  :disabled="multiple.length!=1" @click="hadnleInfo('detail')"></MyButton>
            <MyButton :btn="'export'" :disabled="tableData.length<1" @click="onExport({data:tableData})"></MyButton>
            <MyButton :btn="'refresh'" @click="onSearch()"></MyButton>
        </MyAction>

        <SpanTable v-if="tableData.length>0" :tableData="tableList" :form="form" :column="columnData" ref="wccTable"
                  @on-multiple="handleRow">
            <template v-slot:reason="scope">
                <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="scope.data.row.reason">
                    <span slot="reference">{{scope.data.row.reason}}</span>
                </el-popover>
            </template>
        </SpanTable>
        <MyPagination ref="Pagination" :current="form.page" :limit="form.page_size" :total="form.total"
                      @on-change="pageChange"></MyPagination>
    </MyContainer>
</template>

<script>
    import {reactive, toRefs, onMounted, ref} from "@vue/composition-api";
    import {useList, useExcel} from "@/views/fn_api/list.js";

    export default {
        name: "holdReleaseHold",
        components: {},
        props: [],
        setup(props, ctx) {

            const {root} = ctx;
            const {
                tableData,
                multiple,
                handleState,
                wccTable,
                handleRow,
                getData,
            } = useList(ctx,'holdRelease/hold');
            const {onExport} = useExcel();

            const state = reactive({
                createView:ref(null),
                columnData: [
                    {label:'Hold ID',header:'keyword',reader:'code',prop:'code',},
                    {label:'GC Device',prop:'gcDevice',},
                    {label:'wafer Qty',prop:'qty',},
                    {label:'GC ENG Action',prop:'action',},
                    {label:'Reason',header:'keyword',reader:'reason',prop:'reason',},
                    {label:'Operator',header:'keyword',reader:'created_by_name',prop:'created_by_name',},
                    {label:'Create Time',header:'date-range',reader:'created_at',prop:'created_at',},
                ],
                tableList:[],
                form: {
                    page: 1,
                    page_size: 25,
                    total:1,
                    code:'',
                    reason:'',
                    created_by_name:'',
                    created_at:'',
                }
            });

            function handleRes(res) {
                let list = res.data.list;
                state.form.total = Number(res.data.total_count);
                let rul = list.reduce((prev, cur) => {
                    let arr = [];
                    if (cur.groups.length == 0) {
                        arr.push({
                            id:cur.id,
                            code: cur.code,
                            gcDevice:'',
                            qty: '',
                            action:'hold',
                            reason: cur.reason,
                            operator:'',
                            created_at: cur.created_at,
                            cell:1
                        })
                    } else {
                        arr = cur.groups.map((item, i) => {
                            return i === 0 ?
                                {
                                    id:cur.id,
                                    code: cur.code,
                                    gcDevice: item.flow_node_name,
                                    qty: item.qty,
                                    action:'hold',
                                    reason: cur.reason,
                                    operator:item.created_by_name,
                                    created_at: cur.created_at,
                                    cell: cur.groups.length
                                } :
                                {
                                    id:cur.id,
                                    code: cur.code,
                                    gcDevice: item.flow_node_name,
                                    qty: item.qty,
                                    action:'hold',
                                    reason: cur.reason,
                                    operator:item.created_by_name,
                                    created_at: cur.created_at,
                                }
                        });
                    }
                    return [...prev, ...arr]
                }, []);
                state.tableList = rul;
            }

            onMounted(() => {
                getData({page_size: 25}).then(handleRes);
            });
            const hadnleInfo = (type) => {
                switch (type) {
                    case 'detail':
                        ctx.emit('createView',{
                            list:multiple.value,
                            type:'hold'
                        });
                        break;
                }
            };

            const onSearch = () => {
                pageChange({page: 1})
            };

            const onReset = () => {
                state.form = {
                    page: 1,
                    page_size: 25,
                    total: 1,
                    code: '',
                    reason: '',
                    created_by_name: '',
                    created_at: '',
                };
                onSearch();
            };
            const pageChange = ({page, pageSize}) => {
                state.form.page = page || state.form.page;
                state.form.page_size = pageSize || state.form.page_size;
                getData(state.form).then(handleRes);
            };
            return {
                tableData,
                onReset,
                onSearch,
                multiple,
                onExport,
                handleState,
                wccTable,
                handleRow,
                hadnleInfo,
                ...toRefs(state),
                pageChange
            }
        }
    }
</script>
