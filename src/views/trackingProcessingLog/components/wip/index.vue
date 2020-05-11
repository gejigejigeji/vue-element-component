<template>
    <MyContainer>
        <MyAction @on-reset="onReset" @on-search="onSearch">
            <MyButton :btn="'refresh'" @click="onSearch()"></MyButton>
        </MyAction>

        <WccTable v-if="columnData.length>0" :tableData="tableData" :form="form" :column="columnData" ref="wccTable" :expand="expand" :sub-table="subTable"
                  @on-multiple="handleRow">
            <template v-slot:format_file="scope">
                <div class="wcc-table-child-down">
                    <a :href="scope.data.row.format_file_link">
                        <span>{{scope.data.row.format_file}}</span>
                        <i class="el-icon-upload wcc-child-icon-size"></i>
                    </a>
                </div>
            </template>
            <template v-slot:file="scope">
                <div class="wcc-table-child-down">
                    <a :href="scope.data.row.file_link">
                        <span>{{scope.data.row.file}}</span>
                        <i class="el-icon-upload wcc-child-icon-size"></i>
                    </a>
                </div>
            </template>
            <template v-slot:state="scope">
                <div class="wcc-table-child-down">
                    <a :href="scope.data.row.log_file_link">
                        <span >{{scope.data.formatValue}}</span>
                        <i class="el-icon-upload wcc-child-icon-size"></i>
                    </a>
                </div>
            </template>
        </WccTable>

        <MyPagination ref="Pagination" :current="form.page" :limit="form.page_size" :total="form.total"
                      @on-change="pageChange"></MyPagination>
    </MyContainer>
</template>

<script>
    import {reactive, toRefs, watch, onMounted, ref} from "@vue/composition-api";
    import {useList, useExcel, useRoute} from "@/views/fn_api/list.js";

    export default {
        name: "trackingProcessingLogWip",
        components: {},
        props: [],
        setup(props, ctx) {
            const {
                columnData,
                tableData,
                form,
                onReset,
                pageChange,
                onSearch,
                multiple,
                handleState,
                wccTable,
                handleRow,
                getData,
                getMeta,
                subTable,
                expand
            } = useList(ctx,'trackingProcessingLog');
            const {onExport} = useExcel();
            const {handleRoute} = useRoute(ctx);

            watch(
                () => ctx.root.$route,
                (to, from) => {
                    if (to.query.type == 'reset') {
                        onReset();
                    }
                }
            );
            onMounted(() => {
                let data = {
                    file_type: 1
                };
                getMeta();
                getData(data);
            });


            const hadnleInfo = (type) => {
                switch (type) {
                    case 'edit':
                        handleRoute({type, open: 'handleVendor', close: 'handleVendor', data: multiple.value[0]});
                        break;
                    case 'effect':
                        handleState({type});
                        break;
                    case 'archive':
                        handleState({type});
                        break;
                    case 'view':
                        break
                }
            };


            return {
                columnData,
                tableData,
                form,
                onReset,
                pageChange,
                onSearch,
                multiple,
                onExport,
                handleState,
                wccTable,
                handleRow,
                hadnleInfo,
                subTable,
                expand
            }
        }


        // }
    }
</script>
