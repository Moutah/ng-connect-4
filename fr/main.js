var $localize=Object.assign(void 0===$localize?{}:$localize,{locale:"fr"});
"use strict";(function(global){global.ng=global.ng||{};global.ng.common=global.ng.common||{};global.ng.common.locales=global.ng.common.locales||{};const u=undefined;function plural(n){let i=Math.floor(Math.abs(n));if(i===0||i===1)return 1;return 5}global.ng.common.locales["fr"]=["fr",[["AM","PM"],u,u],u,[["D","L","M","M","J","V","S"],["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],["di","lu","ma","me","je","ve","sa"]],u,[["J","F","M","A","M","J","J","A","S","O","N","D"],["janv.","f\xE9vr.","mars","avr.","mai","juin","juil.","ao\xFBt","sept.","oct.","nov.","d\xE9c."],["janvier","f\xE9vrier","mars","avril","mai","juin","juillet","ao\xFBt","septembre","octobre","novembre","d\xE9cembre"]],u,[["av. J.-C.","ap. J.-C."],u,["avant J\xE9sus-Christ","apr\xE8s J\xE9sus-Christ"]],1,[6,0],["dd/MM/y","d MMM y","d MMMM y","EEEE d MMMM y"],["HH:mm","HH:mm:ss","HH:mm:ss z","HH:mm:ss zzzz"],["{1} {0}","{1} '\xE0' {0}",u,u],[",","\u202F",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0\xA0%","#,##0.00\xA0\xA4","#E0"],"EUR","\u20AC","euro",{"ARS":["$AR","$"],"AUD":["$AU","$"],"BEF":["FB"],"BMD":["$BM","$"],"BND":["$BN","$"],"BZD":["$BZ","$"],"CAD":["$CA","$"],"CLP":["$CL","$"],"CNY":[u,"\xA5"],"COP":["$CO","$"],"CYP":["\xA3CY"],"EGP":[u,"\xA3E"],"FJD":["$FJ","$"],"FKP":["\xA3FK","\xA3"],"FRF":["F"],"GBP":["\xA3GB","\xA3"],"GIP":["\xA3GI","\xA3"],"HKD":[u,"$"],"IEP":["\xA3IE"],"ILP":["\xA3IL"],"ITL":["\u20A4IT"],"JPY":[u,"\xA5"],"KMF":[u,"FC"],"LBP":["\xA3LB","\xA3L"],"MTP":["\xA3MT"],"MXN":["$MX","$"],"NAD":["$NA","$"],"NIO":[u,"$C"],"NZD":["$NZ","$"],"RHD":["$RH"],"RON":[u,"L"],"RWF":[u,"FR"],"SBD":["$SB","$"],"SGD":["$SG","$"],"SRD":["$SR","$"],"TOP":[u,"$T"],"TTD":["$TT","$"],"TWD":[u,"NT$"],"USD":["$US","$"],"UYU":["$UY","$"],"WST":["$WS"],"XCD":[u,"$"],"XPF":["FCFP"],"ZMW":[u,"Kw"]},"ltr",plural,[[["minuit","midi","mat.","ap.m.","soir","nuit"],u,["minuit","midi","du matin","de l\u2019apr\xE8s-midi","du soir","du matin"]],[["minuit","midi","mat.","ap.m.","soir","nuit"],u,["minuit","midi","matin","apr\xE8s-midi","soir","nuit"]],["00:00","12:00",["04:00","12:00"],["12:00","18:00"],["18:00","24:00"],["00:00","04:00"]]]]})(typeof globalThis!=="undefined"&&globalThis||typeof global!=="undefined"&&global||typeof window!=="undefined"&&window);;
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+1+F":
/*!*********************************************************!*\
  !*** ./src/app/game/state/actions/SetPlayers.action.ts ***!
  \*********************************************************/
/*! exports provided: SetPlayers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetPlayers", function() { return SetPlayers; });
class SetPlayers {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }
}
SetPlayers.type = '[Game] Set player';


/***/ }),

/***/ "+ZVI":
/*!*********************************************!*\
  !*** ./src/app/grid/cell/cell.component.ts ***!
  \*********************************************/
/*! exports provided: CellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellComponent", function() { return CellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "6g8r");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var src_app_game_services_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/game/services/game.service */ "g1xr");
/* harmony import */ var _coin_coin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../coin/coin.component */ "cJA1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







class CellComponent {
    constructor(store, game) {
        this.store = store;
        this.game = game;
    }
    ngOnInit() {
        // select this cell in grid store
        this.cellContent$ = this.store.select((state) => state.grid.cols[this.col][this.row] || '');
        // detect if this cell is dimmed
        this.isDimmed$ = this.store.select((state) => {
            var _a;
            // no cells are highlighted / dimmed
            if (!((_a = state.grid.highlights) === null || _a === void 0 ? void 0 : _a.length)) {
                return false;
            }
            // is dimmed if not amongs highlighted cells
            return !state.grid.highlights.some((highlight) => highlight.col === this.col && highlight.row === this.row);
        });
        // calc fall height
        this.fallHeight = _config__WEBPACK_IMPORTED_MODULE_1__["GRID_ROWS"] - this.row;
    }
    /**
     * Play a coin in this cell's column
     */
    playCoin() {
        this.game.play(this.col);
    }
}
CellComponent.ɵfac = function CellComponent_Factory(t) { return new (t || CellComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_game_services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"])); };
CellComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CellComponent, selectors: [["app-cell"]], inputs: { row: "row", col: "col", isVeiled: "isVeiled" }, decls: 10, vars: 19, consts: [[3, "click"], [1, "cell__content__coin", 3, "color"], ["version", "1.1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 100 100", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 100 100"], ["cx", "50", "cy", "50", "r", "49", "stroke", "currentColor", "fill", "transparent"]], template: function CellComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CellComponent_Template_div_click_0_listener() { return ctx.playCoin(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-coin", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "svg", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "circle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("cell " + (_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 9, ctx.isDimmed$) ? "cell--dimmed " : " ") + (_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 11, ctx.isHighlighted$) ? "cell--highlighted" : ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("cell__content " + (!_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 13, ctx.cellContent$) ? "cell__content--hidden" : ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("margin-top", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](6, 15, ctx.cellContent$) ? "" : -130 * ctx.fallHeight + "%");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 17, ctx.cellContent$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("cell__outline " + (ctx.isVeiled ? "cell__outline--hidden" : ""));
    } }, directives: [_coin_coin_component__WEBPACK_IMPORTED_MODULE_4__["CoinComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: [".cell[_ngcontent-%COMP%] {\n  height: 0;\n  padding-bottom: 100%;\n  cursor: pointer;\n  position: relative;\n}\n.cell__content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  opacity: 1;\n  padding: 4px;\n}\n.cell__content__coin[_ngcontent-%COMP%] {\n  margin-top: 0;\n  transition: margin-top 0.2s ease-in;\n  flex: 1;\n}\n.cell__content--hidden[_ngcontent-%COMP%] {\n  opacity: 0;\n}\n.cell__outline[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  padding: 3px;\n}\n.cell__outline[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  color: var(--color-text);\n  stroke-width: 1.5px;\n  stroke-dasharray: 314;\n  stroke-dashoffset: 0;\n  transition: stroke-dashoffset 0.6s linear;\n}\n.cell__outline--hidden[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  stroke-dashoffset: 314;\n}\n.cell--dimmed[_ngcontent-%COMP%] {\n  opacity: 0.3;\n}\n@keyframes pulse {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0.5;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JpZC9jZWxsL2NlbGwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFDRjtBQUNFO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtBQUNKO0FBQ0k7RUFDRSxhQUFBO0VBQ0EsbUNBQUE7RUFDQSxPQUFBO0FBQ047QUFFSTtFQUNFLFVBQUE7QUFBTjtBQUlFO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxZQUFBO0FBRko7QUFJSTtFQUNFLHdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EseUNBQUE7QUFGTjtBQU1NO0VBQ0Usc0JBQUE7QUFKUjtBQVNFO0VBQ0UsWUFBQTtBQVBKO0FBV0E7RUFDRTtJQUNFLFVBQUE7RUFSRjtFQVVBO0lBQ0UsWUFBQTtFQVJGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9ncmlkL2NlbGwvY2VsbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jZWxsIHtcbiAgaGVpZ2h0OiAwO1xuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJl9fY29udGVudCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgcGFkZGluZzogNHB4O1xuXG4gICAgJl9fY29pbiB7XG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgICAgdHJhbnNpdGlvbjogbWFyZ2luLXRvcCAwLjJzIGVhc2UtaW47XG4gICAgICBmbGV4OiAxO1xuICAgIH1cblxuICAgICYtLWhpZGRlbiB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxuXG4gICZfX291dGxpbmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogMDtcbiAgICBwYWRkaW5nOiAzcHg7XG5cbiAgICBjaXJjbGUge1xuICAgICAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQpO1xuICAgICAgc3Ryb2tlLXdpZHRoOiAxLjVweDtcbiAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDMxNDtcbiAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAwO1xuICAgICAgdHJhbnNpdGlvbjogc3Ryb2tlLWRhc2hvZmZzZXQgMC42cyBsaW5lYXI7XG4gICAgfVxuXG4gICAgJi0taGlkZGVuIHtcbiAgICAgIGNpcmNsZSB7XG4gICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAzMTQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJi0tZGltbWVkIHtcbiAgICBvcGFjaXR5OiAwLjM7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBwdWxzZSB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgfVxufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CellComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-cell',
                templateUrl: './cell.component.html',
                styleUrls: ['./cell.component.scss'],
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Store"] }, { type: src_app_game_services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"] }]; }, { row: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], col: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], isVeiled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/ng-connect-four/ng-connect-four/src/main.ts */"zUnb");


/***/ }),

/***/ "1LmZ":
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class HomeComponent {
    constructor() { }
    ngOnInit() { }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 10, vars: 0, consts: function () { var i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_591756753591908158$$SRC_APP_PAGES_HOME_HOME_COMPONENT_TS_1 = goog.getMsg(" Connect 4 game made with Angular ");
        i18n_0 = MSG_EXTERNAL_591756753591908158$$SRC_APP_PAGES_HOME_HOME_COMPONENT_TS_1;
    }
    else {
        i18n_0 = " Puissance 4 fait avec Angular ";
    } var i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_8443334822442326127$$SRC_APP_PAGES_HOME_HOME_COMPONENT_TS_3 = goog.getMsg(" Play ");
        i18n_2 = MSG_EXTERNAL_8443334822442326127$$SRC_APP_PAGES_HOME_HOME_COMPONENT_TS_3;
    }
    else {
        i18n_2 = " Play ";
    } return [[1, "home"], [1, "home__title"], [1, "mat-display-4"], [1, "mat-headline"], i18n_0, ["mat-flat-button", "", "color", "primary", "routerLink", "game", 1, "home__play-button"], i18n_2]; }, template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " ng");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](7, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](9, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatAnchor"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]], styles: [".home[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n}\n.home__title[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: calc(-1 * var(--toolbar-height));\n}\n.home__play-button[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3rem;\n  left: 0;\n  right: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQUNGO0FBQ0U7RUFDRSxrQkFBQTtFQUNBLDRDQUFBO0FBQ0o7QUFFRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0FBQUoiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaG9tZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmX190aXRsZSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbi10b3A6IGNhbGMoLTEgKiB2YXIoLS10b29sYmFyLWhlaWdodCkpO1xuICB9XG5cbiAgJl9fcGxheS1idXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDNyZW07XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgfVxufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-home',
                templateUrl: './home.component.html',
                styleUrls: ['./home.component.scss'],
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "21aE":
/*!*************************************!*\
  !*** ./src/app/grid/grid.module.ts ***!
  \*************************************/
/*! exports provided: GridModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridModule", function() { return GridModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid.component */ "Ludi");
/* harmony import */ var _cell_cell_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cell/cell.component */ "+ZVI");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state */ "8HBv");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../material.module */ "vvyD");
/* harmony import */ var _coin_coin_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./coin/coin.component */ "cJA1");










class GridModule {
}
GridModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: GridModule });
GridModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function GridModule_Factory(t) { return new (t || GridModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _material_module__WEBPACK_IMPORTED_MODULE_6__["MaterialModule"], _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["NgxsModule"].forFeature([_state__WEBPACK_IMPORTED_MODULE_5__["GridState"]])]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](GridModule, { declarations: [_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _cell_cell_component__WEBPACK_IMPORTED_MODULE_3__["CellComponent"], _coin_coin_component__WEBPACK_IMPORTED_MODULE_7__["CoinComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _material_module__WEBPACK_IMPORTED_MODULE_6__["MaterialModule"], _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["ɵbc"]], exports: [_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _coin_coin_component__WEBPACK_IMPORTED_MODULE_7__["CoinComponent"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GridModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _cell_cell_component__WEBPACK_IMPORTED_MODULE_3__["CellComponent"], _coin_coin_component__WEBPACK_IMPORTED_MODULE_7__["CoinComponent"]],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _material_module__WEBPACK_IMPORTED_MODULE_6__["MaterialModule"], _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["NgxsModule"].forFeature([_state__WEBPACK_IMPORTED_MODULE_5__["GridState"]])],
                exports: [_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _coin_coin_component__WEBPACK_IMPORTED_MODULE_7__["CoinComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "6g8r":
/*!********************************!*\
  !*** ./src/app/grid/config.ts ***!
  \********************************/
/*! exports provided: GRID_ROWS, GRID_COLS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRID_ROWS", function() { return GRID_ROWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRID_COLS", function() { return GRID_COLS; });
const GRID_ROWS = 6;
const GRID_COLS = 7;


/***/ }),

/***/ "8HBv":
/*!*************************************!*\
  !*** ./src/app/grid/state/index.ts ***!
  \*************************************/
/*! exports provided: GridState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridState", function() { return GridState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "6g8r");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ "GbKy");






let GridState = class GridState {
    /**
     * Returns `true` if all cells are filled.
     */
    static isFull(state) {
        return state.cols.every((col) => col.length === _config__WEBPACK_IMPORTED_MODULE_3__["GRID_ROWS"]);
    }
    /**
     * Marks the game as _not_ over.
     */
    resetGrid(ctx) {
        // generate empty cols
        const cols = [...Array(_config__WEBPACK_IMPORTED_MODULE_3__["GRID_COLS"]).keys()].map(() => []);
        ctx.patchState({ cols, highlights: [] });
    }
    /**
     * Plays a coin in a specified column for specified player.
     */
    playCoin(ctx, action) {
        // copy cols state
        const state = ctx.getState();
        const cols = [...state.cols];
        // add the coin to targeted column
        cols[action.col].push(action.ownerId);
        // update state
        ctx.patchState({ cols });
    }
    /**
     * Set cells to be highlighted.
     */
    highlightCells(ctx, action) {
        ctx.patchState({ highlights: action.cells });
    }
};
GridState.ɵfac = function GridState_Factory(t) { return new (t || GridState)(); };
GridState.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GridState, factory: GridState.ɵfac });
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_4__["Reset"])
], GridState.prototype, "resetGrid", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_4__["PlayCoin"])
], GridState.prototype, "playCoin", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_4__["HighlightCells"])
], GridState.prototype, "highlightCells", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])()
], GridState, "isFull", null);
GridState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
        name: 'grid',
        defaults: {
            cols: [],
            highlights: [],
        },
    })
], GridState);

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GridState, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, { resetGrid: [], playCoin: [], highlightCells: [] }); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Brka":
/*!********************************!*\
  !*** ./src/app/game/player.ts ***!
  \********************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
class Player {
    constructor(color, name, isAi = false) {
        this.color = color;
        this.name = name;
        this.isAi = isAi;
    }
}


/***/ }),

/***/ "GbKy":
/*!*********************************************!*\
  !*** ./src/app/grid/state/actions/index.ts ***!
  \*********************************************/
/*! exports provided: PlayCoin, Reset, HighlightCells */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PlayCoin_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayCoin.action */ "Gu97");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlayCoin", function() { return _PlayCoin_action__WEBPACK_IMPORTED_MODULE_0__["PlayCoin"]; });

/* harmony import */ var _Reset_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reset.action */ "jjy2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reset", function() { return _Reset_action__WEBPACK_IMPORTED_MODULE_1__["Reset"]; });

/* harmony import */ var _HighlightCells_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HighlightCells.action */ "l3Ov");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighlightCells", function() { return _HighlightCells_action__WEBPACK_IMPORTED_MODULE_2__["HighlightCells"]; });






/***/ }),

/***/ "Gu97":
/*!*******************************************************!*\
  !*** ./src/app/grid/state/actions/PlayCoin.action.ts ***!
  \*******************************************************/
/*! exports provided: PlayCoin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayCoin", function() { return PlayCoin; });
class PlayCoin {
    constructor(ownerId, col) {
        this.ownerId = ownerId;
        this.col = col;
    }
}
PlayCoin.type = '[Grid] Play coin';


/***/ }),

/***/ "HKqw":
/*!***********************************************!*\
  !*** ./src/app/game/timer/timer.component.ts ***!
  \***********************************************/
/*! exports provided: TimerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerComponent", function() { return TimerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TimerComponent {
    constructor() { }
    /**
     * Initialize elapsed time and starts the ticker interval.
     */
    ngOnInit() {
        this.elapsedSeconds = isNaN(this.offset) ? 0 : this.offset;
        this.tickerInverval = window.setInterval(() => {
            if (this.isRunning) {
                this.elapsedSeconds++;
            }
        }, 1000);
    }
    /**
     * Clears the ticker interval.
     */
    ngOnDestroy() {
        window.clearInterval(this.tickerInverval);
    }
    /**
     * Returns the minutes part of `this.elapsedSeconds`.
     */
    getFormattedElapsedMinutes() {
        return Math.floor(this.elapsedSeconds / 60).toString();
    }
    /**
     * Returns the seconds part of `this.elapsedSeconds`. Returns the value as a
     * 2 digits string. Eg: `"01"`, `"07"`, `"22"`
     */
    getFormattedElapsedSeconds() {
        return (this.elapsedSeconds % 60).toString().padStart(2, '0');
    }
}
TimerComponent.ɵfac = function TimerComponent_Factory(t) { return new (t || TimerComponent)(); };
TimerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TimerComponent, selectors: [["app-timer"]], inputs: { isRunning: "isRunning", offset: "offset" }, decls: 6, vars: 2, consts: [[1, "timer"], [1, "timer__minutes"], [1, "timer__seconds"]], template: function TimerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " : ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getFormattedElapsedMinutes());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.getFormattedElapsedSeconds());
    } }, styles: [".timer[_ngcontent-%COMP%] {\n  font-size: 1.6rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2FtZS90aW1lci90aW1lci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9nYW1lL3RpbWVyL3RpbWVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRpbWVyIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TimerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-timer',
                templateUrl: './timer.component.html',
                styleUrls: ['./timer.component.scss'],
            }]
    }], function () { return []; }, { isRunning: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], offset: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "KpNC":
/*!**************************************************!*\
  !*** ./src/app/game/state/actions/End.action.ts ***!
  \**************************************************/
/*! exports provided: End */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "End", function() { return End; });
class End {
    constructor() { }
}
End.type = '[Game] Game over';


/***/ }),

/***/ "Ludi":
/*!****************************************!*\
  !*** ./src/app/grid/grid.component.ts ***!
  \****************************************/
/*! exports provided: GridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridComponent", function() { return GridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "6g8r");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _cell_cell_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cell/cell.component */ "+ZVI");





function GridComponent_div_1_app_cell_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-cell", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseover", function GridComponent_div_1_app_cell_1_Template_app_cell_mouseover_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const iCol_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r4.setHoverCol(iCol_r3); })("mouseout", function GridComponent_div_1_app_cell_1_Template_app_cell_mouseout_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.clearHoverCol(); })("click", function GridComponent_div_1_app_cell_1_Template_app_cell_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r7.clearHoverCol(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const iCol_r3 = ctx.$implicit;
    const iRow_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("grid__row__cell " + (ctx_r2.hoveredCol === iCol_r3 ? "grid__row__cell--hover" : ""));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("row", iRow_r1)("col", iCol_r3)("isVeiled", ctx_r2.isVeiled);
} }
function GridComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridComponent_div_1_app_cell_1_Template, 1, 5, "app-cell", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.cols);
} }
class GridComponent {
    constructor() {
        this.rows = [];
        this.cols = [];
    }
    ngOnInit() {
        this.rows = [...Array(_config__WEBPACK_IMPORTED_MODULE_1__["GRID_ROWS"]).keys()].reverse();
        this.cols = [...Array(_config__WEBPACK_IMPORTED_MODULE_1__["GRID_COLS"]).keys()];
    }
    /**
     * Set `hoveredCol` to given `col`.
     */
    setHoverCol(col) {
        this.hoveredCol = col;
    }
    /**
     * Clears the value of `hoveredCol`.
     */
    clearHoverCol() {
        this.hoveredCol = undefined;
    }
}
GridComponent.ɵfac = function GridComponent_Factory(t) { return new (t || GridComponent)(); };
GridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GridComponent, selectors: [["app-grid"]], inputs: { isVeiled: "isVeiled" }, decls: 4, vars: 3, consts: [[1, "grid"], ["class", "grid__row", 4, "ngFor", "ngForOf"], ["version", "1.1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 280 240", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 280 240"], ["x", "0", "y", "0", "width", "280", "height", "240", "stroke", "currentColor", "fill", "transparent"], [1, "grid__row"], [3, "row", "col", "class", "isVeiled", "mouseover", "mouseout", "click", 4, "ngFor", "ngForOf"], [3, "row", "col", "isVeiled", "mouseover", "mouseout", "click"]], template: function GridComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridComponent_div_1_Template, 2, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "rect", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.rows);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("grid__outline " + (ctx.isVeiled ? "grid__outline--hidden" : ""));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _cell_cell_component__WEBPACK_IMPORTED_MODULE_3__["CellComponent"]], styles: [".grid[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  padding: 6px;\n}\n.grid__row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n}\n.grid__row__cell[_ngcontent-%COMP%] {\n  flex: 1;\n  border-radius: 100%;\n}\n.grid__row__cell--hover[_ngcontent-%COMP%] {\n  background-color: rgba(125, 125, 125, 0.1);\n}\n.grid__outline[_ngcontent-%COMP%] {\n  display: flex;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  margin: 1px;\n  z-index: -1;\n}\n.grid__outline[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {\n  color: var(--color-text);\n  stroke-width: 1.2px;\n  stroke-dasharray: 1040;\n  stroke-dashoffset: 0;\n  transition: stroke-dashoffset 0.6s linear;\n}\n.grid__outline--hidden[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%] {\n  stroke-dashoffset: 1040;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JpZC9ncmlkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQUNGO0FBQ0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFDSjtBQUNJO0VBQ0UsT0FBQTtFQUNBLG1CQUFBO0FBQ047QUFDTTtFQUNFLDBDQUFBO0FBQ1I7QUFJRTtFQUNFLGFBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtBQUZKO0FBSUk7RUFDRSx3QkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxvQkFBQTtFQUNBLHlDQUFBO0FBRk47QUFNTTtFQUNFLHVCQUFBO0FBSlIiLCJmaWxlIjoic3JjL2FwcC9ncmlkL2dyaWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ3JpZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmc6IDZweDtcblxuICAmX19yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcblxuICAgICZfX2NlbGwge1xuICAgICAgZmxleDogMTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG5cbiAgICAgICYtLWhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMjUsIDEyNSwgMTI1LCAwLjEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICZfX291dGxpbmUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogMDtcbiAgICBtYXJnaW46IDFweDtcbiAgICB6LWluZGV4OiAtMTtcblxuICAgIHJlY3Qge1xuICAgICAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQpO1xuICAgICAgc3Ryb2tlLXdpZHRoOiAxLjJweDtcbiAgICAgIHN0cm9rZS1kYXNoYXJyYXk6IDEwNDA7XG4gICAgICBzdHJva2UtZGFzaG9mZnNldDogMDtcbiAgICAgIHRyYW5zaXRpb246IHN0cm9rZS1kYXNob2Zmc2V0IDAuNnMgbGluZWFyO1xuICAgIH1cblxuICAgICYtLWhpZGRlbiB7XG4gICAgICByZWN0IHtcbiAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ6IDEwNDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GridComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-grid',
                templateUrl: './grid.component.html',
                styleUrls: ['./grid.component.scss'],
            }]
    }], function () { return []; }, { isVeiled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "MQQI":
/*!*********************************************************!*\
  !*** ./src/app/game/state/actions/NextPlayer.action.ts ***!
  \*********************************************************/
/*! exports provided: NextPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NextPlayer", function() { return NextPlayer; });
class NextPlayer {
    constructor() { }
}
NextPlayer.type = '[Game] Next player turn';


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _game_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game/state */ "r1w0");
/* harmony import */ var _game_services_game_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game/services/game.service */ "g1xr");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");















function AppComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " ng");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_a_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_a_20_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.abandonGame(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](1, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class AppComponent {
    constructor(router, game, store) {
        this.router = router;
        this.game = game;
        this.store = store;
    }
    ngOnInit() {
        // register observables
        this.isHome$ = this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((e) => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterEvent"]))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((e) => e.urlAfterRedirects === '/'));
        this.isGameStarted$ = this.store.select(_game_state__WEBPACK_IMPORTED_MODULE_3__["GameState"].isStarted);
        // set initial theme
        const isDarkModePrefered = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(isDarkModePrefered ? 'dark' : 'light');
    }
    /**
     * Clear the current game.
     */
    abandonGame() {
        this.game.clear();
    }
    /**
     * Set given `newTheme` as current theme.
     */
    setTheme(newTheme) {
        document.body.classList.remove('dark');
        document.body.classList.remove('light');
        document.body.classList.add(newTheme);
        this.otherTheme = newTheme === 'light' ? 'dark' : 'light';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_game_services_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Store"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 35, vars: 17, consts: function () { var i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_2821179408673282599$$SRC_APP_APP_COMPONENT_TS_1 = goog.getMsg("Home");
        i18n_0 = MSG_EXTERNAL_2821179408673282599$$SRC_APP_APP_COMPONENT_TS_1;
    }
    else {
        i18n_0 = "Accueil";
    } var i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5012378086425307818$$SRC_APP_APP_COMPONENT_TS_3 = goog.getMsg("How to play");
        i18n_2 = MSG_EXTERNAL_5012378086425307818$$SRC_APP_APP_COMPONENT_TS_3;
    }
    else {
        i18n_2 = "How to play";
    } var i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3284025535510829624$$SRC_APP_APP_COMPONENT_TS_5 = goog.getMsg("{$interpolation} mode", { "interpolation": "\uFFFD0\uFFFD" });
        i18n_4 = MSG_EXTERNAL_3284025535510829624$$SRC_APP_APP_COMPONENT_TS_5;
    }
    else {
        i18n_4 = "" + "\uFFFD0\uFFFD" + " mode";
    } var i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_1556270137829928334$$SRC_APP_APP_COMPONENT_TS_7 = goog.getMsg("Close menu");
        i18n_6 = MSG_EXTERNAL_1556270137829928334$$SRC_APP_APP_COMPONENT_TS_7;
    }
    else {
        i18n_6 = "Close menu";
    } var i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_7049047853104470141$$SRC_APP_APP_COMPONENT_TS__9 = goog.getMsg("Abandon game");
        i18n_8 = MSG_EXTERNAL_7049047853104470141$$SRC_APP_APP_COMPONENT_TS__9;
    }
    else {
        i18n_8 = "Abandon game";
    } return [["color", "primary"], ["mat-icon-button", "", 3, "click"], ["class", "app__toolbar__title", "routerLink", "/", 4, "ngIf"], ["mode", "over", "fixedInViewport", "", 1, "app__sidenav", 3, "click"], ["snav", ""], [1, "app__sidenav__logo"], ["mat-list-item", "", "routerLink", "/"], i18n_0, ["mat-list-item", "", "routerLink", "/how-to-play"], i18n_2, ["mat-list-item", "", "routerLink", "/", 3, "click", 4, "ngIf"], ["mat-list-item", "", 3, "click"], i18n_4, ["mat-list-item", ""], i18n_6, [1, "app__sidenav__lang-menu"], ["mat-button", ""], [1, "app__content"], ["routerLink", "/", 1, "app__toolbar__title"], ["mat-list-item", "", "routerLink", "/", 3, "click"], i18n_8]; }, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10); return _r1.open(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AppComponent_div_6_Template, 4, 0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-sidenav-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-sidenav", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_mat_sidenav_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10); return _r1.close(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " ng");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](17, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](19, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, AppComponent_a_20_Template, 2, 0, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](21, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_a_click_23_listener() { return ctx.setTheme(ctx.otherTheme); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](24, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](25, "titlecase");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](27, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "En");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Fr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "mat-sidenav-content", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("app__toolbar " + (_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 7, ctx.isHome$) ? "app__toolbar--transparent" : ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("app__toolbar__menu-toggle " + (_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 9, ctx.isHome$) ? "app__toolbar__menu-toggle--inverted" : ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 11, ctx.isHome$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](21, 13, ctx.isGameStarted$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18nExp"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](25, 15, ctx.otherTheme));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18nApply"](24);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbar"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenavContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenav"], _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatNavList"], _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListItem"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__["MatDivider"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenavContent"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["TitleCasePipe"]], styles: [".app__toolbar--transparent[_ngcontent-%COMP%] {\n  background-color: transparent !important;\n}\n.app__toolbar__menu-toggle[_ngcontent-%COMP%] {\n  height: auto;\n  margin-right: 1rem;\n}\n.app__toolbar__menu-toggle--inverted[_ngcontent-%COMP%] {\n  color: var(--color-text);\n}\n.app__toolbar__title[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: var(--color-text-white);\n}\n.app__sidenav[_ngcontent-%COMP%] {\n  height: 100vh;\n  max-width: 66vw;\n  width: 260px;\n}\n.app__sidenav[_ngcontent-%COMP%]   .mat-list-base[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n.app__sidenav__logo[_ngcontent-%COMP%] {\n  background: var(--color-primary);\n  color: var(--color-text-white);\n  height: 140px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 3rem;\n}\n.app__sidenav__lang-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n}\n.app__sidenav__lang-menu[_ngcontent-%COMP%]   .mat-button-base[_ngcontent-%COMP%] {\n  font-size: 1rem !important;\n  min-width: 0;\n}\n.app__content[_ngcontent-%COMP%] {\n  height: calc(100vh - var(--toolbar-height));\n  position: relative;\n  width: 82vw;\n  max-width: 72vh;\n  margin: auto;\n  padding: 0 1rem;\n}\n.mat-drawer-container[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVJO0VBQ0Usd0NBQUE7QUFETjtBQUlJO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0FBRk47QUFJTTtFQUNFLHdCQUFBO0FBRlI7QUFNSTtFQUNFLHFCQUFBO0VBQ0EsOEJBQUE7QUFKTjtBQVFFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FBTko7QUFRSTtFQUNFLGNBQUE7QUFOTjtBQVNJO0VBQ0UsZ0NBQUE7RUFDQSw4QkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFQTjtBQVVJO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0FBUk47QUFVTTtFQUNFLDBCQUFBO0VBQ0EsWUFBQTtBQVJSO0FBYUU7RUFDRSwyQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQVhKO0FBZUE7RUFDRSw2QkFBQTtBQVpGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcCB7XG4gICZfX3Rvb2xiYXIge1xuICAgICYtLXRyYW5zcGFyZW50IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgJl9fbWVudS10b2dnbGUge1xuICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuXG4gICAgICAmLS1pbnZlcnRlZCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmX190aXRsZSB7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBjb2xvcjogdmFyKC0tY29sb3ItdGV4dC13aGl0ZSk7XG4gICAgfVxuICB9XG5cbiAgJl9fc2lkZW5hdiB7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBtYXgtd2lkdGg6IDY2dnc7XG4gICAgd2lkdGg6IDI2MHB4O1xuXG4gICAgLm1hdC1saXN0LWJhc2Uge1xuICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgfVxuXG4gICAgJl9fbG9nbyB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0LXdoaXRlKTtcbiAgICAgIGhlaWdodDogMTQwcHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgIH1cblxuICAgICZfX2xhbmctbWVudSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBib3R0b206IDA7XG5cbiAgICAgIC5tYXQtYnV0dG9uLWJhc2Uge1xuICAgICAgICBmb250LXNpemU6IDFyZW0gIWltcG9ydGFudDtcbiAgICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICZfX2NvbnRlbnQge1xuICAgIGhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLXRvb2xiYXItaGVpZ2h0KSk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiA4MnZ3O1xuICAgIG1heC13aWR0aDogNzJ2aDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgcGFkZGluZzogMCAxcmVtO1xuICB9XG59XG5cbi5tYXQtZHJhd2VyLWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss'],
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _game_services_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"] }, { type: _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["Store"] }]; }, null); })();


/***/ }),

/***/ "XajT":
/*!*************************************************************!*\
  !*** ./src/app/game/state/actions/SetFirstPlayer.action.ts ***!
  \*************************************************************/
/*! exports provided: SetFirstPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetFirstPlayer", function() { return SetFirstPlayer; });
class SetFirstPlayer {
    constructor(player) {
        this.player = player;
    }
}
SetFirstPlayer.type = '[Game] Set first player';


/***/ }),

/***/ "Z1c7":
/*!*************************************************************!*\
  !*** ./src/app/game/player-setup/player-setup.component.ts ***!
  \*************************************************************/
/*! exports provided: PlayerSetupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerSetupComponent", function() { return PlayerSetupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../player */ "Brka");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "r1w0");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/game.service */ "g1xr");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _grid_coin_coin_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../grid/coin/coin.component */ "cJA1");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");













function PlayerSetupComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](2, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-form-field", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Player 1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PlayerSetupComponent_div_1_Template_input_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.player1Name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "app-coin", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-form-field", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Player 2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PlayerSetupComponent_div_1_Template_input_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.player2Name = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "app-coin", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-checkbox", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PlayerSetupComponent_div_1_Template_mat_checkbox_ngModelChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.isPlayingAgainstAi = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](14, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PlayerSetupComponent_div_1_Template_button_click_16_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.onStartGame(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](17, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.player1Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r0.primary)("ngModel", ctx_r0.player2Name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.isPlayingAgainstAi);
} }
function PlayerSetupComponent_div_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-coin", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function PlayerSetupComponent_div_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-coin", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](7, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx_r8.firstPlayer$).color);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 4, ctx_r8.firstPlayer$).name, " ");
} }
function PlayerSetupComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PlayerSetupComponent_div_3_ng_container_1_Template, 2, 0, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PlayerSetupComponent_div_3_ng_container_2_Template, 8, 6, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1.isAnnouncementReady);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1.isAnnouncementReady);
} }
class PlayerSetupComponent {
    constructor(store, game) {
        this.store = store;
        this.game = game;
        this.isAnnouncementReady = false;
        this.isPlayingAgainstAi = true;
        this.announcementDuration = 1600;
        // default input values
        this.player1Name = 'Batman';
        this.player2Name = 'Superman';
    }
    ngOnInit() {
        this.firstPlayer$ = this.store.select(_state__WEBPACK_IMPORTED_MODULE_2__["GameState"].firstPlayer);
    }
    /**
     * Starts the game with player names as entered by the user.
     */
    onStartGame() {
        // set players
        this.game.setup(new _player__WEBPACK_IMPORTED_MODULE_1__["Player"]('player-1', this.player1Name), new _player__WEBPACK_IMPORTED_MODULE_1__["Player"]('player-2', this.player2Name, this.isPlayingAgainstAi));
        // hide announcement animation
        setTimeout(() => {
            this.isAnnouncementReady = true;
        }, this.announcementDuration * 0.6);
        // starts the game after quick wait to display starting player
        setTimeout(() => this.game.start(), 1.6 * this.announcementDuration);
    }
}
PlayerSetupComponent.ɵfac = function PlayerSetupComponent_Factory(t) { return new (t || PlayerSetupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"])); };
PlayerSetupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlayerSetupComponent, selectors: [["app-player-setup"]], decls: 5, vars: 6, consts: function () { var i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6762329111822034215$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS__1 = goog.getMsg(" Enter players name ");
        i18n_0 = MSG_EXTERNAL_6762329111822034215$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS__1;
    }
    else {
        i18n_0 = " Enter players name ";
    } var i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6573019959981035464$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS__3 = goog.getMsg("Player 2 is computer");
        i18n_2 = MSG_EXTERNAL_6573019959981035464$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS__3;
    }
    else {
        i18n_2 = "Player 2 is computer";
    } var i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5684313723558806707$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS__5 = goog.getMsg(" Start Game ");
        i18n_4 = MSG_EXTERNAL_5684313723558806707$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS__5;
    }
    else {
        i18n_4 = " Start Game ";
    } var i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_842148603172304195$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS___7 = goog.getMsg("starts!");
        i18n_6 = MSG_EXTERNAL_842148603172304195$$SRC_APP_GAME_PLAYER_SETUP_PLAYER_SETUP_COMPONENT_TS___7;
    }
    else {
        i18n_6 = "starts!";
    } return [[1, "player-setup"], [4, "ngIf"], ["class", "player-setup__announcement", 4, "ngIf"], [1, "player-setup__title", "mat-display-1"], i18n_0, ["appearance", "standard"], ["matInput", "", "name", "player1Name", 1, "player-setup__player-name-input", 3, "ngModel", "ngModelChange"], ["matSuffix", "", "color", "player-1", 1, "player-setup__player-name-input__suffix"], ["matInput", "", "name", "player2Name", 1, "player-setup__player-name-input", 3, "color", "ngModel", "ngModelChange"], ["matSuffix", "", "color", "player-2", 1, "player-setup__player-name-input__suffix"], ["name", "player2Ai", 3, "ngModel", "ngModelChange"], i18n_2, ["mat-flat-button", "", "color", "primary", 1, "player-setup__finish-button", 3, "click"], i18n_4, [1, "player-setup__announcement"], [1, "player-setup__announcement__coin", "player-setup__announcement__coin--spinning"], [1, "player-setup__announcement__coin", 3, "color"], [1, "player-setup__announcement__message", "mat-display-1"], i18n_6]; }, template: function PlayerSetupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, PlayerSetupComponent_div_1_Template, 18, 4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, PlayerSetupComponent_div_3_Template, 3, 2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, ctx.firstPlayer$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 4, ctx.firstPlayer$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _grid_coin_coin_component__WEBPACK_IMPORTED_MODULE_9__["CoinComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatSuffix"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_10__["MatCheckbox"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: [".player-setup[_ngcontent-%COMP%]   mat-form-field.mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  font-size: 1.2rem;\n}\n.player-setup__title[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.player-setup__player-name-input__color1[_ngcontent-%COMP%] {\n  color: var(--color-player-1);\n}\n.player-setup__player-name-input__color2[_ngcontent-%COMP%] {\n  color: var(--color-player-2);\n}\n.player-setup__player-name-input__suffix[_ngcontent-%COMP%] {\n  height: 1.5rem;\n  display: flex;\n}\n.player-setup__finish-button[_ngcontent-%COMP%] {\n  margin-top: var(--toolbar-height);\n  width: 100%;\n}\n.player-setup__announcement[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.player-setup__announcement__coin[_ngcontent-%COMP%] {\n  height: 8rem;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 2rem;\n}\n.player-setup__announcement__coin--spinning[_ngcontent-%COMP%] {\n  animation: coinSpin 0.2s linear;\n  animation-iteration-count: infinite;\n  animation-direction: normal;\n}\n@keyframes coinSpin {\n  0% {\n    transform: rotateY(0);\n    color: var(--color-player-1);\n  }\n  50% {\n    transform: rotateY(90deg);\n    color: var(--color-player-2);\n  }\n  100% {\n    transform: rotateY(180deg);\n    color: var(--color-player-1);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2FtZS9wbGF5ZXItc2V0dXAvcGxheWVyLXNldHVwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0FBQUo7QUFHRTtFQUNFLGtCQUFBO0FBREo7QUFLSTtFQUNFLDRCQUFBO0FBSE47QUFNSTtFQUNFLDRCQUFBO0FBSk47QUFPSTtFQUNFLGNBQUE7RUFDQSxhQUFBO0FBTE47QUFTRTtFQUNFLGlDQUFBO0VBQ0EsV0FBQTtBQVBKO0FBVUU7RUFDRSxrQkFBQTtBQVJKO0FBVUk7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFSTjtBQVVNO0VBQ0UsK0JBQUE7RUFDQSxtQ0FBQTtFQUNBLDJCQUFBO0FBUlI7QUFjQTtFQUNFO0lBQ0UscUJBQUE7SUFDQSw0QkFBQTtFQVhGO0VBYUE7SUFDRSx5QkFBQTtJQUNBLDRCQUFBO0VBWEY7RUFhQTtJQUNFLDBCQUFBO0lBQ0EsNEJBQUE7RUFYRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvZ2FtZS9wbGF5ZXItc2V0dXAvcGxheWVyLXNldHVwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBsYXllci1zZXR1cCB7XG4gIG1hdC1mb3JtLWZpZWxkLm1hdC1mb3JtLWZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgfVxuXG4gICZfX3RpdGxlIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAmX19wbGF5ZXItbmFtZS1pbnB1dCB7XG4gICAgJl9fY29sb3IxIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1wbGF5ZXItMSk7XG4gICAgfVxuXG4gICAgJl9fY29sb3IyIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1jb2xvci1wbGF5ZXItMik7XG4gICAgfVxuXG4gICAgJl9fc3VmZml4IHtcbiAgICAgIGhlaWdodDogMS41cmVtO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gIH1cblxuICAmX19maW5pc2gtYnV0dG9uIHtcbiAgICBtYXJnaW4tdG9wOiB2YXIoLS10b29sYmFyLWhlaWdodCk7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAmX19hbm5vdW5jZW1lbnQge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgICZfX2NvaW4ge1xuICAgICAgaGVpZ2h0OiA4cmVtO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcblxuICAgICAgJi0tc3Bpbm5pbmcge1xuICAgICAgICBhbmltYXRpb246IGNvaW5TcGluIDAuMnMgbGluZWFyO1xuICAgICAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgICAgICAgYW5pbWF0aW9uLWRpcmVjdGlvbjogbm9ybWFsO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIGNvaW5TcGluIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWSgwKTtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItcGxheWVyLTEpO1xuICB9XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDkwZGVnKTtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItcGxheWVyLTIpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1wbGF5ZXItMSk7XG4gIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlayerSetupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-player-setup',
                templateUrl: './player-setup.component.html',
                styleUrls: ['./player-setup.component.scss'],
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"] }, { type: _services_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _game_game_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game/game.module */ "ekgB");
/* harmony import */ var _pages_pages_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/pages.module */ "dgmN");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./material.module */ "vvyD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");












class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["CommonModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
            _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
            _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["NgxsModule"].forRoot([]),
            _game_game_module__WEBPACK_IMPORTED_MODULE_6__["GameModule"],
            _pages_pages_module__WEBPACK_IMPORTED_MODULE_7__["PagesModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["CommonModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
        _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"], _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["ɵk"], _game_game_module__WEBPACK_IMPORTED_MODULE_6__["GameModule"],
        _pages_pages_module__WEBPACK_IMPORTED_MODULE_7__["PagesModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_9__["CommonModule"],
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                    _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
                    _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["NgxsModule"].forRoot([]),
                    _game_game_module__WEBPACK_IMPORTED_MODULE_6__["GameModule"],
                    _pages_pages_module__WEBPACK_IMPORTED_MODULE_7__["PagesModule"],
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "cJA1":
/*!*********************************************!*\
  !*** ./src/app/grid/coin/coin.component.ts ***!
  \*********************************************/
/*! exports provided: CoinComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoinComponent", function() { return CoinComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CoinComponent {
    constructor() { }
    /**
     * Returns the css class for coin color.
     */
    coinColor() {
        return this.color ? `coin--${this.color}` : '';
    }
}
CoinComponent.ɵfac = function CoinComponent_Factory(t) { return new (t || CoinComponent)(); };
CoinComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CoinComponent, selectors: [["app-coin"]], inputs: { color: "color" }, decls: 3, vars: 2, consts: [["version", "1.1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 100 100", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 100 100"], ["cx", "50", "cy", "50", "r", "50", "fill", "currentColor"], ["cx", "50", "cy", "50", "r", "40", "fill", "#fff", "fill-opacity", "0.4"]], template: function CoinComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "circle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "circle", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("coin " + ctx.coinColor());
    } }, styles: [".coin[_ngcontent-%COMP%] {\n  z-index: 1000;\n  display: flex;\n  height: 100%;\n}\n.coin[_ngcontent-%COMP%]::selection {\n  background-color: transparent;\n}\n.coin--player-1[_ngcontent-%COMP%] {\n  color: var(--color-player-1);\n}\n.coin--player-2[_ngcontent-%COMP%] {\n  color: var(--color-player-2);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JpZC9jb2luL2NvaW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFDRjtBQUNFO0VBQ0UsNkJBQUE7QUFDSjtBQUVFO0VBQ0UsNEJBQUE7QUFBSjtBQUdFO0VBQ0UsNEJBQUE7QUFESiIsImZpbGUiOiJzcmMvYXBwL2dyaWQvY29pbi9jb2luLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvaW4ge1xuICB6LWluZGV4OiAxMDAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgJjo6c2VsZWN0aW9uIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxuXG4gICYtLXBsYXllci0xIHtcbiAgICBjb2xvcjogdmFyKC0tY29sb3ItcGxheWVyLTEpO1xuICB9XG5cbiAgJi0tcGxheWVyLTIge1xuICAgIGNvbG9yOiB2YXIoLS1jb2xvci1wbGF5ZXItMik7XG4gIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoinComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-coin',
                templateUrl: './coin.component.html',
                styleUrls: ['./coin.component.scss'],
            }]
    }], function () { return []; }, { color: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "dgmN":
/*!***************************************!*\
  !*** ./src/app/pages/pages.module.ts ***!
  \***************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../material.module */ "vvyD");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "1LmZ");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rules_rules_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rules/rules.component */ "jGP1");







class PagesModule {
}
PagesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: PagesModule });
PagesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function PagesModule_Factory(t) { return new (t || PagesModule)(); }, imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _material_module__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PagesModule, { declarations: [_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"], _rules_rules_component__WEBPACK_IMPORTED_MODULE_5__["RulesComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _material_module__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PagesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"], _rules_rules_component__WEBPACK_IMPORTED_MODULE_5__["RulesComponent"]],
                imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _material_module__WEBPACK_IMPORTED_MODULE_2__["MaterialModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "ekgB":
/*!*************************************!*\
  !*** ./src/app/game/game.module.ts ***!
  \*************************************/
/*! exports provided: GameModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameModule", function() { return GameModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _game_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.component */ "jBAD");
/* harmony import */ var _timer_timer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timer/timer.component */ "HKqw");
/* harmony import */ var _player_setup_player_setup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player-setup/player-setup.component */ "Z1c7");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state */ "r1w0");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../material.module */ "vvyD");
/* harmony import */ var _grid_grid_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../grid/grid.module */ "21aE");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");













class GameModule {
}
GameModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: GameModule });
GameModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function GameModule_Factory(t) { return new (t || GameModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _grid_grid_module__WEBPACK_IMPORTED_MODULE_9__["GridModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"],
            _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forFeature([_state__WEBPACK_IMPORTED_MODULE_6__["GameState"]]),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](GameModule, { declarations: [_game_component__WEBPACK_IMPORTED_MODULE_2__["GameComponent"], _timer_timer_component__WEBPACK_IMPORTED_MODULE_3__["TimerComponent"], _player_setup_player_setup_component__WEBPACK_IMPORTED_MODULE_4__["PlayerSetupComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _grid_grid_module__WEBPACK_IMPORTED_MODULE_9__["GridModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
        _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"], _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["ɵbc"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_game_component__WEBPACK_IMPORTED_MODULE_2__["GameComponent"], _timer_timer_component__WEBPACK_IMPORTED_MODULE_3__["TimerComponent"], _player_setup_player_setup_component__WEBPACK_IMPORTED_MODULE_4__["PlayerSetupComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _grid_grid_module__WEBPACK_IMPORTED_MODULE_9__["GridModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                    _material_module__WEBPACK_IMPORTED_MODULE_8__["MaterialModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"],
                    _ngxs_store__WEBPACK_IMPORTED_MODULE_5__["NgxsModule"].forFeature([_state__WEBPACK_IMPORTED_MODULE_6__["GameState"]]),
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "g1xr":
/*!***********************************************!*\
  !*** ./src/app/game/services/game.service.ts ***!
  \***********************************************/
/*! exports provided: GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _grid_state_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../grid/state/actions */ "GbKy");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/actions */ "wyGW");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state */ "r1w0");
/* harmony import */ var _grid_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../grid/state */ "8HBv");
/* harmony import */ var _grid_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../grid/config */ "6g8r");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngxs/store */ "AcyG");








class GameService {
    constructor(store) {
        this.store = store;
    }
    /**
     * Initilaize the game's players.
     */
    setup(player1, player2) {
        const firstPlayer = Math.random() > 0.5 ? player1 : player2;
        this.store.dispatch(new _state_actions__WEBPACK_IMPORTED_MODULE_2__["SetPlayers"](player1, player2));
        this.store.dispatch(new _state_actions__WEBPACK_IMPORTED_MODULE_2__["SetFirstPlayer"](firstPlayer));
    }
    /**
     * Starts the game :)
     */
    start() {
        // reset the grid and starts the game
        this.store.dispatch(new _grid_state_actions__WEBPACK_IMPORTED_MODULE_1__["Reset"]());
        this.store.dispatch(new _state_actions__WEBPACK_IMPORTED_MODULE_2__["Start"]());
    }
    /**
     * Clears the game.
     */
    clear() {
        this.store.dispatch(new _state_actions__WEBPACK_IMPORTED_MODULE_2__["Clear"]());
    }
    /**
     * Play a coin for active player in given `col` and
     */
    play(col) {
        // make sure the game has started
        if (!this.store.selectSnapshot(_state__WEBPACK_IMPORTED_MODULE_3__["GameState"].isStarted)) {
            throw new Error('[Game Service] The game has not started, play() is not allowed.');
        }
        // make sure targeted colum is not full
        const gridCols = this.store.selectSnapshot((state) => state.grid.cols);
        if (gridCols[col].length >= _grid_config__WEBPACK_IMPORTED_MODULE_5__["GRID_ROWS"]) {
            return;
        }
        // play coin for active player
        const activePlayer = this.store.selectSnapshot(_state__WEBPACK_IMPORTED_MODULE_3__["GameState"].activePlayer);
        this.store.dispatch(new _grid_state_actions__WEBPACK_IMPORTED_MODULE_1__["PlayCoin"](activePlayer.color, col));
        // get play values
        const row = gridCols[col].length - 1;
        const value = gridCols[col][row];
        // get connected cells
        const cells = this.getConnectedCells({ col, row }, value);
        // check if game is won
        if (cells) {
            this.store.dispatch(new _grid_state_actions__WEBPACK_IMPORTED_MODULE_1__["HighlightCells"](cells));
            this.store.dispatch(new _state_actions__WEBPACK_IMPORTED_MODULE_2__["Won"](activePlayer));
            return;
        }
        // check if game is over
        if (this.store.selectSnapshot(_grid_state__WEBPACK_IMPORTED_MODULE_4__["GridState"].isFull)) {
            this.store.dispatch(new _state_actions__WEBPACK_IMPORTED_MODULE_2__["End"]());
            return;
        }
        // start next player's turn
        this.store.dispatch(new _state_actions__WEBPACK_IMPORTED_MODULE_2__["NextPlayer"]());
    }
    /**
     * Look in 4 directions (horizontal, vertical, backward diagonal and
     * forward diagonal) around given `pivot` for cells that have the same value
     * as given `value`. Returns the cells coordinates if 4 connected ones are
     * found, `null` otherwise.
     */
    getConnectedCells(pivot, value) {
        const gridCols = this.store.selectSnapshot((state) => state.grid.cols);
        // define utils
        const coefs = [-3, -2, -1, 0, 1, 2, 3];
        const bases = [
            // vertical
            { h: 0, v: 1 },
            // horizontal
            { h: 1, v: 0 },
            // backwardDiag
            { h: 1, v: -1 },
            // forwardDiag
            { h: 1, v: 1 },
        ];
        // check every base
        let winningCells;
        let col;
        let row;
        let cellValue;
        for (const base of bases) {
            // try to extract 4 consecutive cells
            winningCells = [];
            for (const coef of coefs) {
                col = base.v * coef + pivot.col;
                row = base.h * coef + pivot.row;
                // skip if out of bounds
                if (0 > col || col >= _grid_config__WEBPACK_IMPORTED_MODULE_5__["GRID_COLS"] || 0 > row || row >= _grid_config__WEBPACK_IMPORTED_MODULE_5__["GRID_ROWS"]) {
                    continue;
                }
                // add cell if matching played value
                cellValue = gridCols[col][row] || '';
                if (cellValue === value) {
                    winningCells.push({ col, row });
                    // we have 4 cells !
                    if (winningCells.length === 4) {
                        return winningCells;
                    }
                }
                // reset winning cells list
                else {
                    winningCells = [];
                }
            }
        }
        // if we reach here, no more than 3 connected cells
        return null;
    }
}
GameService.ɵfac = function GameService_Factory(t) { return new (t || GameService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Store"])); };
GameService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GameService, factory: GameService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_6__["Store"] }]; }, null); })();


/***/ }),

/***/ "jBAD":
/*!****************************************!*\
  !*** ./src/app/game/game.component.ts ***!
  \****************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "r1w0");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/game.service */ "g1xr");
/* harmony import */ var _services_ai_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/ai.service */ "rM0+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _player_setup_player_setup_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./player-setup/player-setup.component */ "Z1c7");
/* harmony import */ var _timer_timer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./timer/timer.component */ "HKqw");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../grid/grid.component */ "Ludi");
/* harmony import */ var _grid_coin_coin_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../grid/coin/coin.component */ "cJA1");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "tyNb");














function GameComponent_app_player_setup_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-player-setup");
} }
function GameComponent_div_3_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-coin", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](6, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    var tmp_0_0 = null;
    var tmp_1_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, ctx_r3.activePlayer$)) == null ? null : tmp_0_0.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (tmp_1_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 4, ctx_r3.activePlayer$)) == null ? null : tmp_1_0.name, " ");
} }
function GameComponent_div_3_span_7_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](4, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r6.winner$).name, " ");
} }
function GameComponent_div_3_span_7_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](1, 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function GameComponent_div_3_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, GameComponent_div_3_span_7_span_1_Template, 5, 3, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, GameComponent_div_3_span_7_span_3_Template, 2, 0, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 2, ctx_r4.winner$));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 4, ctx_r4.winner$));
} }
function GameComponent_div_3_a_10_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function GameComponent_div_3_a_10_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r8.onExitGame(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵi18n"](1, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function GameComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "header", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "app-timer", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, GameComponent_div_3_span_5_Template, 7, 6, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, GameComponent_div_3_span_7_Template, 5, 6, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "app-grid", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, GameComponent_div_3_a_10_Template, 2, 0, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("isRunning", ctx_r1.isGridUnveiled && !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](3, 6, ctx_r1.isGameOver$))("offset", ctx_r1.timerOffset);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 8, ctx_r1.isGameOver$));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 10, ctx_r1.isGameOver$));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("isVeiled", ctx_r1.isGridVeiled);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](11, 12, ctx_r1.isGameOver$));
} }
function GameComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    var tmp_0_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]("game__glow game__glow--" + ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 2, ctx_r2.activePlayer$)) == null ? null : tmp_0_0.color));
} }
class GameComponent {
    constructor(store, game, ai) {
        this.store = store;
        this.game = game;
        this.ai = ai;
        this.timerOffset = 0;
    }
    ngOnInit() {
        this.isGameStarted$ = this.store.select(_state__WEBPACK_IMPORTED_MODULE_2__["GameState"].isStarted);
        this.isGameOver$ = this.store.select(_state__WEBPACK_IMPORTED_MODULE_2__["GameState"].isOver);
        this.activePlayer$ = this.store.select(_state__WEBPACK_IMPORTED_MODULE_2__["GameState"].activePlayer);
        this.winner$ = this.store.select(_state__WEBPACK_IMPORTED_MODULE_2__["GameState"].winner);
        this.isGridVeiled = true;
        this.isGridUnveiled = false;
        // prep IA
        this.ai.awake();
        // sets timer offset
        this.store.selectSnapshot((state) => {
            // no start timestamp in store
            if (!state.game.startTimestamp) {
                this.timerOffset = 0;
                return;
            }
            // calc offset in seconds
            const now = new Date().getTime();
            this.timerOffset = Math.round((now - state.game.startTimestamp) / 1000);
        });
        // unveil grid upon game starting
        this.isGameStarted$.subscribe((value) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (value) {
                yield this.unveilGame();
                this.isGridUnveiled = true;
            }
        }));
    }
    unveilGame() {
        return new Promise((resolve) => {
            // defer game unveiling to trigger animation
            window.setTimeout(() => {
                this.isGridVeiled = false;
            }, 10);
            // wait for css animation
            window.setTimeout(resolve, 800);
        });
    }
    /**
     * Resets the game state
     */
    onExitGame() {
        this.game.clear();
    }
}
GameComponent.ɵfac = function GameComponent_Factory(t) { return new (t || GameComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_ai_service__WEBPACK_IMPORTED_MODULE_5__["AiService"])); };
GameComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: GameComponent, selectors: [["app-game"]], decls: 6, vars: 7, consts: function () { var i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_78419712201206908$$SRC_APP_GAME_GAME_COMPONENT_TS___1 = goog.getMsg("'s turn");
        i18n_0 = MSG_EXTERNAL_78419712201206908$$SRC_APP_GAME_GAME_COMPONENT_TS___1;
    }
    else {
        i18n_0 = "'s turn";
    } var i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6353387074157409101$$SRC_APP_GAME_GAME_COMPONENT_TS____3 = goog.getMsg("won!");
        i18n_2 = MSG_EXTERNAL_6353387074157409101$$SRC_APP_GAME_GAME_COMPONENT_TS____3;
    }
    else {
        i18n_2 = "won!";
    } var i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3013918027018431519$$SRC_APP_GAME_GAME_COMPONENT_TS____5 = goog.getMsg(" Draw! ");
        i18n_4 = MSG_EXTERNAL_3013918027018431519$$SRC_APP_GAME_GAME_COMPONENT_TS____5;
    }
    else {
        i18n_4 = " Draw! ";
    } var i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6450872891750749716$$SRC_APP_GAME_GAME_COMPONENT_TS___7 = goog.getMsg(" Home ");
        i18n_6 = MSG_EXTERNAL_6450872891750749716$$SRC_APP_GAME_GAME_COMPONENT_TS___7;
    }
    else {
        i18n_6 = " Home ";
    } return [[1, "game"], [4, "ngIf"], ["class", "game__playing", 4, "ngIf"], [3, "class", 4, "ngIf"], [1, "game__playing"], [1, "game__playing__header"], [3, "isRunning", "offset"], [1, "game__playing__status"], ["class", "mat-display-1", 4, "ngIf"], [1, "game__playing__grid", 3, "isVeiled"], ["mat-flat-button", "", "color", "primary", "class", "game__playing__exit-button", "routerLink", "/", 3, "click", 4, "ngIf"], [1, "game__playing__status__coin", 3, "color"], i18n_0, [1, "mat-display-1"], i18n_2, i18n_4, ["mat-flat-button", "", "color", "primary", "routerLink", "/", 1, "game__playing__exit-button", 3, "click"], i18n_6]; }, template: function GameComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, GameComponent_app_player_setup_1_Template, 1, 0, "app-player-setup", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, GameComponent_div_3_Template, 12, 14, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, GameComponent_div_5_Template, 2, 4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 3, ctx.isGameStarted$));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 5, ctx.isGameStarted$));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isGridUnveiled);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _player_setup_player_setup_component__WEBPACK_IMPORTED_MODULE_7__["PlayerSetupComponent"], _timer_timer_component__WEBPACK_IMPORTED_MODULE_8__["TimerComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_9__["GridComponent"], _grid_coin_coin_component__WEBPACK_IMPORTED_MODULE_10__["CoinComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatAnchor"], _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: [".game[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n}\n.game__playing[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.game__playing__header[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3rem;\n  left: 0;\n  right: 0;\n  text-align: center;\n}\n.game__playing__status[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  font-size: 1.4rem;\n}\n.game__playing__status__coin[_ngcontent-%COMP%] {\n  height: 1rem;\n  display: inline-flex;\n  margin-right: 0.4rem;\n}\n.game__playing__grid[_ngcontent-%COMP%] {\n  margin: auto;\n  padding-bottom: 3rem;\n}\n.game__playing__exit-button[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3rem;\n  width: 100%;\n}\n.game__glow[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: -1;\n  top: var(--toolbar-height);\n}\n.game__glow--player-1[_ngcontent-%COMP%] {\n  box-shadow: 0 0 2rem -0.6rem var(--color-player-1) inset;\n}\n.game__glow--player-2[_ngcontent-%COMP%] {\n  box-shadow: 0 0 2rem -0.6rem var(--color-player-2) inset;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ2FtZS9nYW1lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQUNGO0FBQ0U7RUFDRSxXQUFBO0FBQ0o7QUFDSTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7QUFDTjtBQUVJO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtBQUFOO0FBRU07RUFDRSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxvQkFBQTtBQUFSO0FBSUk7RUFDRSxZQUFBO0VBQ0Esb0JBQUE7QUFGTjtBQUtJO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQUhOO0FBT0U7RUFDRSxlQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLDBCQUFBO0FBTEo7QUFPSTtFQUNFLHdEQUFBO0FBTE47QUFRSTtFQUNFLHdEQUFBO0FBTk4iLCJmaWxlIjoic3JjL2FwcC9nYW1lL2dhbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZ2FtZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmX19wbGF5aW5nIHtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgICZfX2hlYWRlciB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDNyZW07XG4gICAgICBsZWZ0OiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgJl9fc3RhdHVzIHtcbiAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICBmb250LXNpemU6IDEuNHJlbTtcblxuICAgICAgJl9fY29pbiB7XG4gICAgICAgIGhlaWdodDogMXJlbTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMC40cmVtO1xuICAgICAgfVxuICAgIH1cblxuICAgICZfX2dyaWQge1xuICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgcGFkZGluZy1ib3R0b206IDNyZW07XG4gICAgfVxuXG4gICAgJl9fZXhpdC1idXR0b24ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYm90dG9tOiAzcmVtO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICB9XG5cbiAgJl9fZ2xvdyB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHotaW5kZXg6IC0xO1xuICAgIHRvcDogdmFyKC0tdG9vbGJhci1oZWlnaHQpO1xuXG4gICAgJi0tcGxheWVyLTEge1xuICAgICAgYm94LXNoYWRvdzogMCAwIDJyZW0gLTAuNnJlbSB2YXIoLS1jb2xvci1wbGF5ZXItMSkgaW5zZXQ7XG4gICAgfVxuXG4gICAgJi0tcGxheWVyLTIge1xuICAgICAgYm94LXNoYWRvdzogMCAwIDJyZW0gLTAuNnJlbSB2YXIoLS1jb2xvci1wbGF5ZXItMikgaW5zZXQ7XG4gICAgfVxuICB9XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GameComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-game',
                templateUrl: './game.component.html',
                styleUrls: ['./game.component.scss'],
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"] }, { type: _services_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"] }, { type: _services_ai_service__WEBPACK_IMPORTED_MODULE_5__["AiService"] }]; }, null); })();


/***/ }),

/***/ "jGP1":
/*!************************************************!*\
  !*** ./src/app/pages/rules/rules.component.ts ***!
  \************************************************/
/*! exports provided: RulesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RulesComponent", function() { return RulesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class RulesComponent {
    constructor() { }
    ngOnInit() {
    }
}
RulesComponent.ɵfac = function RulesComponent_Factory(t) { return new (t || RulesComponent)(); };
RulesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RulesComponent, selectors: [["app-rules"]], decls: 17, vars: 0, consts: function () { var i18n_0; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_5012378086425307818$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_1 = goog.getMsg("How to play");
        i18n_0 = MSG_EXTERNAL_5012378086425307818$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_1;
    }
    else {
        i18n_0 = "How to play";
    } var i18n_2; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_4450459329095452954$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_3 = goog.getMsg(" Connect 4 is a two player game where they play coins in turn in a 6 by 7 grid until victory or filling the grid. ");
        i18n_2 = MSG_EXTERNAL_4450459329095452954$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_3;
    }
    else {
        i18n_2 = " Connect 4 is a two player game where they play coins in turn in a 6 by 7 grid until victory or filling the grid. ";
    } var i18n_4; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_502130212127803987$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_5 = goog.getMsg("Goal");
        i18n_4 = MSG_EXTERNAL_502130212127803987$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_5;
    }
    else {
        i18n_4 = "Goal";
    } var i18n_6; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6492469195232839596$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_7 = goog.getMsg(" The goal of the game is to connect 4 coins of your color in any direction. If the grid is full, the game is a draw. ");
        i18n_6 = MSG_EXTERNAL_6492469195232839596$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_7;
    }
    else {
        i18n_6 = " The goal of the game is to connect 4 coins of your color in any direction. If the grid is full, the game is a draw. ";
    } var i18n_8; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_6492831808763156510$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_9 = goog.getMsg("Setup");
        i18n_8 = MSG_EXTERNAL_6492831808763156510$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_9;
    }
    else {
        i18n_8 = "Setup";
    } var i18n_10; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_8101952216292093752$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_11 = goog.getMsg(" The two players choose a color. One of them is choosed to start the game. ");
        i18n_10 = MSG_EXTERNAL_8101952216292093752$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_11;
    }
    else {
        i18n_10 = " The two players choose a color. One of them is choosed to start the game. ";
    } var i18n_12; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_3015012963934645778$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_13 = goog.getMsg("Playing");
        i18n_12 = MSG_EXTERNAL_3015012963934645778$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_13;
    }
    else {
        i18n_12 = "Playing";
    } var i18n_14; if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
        const MSG_EXTERNAL_4461794869397468036$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_15 = goog.getMsg(" Coins \"fall\" in the column they're played in. In other words, the grid is fill from the bottom row up. Players play 1 coin during their turn and then wait for the other player to play. Any player can play in any column. ");
        i18n_14 = MSG_EXTERNAL_4461794869397468036$$SRC_APP_PAGES_RULES_RULES_COMPONENT_TS_15;
    }
    else {
        i18n_14 = " Coins \"fall\" in the column they're played in. In other words, the grid is fill from the bottom row up. Players play 1 coin during their turn and then wait for the other player to play. Any player can play in any column. ";
    } return [[1, "rules"], [1, "mat-display-1"], i18n_0, i18n_2, i18n_4, i18n_6, i18n_8, i18n_10, i18n_12, i18n_14]; }, template: function RulesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](2, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](4, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](6, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](8, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](10, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](12, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](14, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](16, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".rules[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n  font-size: 1.2rem;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcnVsZXMvcnVsZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvcnVsZXMvcnVsZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucnVsZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RulesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-rules',
                templateUrl: './rules.component.html',
                styleUrls: ['./rules.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "jjy2":
/*!****************************************************!*\
  !*** ./src/app/grid/state/actions/Reset.action.ts ***!
  \****************************************************/
/*! exports provided: Reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reset", function() { return Reset; });
class Reset {
    constructor() { }
}
Reset.type = '[Grid] Reset';


/***/ }),

/***/ "l2i6":
/*!****************************************************!*\
  !*** ./src/app/game/state/actions/Clear.action.ts ***!
  \****************************************************/
/*! exports provided: Clear */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clear", function() { return Clear; });
class Clear {
    constructor() { }
}
Clear.type = '[Game] Clear game';


/***/ }),

/***/ "l3Ov":
/*!*************************************************************!*\
  !*** ./src/app/grid/state/actions/HighlightCells.action.ts ***!
  \*************************************************************/
/*! exports provided: HighlightCells */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlightCells", function() { return HighlightCells; });
class HighlightCells {
    constructor(cells) {
        this.cells = cells;
    }
}
HighlightCells.type = '[Grid] Highlight cells';


/***/ }),

/***/ "pzQ8":
/*!**************************************************!*\
  !*** ./src/app/game/state/actions/Won.action.ts ***!
  \**************************************************/
/*! exports provided: Won */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Won", function() { return Won; });
class Won {
    constructor(winner) {
        this.winner = winner;
    }
}
Won.type = '[Game] Game won';


/***/ }),

/***/ "r1w0":
/*!*************************************!*\
  !*** ./src/app/game/state/index.ts ***!
  \*************************************/
/*! exports provided: GameState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameState", function() { return GameState; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "wyGW");





let GameState = class GameState {
    /**
     * Returns `true` if the game has a start time.
     */
    static isStarted(state) {
        return !!state.startTimestamp;
    }
    /**
     * Returns `true` if the game is over.
     */
    static isOver(state) {
        return state.isOver;
    }
    /**
     * Get the player that plays first in the current game.
     */
    static firstPlayer(state) {
        return state.firstPlayer;
    }
    /**
     * Get the currently active player.
     */
    static activePlayer(state) {
        return state.activePlayer;
    }
    /**
     * Get the winner player.
     */
    static winner(state) {
        return state.winner;
    }
    /**
     * Set the players.
     */
    setPlayers(ctx, action) {
        ctx.patchState({
            players: [action.player1, action.player2],
        });
    }
    /**
     * Set the player that will start the game.
     */
    setFirstPlayer(ctx, action) {
        ctx.patchState({ firstPlayer: action.player });
    }
    /**
     * Starts the game by setting the start timestamp and initializing
     * activePlayer.
     */
    startGame(ctx) {
        const state = ctx.getState();
        ctx.patchState({
            isOver: false,
            startTimestamp: new Date().getTime(),
            activePlayer: state.firstPlayer,
        });
    }
    /**
     * Sets the winner of the game.
     */
    setWinner(ctx, action) {
        ctx.patchState({ winner: action.winner });
    }
    /**
     * Marks the game as over.
     */
    endGame(ctx) {
        ctx.patchState({ isOver: true });
    }
    /**
     * Resets state.
     */
    clearGame(ctx) {
        ctx.patchState({
            players: [],
            firstPlayer: undefined,
            winner: undefined,
            isOver: true,
            startTimestamp: undefined,
        });
    }
    /**
     * Switch the active player.
     */
    startNextPlayersTurn(ctx) {
        const state = ctx.getState();
        const innactivePlayer = state.players.find((player) => player !== state.activePlayer);
        ctx.patchState({ activePlayer: innactivePlayer });
    }
};
GameState.ɵfac = function GameState_Factory(t) { return new (t || GameState)(); };
GameState.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GameState, factory: GameState.ɵfac });
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["SetPlayers"])
], GameState.prototype, "setPlayers", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["SetFirstPlayer"])
], GameState.prototype, "setFirstPlayer", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["Start"])
], GameState.prototype, "startGame", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["Won"])
], GameState.prototype, "setWinner", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["End"]),
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["Won"])
], GameState.prototype, "endGame", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["Clear"])
], GameState.prototype, "clearGame", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Action"])(_actions__WEBPACK_IMPORTED_MODULE_3__["NextPlayer"])
], GameState.prototype, "startNextPlayersTurn", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])()
], GameState, "isStarted", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])()
], GameState, "isOver", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])()
], GameState, "firstPlayer", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])()
], GameState, "activePlayer", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Selector"])()
], GameState, "winner", null);
GameState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_2__["State"])({
        name: 'game',
        defaults: {
            players: [],
            firstPlayer: undefined,
            activePlayer: undefined,
            winner: undefined,
            startTimestamp: undefined,
            isOver: true,
        },
    })
], GameState);

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GameState, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"]
    }], null, { setPlayers: [], setFirstPlayer: [], startGame: [], setWinner: [], endGame: [], clearGame: [], startNextPlayersTurn: [] }); })();


/***/ }),

/***/ "rM0+":
/*!*********************************************!*\
  !*** ./src/app/game/services/ai.service.ts ***!
  \*********************************************/
/*! exports provided: AiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AiService", function() { return AiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_grid_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/grid/config */ "6g8r");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state */ "r1w0");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngxs/store */ "AcyG");
/* harmony import */ var _game_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game.service */ "g1xr");






class AiService {
    constructor(store, game) {
        this.store = store;
        this.game = game;
        this.subscriptions = [];
        this.thinkTime = 600;
        this.isAwaken = false;
        this.newTurn$ = this.store.select(_state__WEBPACK_IMPORTED_MODULE_2__["GameState"].activePlayer);
        this.gameOver$ = this.store.select(_state__WEBPACK_IMPORTED_MODULE_2__["GameState"].isOver);
    }
    /**
     * Returns `true` if service was awaken already
     */
    isAwake() {
        return this.isAwaken;
    }
    /**
     * Make the AI aware of game starting / stopping.
     */
    awake() {
        // do not awake twice
        if (this.isAwaken) {
            return;
        }
        // start / stop with game
        this.gameOver$.subscribe((isGameOver) => {
            isGameOver ? this.stop() : this.start();
        });
        // mark as awake
        this.isAwaken = true;
    }
    /**
     * Subscribe to active player change. When it's AI's turn, play after
     * thinking for a bit.
     */
    start() {
        // subscribe to new turns
        this.subscriptions.push(this.newTurn$.subscribe((activePlayer) => {
            // not IA
            if (!(activePlayer === null || activePlayer === void 0 ? void 0 : activePlayer.isAi)) {
                return;
            }
            // play after thinking for a bit
            setTimeout(() => this.play(), (Math.random() * 0.5 + 1) * this.thinkTime);
        }));
    }
    /**
     * Play in a randomly choose non-full column.
     */
    play() {
        const gridCols = this.store.selectSnapshot((state) => state.grid.cols);
        // pick a non-full column
        let col;
        do {
            col = Math.floor(Math.random() * src_app_grid_config__WEBPACK_IMPORTED_MODULE_1__["GRID_ROWS"]);
        } while (gridCols[col].length >= src_app_grid_config__WEBPACK_IMPORTED_MODULE_1__["GRID_ROWS"]);
        // play in that column
        this.game.play(col);
    }
    /**
     * Unsubscrtibe from activePlayer$.
     */
    stop() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
AiService.ɵfac = function AiService_Factory(t) { return new (t || AiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"])); };
AiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AiService, factory: AiService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: _ngxs_store__WEBPACK_IMPORTED_MODULE_3__["Store"] }, { type: _game_service__WEBPACK_IMPORTED_MODULE_4__["GameService"] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/game.component */ "jBAD");
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/home/home.component */ "1LmZ");
/* harmony import */ var _pages_rules_rules_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/rules/rules.component */ "jGP1");







const routes = [
    { path: 'how-to-play', component: _pages_rules_rules_component__WEBPACK_IMPORTED_MODULE_4__["RulesComponent"] },
    { path: 'game', component: _game_game_component__WEBPACK_IMPORTED_MODULE_2__["GameComponent"] },
    { path: '', component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
    { path: '**', redirectTo: '' },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            }]
    }], null, null); })();


/***/ }),

/***/ "vvyD":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/portal */ "+rOU");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/menu */ "STbY");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");














class MaterialModule {
}
MaterialModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MaterialModule });
MaterialModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MaterialModule_Factory(t) { return new (t || MaterialModule)(); }, imports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatRippleModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenavModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayModule"],
        _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["PortalModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MaterialModule, { exports: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatRippleModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenavModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayModule"],
        _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["PortalModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MaterialModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                exports: [
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                    _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                    _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"],
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["MatRippleModule"],
                    _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_10__["MatSidenavModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_11__["MatToolbarModule"],
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_12__["OverlayModule"],
                    _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["PortalModule"],
                ],
            }]
    }], null, null); })();


/***/ }),

/***/ "wyGW":
/*!*********************************************!*\
  !*** ./src/app/game/state/actions/index.ts ***!
  \*********************************************/
/*! exports provided: Clear, End, Start, SetPlayers, NextPlayer, Won, SetFirstPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Clear_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Clear.action */ "l2i6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Clear", function() { return _Clear_action__WEBPACK_IMPORTED_MODULE_0__["Clear"]; });

/* harmony import */ var _End_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./End.action */ "KpNC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "End", function() { return _End_action__WEBPACK_IMPORTED_MODULE_1__["End"]; });

/* harmony import */ var _Start_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Start.action */ "zoVA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Start", function() { return _Start_action__WEBPACK_IMPORTED_MODULE_2__["Start"]; });

/* harmony import */ var _SetPlayers_action__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SetPlayers.action */ "+1+F");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetPlayers", function() { return _SetPlayers_action__WEBPACK_IMPORTED_MODULE_3__["SetPlayers"]; });

/* harmony import */ var _NextPlayer_action__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NextPlayer.action */ "MQQI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NextPlayer", function() { return _NextPlayer_action__WEBPACK_IMPORTED_MODULE_4__["NextPlayer"]; });

/* harmony import */ var _Won_action__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Won.action */ "pzQ8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Won", function() { return _Won_action__WEBPACK_IMPORTED_MODULE_5__["Won"]; });

/* harmony import */ var _SetFirstPlayer_action__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SetFirstPlayer.action */ "XajT");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetFirstPlayer", function() { return _SetFirstPlayer_action__WEBPACK_IMPORTED_MODULE_6__["SetFirstPlayer"]; });










/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ }),

/***/ "zoVA":
/*!****************************************************!*\
  !*** ./src/app/game/state/actions/Start.action.ts ***!
  \****************************************************/
/*! exports provided: Start */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Start", function() { return Start; });
class Start {
    constructor() { }
}
Start.type = '[Game] Start the game';


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map