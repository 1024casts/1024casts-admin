(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2214cc"],{ca80:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-pagination",{staticStyle:{margin:"-10px"},attrs:{"current-page":e.current,"page-size":e.size,total:e.total,"page-sizes":[10,20,30,40],layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})},r=[],i={props:{current:{default:0},size:{default:0},total:{default:0}},methods:{handleSizeChange:function(e){this.$emit("change",{current:this.current,size:e,total:this.total})},handleCurrentChange:function(e){this.$emit("change",{current:e,size:this.size,total:this.total})}}},s=i,o=n("2877"),c=function(e){e.options.__source="src/views/order/components/PageFooter/index.vue"},u=c,l=Object(o["a"])(s,a,r,!1,null,null,null);"function"===typeof u&&u(l);t["default"]=l.exports}}]);