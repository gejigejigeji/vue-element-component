<template>
    <MyContainer>
        <MyTitle>
            <span @click="handleTab(index)"
                  v-for="(item,index) in tab"
                  :key="item"
                  :class="[index==active?'gcStandarTabActive':'','gcStandarTab']">{{item}}</span>
        </MyTitle>

        <hold v-if="active==0" @createView="handleCreateView"></hold>
        <release v-if="active==1" @createView="handleCreateView"></release>
        <createView ref="createView"></createView>

    </MyContainer>
</template>

<script>
    import { reactive, toRefs, ref} from "@vue/composition-api";
    import {useTab} from "@/views/fn_api/list.js";

    import release from "./components/release/index";
    import hold from "./components/hold/index";
    import createView from '@/views/holdRelease/components/createView.vue'


    export default {
        name: "holdRelease",
        components: {release,hold,createView},
        props:[],
        setup(props,ctx) {
            const {handleTab,active} = useTab();
            const state = reactive({
                tab: ['Hold', 'Release'],
                createView: ref(null),
            });

            const handleCreateView = ({list,type}) => {
                state.createView.getViewList({list,type});

            };

            return {
                ...toRefs(state),
                handleTab,
                active,
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
