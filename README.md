# vue-element-component 
> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](http://panjiachen.github.io/vue-admin-template)

[国内访问](https://panjiachen.gitee.io/vue-admin-template)

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## 流程图
一款根据公司业务做生产管理的流程图系统，支持上帝视角沙盘模式、自动对齐、拖拽移动、拖拽缩放，基于graph算法拟定数据结构，支持递归JSON树查找；

<img src="https://raw.githubusercontent.com/gejigejigeji/vue-element-component/master/images/flow.png" width="100%"/>


## Layout
<img src="https://raw.githubusercontent.com/gejigejigeji/vue-element-component/master/images/layout.png" width="80%"/>

## Table Filter
>支持多种筛选

<img src="https://raw.githubusercontent.com/gejigejigeji/vue-element-component/master/images/view1.png" width="40%"/>
<img src="https://raw.githubusercontent.com/gejigejigeji/vue-element-component/master/images/view2.png" width="40%"/>

## Table column
>右键弹出动态列选择项
>
<img src="https://raw.githubusercontent.com/gejigejigeji/vue-element-component/master/images/view3.png" width="40%"/>

- ### 使用方式：
接受两个必选prop
>columnData 声明表格类型
>
>tableData  表格数据

columnData格式

```
 columnData: [
        {
        label:'表头显示名称',
        header:'筛选框类型',
        reader:'后端接口检索字段',
        prop:'列表显示字段名称',
        witdth:'表格列宽度',
        fixed:'固定列'}
        ]
```

tableData格式

```
 tableData:[
        {name:'小明',age:25,address:'来自东土大唐'}
    ]
```
## Extra

>可通过指定expand=true， spanTable=true来规定是否显示子表格与合并行，具体查看代码

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| 买不起苹果，不知道支持不支持
