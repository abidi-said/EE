/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/LanguageContext.tsx":
/*!**************************************!*\
  !*** ./contexts/LanguageContext.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LanguageProvider: () => (/* binding */ LanguageProvider),\n/* harmony export */   useLanguage: () => (/* binding */ useLanguage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst LanguageContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nconst useLanguage = ()=>{\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LanguageContext);\n    if (context === undefined) {\n        throw new Error(\"useLanguage must be used within a LanguageProvider\");\n    }\n    return context;\n};\nconst LanguageProvider = ({ children })=>{\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { locale = \"fr\" } = router;\n    const isRTL = locale === \"ar\";\n    const changeLanguage = (newLocale)=>{\n        router.push(router.asPath, router.asPath, {\n            locale: newLocale\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LanguageContext.Provider, {\n        value: {\n            locale,\n            isRTL,\n            changeLanguage\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            dir: isRTL ? \"rtl\" : \"ltr\",\n            className: isRTL ? \"rtl\" : \"ltr\",\n            children: children\n        }, void 0, false, {\n            fileName: \"/home/abidi-sa/waterproof-roofing-landing/contexts/LanguageContext.tsx\",\n            lineNumber: 35,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/abidi-sa/waterproof-roofing-landing/contexts/LanguageContext.tsx\",\n        lineNumber: 34,\n        columnNumber: 5\n    }, undefined);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9MYW5ndWFnZUNvbnRleHQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUE0RDtBQUNyQjtBQVF2QyxNQUFNRyxnQ0FBa0JILG9EQUFhQSxDQUFrQ0k7QUFFaEUsTUFBTUMsY0FBYztJQUN6QixNQUFNQyxVQUFVTCxpREFBVUEsQ0FBQ0U7SUFDM0IsSUFBSUcsWUFBWUYsV0FBVztRQUN6QixNQUFNLElBQUlHLE1BQU07SUFDbEI7SUFDQSxPQUFPRDtBQUNULEVBQUM7QUFNTSxNQUFNRSxtQkFBbUIsQ0FBQyxFQUFFQyxRQUFRLEVBQXlCO0lBQ2xFLE1BQU1DLFNBQVNSLHNEQUFTQTtJQUN4QixNQUFNLEVBQUVTLFNBQVMsSUFBSSxFQUFFLEdBQUdEO0lBQzFCLE1BQU1FLFFBQVFELFdBQVc7SUFFekIsTUFBTUUsaUJBQWlCLENBQUNDO1FBQ3RCSixPQUFPSyxJQUFJLENBQUNMLE9BQU9NLE1BQU0sRUFBRU4sT0FBT00sTUFBTSxFQUFFO1lBQUVMLFFBQVFHO1FBQVU7SUFDaEU7SUFFQSxxQkFDRSw4REFBQ1gsZ0JBQWdCYyxRQUFRO1FBQUNDLE9BQU87WUFBRVA7WUFBUUM7WUFBT0M7UUFBZTtrQkFDL0QsNEVBQUNNO1lBQUlDLEtBQUtSLFFBQVEsUUFBUTtZQUFPUyxXQUFXVCxRQUFRLFFBQVE7c0JBQ3pESDs7Ozs7Ozs7Ozs7QUFJVCxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2F0ZXJwcm9vZi1yb29maW5nLWVwb3h5LWxhbmRpbmcvLi9jb250ZXh0cy9MYW5ndWFnZUNvbnRleHQudHN4P2YzZjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcblxuaW50ZXJmYWNlIExhbmd1YWdlQ29udGV4dFR5cGUge1xuICBsb2NhbGU6IHN0cmluZ1xuICBpc1JUTDogYm9vbGVhblxuICBjaGFuZ2VMYW5ndWFnZTogKGxvY2FsZTogc3RyaW5nKSA9PiB2b2lkXG59XG5cbmNvbnN0IExhbmd1YWdlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8TGFuZ3VhZ2VDb250ZXh0VHlwZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKVxuXG5leHBvcnQgY29uc3QgdXNlTGFuZ3VhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KExhbmd1YWdlQ29udGV4dClcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlTGFuZ3VhZ2UgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIExhbmd1YWdlUHJvdmlkZXInKVxuICB9XG4gIHJldHVybiBjb250ZXh0XG59XG5cbmludGVyZmFjZSBMYW5ndWFnZVByb3ZpZGVyUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3ROb2RlXG59XG5cbmV4cG9ydCBjb25zdCBMYW5ndWFnZVByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfTogTGFuZ3VhZ2VQcm92aWRlclByb3BzKSA9PiB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG4gIGNvbnN0IHsgbG9jYWxlID0gJ2ZyJyB9ID0gcm91dGVyXG4gIGNvbnN0IGlzUlRMID0gbG9jYWxlID09PSAnYXInXG5cbiAgY29uc3QgY2hhbmdlTGFuZ3VhZ2UgPSAobmV3TG9jYWxlOiBzdHJpbmcpID0+IHtcbiAgICByb3V0ZXIucHVzaChyb3V0ZXIuYXNQYXRoLCByb3V0ZXIuYXNQYXRoLCB7IGxvY2FsZTogbmV3TG9jYWxlIH0pXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxMYW5ndWFnZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgbG9jYWxlLCBpc1JUTCwgY2hhbmdlTGFuZ3VhZ2UgfX0+XG4gICAgICA8ZGl2IGRpcj17aXNSVEwgPyAncnRsJyA6ICdsdHInfSBjbGFzc05hbWU9e2lzUlRMID8gJ3J0bCcgOiAnbHRyJ30+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvTGFuZ3VhZ2VDb250ZXh0LlByb3ZpZGVyPlxuICApXG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VSb3V0ZXIiLCJMYW5ndWFnZUNvbnRleHQiLCJ1bmRlZmluZWQiLCJ1c2VMYW5ndWFnZSIsImNvbnRleHQiLCJFcnJvciIsIkxhbmd1YWdlUHJvdmlkZXIiLCJjaGlsZHJlbiIsInJvdXRlciIsImxvY2FsZSIsImlzUlRMIiwiY2hhbmdlTGFuZ3VhZ2UiLCJuZXdMb2NhbGUiLCJwdXNoIiwiYXNQYXRoIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsImRpdiIsImRpciIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./contexts/LanguageContext.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-i18next */ \"next-i18next\");\n/* harmony import */ var next_i18next__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_i18next__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_LanguageContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/LanguageContext */ \"./contexts/LanguageContext.tsx\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_LanguageContext__WEBPACK_IMPORTED_MODULE_3__.LanguageProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"viewport\",\n                        content: \"width=device-width, initial-scale=1\"\n                    }, void 0, false, {\n                        fileName: \"/home/abidi-sa/waterproof-roofing-landing/pages/_app.tsx\",\n                        lineNumber: 11,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: \"/favicon.ico\"\n                    }, void 0, false, {\n                        fileName: \"/home/abidi-sa/waterproof-roofing-landing/pages/_app.tsx\",\n                        lineNumber: 12,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/abidi-sa/waterproof-roofing-landing/pages/_app.tsx\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/abidi-sa/waterproof-roofing-landing/pages/_app.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/abidi-sa/waterproof-roofing-landing/pages/_app.tsx\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_i18next__WEBPACK_IMPORTED_MODULE_2__.appWithTranslation)(App));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUM0QjtBQUNxQjtBQUNhO0FBQ2hDO0FBRTlCLFNBQVNHLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDN0MscUJBQ0UsOERBQUNILHVFQUFnQkE7OzBCQUNmLDhEQUFDRixrREFBSUE7O2tDQUNILDhEQUFDTTt3QkFBS0MsTUFBSzt3QkFBV0MsU0FBUTs7Ozs7O2tDQUM5Qiw4REFBQ0M7d0JBQUtDLEtBQUk7d0JBQU9DLE1BQUs7Ozs7Ozs7Ozs7OzswQkFFeEIsOERBQUNQO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7OztBQUc5QjtBQUVBLGlFQUFlSixnRUFBa0JBLENBQUNFLElBQUlBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93YXRlcnByb29mLXJvb2ZpbmctZXBveHktbGFuZGluZy8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJ1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuaW1wb3J0IHsgYXBwV2l0aFRyYW5zbGF0aW9uIH0gZnJvbSAnbmV4dC1pMThuZXh0J1xuaW1wb3J0IHsgTGFuZ3VhZ2VQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHRzL0xhbmd1YWdlQ29udGV4dCdcbmltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJ1xuXG5mdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxMYW5ndWFnZVByb3ZpZGVyPlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MVwiIC8+XG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24uaWNvXCIgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICA8L0xhbmd1YWdlUHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwV2l0aFRyYW5zbGF0aW9uKEFwcClcbiJdLCJuYW1lcyI6WyJIZWFkIiwiYXBwV2l0aFRyYW5zbGF0aW9uIiwiTGFuZ3VhZ2VQcm92aWRlciIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsIm1ldGEiLCJuYW1lIiwiY29udGVudCIsImxpbmsiLCJyZWwiLCJocmVmIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next-i18next":
/*!*******************************!*\
  !*** external "next-i18next" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-i18next");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();