<template>
    <MyContainer>
        <MyTitle>
            <span @click="handleTab(index)"
                  v-for="(item,index) in tab"
                  :key="item"
                  :class="[index==active?'gcStandarTabActive':'','gcStandarTab']">{{item}}</span>
        </MyTitle>

        <All v-if="active==0" @createView="handleCreateView" @getViewList="handleView"></All>
        <shipTo v-if="active==1" @getViewList="handleView"></shipTo>
        <dispatch v-if="active==2" @getViewList="handleView"></dispatch>
        <hold v-if="active==3" @createView="handleCreateView" @getViewList="handleView"></hold>
        <detail ref="detailView"></detail>
        <createView ref="createView"></createView>

    </MyContainer>
</template>

<script>
    import { reactive, toRefs, ref} from "@vue/composition-api";
    import {useTab} from "@/views/fn_api/list.js";

    import All from "./components/All/index";
    import dispatch from "./components/dispatch/index";
    import hold from "./components/hold/index";
    import shipTo from "./components/shipTo/index";

    import detail from '@/views/productionTracking/components/detail.vue'
    import createView from '@/views/productionTracking/components/createView.vue'

    export default {
        name: "productionTracking",
        components: {All,dispatch,hold,shipTo,detail,createView},
        props:[],
        setup(props,ctx) {
            const {handleTab,active} = useTab();
            const state = reactive({
                tab: ['ALL', 'ShipTo', 'Dispatch', 'Hold'],
                detailView: ref(null),
                createView: ref(null),
            });

            const handleView = ({row,path}) => {
                ctx.refs.detailView.getViewList({row,path});
            };

            const handleCreateView = ({list,type}) => {
                state.createView.getViewList({list,type});

            };

            return {
                ...toRefs(state),
                handleTab,
                active,
                handleView,
                handleCreateView

            }

        }
    }
</script>
<style scoped>
    .gcStandarTab {
        margin-right: 10px;
        cursor: pointer;
    }

    .gcStandarTabActive {
        border-bottom: 2px solid #2F7CF6;
        color: #2F7CF6;
        display: inline-block;
        height: 42px;
    }
</style>
