<template>
    <div>
        <el-form :model="viewForm" ref="viewForm" :rules="viewRules" label-width="0">
            <div :class="['handle_item',index!=0?'mt-20':'']" v-for="(item,index) in shipMains">
                <h1 class="item_name item_buyer">{{item.consigner_name}}</h1>
                <el-row :gutter="16">
                    <el-col :span="24" class="mb-15">
                        <shipToTable :tableData="item.ship_infos">
                            <template v-slot:consignee_name="data">
                              <span>
                                {{data.scope.row.consignee_name}}
                                <i class="el-icon-question"></i>
                              </span>
                            </template>
                            <template v-slot:request="data">
                              <span>
                                <el-form-item class="formItemW">
                                  <el-input v-model="data.scope.row.request"></el-input>
                                  <i class="el-icon-info"></i>
                                </el-form-item>
                              </span>
                            </template>

                            <template v-slot:engRequest="data">
                              <span>
                                 <el-form-item>
                                  <el-input v-model="data.scope.row.engRequest"></el-input>
                                </el-form-item>
                              </span>
                            </template>
                        </shipToTable>
                    </el-col>
                </el-row>
            </div>
        </el-form>


    </div>
</template>

<script>
    import {reactive, toRefs} from "@vue/composition-api";
    import shipToTable from "../components/table";

    export default {
        name: "shipToStep1",
        components: {shipToTable},
        props: ['shipMains'],
        setup(props, ctx) {
            const requestVali = (rule,value,callback) => {

                callback('asd')

            };
            const state = reactive({
                viewForm: {
                    value: ''
                },
                viewRules: {
                    request:[
                        {required:true,validator:(rule,value,callback)=>{requestVali(rule,value,callback)},trigger:'change'}
                    ]
                },
            });


            return {
                ...toRefs(state),

            }
        }
    }
</script>

<style scoped>

</style>