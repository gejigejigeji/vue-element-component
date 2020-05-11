<template>
    <div class="handle">
        <div class="handle_top">
            <span class="text">{{ type==='add'?'Create':type==='edit'?'Edit':type==='copy'?'Copy':'See' }} Vendor</span>
        </div>
        <div class="handle_body handle_body_plus">
            <el-form :model="form" :rules="rules" ref="formField" label-width="110px" label-position="left">
                <div class="handle_item">

                    <el-row :gutter="13" class="mt-10">
                        <el-col :span="10">
                            <el-form-item label="Vendor:">
                                <p>{{indexData.name}}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="13">
                        <el-col :span="10">
                            <el-form-item label="Process:" prop="processes">
                                <el-select v-model="form.processes" clearable multiple placeholder="Select">
                                    <el-option
                                            v-for="item in processList"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="13" v-for="(item,index) in form.new_contacts">
                        <el-col :span="10">
                            <el-form-item label="Email:" :prop="`new_contacts.${index}.todo`" :rules="rules.todo">
                                <el-select v-model="item.todo" placeholder="Select">
                                    <el-option
                                            label="work order"
                                            :value="1">
                                    </el-option>
                                  <el-option
                                          label="shipping list"
                                          :value="2">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label-width="0" :prop="`new_contacts.${index}.email`" :rules="rules.email">
                                <el-input v-model="item.email" placeholder="input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col align="center">
                            <i class="el-icon-circle-plus" @click="handleAdd"></i>
                        </el-col>
                    </el-row>

                </div>


            </el-form>

        </div>
        <div class="handle_footer">
            <el-button type="info" plain @click="handleClose()">Cancel</el-button>
            <el-button type="info" @click="handleSave()">Submit</el-button>
        </div>
    </div>
</template>

<script>
    import {megSuc, megError} from '@/utils/notice'
    import {useRoute} from '@/views/fn_api/list.js'
    import {getList} from '@/api/process/index.js'
    import {updateVendor} from '@/api/Vendor/index.js'
    import {valiEmail} from '@/views/fn_api/validate.js'
    import {reactive, toRefs, watch, onMounted, computed, ref} from "@vue/composition-api";

    export default {
        name: "handleVendor",
        computed: {},
        props: [],
        setup(props, ctx) {
            const {root} = ctx;
            let {
                loading
            } = root.$store.getters;
            const {handleRoute} = useRoute(ctx);


            const state = reactive({
                form: {
                    processes: [],
                    new_contacts: [
                        {email: "", todo: ''},
                    ]
                },
                rules: {
                    processes: [{required: true, message: 'Please input', trigger: 'change'}],
                    todo: [{required: true, message: 'Please input', trigger: 'change'}],
                    email: [
                        {validator: (rule, value, callback) => valiEmail(rule, value, callback), trigger: 'change'},
                    ],
                },
                processList: [],
                formField: ref(null)
            });
            const isView = computed(() => ['edit'].indexOf(state.type) > -1);
            [state.type, state.indexData] = [root.$route.query.type, JSON.parse(root.$route.query.data)];

            state.form.new_contacts = state.indexData.contacts.edit;
            state.form.processes = state.indexData.processes.map(item => {
                return item.id;
            });
            loading.all = true;
            getList().then(res => {
              state.processList = res.data.list;
              loading.all = false;
            }).catch(() => {
              loading.all = false;
            });
            const handleAdd = () => {
                state.form.new_contacts.push({email: '', todo: ''});
            };

            const handleClose = () => {
                handleRoute({ type: 'reset',close: 'handleVendor', open: 'baseVendor'});
            };
            const handleSave = () => {
                state.formField.validate(vali => {
                    if (vali) {
                      loading.all = true;
                      let [response,id] = [JSON.parse(JSON.stringify(state.form)),state.indexData.id];
                      response.processes=state.processList.filter(a => {
                        if (response.processes.indexOf(a.id) > -1) {
                          return true
                        }
                      });
                      updateVendor(response,id).then(res => {
                        handleRoute({type: 'reset', close: 'handleVendor', open: 'baseVendor'});
                        loading.all = false;
                      }).catch(() => {
                        loading.all = false;
                      });
                    }
                });
            };
            onMounted(() => {
            });

            return {
                ...toRefs(state),
                isView,
                handleRoute,
                handleAdd,
                handleSave,
                handleClose
            }

        }
    }
</script>
