import {reactive, toRefs, watch, onMounted, computed, ref,onUnmounted} from "@vue/composition-api";
import {getApi} from '@/views/fn_api/utils/require.js'
import {megSuc, megError} from '@/utils/notice'
import {parseTime} from '@/utils/index.js'

//处理TAB选项
export function useTab() {
    const state = reactive({
        active: 0
    });
    const handleTab = (activeName) => {
        state.active=activeName
    };
    return {
        ...toRefs(state),
        handleTab
    }
}


//基础表格
export function useList(ctx,dirName) {
    const {getList, getListMeta, updateState} =!dirName?{}: getApi(dirName);
    const {root} = ctx;
    let {
        pagination,
        loading
    } = root.$store.getters;

    const state = reactive({
        tableData: [],
        columnData: [],
        multiple: [],
        form: {
            page:1,
            page_size:pagination.limit,
            total:0,
        },
        tabActive: 0,
        wccTable: ref(null),
        expand:false,
        subTable: {},
        apiResponse: {}
    });

    const getData = (data) => {
        loading.all = true;
        if (data) {
            state.form = {...state.form, ...data};
        }
        return new Promise((resolve, reject) => {
            getList(state.form).then(res => {
                state.tableData = res.data.list;
                state.apiResponse = res.data;
                state.form.total = res.data.total_count;
                loading.all = false;
                resolve(res)
            }).catch(() => {
                loading.all = false;
                reject();
            });
        })

    };
    const getMeta = () => {
        return new Promise((resolve, reject) => {
            getListMeta().then(res => {
                let data = res.data.actions.list;
                if(data.expand==true) {
                    state.expand = true;
                    state.subTable= {fields:data.fields,data_field:data.data_field};
                }
                state.columnData = data.info;
                handleForm(state.columnData);
                resolve(res)
            }).catch(() => {
                loading.all = false;
                reject();
            });
        })

    };
    const handleState = ({type, data}) => {
        let ids = [], states = type == 'effect' ? 1 : 0;
        state.multiple.map(a => {
            ids = [...ids, a.id];
        });

        let response = {
            ids,
            state: states
        };
        updateState(response).then(res => {
            megSuc('success');
            onReset();
            state.multiple = [];
            state.wccTable.setRowClass();
        }).catch(() => {
        });
    };
    const onSearch = () => {
        pageChange({page: 1})
    };
    const onReset = () => {
        handleForm(state.columnData);
        onSearch();
    };
    const pageChange = ({page, pageSize}) => {
        state.form.page = page || state.form.page;
        state.form.page_size = pageSize || state.form.page_size;
        getData();
    };
    const handleForm = (list) => {
        list.map(a => {
            if (a.reader) {
                root.$set(state.form, a.reader, '');
            }
        });
    };
    const handleRow = (list) => {
        state.multiple = list;
    };

    onMounted(() => {

    });
    return {
        ...toRefs(state),
        onReset,
        pageChange,
        onSearch,
        handleState,
        handleRow,
        getData,
        getMeta,
    }
}

//导出excel
export function useExcel() {
    const onExport = ({data = [],tHeader,tProp,handleData, name = 'excel-list', width = 'auto',}) => {
        import('@/utils/Export2Excel').then(excel => {
            // const tHeader = Object.keys(data[0]);
            const filterVal = tProp;
            const list = formatJson(filterVal, data);
            excel.export_json_to_excel({
                header: tHeader || tProp,
                data: handleData?handleData(filterVal,data):list,
                filename: name+parseTime(new Date),
                autoWidth: width,
                bookType: 'xlsx'
            })
        })
    };
    const formatJson = (filterVal, jsonData) => {
        return jsonData.map(v => filterVal.map(j => {
            if (j === 'timestamp') {
                return parseTime(v[j])
            } else {
                return v[j]
            }
        }))
    };
    return {
        onExport,
    }
}


//删除TAB跳转
export function useRoute(ctx) {
    const {root} = ctx;
    const handleRoute = ({type, id, close, open, data}) => {
        root.$store.dispatch('delVisitedViews', {name: close}).then(() => {
            setTimeout(() => {
                root.$router.push({
                    name: open,
                    query: {type, id, data:JSON.stringify(data)}
                })
            }, 1)
        })
    };
    return {
        handleRoute
    }
}
