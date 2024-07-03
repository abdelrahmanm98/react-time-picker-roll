'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".TimePicker-module_timePicker__-V-nQ {\r\n  width: 100%;\r\n  min-width: max-content;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  background-color: transparent;\r\n  padding: 20px;\r\n  border-radius: 10px;\r\n  color: white;\r\n  font-family: 'Arial', sans-serif;\r\n  gap: 10px;\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n}\r\n\r\n.TimePicker-module_column__b6kEV {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  position: relative;\r\n}\r\n\r\n.TimePicker-module_timeSection__ReKr0,\r\n.TimePicker-module_periodSection__yZ7EC {\r\n  position: relative;\r\n  overflow-y: auto;\r\n  height: 200px;\r\n  width: 60px;\r\n  scrollbar-width: none;\r\n  -ms-overflow-style: none;\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  scroll-snap-type: y mandatory;\r\n}\r\n\r\n.TimePicker-module_timeSection__ReKr0::-webkit-scrollbar,\r\n.TimePicker-module_periodSection__yZ7EC::-webkit-scrollbar {\r\n  display: none;\r\n}\r\n\r\n.TimePicker-module_scrollItems__5mcvC {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  height: auto;\r\n}\r\n\r\n.TimePicker-module_timeItem__oIB2- {\r\n  font-size: 24px;\r\n  height: 40px;\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  scroll-snap-align: center;\r\n  color: #ededed;\r\n}\r\n\r\n.TimePicker-module_timeItem__oIB2-.TimePicker-module_selected__P26qC {\r\n  color: white;\r\n}\r\n\r\n.TimePicker-module_timeSection__ReKr0::before,\r\n.TimePicker-module_timeSection__ReKr0::after {\r\n  content: '';\r\n  display: block;\r\n  height: 80px;\r\n}\r\n\r\n.TimePicker-module_column__b6kEV::before,\r\n.TimePicker-module_column__b6kEV::after {\r\n  content: '';\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 2px;\r\n  background-color: white;\r\n  left: 0;\r\n}\r\n\r\n.TimePicker-module_column__b6kEV::before {\r\n  top: 80px;\r\n}\r\n\r\n.TimePicker-module_column__b6kEV::after {\r\n  top: 120px;\r\n}\r\n\r\n.TimePicker-module_arrow__wWZjS {\r\n  cursor: pointer;\r\n  font-size: 24px;\r\n  user-select: none;\r\n}\r\n";
var styles = {"timePicker":"TimePicker-module_timePicker__-V-nQ","column":"TimePicker-module_column__b6kEV","timeSection":"TimePicker-module_timeSection__ReKr0","periodSection":"TimePicker-module_periodSection__yZ7EC","scrollItems":"TimePicker-module_scrollItems__5mcvC","timeItem":"TimePicker-module_timeItem__oIB2-","selected":"TimePicker-module_selected__P26qC","arrow":"TimePicker-module_arrow__wWZjS"};
styleInject(css_248z);

var TimePickerComponent = function (_a) {
    _a.initialTime; var onChange = _a.onChange;
    var _b = react.useState(6), hours = _b[0], setHours = _b[1];
    var _c = react.useState(0), minutes = _c[0], setMinutes = _c[1];
    var _d = react.useState('AM'), period = _d[0], setPeriod = _d[1];
    var hoursRef = react.useRef(null);
    var minutesRef = react.useRef(null);
    var periodRef = react.useRef(null);
    var _e = react.useState(false), isDragging = _e[0], setIsDragging = _e[1];
    var _f = react.useState(0), startY = _f[0], setStartY = _f[1];
    var _g = react.useState(0), scrollStartTop = _g[0], setScrollStartTop = _g[1];
    var _h = react.useState(null), dragType = _h[0], setDragType = _h[1];
    react.useEffect(function () {
        onChange({ hours: hours, minutes: minutes, period: period });
    }, [hours, minutes, period, onChange]);
    react.useEffect(function () {
        if (hoursRef.current) {
            hoursRef.current.scrollTop = (hours + 1) * 40; // Adjust to keep the third item active
        }
        if (minutesRef.current) {
            minutesRef.current.scrollTop = (minutes + 2) * 40;
        }
        if (periodRef.current) {
            periodRef.current.scrollTop = period === 'AM' ? 80 : 120;
        }
    }, [hours, minutes, period]);
    var handleMouseDown = function (e, type) {
        setIsDragging(true);
        setStartY(e.clientY);
        setDragType(type);
        if (type === 'hour' && hoursRef.current) {
            setScrollStartTop(hoursRef.current.scrollTop);
        }
        else if (type === 'minute' && minutesRef.current) {
            setScrollStartTop(minutesRef.current.scrollTop);
        }
        else if (type === 'period' && periodRef.current) {
            setScrollStartTop(periodRef.current.scrollTop);
        }
    };
    var handleMouseMove = function (e) {
        if (isDragging) {
            var delta = startY - e.clientY;
            if (dragType === 'hour' && hoursRef.current) {
                hoursRef.current.scrollTop = scrollStartTop + delta;
            }
            else if (dragType === 'minute' && minutesRef.current) {
                minutesRef.current.scrollTop = scrollStartTop + delta;
            }
            else if (dragType === 'period' && periodRef.current) {
                periodRef.current.scrollTop = scrollStartTop + delta;
            }
        }
    };
    var handleMouseUp = function () {
        setIsDragging(false);
        updateScrollPosition(dragType);
        setDragType(null);
    };
    var handleScroll = function (type) {
        updateScrollPosition(type);
    };
    var updateScrollPosition = function (type) {
        if (type === 'hour' && hoursRef.current) {
            var newHour = Math.round(hoursRef.current.scrollTop / 40) - 1; // Adjust to keep the third item active
            if (newHour < 1)
                newHour += 12;
            if (newHour > 12)
                newHour -= 12;
            setHours(newHour);
        }
        else if (type === 'minute' && minutesRef.current) {
            var newMinute = Math.round(minutesRef.current.scrollTop / 40) - 2;
            if (newMinute < 0)
                newMinute += 60;
            if (newMinute >= 60)
                newMinute -= 60;
            setMinutes(newMinute);
        }
        else if (type === 'period' && periodRef.current) {
            var newPeriod = periodRef.current.scrollTop < 100 ? 'AM' : 'PM';
            setPeriod(newPeriod);
        }
    };
    react.useEffect(function () {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return function () {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);
    var renderItems = function (type) {
        var items = [];
        if (type === 'hour') {
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-top-1'));
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-top-2'));
            for (var i = 1; i <= 12; i++) {
                items.push(jsxRuntime.jsx("div", __assign({ className: "".concat(styles.timeItem, " ").concat(hours === i ? styles.selected : '') }, { children: i.toString().padStart(2, '0') }), i));
            }
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-bottom-1'));
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-bottom-2'));
        }
        else if (type === 'minute') {
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-top-1'));
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-top-2'));
            for (var i = 0; i < 60; i++) {
                items.push(jsxRuntime.jsx("div", __assign({ className: "".concat(styles.timeItem, " ").concat(minutes === i ? styles.selected : '') }, { children: i.toString().padStart(2, '0') }), i));
            }
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-bottom-1'));
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-bottom-2'));
        }
        else {
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-top-1'));
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-top-2'));
            items.push(jsxRuntime.jsx("div", __assign({ className: "".concat(styles.timeItem, " ").concat(period === 'AM' ? styles.selected : '') }, { children: "AM" }), 'AM'));
            items.push(jsxRuntime.jsx("div", __assign({ className: "".concat(styles.timeItem, " ").concat(period === 'PM' ? styles.selected : '') }, { children: "PM" }), 'PM'));
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-bottom-1'));
            items.push(jsxRuntime.jsx("div", { className: styles.timeItem }, 'empty-bottom-2'));
        }
        return items;
    };
    return (jsxRuntime.jsxs("div", __assign({ className: styles.timePicker }, { children: [jsxRuntime.jsx("div", __assign({ className: styles.column }, { children: jsxRuntime.jsx("div", __assign({ className: styles.timeSection, onScroll: function () { return handleScroll('period'); }, onMouseDown: function (e) { return handleMouseDown(e, 'period'); }, ref: periodRef }, { children: jsxRuntime.jsx("div", __assign({ className: styles.scrollItems }, { children: renderItems('period') })) })) })), jsxRuntime.jsx("div", __assign({ className: styles.column }, { children: jsxRuntime.jsx("div", __assign({ className: styles.timeSection, onScroll: function () { return handleScroll('minute'); }, onMouseDown: function (e) { return handleMouseDown(e, 'minute'); }, ref: minutesRef }, { children: jsxRuntime.jsx("div", __assign({ className: styles.scrollItems }, { children: renderItems('minute') })) })) })), jsxRuntime.jsx("div", __assign({ className: styles.column }, { children: jsxRuntime.jsx("div", __assign({ className: styles.timeSection, onScroll: function () { return handleScroll('hour'); }, onMouseDown: function (e) { return handleMouseDown(e, 'hour'); }, ref: hoursRef }, { children: jsxRuntime.jsx("div", __assign({ className: styles.scrollItems }, { children: renderItems('hour') })) })) }))] })));
};

exports.TimePickerComponent = TimePickerComponent;
//# sourceMappingURL=index.js.map
