<template>
    <div class="container">
        <div class="flowControl">
            <div class="control-group control-width-color">
                <p class="control-title">color</p>
                <div class="control-content">
                    <div class="control-items">
                        <el-color-picker v-model="color" show-alpha></el-color-picker>
                    </div>
                </div>
            </div>
            <div class="control-group">
                <p class="control-title">process</p>
                <div class="control-content">
                    <el-checkbox-group v-model="checkList"@change="handleCheck">
                        <div class="control-items">
                            <el-checkbox label="FAB">FAB</el-checkbox>
                        </div>
                        <div class="control-items">
                            <el-checkbox  label="CIP">CIP</el-checkbox>
                        </div>
                        <div class="control-items">
                            <el-checkbox  label="CPS">CPS</el-checkbox>
                        </div>
                        <div class="control-items">
                            <el-checkbox  label="FG">FG</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <svg id="svgPanZoomEl" ref="svgPanZoomEl">
            <g class="paths">
                <defs>
                    <marker id='markerArrow' markerWidth='12' markerHeight='12'  refX='2' refY='4' orient='auto'>
                        <polygon points="0,8 3,6 0,4 " style="fill:none;stroke:#261B1E;stroke-width:2.2;transform: scale(.7,.7);stroke-dasharray:none" />
                    </marker>
                </defs>
                <path v-for="(line,key,lIndex) in relations"
                      class="paths"
                      marker-end='url(#markerArrow)'
                      @click="removePath(key)"
                      :stroke="color"
                      :key="lIndex+key" :d="`M ${line.startX} ${line.startY} l ${line.endX-line.startX} ${line.endY-line.startY}`"
                />
                <path v-if="todoShow"
                      class="paths"
                      marker-end='url(#markerArrow)'
                      :stroke="color"
                      :d="`M ${todoLine.startX} ${todoLine.startY} l ${x-todoLine.startX} ${y-todoLine.startY}`"/>
            </g>
            <foreignObject height="3000px" width="3000px" class="foreignObject">
                <body class="foreignObjectBody" @mousemove.self="svgMouseMove" :style="{pointerEvents:eventFlag?'none':'auto'}" @click.self="cancleDrag">
                <vdr
                        class="vdr-item"
                        :ref="item.i"
                        v-for="(item,index) in nodes"
                        :key="index"
                        :w="item.w"
                        :h="item.h"
                        :x="item.x"
                        :y="item.y"
                        :debug="item.debug"
                        :min-width="item.minWidth"
                        :min-height="item.minHeight"
                        :isConflictCheck="item.isConflictCheck"
                        :snap="item.snap"
                        @deactivated="onDeactivated(item)"
                        @activated="onActivated(item)"
                        @refLineParams="getRefLineParams"
                        @dragStart="ondragStart(item.i)"
                        @dragging="ondragMove(item.i)"
                        @dragstop="ondragEnd"
                        @resizing="onResizing"
                        :handles="['tl','tr','br','bl','bm','tm']"
                        :snapTolerance="20">
                    <div class="vdr-container" :style="{background:item.bgColor}">
                        <h2>{{item.processType}}</h2>
                        <h2 v-show="index==0">{{item.name}}</h2>
                        <div v-if="index!=0">
                            <i class="el-icon-circle-plus addSell"></i>
                        </div>
                        <div class="operatorBtnGroup">
                            <el-button plain @click="handleDelete(item.i)" v-show="index!=0">delete</el-button>
                            <el-popover
                                    placement="bottom"
                                    title="Please select process line"
                                    width="200"
                                    trigger="click">
                                <el-button  plain type="primary" slot="reference" class="flow-create-button">create</el-button>
                                <div  class="addOptionPop">
                                    <el-radio-group v-model="radio" size="small">
                                        <el-radio label="FAB" border class="isFirstRadioPop">FAB</el-radio>
                                        <el-radio label="CIP" border>CIP</el-radio>
                                        <el-radio label="CPS" border>CPS</el-radio>
                                        <el-radio label="FG" border>FG</el-radio>
                                    </el-radio-group>
                                    <div class="process-button-confirm">
                                        <el-button size="mini">取消</el-button>
                                        <el-button type="primary" size="mini" @click="createItem(item.i,radio)">确认</el-button>
                                    </div>
                                </div>
                            </el-popover>
                        </div>
                        <i class="item-point item-point-right el-icon-circle-plus" v-if="item.iconState==true && index!=0" @click="ondragStart(item.i,'add')"></i>
                        <i class="item-point item-point-left el-icon-circle-plus" v-show="item.iconState==true  && index!=0"  @click="ondragStart(item.i,'add')"></i>
                    </div>
                </vdr>
                <span class="ref-line v-line"
                      v-for="item in vLine"
                      v-show="item.display"
                      :style="{ left: item.position, top: item.origin, height: item.lineLength}"/>
                <span class="ref-line h-line"
                      v-for="item in hLine"
                      v-show="item.display"
                      :style="{ top: item.position, left: item.origin, width: item.lineLength}"/>
                </body>
            </foreignObject>
        </svg>

        <div class="selectProductLine">
            <el-select v-model="nodes[0].name" placeholder="请选择产品线">
                <el-option
                        label="GSBUQD1"
                        value="GSBUQD2">
                </el-option> <el-option
                    label="GSBUQD2"
                    value="GSBUQD3">
            </el-option> <el-option
                    label="GSBUQD4"
                    value="GSBUQD4">
            </el-option> <el-option
                    label="GSBUQD5"
                    value="GSBUQD5">
            </el-option> <el-option
                    label="GSBUQD6"
                    value="GSBUQD6">
            </el-option> <el-option
                    label="GSBUQD7"
                    value="GSBUQD7">
            </el-option>
            </el-select>
        </div>

    </div>
</template>

<script>
    import vdr from 'vue-draggable-resizable-gorkys'
    import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
    import {reactive, ref, toRefs, onMounted, computed} from '@vue/composition-api'
    import zoom from 'svg-pan-zoom'

    export default {
        name: 'flowDemo',
        props: {
            msg: String
        },
        components: {vdr},
        setup(props, ctx) {
            const {root} = ctx;
            let {
                loading
            } = root.$store.getters;
            loading.all=false
            const state = reactive({
                svgPanZoom: null,
                value:'rgba(19, 206, 102, 0.8)',
                checkList:[],
                radio:'',
                svgPanZoomEl: ref(null),
                //drag
                panEnabled: true,
                vLine: [],
                hLine: [],
                nodes: [
                    {
                        w: 200,
                        h: 200,
                        x: 1800,
                        y: 1900,
                        i: 'root',
                        processType:'ROOT',
                        parent: false,
                        debug: false,
                        parentRelate:[],
                        relate:[],
                        minWidth: 200,
                        minHeight: 200,
                        isConflictCheck: false,
                        snap: true,
                        iconState:false,    //控制添加删除ICON的显示隐藏
                        name:'(none)',
                        bgColor:'none',
                    },
                ],
                relations: {},
                flatNodes: [],
                x:0,
                y:0,
                todoLine:{},
                graph:{},
                todoShow:false,
                eventFlag:true,
                color:'rgba(19, 97, 206, 1)', //自定义颜色
            });
            const colors ={
                FAB:'#fe4365',
                CIP:'#fc9d9a',
                CPS:'#f9cdad',
                FG:'#83af9b',
            };
            //活动开关
            function disable() {
                state.svgPanZoom.disablePan();
                state.svgPanZoom.disableZoom();
            }

            function enable() {
                state.svgPanZoom.enablePan();
                state.svgPanZoom.enableZoom();
            }
            //生成ID
            function uid() {
                return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
            }
            //辅助线
            const getRefLineParams = (params) => {
                const {vLine, hLine} = params;
                state.vLine = vLine;
                state.hLine = hLine;
            };
            const onActivated = (i) => {
                i.iconState = true;
                disable()
            };
            const onDeactivated = (i) => {
                i.iconState = false;
                enable()
            };
            onMounted(() => {
                window.onload = function () {
                    computePosition('root', ctx.refs.root[0]);
                    let option = {
                        fit: true,
                        center: true,
                        contain: true,
                        controlIconsEnabled: true,
                        dblClickZoomEnabled:false,
                        preventMouseEventsDefault: true,
                        refreshRate: 'auto',
                        zoomScaleSensitivity: .3,
                        minZoom: 0.5,
                        maxZoom: 10
                    };
                    state.svgPanZoom = zoom(state.svgPanZoomEl, option)
                }
            });

            //计算上下左右初始化位置
            function computePosition(id,el) {
                let result;
                for (let i = 0; i < state.nodes.length; i++) {
                    if (state.nodes[i].i == id) {
                        let [x, y, h, w] = [el.left, el.top, el.height, el.width];
                        const position = {
                            top: {
                                x: x + w / 2,
                                y: y,
                            },
                            right: {
                                x: x + w,
                                y: y + h / 2,
                            },
                            bottom: {
                                x: x + w / 2,
                                y: y + h,
                            },
                            left: {
                                x: x,
                                y: y + h / 2,
                            },
                            cent: {
                                x:x + w / 2,
                                y:y + h / 2
                            },
                            size:{
                                w,h,x,y
                            }
                        };
                        state.nodes[i].position = position;
                        result = position;
                        break;
                    }
                }
                return result
            }
            //根据ID查找node
            function queryId(id) {
                let row;
                for (let i = 0; i < state.nodes.length; i++) {
                    if (state.nodes[i].i == id) {
                        row = state.nodes[i];
                        break;
                    }
                }
                return row;
            }
            let step = true;
            let stepId1 = '', stepId2 = '';
            const ondragStart = (i,type) => {
                let e = e || event;
                e.stopPropagation();
                e.preventDefault();
                let curEl = ctx.refs[i][0];
                computePosition(i, curEl);
                state.nodes.map(node => {
                    node.iconState = false;
                    if (node.i == i) {
                        node.iconState=true
                    }
                });
                if (type == 'add') {
                    state.nodes.map(node => {
                        node.iconState = true;
                        if (node.i == i) {
                            node.iconState=false
                        }
                    });
                    let position = queryId(i).position;
                    if (step) {
                        step = false;
                        stepId1 = i;
                        state.todoShow = true;
                        state.todoLine = {
                            startX:position.cent.x,
                            startY:position.cent.y,
                            difW:position.size.w,
                            difH:position.size.h,
                            difX:position.size.x,
                            difY:position.size.y,
                            endX: position.left.x,
                            endY: position.left.y
                        };

                        state.eventFlag = false;
                        console.log(1)
                    }else{
                        state.eventFlag = true;
                        let parentNode = queryId(stepId1);
                        let node = queryId(i);
                        let position =node.position;
                        stepId2 = i;
                        step = true;
                        state.todoShow = false;
                        let isNext = false;
                        state.nodes.map(node => {
                            node.iconState = false;
                            if (node.i == i) {
                                node.iconState=true
                            }
                        });
                        node.relate.map(line => {
                            if (line == `${stepId1}-${stepId2}`) {
                                isNext=true
                            }
                        });
                        parentNode.relate.map(line => {
                            if (line == `${stepId1}-${stepId2}`) {
                                isNext=true
                            }
                        });
                        if(isNext){
                            console.log('存在');
                            return
                        }
                        parentNode.relate.push(`${stepId1}-${stepId2}`);
                        node.parentRelate.push(`${stepId1}-${stepId2}`);
                        root.$set(state.relations, `${stepId1}-${stepId2}`, {
                            startX: state.todoLine.startX,
                            startY: state.todoLine.startY,
                            difW:position.size.w,
                            difH:position.size.h,
                            difX:position.size.x,
                            difY:position.size.y,
                            endX: position.left.x,
                            endY: position.left.y
                        });
                        if (state.graph[stepId1]) {
                            state.graph[stepId1].push(`${stepId1}-${stepId2}`);
                        }else{
                            state.graph[stepId1]=[`${stepId1}-${stepId2}`];
                        }
                        console.log(2)
                    }
                }
            };
            const ondragMove = (id) => {
                let e = e || event;
                e.stopPropagation();
                let cur = ctx.refs[id][0];
                let row = queryId(id);
                let pos = computePosition(id, cur);
                // row.x=pos.left.x
                // row.y=pos.left.y
                row.x = cur.left;
                row.y = cur.top;

                for (let i = 0; i < row.parentRelate.length; i++) {
                    let key = row.parentRelate[i];
                    state.relations[key].endX = pos.left.x;
                    state.relations[key].endY = pos.left.y;
                }
                for (let i = 0; i < row.relate.length; i++) {
                    let key = row.relate[i];
                    state.relations[key].startX = pos.cent.x;
                    state.relations[key].startY = pos.cent.y;
                }
            };
            const ondragEnd = ({x, y, el}) => {
                // console.log(x,y,el)

            };
            const onResizing = (l, t, w, h) => {
                console.log(l, t, w, h)
            };
            const createItem = (itemKey,radio) => {
                let guid = uid();
                let relateKey = `${itemKey}-${guid}`;
                let curNode = queryId(itemKey);
                let childItemPositionX = curNode.position.right.x + 200;
                let childItemPositionY = curNode.position.top.y;
                let color = 'none';
                if (state.checkList.indexOf(radio) > -1) {
                    color=colors[radio]?colors[radio]:'none'
                }

                state.nodes.push({
                    w: 200,
                    h: 200,
                    i:guid ,
                    x: childItemPositionX,
                    y: childItemPositionY,
                    parentRelate: [],
                    relate: [],
                    parent: false,
                    debug: false,
                    minWidth: 200,
                    minHeight: 200,
                    bgColor:color,
                    isConflictCheck: false,
                    snap: true,
                    iconState:false,
                    processType:radio,
                });
                root.$nextTick(() => {
                    let curEl = ctx.refs[guid][0];
                    //给新元素计算position
                    computePosition(guid, curEl);
                    //分别获取新添加元素node 和 当前元素node
                    let newNode = queryId(guid);
                    //设置他们的子与父线条关系
                    curNode.relate.push(relateKey);
                    newNode.parentRelate.push(relateKey);
                    let curPosition = curNode.position;
                    let newPosition = newNode.position;
                    //添加线
                    root.$set(state.relations, relateKey, {
                        startX: curPosition.cent.x,
                        startY: curPosition.cent.y,
                        endX: newPosition.left.x,
                        endY: newPosition.left.y
                    });
                    if (!state.graph[itemKey]) {
                        state.graph[itemKey] = [guid];
                    }else{
                        state.graph[itemKey].push(guid);
                    }
                });


            };


            let graphRul = [];
            function handleGraph(id) {
                let arr = [];

                if (state.graph[id]) {
                    state.graph[id].map(a => {
                        arr.push(a);
                        graphRul.push(a);
                    });
                }
                root.$delete(state.graph, id);
                if (arr.length > 0) {
                    arr.map(a => {
                        handleGraph(a)
                    });
                }
                return [...new Set([...graphRul])]
            }

            const handleDelete = (id) => {
                let lines = [],newNodes,oldNodes=[];
                graphRul = [];
                let saveIds = [...handleGraph(id),id];
                newNodes=state.nodes.filter((item,index) => {
                    if (saveIds.indexOf(item.i) < 0) {
                        return true
                    }else{
                        lines = [...new Set([...lines, ...item.relate, ...item.parentRelate])];
                    }
                });
                lines.map(key => {
                    newNodes.map(node => {
                        node.relate.map((line, index) => {
                            if (line == key) {
                                node.relate.splice(index,1)
                            }
                        });
                        node.parentRelate.map((line, index) => {
                            if (line == key) {
                                node.parentRelate.splice(index,1)
                            }
                        });
                    });
                    root.$delete(state.relations,key)
                });

                state.nodes = newNodes;
            };

            function svgMouseMove(e, b) {
                let [x, y] = [e.offsetX, e.offsetY];
                state.x = x;
                state.y = y;
                console.log(x,y)
            }
            function cancleDrag() {
                state.todoShow = false;
                state.eventFlag = true;
                step = true;
            }
            function handleCheck(val) {
                console.log(val)

                state.nodes.map(node => {
                    if (val.indexOf(node.processType) > -1) {
                        node.bgColor=colors[node.processType]
                    }else{
                        node.bgColor='none'
                    }
                });

            }

            const removePath = (key) => {
                root.$delete(state.relations, key);
                state.nodes.map(a => {
                    a.relate.map((b, i) => {
                        if (b == key) {
                            a.relate.splice(i,1)
                        }
                    });
                    a.parentRelate.map((b, i) => {
                        if (b == key) {
                            a.parentRelate.splice(i,1)
                        }
                    });
                });
            };
            return {
                ...toRefs(state),
                onActivated,
                onDeactivated,
                disable,
                getRefLineParams,
                ondragStart,
                ondragMove,
                ondragEnd,
                createItem,
                svgMouseMove,
                onResizing,
                handleDelete,
                removePath,
                cancleDrag,
                handleCheck
            }

        }
    }
</script>
