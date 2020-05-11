<template>
  <el-button :type="btnType" :disabled="disabled" :icon="icon" @click="handleClick()">
    <svg-icon :icon-class="iconSvg" v-if="iconSvg"/>{{ btnName }}<slot></slot>
  </el-button>
</template>

<script>

  export default {
    name: 'Button',
    props: {
      loading: {//按钮是否loading中
        type: Boolean,
        default: false
      },
      btnType: {
        type: String,
        default: 'text'
      },
      disabled: {//按钮是否置灰，默认可操作
        type: Boolean,
        default: false
      },
      isShow: {//
        type: Boolean,
        default: true
      },
      customClass: {
        type: String,
        default: 'confirmMsg'
      },
      btn: {//按钮标识，对应下面List内key值
        type: String,
        default: ''
      },
      type: {//按钮操作类型：默认为 button 普通按钮，confirm 为二次确认没有输入操作原因的按钮，prompt 为二次确认需要输入操作原因的按钮
        type: String,
        default: 'button'
      },
      title: {//按钮显示的中文名称，优先显示参数内，若没有，list内name不为空则显示，否则为空不显示
        type: String,
        default: ''
      },
      text: {//二次按钮时，显示的提示文字
        type: String,
        default: ''
      },
      sup: {//二次按钮时，提示文字？后面的补充说明文字，没有则为空
        type: String,
        default: ''
      },
      code: {//二次且输入操作原因按钮时，需要传入的参数
        type: [Object, String],
        default: () => {
          return ''
        }
      },
      handle: {//操作传参
        type: String,
        default: ''
      }
    },
    created() {
      const btn = this.list[this.btn];
      if(btn){
        this.btnName = this.title ? this.title : btn['name'] ? btn['name'] : '';
        this.btnName = this.isShow ? this.btnName : '';
        if(btn['type']==='svg'){
          this.iconSvg = btn['icon']
        }else {
          this.icon = btn['icon']
        }
      }
    },
    data() {
      return {
        list: {
          // 表格顶部功能按钮
          search: {icon: 'p_search', type: 'svg', name: 'Search'},
          reset: {icon: 'b_reset', type: 'svg', name: 'Reset'},
          refresh: {icon: 'el-icon-refresh', type: 'icon', name: 'Refresh'},
          export: {icon: 'b_export', type: 'svg', name: 'Export'},
          add: {icon: 'b_add', type: 'svg', name: 'Create'},
          edit: {icon: 'b_edit', type: 'svg', name: 'Edit'},
          view: {icon: 'p_view', type: 'svg', name: 'Detail'},
          archive: {icon: 'p_stop', type: 'svg', name: 'Archive'},
          submit: {icon: 'b_submit', type: 'svg', name: 'Effective'},
          active: {icon: 'p_cofirmsale', type: 'svg', name: 'Active'},
          not: {icon: 'p_ocr', type: 'svg', name: 'null'},

        },
        btnName: '',
        icon: '',
        iconSvg: ''
      }
    },
    methods:{
      handleClick(evt) {
        if(this.type==='confirm'){
          // const text = `是否确定${this.text}?${this.sup}`;
          const text = `This operation will modify this proccess Status in the system.Do you want to continue?`;
          this.$confirm(text, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:this.customClass,
            type: 'warning',
            callback: action => {
              if(action==='confirm')  this.$emit('click', evt||{ code: this.code, handle: this.handle })
            }
          })
        }else if(this.type==='prompt'){
          // const text = `是否确定${this.text}?${this.sup}`;
          const text = `This operation will modify this proccess Status in the system.Do you want to continue?`;
          this.$prompt(text, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            /*inputValidator: text=>{
             return text&&validateSpace(text)
             },*/
            inputPlaceholder: '请填写操作原因',
            inputErrorMessage: '请填写操作原因'
          }).then(({ value }) => {
            this.$emit('click', { code: this.code, handle: this.handle, remark: value })//code为传入的参数回传，remark为输入的操作原因
          }).catch(()=>{})
        }else {
          this.$emit('click', evt)
        }
      }
    }
  }
</script>
