!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},c=t.parcelRequired7c6;null==c&&((c=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var c={id:e,exports:{}};return n[e]=c,t.call(c.exports,c,c.exports),c.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){r[e]=t},t.parcelRequired7c6=c);var o=c("bpxeT"),a=c("8MBJY"),i=c("a2hTj"),u={};Object.defineProperty(u,"__esModule",{value:!0}),u.default=function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n;return e};var s=c("2TvXO"),f="S9P6gsklItZ6AfgyQULO5BfOKZag8n9Y",l=function(){"use strict";function t(){e(a)(this,t),e(u)(this,"pageNumberBySearch",0),e(u)(this,"sections","")}return e(i)(t,[{key:"pageNumberBySearch",set:function(e){this.pageNumberBySearch=e}},{key:"increasePageNumber",value:function(){this.pageNumberBySearch+=1}},{key:"decreasePageNumber",value:function(){0!==this.pageNumberBySearch&&(this.pageNumberBySearch-=1)}},{key:"getSectionList",value:function(){var t=this;return e(o)(e(s).mark((function n(){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://api.nytimes.com/svc/news/v3/content/section-list.json?","api-key=").concat(f)).then((function(e){if(!e.ok)throw new Error;return e.json()})).then((function(e){if(0===e.num_results)throw new Error;return t.sections=e.results.map((function(e){return e.section})),e.results.map((function(e){return e.display_name}))}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),n)})))()}},{key:"getNewsListBySectionName",value:function(t){return e(o)(e(s).mark((function n(){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://api.nytimes.com/svc/news/v3/content/inyt/").concat(t,".json?api-key=").concat(f)).then((function(e){if(!e.ok)throw new Error;return e.json()})).then((function(e){return e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),n)})))()}},{key:"articleSearchList",value:function(t,n){var r=this;return e(o)(e(s).mark((function c(){var o;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o="",n&&(o="fq=pub_date:(".concat(p.createTimestamp(n),")")),e.next=4,fetch("".concat("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=").concat(t,"&api-key=").concat(f,"&").concat(o,"&page=").concat(r.pageNumberBySearch)).then((function(e){if(!e.ok)throw new Error("We did not find anything");return e.json()})).then((function(e){return e}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),c)})))()}},{key:"getMostViewedArticles",value:function(){return e(o)(e(s).mark((function t(){return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?","api-key=").concat(f)).then((function(e){if(!e.ok)throw new Error;return e.json()})).then((function(e){return e}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),t)})))()}}]),t}(),p=function(){"use strict";function t(){e(a)(this,t)}return e(i)(t,null,[{key:"createTimestamp",value:function(e){var t=new Date(e),n=t.getUTCFullYear(),r=t.getUTCMonth()+1,c=t.getUTCDate();return r<10&&(r=r.toString().padStart(2,"0")),c<10&&(c=c.toString().padStart(2,"0")),"".concat(n,"-").concat(r,"-").concat(c)}}]),t}(),h=new l;h.getSectionList().then((function(e){console.log(e)}));h.getNewsListBySectionName("business").then((function(e){return console.log("News list by section name ",e.results)})),h.articleSearchList("ukraine").then((function(e){return console.log("Search list by submit",e.response)})).catch((function(e){return console.log(e.message)})),h.getMostViewedArticles().then((function(e){return console.log("The most viewed articles ",e.results)}))}();
//# sourceMappingURL=index.4c7481ff.js.map
