"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkFRONT"] = self["webpackChunkFRONT"] || []).push([["src_views_pages_consult_popup_ConsultGuideTextPopup_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// 공통 텍스트\nconst BASE_TEXT = `ㅇ[인사멘트] 고객님 안녕하세요. KT서비스 입니다.\n고객님께서 고장 접수해 주셔서 확인해보니\n기사님 방문전에 간단한 방법으로 해결 가능할것 같아 연락드렸습니다.\nㅇ[카톡연결] 저희가 고객님의 카톡으로 안내 이미지를 보내드리려고 하는데요.\n카톡에서 ‘상담하기’ 버튼을 눌러주시고 통화는 스피커폰 모드로 바꿔주세요.\n\n\n`;\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'ConsultGuideTextPopup',\n  data() {\n    return {\n      guideText: \"\",\n      main: 0,\n      sub: 0\n    };\n  },\n  created() {},\n  computed: {\n    eglList() {\n      return this.$store.state.guide.eglList;\n    }\n  },\n  methods: {\n    popupClose() {\n      window.close();\n    },\n    getEgl() {\n      // TTID로 조회\n      let item = this.$route.query.ttId;\n      this.main = this.$route.query.main;\n      this.sub = this.$route.query.sub;\n      this.$store.dispatch(\"guide/egl\", item).then(() => {\n        if (this.eglList.guide_lines.length > 0) {\n          console.log(this.eglList);\n          this.guideText = this.eglList.guide_lines[this.main].guides[this.sub].description_detail;\n          document.getElementById(\"guideText\").value = BASE_TEXT + this.guideText;\n        }\n      }).catch(error => {\n        console.log(error);\n      });\n    }\n  },\n  mounted() {\n    document.getElementById(\"guideText\").value = BASE_TEXT;\n    this.getEgl();\n  }\n});\n\n//# sourceURL=webpack://FRONT/./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  class: \"popup\"\n};\nconst _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)(\"<div><div class=\\\"title_box\\\"><h1 class=\\\"cmplitHist\\\">상세 가이드</h1></div></div><div class=\\\"popup_box st01 oy_s\\\"><div class=\\\"detail_box st02\\\"><textarea readonly=\\\"readonly\\\" id=\\\"guideText\\\">\\n        </textarea></div></div>\", 2);\nconst _hoisted_4 = {\n  class: \"popup_close st01\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"div\", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)(\"button\", {\n    onClick: _cache[0] || (_cache[0] = (...args) => $options.popupClose && $options.popupClose(...args))\n  }, \"닫기\")])]);\n}\n\n//# sourceURL=webpack://FRONT/./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use%5B0%5D!./node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!./node_modules/vue-loader/dist/index.js??ruleSet%5B0%5D.use%5B0%5D");

/***/ }),

/***/ "./src/views/pages/consult/popup/ConsultGuideTextPopup.vue":
/*!*****************************************************************!*\
  !*** ./src/views/pages/consult/popup/ConsultGuideTextPopup.vue ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ConsultGuideTextPopup_vue_vue_type_template_id_da6a2cd8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8 */ \"./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8\");\n/* harmony import */ var _ConsultGuideTextPopup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConsultGuideTextPopup.vue?vue&type=script&lang=js */ \"./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=script&lang=js\");\n/* harmony import */ var C_project_csai_full_FRONT_END_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ \"./node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,C_project_csai_full_FRONT_END_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_ConsultGuideTextPopup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_ConsultGuideTextPopup_vue_vue_type_template_id_da6a2cd8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/views/pages/consult/popup/ConsultGuideTextPopup.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (__exports__);\n\n//# sourceURL=webpack://FRONT/./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?");

/***/ }),

/***/ "./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConsultGuideTextPopup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConsultGuideTextPopup_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConsultGuideTextPopup.vue?vue&type=script&lang=js */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=script&lang=js\");\n \n\n//# sourceURL=webpack://FRONT/./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?");

/***/ }),

/***/ "./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8":
/*!***********************************************************************************************!*\
  !*** ./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8 ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConsultGuideTextPopup_vue_vue_type_template_id_da6a2cd8__WEBPACK_IMPORTED_MODULE_0__.render; }\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_40_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ConsultGuideTextPopup_vue_vue_type_template_id_da6a2cd8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!../../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8 */ \"./node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?vue&type=template&id=da6a2cd8\");\n\n\n//# sourceURL=webpack://FRONT/./src/views/pages/consult/popup/ConsultGuideTextPopup.vue?");

/***/ })

}]);