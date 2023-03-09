/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var r=function(){function t(e){var r=e.data,n=r.likes,o=r._id,i=r.name,a=r.link,u=r.personalID,c=r.ownerID,l=e.methods,s=l.handleCardImageClick,p=l.handleLikeButtonClick,f=l.handleDeleteButtonClick,h=e.settings,y=h.templateSelector,d=h.cardSelector,v=h.imageSelector,_=h.titleSelector,m=h.labelLikeSelector,b=h.likeButtonSelector,g=h.deleteButtonSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardsLike=n,this._cardsId=o,this._cardsName=i,this._cardsLink=a,this._personalID=u,this._owenerID=c,this._handleCardImageClick=s,this._handleLikeButtonClick=p,this._handleDeleteButtonClick=f,this._templateSelector=y,this._cardSelector=d,this._titleSelector=_,this._newCard=this._getTemplate(),this._cardImage=this._newCard.querySelector(v),this._cardTitle=this._newCard.querySelector(_),this._labelLike=this._newCard.querySelector(m),this._likeButton=this._newCard.querySelector(b),this._deleteButton=this._newCard.querySelector(g)}var r,n;return r=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(this._cardSelector).cloneNode(!0)}},{key:"_addCardActiveListeners",value:function(){this._likeButton.addEventListener("click",this._handleLikeButtonClick(this._cardsId,this._labelLike)),this._owenerID===this._personalID?this._deleteButton.addEventListener("click",this._handleDeleteButtonClick(this._newCard,this._cardsId)):this._deleteButton.remove(),this._cardImage.addEventListener("click",this._handleCardImageClick(this._newCard,this._cardImage,this._titleSelector))}},{key:"generateCard",value:function(){var t=this;return this._cardTitle.textContent=this._cardsName,this._cardImage.alt="Фотография - ".concat(this._cardsName),this._cardImage.src=this._cardsLink,this._labelLike.textContent=this._cardsLike.length,this._cardsLike.forEach((function(e){e._id===t._personalID&&t._likeButton.classList.toggle("card__item-like-button_active")})),this._addCardActiveListeners(),this._newCard}}])&&e(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),t}();function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==n(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===n(i)?i:String(i)),o)}var i}var i=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._settings=e,this._popupForm=r,this._inputSelector=this._settings.inputSelector,this._buttonSelector=this._settings.buttonSelector,this._inactiveButtonClass=this._settings.buttonClass.inactiveButtonClass,this._indicatorClass=this._settings.buttonClass.indicatorClass,this._inactiveIndicatorClass=this._settings.buttonClass.inactiveIndicatorClass,this._inputErrorClass=this._settings.errorClass.inputErrorClass,this._spanErrorClass=this._settings.errorClass.spanErrorClass,this._popupInputList=Array.from(this._popupForm.querySelectorAll(this._inputSelector)),this._popupButton=this._popupForm.querySelector(this._buttonSelector)}var e,r;return e=t,(r=[{key:"_hasInvalidInput",value:function(){return this._popupInputList.some((function(t){return!t.validity.valid}))}},{key:"_makeButtonInactive",value:function(){this._popupButton.classList.add(this._inactiveButtonClass),this._popupButton.classList.add(this._inactiveIndicatorClass),this._popupButton.classList.remove(this._indicatorClass),this._popupButton.disabled=!0}},{key:"_makeButtonActive",value:function(){this._popupButton.classList.remove(this._inactiveButtonClass),this._popupButton.classList.remove(this._inactiveIndicatorClass),this._popupButton.classList.add(this._indicatorClass),this._popupButton.disabled=!1}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._makeButtonInactive():this._makeButtonActive()}},{key:"_showErrorMessage",value:function(t,e){var r=this._popupForm.querySelector(".".concat(t.id,"-error"));r.classList.add(this._spanErrorClass),r.textContent=e}},{key:"_showInputError",value:function(t,e){t.classList.add(this._inputErrorClass),this._showErrorMessage(t,e)}},{key:"_hideErrorMessage",value:function(t){var e=this._popupForm.querySelector(".".concat(t.id,"-error"));e.classList.remove(this._spanErrorClass),e.textContent=""}},{key:"_hideInputError",value:function(t){t.classList.remove(this._inputErrorClass),this._hideErrorMessage(t)}},{key:"_checkInputValidity",value:function(t){if(t.validity.valid)this._hideInputError(t);else{var e=t.validationMessage;this._showInputError(t,e)}}},{key:"_setEventListeners",value:function(){var t=this;this._toggleButtonState(),this._popupInputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))})),this._popupForm.addEventListener("reset",(function(){setTimeout((function(){t._toggleButtonState()}),0)}))}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._popupInputList.forEach((function(e){t._hideInputError(e)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&o(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==a(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==a(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===a(o)?o:String(o)),n)}var o}var c=function(){function t(e,r){var n=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=n,this._sectionCards=document.querySelector(r)}var e,r;return e=t,(r=[{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(t){this._sectionCards.prepend(t)}},{key:"addItemIntoEnd",value:function(t){this._sectionCards.append(t)}}])&&u(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==l(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===l(o)?o:String(o)),n)}var o}var p=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this),this._openSelector="popup_opened",this._closeButtonSelector="popup__close-button"}var e,r;return e=t,r=[{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_closePopupClick",value:function(t,e,r){t.classList.contains(r)&&(this.close(),e())}},{key:"_handlePopupClick",value:function(t){var e=this;return function(r){var n=r.target;e._closePopupClick(n,t,e._openSelector),e._closePopupClick(n,t,e._closeButtonSelector)}}},{key:"open",value:function(){this._popup.classList.add(this._openSelector),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(this._openSelector),document.removeEventListener("keyup",this._handleEscClose)}},{key:"setEventListeners",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};this._popup.addEventListener("click",this._handlePopupClick(t))}}],r&&s(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function h(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==f(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===f(o)?o:String(o)),n)}var o}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=v(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},y.apply(this,arguments)}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function v(t){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},v(t)}var _=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&d(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=v(n);if(o){var r=v(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function a(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),i.call(this,t)}return e=a,r=[{key:"open",value:function(t,e,r){y(v(a.prototype),"open",this).call(this),this._handlePopupDeleteSubmit=t,this._card=e,this._cardID=r}},{key:"setEventListeners",value:function(){y(v(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",this._handlePopupDeleteSubmit(this._card,this._cardID))}}],r&&h(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(p);function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function b(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==m(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==m(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===m(o)?o:String(o)),n)}var o}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},g.apply(this,arguments)}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function w(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function k(t){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},k(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=k(n);if(o){var r=k(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return w(t)}(this,t)});function a(t,e){var r,n=e.popupImagePhotoSelector,o=e.popupImageHeadingSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,t))._popupImagePhoto=r._popup.querySelector(n),r._popupImageHeading=r._popup.querySelector(o),r._funcClearData=r._clearDataPopupImage.bind(w(r)),r}return e=a,(r=[{key:"_addPreviewInfo",value:function(){this._popupImageHeading.textContent=this._name,this._popupImagePhoto.src=this._link,this._popupImagePhoto.alt=this._description}},{key:"_clearDataPopupImage",value:function(){this._popupImagePhoto.alt="",this._popupImagePhoto.src="",this._popupImageHeading.textContent=""}},{key:"open",value:function(t,e,r){this._name=t,this._link=e,this._description=r,g(k(a.prototype),"open",this).call(this),this._addPreviewInfo()}},{key:"setEventListeners",value:function(){g(k(a.prototype),"setEventListeners",this).call(this,this._funcClearData)}}])&&b(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(p);function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function L(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==C(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==C(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===C(o)?o:String(o)),n)}var o}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=O(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(arguments.length<3?t:r):o.value}},P.apply(this,arguments)}function I(t,e){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},I(t,e)}function j(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}var x=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&I(t,e)}(a,t);var e,r,n,o,i=(n=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(n);if(o){var r=O(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===C(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return j(t)}(this,t)});function a(t,e,r){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleFormSubmit=e,n._popupFormValidators=r,n._popupValues={},n._popupInputList=n._popup.querySelectorAll(".popup__input"),n._popupForm=n._popup.querySelector(".popup__form"),n._close=n.close.bind(j(n)),n._submitHandler=n._getInputValues.bind(j(n)),n}return e=a,(r=[{key:"_getInputValues",value:function(){var t=this;return this._popupInputList.forEach((function(e){t._popupValues[e.name]=e.value})),this._popupValues}},{key:"close",value:function(){P(O(a.prototype),"close",this).call(this),this._popupForm.reset(),this._popupFormValidators[this._popupForm.name].resetValidation()}},{key:"setEventListeners",value:function(){var t=this._close,e=this._submitHandler;P(O(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",this._handleFormSubmit({close:t,submitHandler:e}))}}])&&L(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),a}(p);function T(t){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(t)}function B(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==T(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==T(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===T(o)?o:String(o)),n)}var o}var D=function(){function t(e){var r=e.introTitleSelector,n=e.introTextSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._title=document.querySelector(r),this._text=document.querySelector(n)}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){return{name:this._title.textContent,job:this._text.textContent}}},{key:"setUserInfo",value:function(t,e){this._title.textContent=t,this._text.textContent=e}}])&&B(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}();function R(t){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},R(t)}function q(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,A(n.key),n)}}function A(t){var e=function(t,e){if("object"!==R(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==R(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===R(e)?e:String(e)}var F=function(){function t(e){var r=e.baseUrl,n=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=r,this._authorization=n.authorization,this._type=n["Content-Type"],this._personalURL="https://nomoreparties.co/v1/cohort-61/users/me",this._personalAvatarURL="https://nomoreparties.co/v1/cohort-61/users/me/avatar",this._cardsURL="https://nomoreparties.co/v1/cohort-61/cards",this._personalID=null}var e,r;return e=t,(r=[{key:"_checkForErrors",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"_returnHeadersGET",value:function(){return{headers:{authorization:this._authorization}}}},{key:"_returnHeadersDELETE",value:function(){return{method:"DELETE",headers:{authorization:this._authorization}}}},{key:"_returnHeadersData",value:function(){return{authorization:this._authorization,"Content-Type":this._type}}},{key:"getInitialCards",value:function(){var t=this;return fetch(this._cardsURL,this._returnHeadersGET()).then((function(e){return t._checkForErrors(e)}))}},{key:"getProfileInfo",value:function(){var t=this;return fetch(this._personalURL,this._returnHeadersGET()).then((function(e){return t._checkForErrors(e)}))}},{key:"addPersonalID",value:function(t){this._personalID=t}},{key:"returnPersonalID",value:function(){return this._personalID}},{key:"editProfileInfo",value:function(t,e){var r=this;return fetch(this._personalURL,{method:"PATCH",headers:this._returnHeadersData(),body:JSON.stringify({name:t,about:e})}).then((function(t){return r._checkForErrors(t)}))}},{key:"editProfileAvatar",value:function(t){var e=this;return fetch(this._personalAvatarURL,{method:"PATCH",headers:this._returnHeadersData(),body:JSON.stringify({avatar:t})}).then((function(t){return e._checkForErrors(t)}))}},{key:"addCard",value:function(t,e){var r,n,o,i=this;return fetch(this._cardsURL,{method:"POST",headers:this._returnHeadersData(),body:JSON.stringify((r={name:t,link:e},n="link",o=e,(n=A(n))in r?Object.defineProperty(r,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[n]=o,r))}).then((function(t){return i._checkForErrors(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._cardsURL,"/").concat(t),this._returnHeadersDELETE()).then((function(t){return e._checkForErrors(t)}))}},{key:"updateAddStatusLike",value:function(t){var e=this;return fetch("".concat(this._cardsURL,"/").concat(t,"/likes"),{method:"PUT",headers:{authorization:this._authorization}}).then((function(t){return e._checkForErrors(t)}))}},{key:"updateDeleteStatusLike",value:function(t){var e=this;return fetch("".concat(this._cardsURL,"/").concat(t,"/likes"),this._returnHeadersDELETE()).then((function(t){return e._checkForErrors(t)}))}}])&&q(e.prototype,r),Object.defineProperty(e,"prototype",{writable:!1}),t}(),H={templateSelector:".cards-template",cardSelector:".card",imageSelector:".card__image",titleSelector:".card__item-title",labelLikeSelector:".card__item-like-number",likeButtonSelector:".card__item-like-button",deleteButtonSelector:".card__delete-button"},U=document.querySelector(".popups").querySelector(".popup_type_edit"),N={popupEditNameInput:U.querySelector(".popup__input_type_name-text"),popupEditJobInput:U.querySelector(".popup__input_type_description-text"),popupEditButtonElement:document.querySelector(".profile__intro-edit-button"),popupNewCardButtonElement:document.querySelector(".profile__add-button"),popupUpdateAvatarButtonElement:document.querySelector(".profile__avatar-edit-button"),profileAvatarElement:document.querySelector(".profile__avatar"),introTitleElement:document.querySelector(".profile__intro-title"),introTextElement:document.querySelector(".profile__intro-text")},V={formSelector:".popup__form",inputSelector:".popup__input",buttonSelector:".popup__submit",buttonClass:{inactiveButtonClass:"popup__submit_disabled",indicatorClass:"indicator",inactiveIndicatorClass:"indicator_disabled"},errorClass:{inputErrorClass:"popup__input_type_error",spanErrorClass:"popup__input-error"}},z={};function G(t){return G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},G(t)}function M(){M=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var i=e&&e.prototype instanceof f?e:f,a=Object.create(i.prototype),u=new C(o||[]);return n(a,"_invoke",{value:S(t,r,u)}),a}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var p={};function f(){}function h(){}function y(){}var d={};c(d,i,(function(){return this}));var v=Object.getPrototypeOf,_=v&&v(v(L([])));_&&_!==e&&r.call(_,i)&&(d=_);var m=y.prototype=f.prototype=Object.create(d);function b(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function g(t,e){function o(n,i,a,u){var c=s(t[n],t,i);if("throw"!==c.type){var l=c.arg,p=l.value;return p&&"object"==G(p)&&r.call(p,"__await")?e.resolve(p.__await).then((function(t){o("next",t,a,u)}),(function(t){o("throw",t,a,u)})):e.resolve(p).then((function(t){l.value=t,a(l)}),(function(t){return o("throw",t,a,u)}))}u(c.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function S(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=w(a,r);if(u){if(u===p)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=s(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function w(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=s(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function L(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return h.prototype=y,n(m,"constructor",{value:y,configurable:!0}),n(y,"constructor",{value:h,configurable:!0}),h.displayName=c(y,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,u,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},b(g.prototype),c(g.prototype,a,(function(){return this})),t.AsyncIterator=g,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new g(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(m),c(m,u,"Generator"),c(m,i,(function(){return this})),c(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=L,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},t}function J(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function Y(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){J(i,n,o,a,u,"next",t)}function u(t){J(i,n,o,a,u,"throw",t)}a(void 0)}))}}function $(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var K,Q=N.popupEditNameInput,W=N.popupEditJobInput,X=N.popupEditButtonElement,Z=N.popupNewCardButtonElement,tt=N.popupUpdateAvatarButtonElement,et=N.profileAvatarElement,rt=N.introTitleElement,nt=N.introTextElement,ot="popup__input_type_name-text",it=function(t,e,r){return function(){var n=t.querySelector(r).textContent,o=e.src,i=e.alt;vt.open(n,o,i)}},at=function(){var t=Y(M().mark((function t(e,r){var n;return M().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ft.updateAddStatusLike(r).then((function(t){return t.likes.length})).catch((function(t){console.log("".concat(t,". Запрос не выполнен!"))}));case 2:n=t.sent,e.textContent=n;case 4:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),ut=function(){var t=Y(M().mark((function t(e,r){var n;return M().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ft.updateDeleteStatusLike(r).then((function(t){return t.likes.length})).catch((function(t){console.log("".concat(t,". Запрос не выполнен!"))}));case 2:n=t.sent,e.textContent=n;case 4:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),ct=function(t,e){return function(r){var n=r.target;!1===n.classList.contains("card__item-like-button_active")?at(e,t):ut(e,t),n.classList.toggle("card__item-like-button_active")}},lt=function(t,e){return function(r){r.preventDefault(),function(t,e){ft.deleteCard(e).then((function(){_t.close(),t.remove()})).catch((function(t){console.log("".concat(t,". Запрос не выполнен!"))}))}(t,e)}},st=function(t,e){return function(){_t.open(lt,t,e),_t.setEventListeners()}},pt=function(t,e,n,o,i){var a=ft.returnPersonalID(),u=i._id;return new r({data:{likes:t,_id:e,name:n,link:o,personalID:a,ownerID:u},methods:{handleCardImageClick:it,handleLikeButtonClick:ct,handleDeleteButtonClick:st},settings:H}).generateCard()},ft=new F({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-61",headers:{authorization:"e34a8857-3580-4e3d-82f5-9114588dd5f8","Content-Type":"application/json"}}),ht=new x(".popup_type_edit",(function(t){var e=t.close,r=t.submitHandler;return function(t){t.preventDefault();var n=t.target.querySelector(".popup__submit");n.textContent="Сохранение...";var o=r();!function(t,e,r,n){ft.editProfileInfo(t,e).then((function(t){var e=t.name,n=t.about;mt.setUserInfo(e,n),r()})).catch((function(t){console.log("".concat(t,". Запрос не выполнен!"))})).finally((function(){n.textContent="Сохранить"}))}(o[ot],o["popup__input_type_description-text"],e,n)}}),z),yt=new x(".popup_type_new-card",(function(t){var e=t.close,r=t.submitHandler;return function(t){t.preventDefault();var n=t.target.querySelector(".popup__submit");n.textContent="Сохранение...";var o=r();!function(t,e,r,n){ft.addCard(t,e).then((function(t){var e=t.likes,n=t._id,o=t.name,i=t.link,a=t.owner,u=pt(e,n,o,i,a);bt.addItemIntoEnd(u),r()})).catch((function(t){console.log("".concat(t,". Запрос не выполнен!"))})).finally((function(){n.textContent="Сохранить"}))}(o[ot],o["popup__input_type_description-url"],e,n)}}),z),dt=new x(".popup_type_update-avatar",(function(t){var e=t.close,r=t.submitHandler;return function(t){t.preventDefault();var n=t.target.querySelector(".popup__submit");n.textContent="Сохранение...",function(t,e,r){ft.editProfileAvatar(t).then((function(t){var r=t.avatar;et.src=r,e()})).catch((function(t){console.log("".concat(t,". Запрос не выполнен!"))})).finally((function(){r.textContent="Сохранить"}))}(r()["popup__input_type_description-url"],e,n)}}),z),vt=new E(".popup_type_image",{popupImagePhotoSelector:".popup__image",popupImageHeadingSelector:".popup__heading"}),_t=new _(".popup_type_delete"),mt=new D({introTitleSelector:".profile__intro-title",introTextSelector:".profile__intro-text"}),bt=new c({renderer:function(t){var e=t.likes,r=t._id,n=t.name,o=t.link,i=t.owner,a=pt(e,r,n,o,i);bt.addItem(a)}},".cards__list");K=[ft.getProfileInfo(),ft.getInitialCards()],Promise.all(K).then((function(t){var e,r,n=(r=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,u=[],c=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(u.push(n.value),u.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(e,r)||function(t,e){if(t){if("string"==typeof t)return $(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?$(t,e):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],i=n[1],a=o.name,u=o.about,c=o.avatar,l=o._id;rt.textContent=a,nt.textContent=u,et.src=c,ft.addPersonalID(l),bt.renderItems(i)})).catch((function(t){console.log("".concat(t,". Запрос не выполнен!"))})),ht.setEventListeners(),X.addEventListener("click",(function(){var t=mt.getUserInfo(),e=t.name,r=t.job;Q.value=e,W.value=r,ht.open()})),yt.setEventListeners(),Z.addEventListener("click",(function(){return yt.open()})),dt.setEventListeners(),tt.addEventListener("click",(function(){return dt.open()})),vt.setEventListeners(),Array.from(document.querySelectorAll(V.formSelector)).forEach((function(t){var e=new i(V,t),r=t.getAttribute("name");z[r]=e,e.enableValidation()}))})();