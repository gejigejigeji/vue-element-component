<template>
    <MyContainer>
        <MyTitle>
            <span @click="handleTab(index)"
                  v-for="(item,index) in tab"
                  :key="item"
                  :class="[index==active?'gcStandarTabActive':'','gcStandarTab']">{{item}}</span>
        </MyTitle>

        <wip v-if="active==0"></wip>
        <packingList v-if="active==1"></packingList>
    </MyContainer>
</template>

<script>
    import { reactive, toRefs, watch ,onMounted} from "@vue/composition-api";
    import {useList, useExcel, useRoute,useTab} from "@/views/fn_api/list.js";
    import wip from "./components/wip/index";
    import packingList from "./components/packingList/index";
    export default {
        name: "trackingProcessingLog",
        components: {wip,packingList},
        props:[],
        setup(props,ctx) {
            const {handleTab,active} = useTab();
            const state = reactive({
                tab: ['Wip', 'PackingList']
            });
            return {
                ...toRefs(state),
                handleTab,
                active,
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
