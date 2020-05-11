<template>
  <div class="home"  >
    <el-form ref="form" :model="form" label-width="0" :rules="rules" style="width: 100%;height: 100%">

      <GridLayout
        :style="{width:tabs.length*400+'px'}"
        class="ctn"
        :col-num="tabs.length"
        :row-height="240"
        :maxRows="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :margin="[80, 50]"
        :use-css-transforms="true"
        :autoSize="false"
        :verticalCompact="false"
        @layout-created="layoutCreatedEvent"
        :useCssTransforms="false"
        :layout="nodes">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg-container"  class="svg-container" @click.self="cancleEvent" @mousemove="mouseMove">
          <g @click="removeLine(key)" v-for="(item,key,index) in relations" class="svf-g">
            <path
              v-if="item.bezier.startX"
              :key="index"
              :d="`M${item.bezier.startX} ${item.bezier.startY},C${item.bezier.startX+100} ${item.bezier.startY-20} ${item.bezier.endX-90} ${item.bezier.endY+20} ${item.bezier.endX} ${item.bezier.endY}`"
              fill="none"
              class="paths"/>
            <image v-if="item.bezier.endY" xlink:href="@/assets/right.png" width="30" height="30" :x="item.bezier.endX-10" :y="item.bezier.endY-15"></image>
          </g>
          <g v-for="(item,index) in todoLine">
            <path
              :key="index"
              :d="`M${item.bezier.startX} ${item.bezier.startY},C${item.bezier.startX+200} ${item.bezier.startY-20} ${item.bezier.endX-150} ${item.bezier.endY+20} ${item.bezier.endX} ${item.bezier.endY}`"
              fill="none"
              class="paths"/>
            <image v-if="item.bezier.endY" xlink:href="@/assets/right.png" width="30" height="30" :x="item.bezier.endX-10" :y="item.bezier.endY-15" @click.self="cancleEvent"></image>

          </g>

        </svg>
        <div class="tabs">
          <div class="tabs-item"
               v-for="(item,index) in tabs">
            <h6>{{item.name}}</h6>
          </div>
        </div>
        <grid-item v-for="(item,index) in form.nodes"
                   dragIgnoreFrom="i,a,button,.firstGroup"
                   ref="gridItem"
                   @move.self="moveEvent(item,index,$event)"
                   @moved.self="moveEnd(item,index,item.node_suppliers)"
                   class="item"
                   :isResizable="item.isResizable"
                   :max-w="1"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i">
          <div ref="itemSlot"
               :data-x="item.x"
               :data-y="item.y"
               :data-i="item.i"
               :class="['grid-item-content',item.active?'grid-item-active':'',index==0?'firstGroup':'']"
               @click.self.stop.prevent="switchActive(index)">
            <i v-if="index==0">
              <el-select clearable v-model="item.node_suppliers[0].supplier"  placeholder="Select Specifications..." class="firstGroup" @change="rootChange">
                <el-option
                  v-for="item in rootOptions"
                  :key="item.name+item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </i>

            <i v-else>

              <el-form-item >
                <el-input v-model="item.name" placeholder="请输入型号">
                  <template slot="prepend">{{rootName}}-</template>
                </el-input>
              </el-form-item>
              <div class="flow-add-group" @click.self="switchActive(index)">
                <div class="flow-add-group-item" v-for="(group,gIndex) in item.node_suppliers">
                  <div class="flow-form-item-left">
                    <el-form-item >
                      <el-select v-model="group.supplier" placeholder="请选择供应商">
                        <el-option
                          v-for="opt in handleOption(item.x,item)"
                          :key="opt.id+guid()"
                          :label="opt.name" :value="opt.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item >
                      <!--                                    <el-input v-model="group.version" @blur="handleVersion($event.target.value,item,gIndex)" placeholder="请输入二级供应商"></el-input>-->
                      <el-input v-model="group.version" placeholder="请输入二级代码用','分割"></el-input>
                    </el-form-item>
                  </div>
                  <div class="flow-form-item-right">
                    <i class="el-icon-error" @click="removeFormItem(item.node_suppliers,gIndex)"></i>
                  </div>
                </div>
              </div>

            </i>
            <transition name="el-zoom-in-center">
                    <span class=" transition-box" v-show="!item.active && item.x!=tabs.length-1">
                           <i class="el-icon-circle-plus-outline el-icon-circle-plus operationIcon" :class="[index==0?'isFirstPlus':'']"  @click.stop="addItem(index)"></i>
                    </span>
            </transition>
            <transition name="el-zoom-in-center">
                    <span class=" transition-box" v-show="item.active" >
                          <i class="el-icon-remove icon-remove operationIcon"   :class="[index==0?'isFirstPlus':'']" @click.stop="removeItem(item.relate,item.parentRelate,item.i,item.parentId)"></i>
                    </span>
            </transition>
            <template v-if="index!=0 ">
              <!--                    :class="[item.active?'active-icon':'']"-->
              <i class="el-icon-s-help icon-up position-icon" v-show="item.active|| connectActive" @click="mouseDrag(item,'up')"></i>
              <i class="el-icon-s-help icon-down position-icon" v-show="item.active|| connectActive" @click="mouseDrag(item,'down')"></i>
              <i class="el-icon-s-help icon-left position-icon"  v-show="item.active || connectActive " @click="mouseDrag(item,'left')"></i>
            </template>
            <i v-if="index!=0 " class="el-icon-s-help icon-right position-icon"  @click="mouseDrag(item,'right')"></i>
            <i v-if="index!=0 " class="el-icon-circle-plus-outline add-group"  @click="addGroup(item)"></i>


          </div>
        </grid-item>
      </GridLayout>
      <el-row class="flow-submit-btn-group dialog-footer">
        <el-col>
          <el-button @click="cancle">Cancle</el-button>
          <el-button @click="onSubmit" type="primary">Save</el-button>
        </el-col>
      </el-row>
    </el-form>


  </div>
</template>

<script>
  import { megSuc, megError } from '@/utils/notice'

  import {GridLayout} from 'vue-grid-layout'
  import {
    getFlowOptions,
    getoptions,
    createFlow,
    getFlow,
    getFlowProcess,
  } from '@/api/products/index.js'
  import axios from 'axios'
  import {mapGetters} from "vuex";
  export default {
    name: 'createFlow',
    computed: {
      nodes() {
        return this.form.nodes
      },
      ...mapGetters([
        'pagination',
        'permission',
        'loading'
      ]),

    },
    components:{GridLayout},
    data() {
      return {
        form: {
          nodes: [
            {
              "x": 0,
              "y": 2,
              "w": 1,
              "h": .3,
              "i": 'root',
              isFirst:true,
              relate: [],
              static: true,
              active:false,
              type:2,
              isDraggable:false,
              isResizable:false,
              name:'root',
              node_suppliers: [
                {
                  supplier:'',
                  version: '',
                  handleVersion:''
                }
              ]
            },
          ],
        },
        rules: {
          ['node_suppliers[0].node_suppliers']: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],

        },
        relations: { },
        tabs:['','FAB','OCF','CSP','CP','FT'],
        value: '',
        todoLine:[],
        mouse:{X:null,Y:null},
        connectFlag:false,        //控制开始连接点和结束连接点
        connectActive:false,      //控制左方连接点显示隐藏
        options: {
          FAB:[],
          OCF:[],
          CSP:[],
          CP:[],
          FT:[]
        },
        rootOptions: [],
        rootName:''

      };
    },
    watch: {

    },
    mounted() {

      const [type, id] = [this.$route.query.type, this.$route.query.id];
      if (id) {
        this.getFlow(id);
      }
      this.getFlowProcess();
      this.getFlowOptions();
      this.getRootOptions();

    },
    methods: {
      cancle() {
        this.handlePage({});
      },
      onSubmit() {
        let response = JSON.parse(JSON.stringify({...this.form, relations:this.relations}));
        let id = response.nodes[0].node_suppliers[0].supplier;
        if (id == '') {
          megError('根节点不能为空');
          return
        }
        response.nodes.map(a => {
          a.node_suppliers.map((b, i) => {
            if (b != '') {
              b.version = this.handleVersion(b.version);
            }
          });
        });
        this.loading.all = true;
        createFlow(response, id).then(res => {
          if (res.code == 200) {
            megSuc('success');
            this.handlePage({});
          }
          this.loading.all=false
        }).catch(()=>{
          this.loading.all=false
        });

      },
      handlePage({type, id, name}){
        this.$store.dispatch('delVisitedViews', {name: name||'handleFlow'}).then(() => {
          setTimeout(()=> {
            this.$router.push({
              name: name||'baseProduct',
              query: { type, id }
            })
          }, 1)
        })
      },
      rootChange(val) {
        this.rootOptions.map(a=>{
          if (a.id == val) {
            this.rootName = a.name;
          }
        })

      },
      handleOption(v,item) {
        let options = this.options;
        let tab = this.tabs;
        item.edge = tab[v].id;
        return options[tab[v].name]
      },
      getRootOptions() {
        getoptions().then(res => {
          this.rootOptions=res.data.list;
        }).catch(() => {
        });
      },
      getFlowProcess() {
        getFlowProcess().then(res => {
          this.tabs = ['', ...res.data.list];
        }).catch(() => {
        });
      },
      getFlow(id) {
        this.loading.all=true
        getFlow(id).then(res => {
          let rul = res.data;
          rul.nodes.map(a => {
            a.node_suppliers.map(b => {
              b.version = b.version.join(',');
            });
          });
          if (rul.nodes.length >= 1) {
            this.form.nodes = rul.nodes;
            this.relations=rul.relations
          }
          this.loading.all=false
        }).catch((err) => {
          this.loading.all=false
        });
      },
      getFlowOptions() {
        getFlowOptions().then(res => {
          this.options = res.data;
        }).catch(() => {
        });
      },
      handleVersion(value,item,gIndex) {
        let handleValue = value.replace(/，/ig,',');
        handleValue = handleValue.split(',');
        handleValue=handleValue.filter(a => {
          return a!='' && a!=','
        });
        return handleValue
      },
      addGroup(row) {
        row.node_suppliers.push({
          value: ''
        });
      },
      removeFormItem(node_suppliers,gIndex) {
        node_suppliers.splice(gIndex,1)
      },
      removeLine(key) {
        let k = key.split('-');
        this.$delete(this.relations,key);
        this.nodes.map(a => {
          a.relate.map((b, index) => {
            if (b == key) {
              a.relate.splice(index, 1)
            }
          });
        });

      },
      mouseDrag(row,direction) {
        let pos = row.position;
        let id = row.i;
        let flag = this.connectFlag;
        let handlePos = {
          'up': pos.up,
          'right': pos.right,
          'down': pos.bottom,
          'left': pos.left,
        };
        let start = handlePos[direction];
        let end = this.mouse;
        let line = {
          relate: [id],
          bezier: {
            startX: start.X,
            startY: start.Y,
            curvX: (start.X + end.X) / 2,
            curvY: (start.Y + end.Y) / 2,
            endX: end.X,
            endY: end.Y
          }
        };
        if (this.todoLine.length == 1 && !flag) {

          flag = true;
          let path=this.todoLine.shift();
          let rul = null,checkRelate=[...this.searchId(path.relate[0]).relate],checkIds=[];
          for (let j = 0; j < 10; j++) {
            let result= this.queryChild(checkRelate);
            rul=result
            checkRelate = result.arr;
            checkIds = result.ids;

          }
          let previou = this.searchId(path.relate[0]);
          let current = this.searchId(id);

          let lineRelate = `${path.relate[0]}-${id}`;
          let lineRelate2 = `${id}-${path.relate[0]}`;
          let cancel = false;
          this.nodes.map(a => {
            if (a.relate.indexOf(lineRelate)>=0 || a.relate.indexOf(lineRelate2)>=0) {
              cancel = true;
            }
          });
          if ((previou.i==current.i || current.x <= previou.x) || cancel===true) {
            console.log('闭环');
            this.connectActive = false;
            return;
          }



          path.relate.push(id);
          let relate = path.relate;


          this.nodes.map(a => {
            if (relate.indexOf(a.i)>=0) {
              a.relate.push(`${relate[0]}-${relate[1]}`);

            }
            if(relate[1]==a.i) {
              a.parentRelate=`${relate[0]}-${relate[1]}`;

            }
          });



          this.$set(this.relations,`${path.relate[0]}-${path.relate[1]}`, path);
          this.connectActive=false
        }else{
          this.connectActive=true
          flag = false;
          this.todoLine.splice(0, 1, line);
        }

      },
      mouseMove(e) {
        let [X, Y] = [e.offsetX, e.offsetY];
        if (this.todoLine[0]) {
          this.todoLine[0].bezier.curX=X;
          this.todoLine[0].bezier.curY=Y
          this.todoLine[0].bezier.endX=X;
          this.todoLine[0].bezier.endY=Y
        }
        this.mouse = {
          X,Y
        };
      },
      switchActive(index) {
        this.nodes[index].active = !this.nodes[index].active;
      },
      handlePosition(el) {

        let leftX = el.offsetLeft;      //左坐标
        let leftY =  el.offsetTop + (el.offsetHeight/2) ;  //左坐标

        let rightX = el.offsetLeft + el.offsetWidth;      //右坐标
        let rightY = el.offsetTop + (el.offsetHeight/2);  //右坐标

        let upX = leftX+(el.offsetWidth/2);                //上坐标
        let upY = el.offsetTop;                               //上坐标

        let bottomX = leftX+(el.offsetWidth/2);                //下坐标
        let bottomY = el.offsetTop + el.offsetHeight;         //下坐标
        return {
          left:{X:leftX,Y:leftY},
          right:{X:rightX,Y:rightY},
          curv: {X:(leftX + rightX) / 2,Y:(leftY + rightY) / 2},
          up:{X:upX,Y:upY},
          bottom:{X:bottomX,Y:bottomY}
        };

      },
      removeItem(relate,parentRelate,index,parentId) {
        this.removeLine(parentRelate)

        let res = this.queryChild(relate,index);
        if (res.ids.length == 1 && res.arr.length == 0) {

          this.nodes.map((a,i)=>{
            if (a.i == res.ids[0]) {
              this.nodes.splice(i, 1);
              this.$delete(this.relations, parentRelate);
            }
            if (a.i == parentId) {
              a.relate.map((b,bIndex) => {
                if (b.indexOf(`${parentId}-${index}`) >= 0) {
                  a.relate.splice(bIndex,1)
                }
              });
            }
          })
        }else{

          let checkRelate = res.arr;
          let checkIds = res.ids;
          let newLayout = [];
          let rul = null;
          for (let j = 0; j < 5; j++) {
            if ( checkRelate.length > 0) {
              let result = this.queryChild(checkRelate, index);
              rul = result;
              checkRelate = result.arr;
              checkIds = result.ids;
            }

          }
          // console.log(rul)
          this.nodes.map((a, i) => {
            if (rul.ids.indexOf((a.i).toString()) < 0) {
              newLayout=[...newLayout,a]
            }
            if (a.i == parentId) {
              a.relate.map((b,bIndex) => {
                if (b.indexOf(`${parentId}-${index}`) >= 0) {
                  a.relate.splice(bIndex,1)
                }
              });
            }
          });

          Object.keys(this.relations).map(a => {
            if (rul.arr.indexOf(a) >= 0) {
              this.$delete(this.relations, a)
            }
          });
          this.$delete(this.relations, parentRelate);
          this.form.nodes = newLayout;
        }


      },
      queryChild(node,index) {
        let _this = this;
        let ids = [];
        let child = [];

        if (node.length != 0) {
          node.map(a => {
            ids = [...ids, ...a.split('-')]
          });
          ids = [...new Set([...ids])]
        }else if(index){
          ids=[index.toString()]
        }
        child = _this.nodes.filter(a => {
          return ids.indexOf(a.i.toString()) >= 0;
        });

        let arr = [], childIds = [];
        if (child.length != 0) {

          child.map(a => {
            if (a.relate.length != 0) {
              arr = [...arr, ...a.relate]
            }
          });
          arr.map(a => {
            childIds = [...childIds, ...a.split('-')]
          });
        }
        ids = [...new Set([...ids, ...childIds])];
        arr = [...new Set([...arr])];
        return {
          ids,
          arr
        }
      },

      addItem(curId) {
        let nodes = this.nodes;
        let id =this.guid();        //新添加元素的ID值

        let initX =nodes[curId].x+1;
        let initY = 0;
        nodes.map(a => {
          if (a.x == initX) {
            initY += 1;
          }
        });
        let parentId = nodes[curId].i;
        this.nodes.push({
          "x": initX,
          "y": initY,
          "w": 1,
          "h": 1,
          "i": id,
          type:2,
          name:'',
          node_suppliers: [
            {supplier:'',version:'',handleVersion:''}
          ],
          isResizable:true,
          direction:'left',
          parentId:parentId,
          parentRelate:`${parentId}-${id}`,
          relate:[`${parentId}-${id}`],
          static:false,
          active:false});
        this.nodes[curId].relate.push(`${parentId}-${id}`);
        //添加线图关系
        this.$set(this.relations, `${parentId}-${id}`, {
          relate: [parentId, id],
          bezier: {}
        });
        setTimeout(() => {
          //更新后重新计算所有子项当前的位置
          this.$refs.gridItem.map((item,index) => {
            let id = item.i;
            let nodes = this.$refs.gridItem[index].$el;
            this.searchId(id).position=this.handlePosition(nodes)
          });

          this.drawLine(`${parentId}-${id}`);  //绘制线
        },200);


      },
      guid() {
        return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
      },

      moveEvent(item,index,e) {
        let key = item.relate;
        let el = this.$refs.gridItem[index];
        let current = this.handlePosition(el.$el);
        //除当前元素其他元素不可拖动
        this.nodes.map(a => {
          a.static = true;
        });
        this.nodes[index].static = false;
        this.nodes[index].position = current;

        let currentDirection = 'left';//线条开始方位
        let nextDirection = 'bottom';  //线条结束方位

        for (let i = 0; i < key.length; i++) {
          let id = this.relations[key[i]].relate[0];
          let id2 = this.relations[key[i]].relate[1];
          let parentFlow = this.searchId(id);
          let childFlow = this.searchId(id2);
          let nextEl = childFlow
          if (el.x < nextEl.x&&el.y ==nextEl.y) { //和目标平行
            currentDirection = 'right';//线条开始方位
            nextDirection = 'left';     //线条结束方位

          }else if(el.x < nextEl.x&&el.y >nextEl.y){  //在目标下方
            currentDirection = 'up';
            nextDirection = 'left';
          }else if(el.x < nextEl.x&&el.y <nextEl.y){  //在目标上方
            currentDirection = 'bottom';
            nextDirection = 'left';
          }else if(el.x == nextEl.x&&el.y <nextEl.y){  //在目标正上方
            currentDirection = 'bottom';
            nextDirection = 'up';
          }else if(el.x == nextEl.x&&el.y >nextEl.y){  //在目标正下方
            currentDirection = 'up';
            nextDirection = 'bottom';
          }else if(el.x > nextEl.x&&el.y >nextEl.y){  //在目标右下方
            currentDirection = 'up';
            nextDirection = 'right';
          }else if(el.x > nextEl.x&&el.y ==nextEl.y){  //右侧和目标平行
            currentDirection = 'left';
            nextDirection = 'right';
          }else if(el.x > nextEl.x&&el.y <nextEl.y){  //在目标右上方
            currentDirection = 'bottom';
            nextDirection = 'right';
          }else if(el.x == nextEl.x&&el.y ==nextEl.y){  //在目标右上方
            currentDirection = 'right';
            nextDirection = 'left';

          }
          nextDirection='left'
          this.relations[key[i]].bezier.startX = parentFlow.position[currentDirection].X;
          this.relations[key[i]].bezier.startY = parentFlow.position[currentDirection].Y;
          this.relations[key[i]].bezier.endX = childFlow.position[nextDirection].X-10;
          this.relations[key[i]].bezier.endY = childFlow.position[nextDirection].Y;
        }

      },
      moveEnd(item,index,group) {
        let key = item.relate;

        group.map(a => {
          a.supplier = '';
        });
        this.switchActive(index);
        let el = this.$refs.gridItem[index];
        setTimeout(()=>{
          let current = this.handlePosition(el.$el);
          this.nodes[index].position = current;
          let currentDirection = 'up';//线条开始方位
          let nextDirection = 'left';  //线条结束方位

          for (let i = 0; i < key.length; i++) {
            let id = this.relations[key[i]].relate[0];
            let id2 = this.relations[key[i]].relate[1];
            let parentFlow = this.searchId(id);
            let childFlow = this.searchId(id2);
            let nextEl = this.searchId(key[i].split('-')[1]);
            if (el.x <= nextEl.x&&el.y ==nextEl.y) { //和目标平行
              currentDirection = 'right';//线条开始方位
              nextDirection = 'left';     //线条结束方位

            }else if(el.x < nextEl.x&&el.y >nextEl.y){  //在目标下方
              currentDirection = 'up';
              nextDirection = 'left';
            }else if(el.x < nextEl.x&&el.y <nextEl.y){  //在目标上方
              currentDirection = 'bottom';
              nextDirection = 'left';
            }else if(el.x == nextEl.x&&el.y <nextEl.y){  //在目标正上方
              currentDirection = 'bottom';
              nextDirection = 'up';
            }else if(el.x == nextEl.x&&el.y >nextEl.y){  //在目标正下方
              currentDirection = 'up';
              nextDirection = 'bottom';
            }else if(el.x > nextEl.x&&el.y >nextEl.y){  //在目标右下方
              currentDirection = 'up';
              nextDirection = 'right';
            }else if(el.x > nextEl.x&&el.y ==nextEl.y){  //右侧和目标平行
              currentDirection = 'left';
              nextDirection = 'right';
            }else if(el.x > nextEl.x&&el.y <nextEl.y){  //在目标右上方
              currentDirection = 'bottom';
              nextDirection = 'right';
            }
            nextDirection='left'

            this.relations[key[i]].bezier.startX = parentFlow.position[currentDirection].X;
            this.relations[key[i]].bezier.startY = parentFlow.position[currentDirection].Y;
            this.relations[key[i]].bezier.endX = childFlow.position[nextDirection].X-10;
            this.relations[key[i]].bezier.endY = childFlow.position[nextDirection].Y;
          }
        },150)
      },
      searchId(id) {
        let nodes = this.nodes;
        let row = nodes.filter(a => {
          return a.i == id;
        });
        return row[0];
      },
      drawLine(newId,) {
        let key=newId
        let relations = this.relations;
        // Object.keys(relations).map(key => {
        let startPos = this.searchId(relations[key].relate[0]).position;
        let endPos = this.searchId(relations[key].relate[1]).position;

        let cX,cY;
        if (!relations[key].bezier.curvX) {
          cX = (startPos.right.X + endPos.left.X) / 2;
          cY = (startPos.right.Y + endPos.left.Y) / 2;
        }else{
          cX = relations[key].bezier.curvX;
          cY = relations[key].bezier.curvY;
        }
        cX=startPos.right.X
        cY=startPos.right.Y
        this.relations[key].bezier = {
          startX: startPos.right.X,
          startY: startPos.right.Y,
          curvX: cX,
          curvY: cY,
          endX: endPos.left.X-10,
          endY: endPos.left.Y
        };
        // });
      },
      layoutCreatedEvent(a,b) {

      },
      cancleEvent() {
        this.connectActive = false;
        this.todoLine.splice(0, 1);
      }


    }
  }
</script>
<style>
.home {
  width: 100%;
  height: 100%;
  overflow: scroll;
}

  .ctn {
    height: 2000px;
    overflow: hidden !important;
  }
  .vue-grid-layout {
    z-index: 1;
  }
  .vue-grid-item {
    z-index: 3;
    border-radius: 5px;

  }

  .grid-item-content {
    height: 100%;
    width: 100%;
    position: relative;
    border: 2px solid #0d2542;
    border-radius: 5px;
    background: #fff;

  }
  .flow-add-group {
    height: calc(100% - 120px);
    width: 100%;
    overflow: hidden;
    padding-bottom: 50px;
    box-sizing: border-box;
  }
  .flow-add-group-item {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    padding-right: 10px;
    padding-left: 10px;
    margin: 5px 0;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 10px;

  }
  .flow-form-item-left{
    flex: 1;
  }
  .flow-form-item-right {
    width: 16px;
    margin: 0 5px;
    background: #0d2542;
    display: flex;
    align-items: center;
  }
  .flow-form-item-right i {
    color: #DCDFE6;
    cursor: pointer;
  }

  .flow-submit-btn-group {
    position: fixed !important;
    right: 100px;
    bottom: 50px;
    z-index: 10;
  }
  .grid-item-active{
    border-color: #006FFF;
  }

  .firstGroup .el-input__inner,.el-select,.el-input{
    height: 100%;
    width: 100%;

  }

  .tabs {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    padding-right: 80px;

  }

  .tabs-item {
    text-align: center;
    flex: 1;
    box-sizing: border-box;
    border: 1px solid #DCDFE6;
    margin-left: 70px;
    transform: scale(1.2,1);
    border-right: 0;

    border-top: 0;
  }
  .tabs-item:first-child {
    border: 0;
  }






  .paths {
    stroke: rgba(38, 27, 30, 0.82);
    stroke-width: 3;
    stroke-linecap: round;
    /*stroke-dasharray: 10;*/
    /*stroke-dashoffset: 300;*/
    /*animation: dashLine 20s linear infinite;*/
    position: relative;
    z-index: 100;
    cursor: pointer;
  }
  .paths:hover {
    stroke: red;

  }
  @keyframes dashLine { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 10; } }
  .svg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    /*pointer-events:none;*/
    z-index: 2;
  }

  h6 {
    margin: 0;
    margin-top: 10px;
  }

  .operationIcon{
    color: #0d2542;
    position: absolute;
    top: 70%;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    background: #fff;
    font-size: 25px;
    z-index: 5;
    cursor: pointer;
  }
  .icon-add {
  }
  .icon-remove {
    color: #006FFF;
  }
  .position-icon {
    position: absolute;
    color: #0d2542;
    font-size: 28px;
    cursor: pointer;
    z-index: -1;
  }
  .icon-left {
    top: 50%;
    left: 0;
    transform: translateY(-50%) translateX(-50%);
  }
  .icon-right {
    top: 50%;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    z-index: 5;
    background: #fff;

  }
  .icon-up {
    top: 0;
    right: 50%;
    transform: translateY(-50%) translateX(50%);
  }
  .icon-down {
    bottom: 0;
    right: 50%;
    transform: translateY(50%) translateX(50%);
  }
  .icon-right-arrow {
    transform: translateY(-50%) translateX(-80%);
  }
  .add-group {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28px;
    cursor: pointer;
  }
  .active-icon {
    color: #006FFF;
  }
  .home .el-form-item{
    margin: 5px 0 !important;
  }
  .home i {
    font-style: normal;
  }
  .isFirstPlus {
    left: 100%;
    top: 50%;
    transform: translateY(-50%) ;
    background: none;

  }
  .vue-grid-placeholder {
    /*background: rgba(0,0,0,1) !important;*/
    background:#ddd !important;
    box-shadow: 1px 1px 20px 0px rgba(0,0,0,.7);
  }
</style>
