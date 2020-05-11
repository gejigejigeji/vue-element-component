<template>
    <MyContainer>
        <MyTitle title="Vendor"></MyTitle>
        <MyAction @on-reset="onReset" @on-search="onSearch">
            <MyButton :btn="'edit'" :disabled="multiple.length!=1" @click="hadnleInfo('edit')"></MyButton>
            <MyButton :btn="'submit'" text="effect" type="confirm" :disabled="multiple.length<1"
                      @click="hadnleInfo('effect')"></MyButton>
            <MyButton :btn="'archive'" text="archive" type="confirm" :disabled="multiple.length<1"
                      @click="hadnleInfo('archive')"></MyButton>

            <MyButton :btn="'export'" :disabled="tableData.length<1" @click="hadnleInfo('export')"></MyButton>
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
                    <span v-for="a in scope.data.row.contacts.list" style="margin-right: 5px">{{a.email}}</span>
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
        name: "baseVendor",
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
                getMeta
            } = useList(ctx,'Vendor');
            const {onExport} = useExcel();
            const {handleRoute} = useRoute(ctx);
            watch(
                () => ctx.root.$route,
                (to, from) => {
                    if (to.query.type == 'reset') {
                        multiple.value = [];
                        onReset();
                    }
                }
            );
            onMounted(() => {
                getData();
                getMeta();
            });
            const handleExport = () => {
                let tHeader = [];
                let tProp = [];
                let data = JSON.parse(JSON.stringify(tableData.value));
                let option = {};
                columnData.value.map(item => {
                    tHeader = [...tHeader, item.label];
                    tProp = [...tProp, item.prop];
                    if (item.prop == 'state') {
                        option[item.prop] = item.options;
                    }
                });
                data.map(item => {
                    option.state.map(sitem => {
                        if (item.state == sitem.value) {
                            item.state = sitem.name;
                        }
                    });
                });
                const handleData = (filter,list) => {
                    return list.map(item => {
                        return filter.map(k => {
                            if (k == 'processes') {
                                return item[k].map(p=>{
                                    return p.name
                                }).join(',')
                            }else if (k == 'contacts') {
                                return item[k].list.map(mail => {
                                    return mail.email;
                                }).join(',');
                            }else{
                                return item[k];
                            }
                        });
                    });
                };
                useExcel().onExport({
                    name: 'Vendor',
                    data,
                    tHeader,
                    tProp,
                    handleData
                })
            };
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
                        break;
                    case 'export':
                        handleExport();
                        break;
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
                handleState,
                wccTable,
                handleRow,
                hadnleInfo
            }
        }
    }
</script>
