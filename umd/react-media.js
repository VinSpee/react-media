(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactMedia"] = factory(require("react"));
	else
		root["ReactMedia"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Media = __webpack_require__(1);

	var _Media2 = _interopRequireDefault(_Media);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// TODO: Remove in the next major release.
	_Media2.default.Media = _Media2.default; /* eslint-env node */


	module.exports = _Media2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _json2mq = __webpack_require__(3);

	var _json2mq2 = _interopRequireDefault(_json2mq);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Conditionally renders based on whether or not a media query matches.
	 */
	var Media = function (_React$Component) {
	  _inherits(Media, _React$Component);

	  function Media() {
	    var _temp, _this, _ret;

	    _classCallCheck(this, Media);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
	      matches: true
	    }, _this.updateMatches = function () {
	      var _this$props = _this.props,
	          query = _this$props.query,
	          queries = _this$props.queries;

	      if (query) _this.setState({
	        matches: _this.mediaQueryList.reduce(function (accumulated, _ref) {
	          var _extends2;

	          var name = _ref.name,
	              mm = _ref.mm;
	          return _extends({}, accumulated, (_extends2 = {}, _extends2[name] = mm.matches, _extends2));
	        }, {}).match
	      });

	      if (queries) _this.setState({
	        matches: _this.mediaQueryList.reduce(function (accumulated, _ref2) {
	          var _extends3;

	          var name = _ref2.name,
	              mm = _ref2.mm;
	          return _extends({}, accumulated, (_extends3 = {}, _extends3[name] = mm.matches, _extends3));
	        }, {})
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  Media.prototype.componentWillMount = function componentWillMount() {
	    var _this2 = this;

	    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;

	    var _props = this.props,
	        query = _props.query,
	        queries = _props.queries;


	    if (query && typeof query !== 'string') query = (0, _json2mq2.default)(query);

	    if (query) {
	      this.mediaQueryList = [{
	        name: 'match',
	        mm: window.matchMedia(query)
	      }];
	    }

	    if (queries) {
	      queries = Object.keys(queries).map(function (mq) {
	        return {
	          name: mq,
	          qs: (0, _json2mq2.default)(queries[mq])
	        };
	      });
	      this.mediaQueryList = queries.map(function (mq) {
	        return {
	          name: mq.name,
	          mm: window.matchMedia(mq.qs)
	        };
	      });
	    }

	    this.mediaQueryList.map(function (ql) {
	      return ql.mm.addListener(_this2.updateMatches);
	    });
	    this.updateMatches();
	  };

	  Media.prototype.componentWillUnmount = function componentWillUnmount() {
	    var _this3 = this;

	    var _props2 = this.props,
	        query = _props2.query,
	        queries = _props2.queries;

	    if (query || queries) this.mediaQueryList.map(function (ql) {
	      return ql.mm.removeListener(_this3.updateMatches);
	    });
	  };

	  Media.prototype.render = function render() {
	    var _props3 = this.props,
	        children = _props3.children,
	        render = _props3.render,
	        queries = _props3.queries,
	        query = _props3.query;
	    var matches = this.state.matches;


	    return render ? matches ? render() : null : children ? typeof children === 'function' ? query && children(matches) || queries && children(_extends({}, matches)) : !Array.isArray(children) || children.length ? // Preact defaults to empty children array
	    matches ? _react2.default.Children.only(children) : null : null : null;
	  };

	  return Media;
	}(_react2.default.Component);

	exports.default = Media;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var camel2hyphen = __webpack_require__(4);

	var isDimension = function (feature) {
	  var re = /[height|width]$/;
	  return re.test(feature);
	};

	var obj2mq = function (obj) {
	  var mq = '';
	  var features = Object.keys(obj);
	  features.forEach(function (feature, index) {
	    var value = obj[feature];
	    feature = camel2hyphen(feature);
	    // Add px to dimension features
	    if (isDimension(feature) && typeof value === 'number') {
	      value = value + 'px';
	    }
	    if (value === true) {
	      mq += feature;
	    } else if (value === false) {
	      mq += 'not ' + feature;
	    } else {
	      mq += '(' + feature + ': ' + value + ')';
	    }
	    if (index < features.length-1) {
	      mq += ' and '
	    }
	  });
	  return mq;
	};

	var json2mq = function (query) {
	  var mq = '';
	  if (typeof query === 'string') {
	    return query;
	  }
	  // Handling array of media queries
	  if (query instanceof Array) {
	    query.forEach(function (q, index) {
	      mq += obj2mq(q);
	      if (index < query.length-1) {
	        mq += ', '
	      }
	    });
	    return mq;
	  }
	  // Handling single media query
	  return obj2mq(query);
	};

	module.exports = json2mq;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var camel2hyphen = function (str) {
	  return str
	          .replace(/[A-Z]/g, function (match) {
	            return '-' + match.toLowerCase();
	          })
	          .toLowerCase();
	};

	module.exports = camel2hyphen;

/***/ })
/******/ ])
});
;