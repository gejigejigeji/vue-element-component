<template>
    <div>
        <el-table border v-if="tableData.length>0" :data="tableData">
            <el-table-column
                    prop="source_node_name"
                    label="Device">
                <template slot-scope="scope">
                    <slot name="source_node_name">{{scope.row.source_node_name}}</slot>
                </template>
            </el-table-column>

            <el-table-column
                    prop="source_version_name"
                    label="Version">
                <template slot-scope="scope">
                    <slot name="source_version_name">{{scope.row.source_version_name}}</slot>
                </template>
            </el-table-column>

            <el-table-column
                    prop="assignable_mp_qty"
                    label="MP Qty">
                <template slot-scope="scope">
                    <slot name="assignable_mp_qty">{{scope.row.assignable_mp_qty}}</slot>
                </template>
            </el-table-column>

            <el-table-column
                    prop="assignable_eng_qty"
                    label="ENG Qty">
                <template slot-scope="scope">
                    <slot name="assignable_eng_qty">{{scope.row.assignable_eng_qty}}</slot>
                </template>
            </el-table-column>

            <el-table-column
                    prop="consignee_name"
                    label="Ship to">
                <template slot-scope="scope">
                    <slot name="consignee_name" :scope="{row:scope.row,index:scope.$index}"></slot>
                </template>
            </el-table-column>

            <el-table-column
                    prop="request"
                    label="Request">
                <template slot-scope="scope">
                    <slot name="request" :scope="{row:scope.row,index:scope.$index}"></slot>
                </template>
            </el-table-column>

            <el-table-column
                    prop="engRequest"
                    label="ENG Request">
                <template slot-scope="scope">
                    <slot name="engRequest" :scope="{row:scope.row,index:scope.$index}"></slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {reactive,toRefs} from '@vue/composition-api'
    export default {
        name: "shipToTable",
        props:['tableData'],
        setup(props, ctx) {
            const state = reactive({
                form: {}
            });
        }
    }
</script>

<style scoped>

</style>