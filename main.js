(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,o){for(var n=0;n<o.length;n++){var r=o[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,i=function(e,o){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==t(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===t(i)?i:String(i)),r)}var i}var o=function(){function t(e,o){var n=e.name,r=e.link,i=e.handleCardImageClick,u=o.templateSelector,a=o.cardSelector,s=o.imageSelector,l=o.titleSelector,c=o.likeButtonSelector,p=o.deleteButtonSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardsName=n,this._cardsLink=r,this._handleCardImageClick=i,this._templateSelector=u,this._cardSelector=a,this._titleSelector=l,this._newCard=this._getTemplate(),this._cardImage=this._newCard.querySelector(s),this._cardTitle=this._newCard.querySelector(l),this._likeButton=this._newCard.querySelector(c),this._deleteButton=this._newCard.querySelector(p)}var o,n;return o=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(this._cardSelector).cloneNode(!0)}},{key:"_handleLikeButtonClick",value:function(t){t.target.classList.toggle("card__item-like-button_active")}},{key:"_handleDeleteButtonClick",value:function(){var t=this;return function(){t._newCard.remove()}}},{key:"_addCardActiveListeners",value:function(){this._likeButton.addEventListener("click",this._handleLikeButtonClick),this._deleteButton.addEventListener("click",this._handleDeleteButtonClick()),this._cardImage.addEventListener("click",this._handleCardImageClick(this._newCard,this._cardImage,this._titleSelector))}},{key:"generateCard",value:function(){return this._cardImage.alt="Фотография - ".concat(this._cardsName),this._cardImage.src=this._cardsLink,this._cardTitle.textContent=this._cardsName,this._addCardActiveListeners(),this._newCard}}])&&e(o.prototype,n),Object.defineProperty(o,"prototype",{writable:!1}),t}();function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function r(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==n(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var r=o.call(t,"string");if("object"!==n(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===n(i)?i:String(i)),r)}var i}var i=function(){function t(e,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._settings=e,this._popupForm=o,this._inputSelector=this._settings.inputSelector,this._buttonSelector=this._settings.buttonSelector,this._inactiveButtonClass=this._settings.buttonClass.inactiveButtonClass,this._indicatorClass=this._settings.buttonClass.indicatorClass,this._inactiveIndicatorClass=this._settings.buttonClass.inactiveIndicatorClass,this._inputErrorClass=this._settings.errorClass.inputErrorClass,this._spanErrorClass=this._settings.errorClass.spanErrorClass,this._popupInputList=Array.from(this._popupForm.querySelectorAll(this._inputSelector)),this._popupButton=this._popupForm.querySelector(this._buttonSelector)}var e,o;return e=t,(o=[{key:"_hasInvalidInput",value:function(){return this._popupInputList.some((function(t){return!t.validity.valid}))}},{key:"_makeButtonInactive",value:function(){this._popupButton.classList.add(this._inactiveButtonClass),this._popupButton.classList.add(this._inactiveIndicatorClass),this._popupButton.classList.remove(this._indicatorClass),this._popupButton.disabled=!0}},{key:"_makeButtonActive",value:function(){this._popupButton.classList.remove(this._inactiveButtonClass),this._popupButton.classList.remove(this._inactiveIndicatorClass),this._popupButton.classList.add(this._indicatorClass),this._popupButton.disabled=!1}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._makeButtonInactive():this._makeButtonActive()}},{key:"_showErrorMessage",value:function(t,e){var o=this._popupForm.querySelector(".".concat(t.id,"-error"));o.classList.add(this._spanErrorClass),o.textContent=e}},{key:"_showInputError",value:function(t,e){t.classList.add(this._inputErrorClass),this._showErrorMessage(t,e)}},{key:"_hideErrorMessage",value:function(t){var e=this._popupForm.querySelector(".".concat(t.id,"-error"));e.classList.remove(this._spanErrorClass),e.textContent=""}},{key:"_hideInputError",value:function(t){t.classList.remove(this._inputErrorClass),this._hideErrorMessage(t)}},{key:"_checkInputValidity",value:function(t){if(t.validity.valid)this._hideInputError(t);else{var e=t.validationMessage;this._showInputError(t,e)}}},{key:"_setEventListeners",value:function(){var t=this;this._toggleButtonState(),this._popupInputList.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))})),this._popupForm.addEventListener("reset",(function(){setTimeout((function(){t._toggleButtonState()}),0)}))}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._popupInputList.forEach((function(e){t._hideInputError(e)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&r(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function a(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==u(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,"string");if("object"!==u(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===u(r)?r:String(r)),n)}var r}var s=function(){function t(e,o){var n=e.items,r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._items=n,this._renderer=r,this._sectionCards=document.querySelector(o)}var e,o;return e=t,(o=[{key:"renderItems",value:function(){var t=this;this._items.reverse().forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(t){this._sectionCards.prepend(t)}}])&&a(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function c(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==l(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,"string");if("object"!==l(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===l(r)?r:String(r)),n)}var r}var p=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this),this._openSelector="popup_opened",this._closeButtonSelector="popup__close-button"}var e,o;return e=t,o=[{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_closePopupClick",value:function(t,e,o){t.classList.contains(o)&&(this.close(),e())}},{key:"_handlePopupClick",value:function(t){var e=this;return function(o){var n=o.target;e._closePopupClick(n,t,e._openSelector),e._closePopupClick(n,t,e._closeButtonSelector)}}},{key:"open",value:function(){this._popup.classList.add(this._openSelector),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove(this._openSelector),document.removeEventListener("keyup",this._handleEscClose)}},{key:"setEventListeners",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};this._popup.addEventListener("click",this._handlePopupClick(t))}}],o&&c(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function y(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==f(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,"string");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===f(r)?r:String(r)),n)}var r}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,o){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=m(t)););return t}(t,e);if(n){var r=Object.getOwnPropertyDescriptor(n,e);return r.get?r.get.call(arguments.length<3?t:o):r.value}},d.apply(this,arguments)}function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function _(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}var v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&h(t,e)}(u,t);var e,o,n,r,i=(n=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(n);if(r){var o=m(this).constructor;t=Reflect.construct(e,arguments,o)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return _(t)}(this,t)});function u(t,e){var o,n=e.popupImagePhotoSelector,r=e.popupImageHeadingSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(o=i.call(this,t))._popupImagePhoto=o._popup.querySelector(n),o._popupImageHeading=o._popup.querySelector(r),o._funcClearData=o._clearDataPopupImage.bind(_(o)),o}return e=u,(o=[{key:"_addPreviewInfo",value:function(){this._popupImageHeading.textContent=this._name,this._popupImagePhoto.src=this._link,this._popupImagePhoto.alt=this._description}},{key:"_clearDataPopupImage",value:function(){this._popupImagePhoto.alt="",this._popupImagePhoto.src="",this._popupImageHeading.textContent=""}},{key:"open",value:function(t,e,o){this._name=t,this._link=e,this._description=o,d(m(u.prototype),"open",this).call(this),this._addPreviewInfo()}},{key:"setEventListeners",value:function(){d(m(u.prototype),"setEventListeners",this).call(this,this._funcClearData)}}])&&y(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function b(t){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},b(t)}function S(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==b(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,"string");if("object"!==b(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===b(r)?r:String(r)),n)}var r}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,o){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=C(t)););return t}(t,e);if(n){var r=Object.getOwnPropertyDescriptor(n,e);return r.get?r.get.call(arguments.length<3?t:o):r.value}},g.apply(this,arguments)}function w(t,e){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},w(t,e)}function k(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&w(t,e)}(u,t);var e,o,n,r,i=(n=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=C(n);if(r){var o=C(this).constructor;t=Reflect.construct(e,arguments,o)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===b(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return k(t)}(this,t)});function u(t,e,o){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._handleFormSubmit=e,n._popupFormValidators=o,n._popupValues={},n._popupInputList=n._popup.querySelectorAll(".popup__input"),n._popupForm=n._popup.querySelector(".popup__form"),n._close=n.close.bind(k(n)),n._submitHandler=n._getInputValues.bind(k(n)),n}return e=u,(o=[{key:"_getInputValues",value:function(){var t=this;return this._popupInputList.forEach((function(e){t._popupValues[e.name]=e.value})),this._popupValues}},{key:"close",value:function(){g(C(u.prototype),"close",this).call(this),this._popupForm.reset(),this._popupFormValidators[this._popupForm.name].resetValidation()}},{key:"setEventListeners",value:function(){var t=this._close,e=this._submitHandler;g(C(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",this._handleFormSubmit({close:t,submitHandler:e}))}}])&&S(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function P(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==I(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,"string");if("object"!==I(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(n.key),"symbol"===I(r)?r:String(r)),n)}var r}var x=function(){function t(e){var o=e.introTitleSelector,n=e.introTextSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._title=document.querySelector(o),this._text=document.querySelector(n)}var e,o;return e=t,(o=[{key:"getUserInfo",value:function(){return{name:this._title.textContent,job:this._text.textContent}}},{key:"setUserInfo",value:function(t,e){this._title.textContent=t,this._text.textContent=e}}])&&P(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),t}(),j={templateSelector:".cards-template",cardSelector:".card",imageSelector:".card__image",titleSelector:".card__item-title",likeButtonSelector:".card__item-like-button",deleteButtonSelector:".card__delete-button"},B=document.querySelector(".popups").querySelector(".popup_type_edit"),O={popupEditNameInput:B.querySelector(".popup__input_type_name-text"),popupEditJobInput:B.querySelector(".popup__input_type_description-text"),popupEditButtonElement:document.querySelector(".profile__intro-edit-button"),popupNewCardButtonElement:document.querySelector(".profile__add-button")},L={formSelector:".popup__form",inputSelector:".popup__input",buttonSelector:".popup__submit",buttonClass:{inactiveButtonClass:"popup__submit_disabled",indicatorClass:"indicator",inactiveIndicatorClass:"indicator_disabled"},errorClass:{inputErrorClass:"popup__input_type_error",spanErrorClass:"popup__input-error"}},q={},H=O.popupEditNameInput,T=O.popupEditJobInput,D=O.popupEditButtonElement,M=O.popupNewCardButtonElement,V="popup__input_type_name-text",R=function(t,e,o){return function(){var n=t.querySelector(o).textContent,r=e.src,i=e.alt;N.open(n,r,i)}},A=function(t,e){return new o({name:t,link:e,handleCardImageClick:R},j).generateCard()},F=new E(".popup_type_edit",(function(t){var e=t.close,o=t.submitHandler;return function(t){t.preventDefault();var n=o(),r=n[V],i=n["popup__input_type_description-text"];W.setUserInfo(r,i),e()}}),q),G=new E(".popup_type_new-card",(function(t){var e=t.close,o=t.submitHandler;return function(t){t.preventDefault();var n=o(),r=n[V],i=n["popup__input_type_description-url"],u=A(r,i);Y.addItem(u),e()}}),q),N=new v(".popup_type_image",{popupImagePhotoSelector:".popup__image",popupImageHeadingSelector:".popup__heading"}),W=new x({introTitleSelector:".profile__intro-title",introTextSelector:".profile__intro-text"}),Y=new s({items:[{name:"Дворец земледельцев",link:"https://images.unsplash.com/photo-1591390133438-532f27239ff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=878&q=80"},{name:"Петергоф",link:"https://images.unsplash.com/photo-1577696209178-253df230b5f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"},{name:"Мурманская область",link:"https://images.unsplash.com/photo-1610554121420-7e4afe41d616?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"},{name:"Гора Эльбрус",link:"https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"},{name:"Домбай",link:"https://images.unsplash.com/photo-1617911478446-c7f1dd96966e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"},{name:"Куршская коса",link:"https://images.unsplash.com/photo-1645127434513-63c301ebf6de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80"}],renderer:function(t){var e=A(t.name,t.link);Y.addItem(e)}},".cards__list");Y.renderItems(),F.setEventListeners(),D.addEventListener("click",(function(){var t=W.getUserInfo(),e=t.name,o=t.job;H.value=e,T.value=o,F.open()})),G.setEventListeners(),M.addEventListener("click",(function(){return G.open()})),N.setEventListeners(),Array.from(document.querySelectorAll(L.formSelector)).forEach((function(t){var e=new i(L,t),o=t.getAttribute("name");q[o]=e,e.enableValidation()}))})();