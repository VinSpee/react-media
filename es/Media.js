var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import json2mq from 'json2mq';

var queryType = PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.arrayOf(PropTypes.object.isRequired)]);

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
      matches: _this.props.defaultMatches
    }, _this.updateMatches = function () {
      var _this$props = _this.props,
          query = _this$props.query,
          queries = _this$props.queries;

      if (query) _this.setState({
        matches: _this.queries.reduce(function (accumulated, _ref) {
          var _extends2;

          var name = _ref.name,
              mediaQueryList = _ref.mediaQueryList;
          return _extends({}, accumulated, (_extends2 = {}, _extends2[name] = mediaQueryList.matches, _extends2));
        }, {}).match
      });

      if (queries) _this.setState({
        matches: _this.queries.reduce(function (accumulated, _ref2) {
          var _extends3;

          var name = _ref2.name,
              mediaQueryList = _ref2.mediaQueryList;
          return _extends({}, accumulated, (_extends3 = {}, _extends3[name] = mediaQueryList.matches, _extends3));
        }, false)
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Media.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object') return;

    var _props = this.props,
        query = _props.query,
        queries = _props.queries;


    if (query && typeof query !== 'string') query = json2mq(query);

    if (query) {
      this.queries = [{
        name: 'match',
        mediaQueryList: window.matchMedia(query)
      }];
    }

    if (queries) {
      queries = Object.keys(queries).map(function (mq) {
        return {
          name: mq,
          qs: json2mq(queries[mq])
        };
      });
      this.queries = queries.map(function (mq) {
        return {
          name: mq.name,
          mediaQueryList: window.matchMedia(mq.qs)
        };
      });
    }

    this.queries.map(function (ql) {
      return ql.mediaQueryList.addListener(_this2.updateMatches);
    });
    this.updateMatches();
  };

  Media.prototype.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    var _props2 = this.props,
        query = _props2.query,
        queries = _props2.queries;

    if (query || queries) this.queries.map(function (ql) {
      return ql.mediaQueryList.removeListener(_this3.updateMatches);
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
    matches ? React.Children.only(children) : null : null : null;
  };

  return Media;
}(React.Component);

Media.propTypes = {
  defaultMatches: PropTypes.bool,
  query: queryType,
  queries: PropTypes.objectOf(queryType),
  render: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};
Media.defaultProps = {
  defaultMatches: true
};


export default Media;