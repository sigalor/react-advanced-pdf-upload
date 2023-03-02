"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _reactDropzone = require("react-dropzone");
var _reactFeather = require("react-feather");
var _reactDraggable = _interopRequireDefault(require("react-draggable"));
var _uuid = require("uuid");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var Wrapper = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  & *::-webkit-scrollbar {\n    height: 12px;\n    width: 12px;\n    background: transparent;\n  }\n\n  & *::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    cursor: pointer;\n    width: 12px;\n    border: 3px solid hsla(0, 0%, 100%, 0);\n    background-clip: padding-box;\n    background-color: rgba(53, 65, 76, 0.3);\n  }\n\n  & *::-webkit-scrollbar-thumb:hover {\n    background-color: rgba(45, 70, 104, 0.4);\n    cursor: pointer;\n  }\n"])));
var Dropzone = _styledComponents.default.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 1rem;\n  height: 10rem;\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: #eeeeee;\n  border-style: dashed;\n  background-color: #fafafa;\n  color: #bdbdbd;\n  outline: none;\n  transition: border 0.24s ease-in-out;\n\n  &:focus,\n  &.drag-active {\n    border-color: #2196f3;\n  }\n\n  &.disabled {\n    cursor: wait;\n  }\n"])));
var UploadedPages = _styledComponents.default.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: relative;\n  user-select: none;\n  overflow-x: scroll;\n  overflow-y: hidden;\n"])));
var UploadedPagesInner = _styledComponents.default.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  height: 100%;\n  position: relative;\n"])));
var UploadedPage = _styledComponents.default.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  height: fit-content;\n  margin-top: auto;\n"])));
var UploadedPageInner = _styledComponents.default.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  position: relative;\n  width: fit-content;\n  height: fit-content;\n"])));
var UploadedPageOuter = _styledComponents.default.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n\n  &.dragging {\n    z-index: 1000;\n  }\n\n  &:not(.dragging) {\n    transition: transform 0.3s;\n  }\n\n  &.dragging > div {\n    transform: scale(1.1);\n    opacity: 0.9;\n  }\n\n  &.last-dragged {\n    z-index: 999;\n  }\n\n  &.disappeared > div {\n    transform: scale(0);\n    opacity: 0;\n  }\n"])));
var UploadedPageOuter2 = _styledComponents.default.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  transition: transform 0.3s, opacity 0.25s;\n"])));
var PageRemoveButton = _styledComponents.default.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: -0.4rem;\n  right: -0.4rem;\n  width: 1.5rem;\n  height: 1.5rem;\n  border-radius: 100%;\n  background-color: rgb(207, 49, 57);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: background-color 0.3s;\n  cursor: pointer;\n\n  &:hover {\n    background-color: rgb(166, 39, 45);\n  }\n"])));
var PreviewControls = _styledComponents.default.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  width: 100%;\n  margin-top: auto;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"])));
var RotateButton = _styledComponents.default.div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  cursor: pointer;\n"])));
var PreviewImgContainer = _styledComponents.default.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: width 0.3s, height 0.3s;\n"])));
var PreviewImg = _styledComponents.default.img(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  transition: box-shadow 0.3s, filter 0.3s, transform 0.3s, width 0.3s, height 0.3s;\n  box-shadow: 0 0 0.8rem rgba(0, 0, 0, 0.1);\n\n  &:hover {\n    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);\n    filter: brightness(105%);\n  }\n"])));
var UploadedPagesInteractionBlocker = _styledComponents.default.div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n  opacity: 0;\n  cursor: wait;\n  z-index: 10000;\n"])));
function readFileToBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.split(',')[1]);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
}
function getPageRotation(buildPdfData, pageOrIdx) {
  var _pageOrIdx$modificati;
  if (typeof pageOrIdx === 'number') pageOrIdx = buildPdfData.pages[pageOrIdx];
  return ((_pageOrIdx$modificati = pageOrIdx.modifications) !== null && _pageOrIdx$modificati !== void 0 ? _pageOrIdx$modificati : []).filter(m => m.type === 'rotate').reduce((sum, m) => sum + m.degrees, 0);
}
function getPageDimensions(buildPdfData, pageOrIdx) {
  if (typeof pageOrIdx === 'number') pageOrIdx = buildPdfData.pages[pageOrIdx];
  var rotation = getPageRotation(buildPdfData, pageOrIdx);
  return _objectSpread(_objectSpread({}, buildPdfData.files[pageOrIdx.origin.file].previews[pageOrIdx.origin.page].dimensions), {}, {
    isRotated: rotation % 180 !== 0,
    rotation
  });
}
function getMaxPreviewHeight(buildPdfData) {
  return Math.max(...buildPdfData.pages.map(p => {
    var dims = getPageDimensions(buildPdfData, p);
    return dims.isRotated ? dims.width : dims.height;
  }));
}
function calculatePreviewDimensions(buildPdfData, previewAreaHeight) {
  var maxPreviewHeight = getMaxPreviewHeight(buildPdfData);
  return buildPdfData.pages.map(p => {
    var pageDims = getPageDimensions(buildPdfData, p);
    var height = pageDims.height / maxPreviewHeight * previewAreaHeight;
    var width = pageDims.width / pageDims.height * height;
    return {
      isRotated: pageDims.isRotated,
      rotation: pageDims.rotation,
      unrotatedWidth: width,
      unrotatedHeight: height,
      width: pageDims.isRotated ? height : width,
      height: pageDims.isRotated ? width : height
    };
  });
}
function calculatePreviewPosition(previewDimensions, pageIdx, previewSpacing) {
  var x = 0;
  for (var i = 0; i < pageIdx; i++) {
    x += previewDimensions[i].width;
    x += previewSpacing;
  }
  return {
    x,
    y: 0
  };
}
var _default = _ref => {
  var _components$pageNumbe, _components$loading, _components$dropzoneP, _components$uploadedP;
  var {
    components,
    finalizeButton,
    loadPreviews,
    buildPdf,
    previewResolution = 100,
    previewAreaHeight = 240,
    previewAreaPadding = 16,
    previewSpacing = 24,
    previewControlsHeight = 40,
    showPreviewAreaWhenEmpty = false,
    defaultFilename = 'upload.pdf'
  } = _ref;
  var scrollbarHeight = 12;
  var actualPreviewAreaHeight = previewAreaHeight - previewAreaPadding * 2 - previewControlsHeight;
  var [buildPdfData, setBuildPdfData] = (0, _react.useState)({
    files: [],
    pages: []
  });
  var [previewsLoading, setPreviewsLoading] = (0, _react.useState)(false);
  var [buildPdfLoading, setBuildPdfLoading] = (0, _react.useState)(false);
  var [pageIdDragging, setPageIdDragging] = (0, _react.useState)(undefined);
  var [lastPageIdDragged, setLastPageIdDragged] = (0, _react.useState)(undefined);
  var resetState = () => {
    setBuildPdfData({
      files: [],
      pages: []
    });
    setPreviewsLoading(false);
    setBuildPdfLoading(false);
    setPageIdDragging(undefined);
    setLastPageIdDragged(undefined);
  };
  var onDrop = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(function* (acceptedFiles) {
      setPreviewsLoading(true);
      var newFiles = [...buildPdfData.files];
      var newPages = [...buildPdfData.pages];
      for (var fileIdx = 0; fileIdx < acceptedFiles.length; fileIdx++) {
        var file = acceptedFiles[fileIdx];
        var fileBase64 = yield readFileToBase64(file);
        var previews = void 0;
        try {
          var _yield$loadPreviews;
          previews = (_yield$loadPreviews = yield loadPreviews({
            file: fileBase64,
            resolution: previewResolution
          })) === null || _yield$loadPreviews === void 0 ? void 0 : _yield$loadPreviews.pages;
        } catch (e) {}
        if (previews) {
          newFiles.push({
            pdf: fileBase64,
            name: file.name,
            previews
          });
          for (var pageIdx = 0; pageIdx < previews.length; pageIdx++) {
            newPages.push({
              id: (0, _uuid.v4)(),
              origin: {
                file: buildPdfData.files.length + fileIdx,
                page: pageIdx
              },
              modifications: [],
              position: {
                x: 0,
                y: 0
              },
              disappeared: true
            });
          }
        }
      }
      var newBuildPdfData = {
        files: newFiles,
        pages: newPages
      };
      var previewDimensions = calculatePreviewDimensions(newBuildPdfData, actualPreviewAreaHeight);
      for (var i = 0; i < newPages.length; i++) {
        newPages[i].position = calculatePreviewPosition(previewDimensions, i, previewSpacing);
      }
      setBuildPdfData(newBuildPdfData);
      setTimeout(() => {
        setBuildPdfData({
          files: newFiles,
          pages: newPages.map(p => _objectSpread(_objectSpread({}, p), {}, {
            disappeared: false
          }))
        });
        setPreviewsLoading(false);
      }, 10);
    });
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [buildPdfData, loadPreviews, previewResolution, actualPreviewAreaHeight, previewSpacing]);
  var {
    isDragActive,
    getRootProps,
    getInputProps
  } = (0, _reactDropzone.useDropzone)({
    accept: {
      'application/pdf': []
    },
    disabled: previewsLoading || buildPdfLoading,
    onDrop
  });
  var calculatedPreviewDimensions = calculatePreviewDimensions(buildPdfData, actualPreviewAreaHeight);
  var calculatedPreviewPositions = buildPdfData.pages.map((_, pageIdx) => calculatePreviewPosition(calculatedPreviewDimensions, pageIdx, previewSpacing));
  var calculatedPreviewMidpoints = buildPdfData.pages.map((_, pageIdx) => calculatedPreviewPositions[pageIdx].x + calculatedPreviewDimensions[pageIdx].width / 2);
  var addPageModification = (pageIdx, mod) => {
    setBuildPdfData({
      files: buildPdfData.files,
      pages: buildPdfData.pages.map((p, i) => i === pageIdx ? _objectSpread(_objectSpread({}, p), {}, {
        modifications: [...p.modifications, mod]
      }) : p)
    });
  };
  var PageNumber = (_components$pageNumbe = components.pageNumber) !== null && _components$pageNumbe !== void 0 ? _components$pageNumbe : () => null;
  var onBuildPdf = (0, _react.useCallback)( /*#__PURE__*/_asyncToGenerator(function* () {
    if (buildPdfLoading) return;
    setBuildPdfLoading(true);
    var name = defaultFilename;
    var usedFileIds = [...new Set(buildPdfData.pages.map(p => p.origin.file))];
    if (usedFileIds.length === 1) {
      name = buildPdfData.files[usedFileIds[0]].name;
    }
    var buildPdfRet;
    try {
      buildPdfRet = yield buildPdf({
        files: buildPdfData.files.map(f => f.pdf),
        pages: buildPdfData.pages.map(p => ({
          origin: p.origin,
          modifications: p.modifications
        })),
        name
      });
    } catch (e) {}
    if (buildPdfRet === 'resetLoading') setBuildPdfLoading(false);else if (buildPdfRet === 'reset') resetState();
  }), [buildPdf, buildPdfData, buildPdfLoading, defaultFilename]);

  // handle finalize button
  (0, _react.useEffect)(() => {
    var _finalizeButton$ref;
    var btn = (_finalizeButton$ref = finalizeButton.ref) === null || _finalizeButton$ref === void 0 ? void 0 : _finalizeButton$ref.current;
    if (btn) {
      btn.addEventListener('click', onBuildPdf);
      return () => {
        btn.removeEventListener('click', onBuildPdf);
      };
    }
  }, [finalizeButton.ref, onBuildPdf]);
  (0, _react.useEffect)(() => {
    if (finalizeButton.setLoading) {
      finalizeButton.setLoading(buildPdfLoading);
    }
  }, [finalizeButton, finalizeButton.setLoading, buildPdfLoading]);
  (0, _react.useEffect)(() => {
    if (finalizeButton.setDisabled) {
      finalizeButton.setDisabled(previewsLoading || buildPdfData.pages.length === 0);
    }
  }, [finalizeButton, finalizeButton.setDisabled, previewsLoading, buildPdfData.pages.length]);
  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(Dropzone, getRootProps({
    className: (previewsLoading || buildPdfLoading ? 'disabled' : '') + (isDragActive ? ' drag-active' : '')
  }), /*#__PURE__*/_react.default.createElement("input", getInputProps()), previewsLoading ? (_components$loading = components.loading) !== null && _components$loading !== void 0 ? _components$loading : null : (_components$dropzoneP = components.dropzonePlaceholder) !== null && _components$dropzoneP !== void 0 ? _components$dropzoneP : null), showPreviewAreaWhenEmpty || buildPdfData.pages.length > 0 ? (_components$uploadedP = components.uploadedPagesHeading) !== null && _components$uploadedP !== void 0 ? _components$uploadedP : null : null, showPreviewAreaWhenEmpty || buildPdfData.pages.length > 0 ? /*#__PURE__*/_react.default.createElement(UploadedPages, {
    style: {
      height: previewAreaHeight + 'px',
      padding: "".concat(previewAreaPadding, "px ").concat(previewAreaPadding, "px ").concat(previewAreaPadding - scrollbarHeight, "px ").concat(previewAreaPadding, "px")
    }
  }, /*#__PURE__*/_react.default.createElement(UploadedPagesInner, null, buildPdfData.pages.map((page, pageIdx) => {
    var preview = buildPdfData.files[page.origin.file].previews[page.origin.page];
    var calculatedPosition = calculatedPreviewPositions[pageIdx];
    var calculatedDimensions = calculatedPreviewDimensions[pageIdx];
    return /*#__PURE__*/_react.default.createElement(_reactDraggable.default, {
      key: JSON.stringify(page.origin),
      axis: "x",
      position: pageIdDragging === page.id ? page.position : calculatedPosition,
      onDrag: (e, position) => {
        var newPosition = {
          x: position.x,
          y: calculatedPosition.y
        };
        var newMidpoint = position.x + calculatedDimensions.width / 2;
        var newPages = buildPdfData.pages.map((p, i) => i === pageIdx ? _objectSpread(_objectSpread({}, p), {}, {
          position: newPosition
        }) : p);

        // look for the leftmost preview whose midpoint has been exceeded while moving to the left hand side
        var draggedPage = false;
        for (var i = 0; i < pageIdx; i++) {
          if (calculatedPreviewMidpoints[i] > newMidpoint) {
            var [currentPage] = newPages.splice(pageIdx, 1);
            newPages.splice(i, 0, currentPage);
            draggedPage = true;
            break;
          }
        }

        // if no such preview was found, look for the rightmost one
        if (!draggedPage) {
          for (var _i = buildPdfData.pages.length - 1; _i > pageIdx; _i--) {
            if (calculatedPreviewMidpoints[_i] < newMidpoint) {
              var [_currentPage] = newPages.splice(pageIdx, 1);
              newPages.splice(_i, 0, _currentPage);
              break;
            }
          }
        }
        setBuildPdfData({
          files: buildPdfData.files,
          pages: newPages
        });
      },
      onStart: () => {
        setBuildPdfData({
          files: buildPdfData.files,
          pages: buildPdfData.pages.map((p, i) => i === pageIdx ? _objectSpread(_objectSpread({}, p), {}, {
            position: calculatedPosition
          }) : p)
        });
        setPageIdDragging(page.id);
      },
      onStop: () => {
        setPageIdDragging(undefined);
        setLastPageIdDragged(page.id);
      }
    }, /*#__PURE__*/_react.default.createElement(UploadedPageOuter, {
      className: (pageIdDragging === page.id ? 'dragging' : '') + ' ' + (lastPageIdDragged === page.id ? 'last-dragged' : '') + ' ' + (page.disappeared ? 'disappeared' : '')
    }, /*#__PURE__*/_react.default.createElement(UploadedPageOuter2, null, /*#__PURE__*/_react.default.createElement(UploadedPage, {
      style: {
        cursor: pageIdDragging === page.id ? 'move' : 'auto'
      }
    }, /*#__PURE__*/_react.default.createElement(UploadedPageInner, null, /*#__PURE__*/_react.default.createElement(PreviewImgContainer, {
      style: {
        width: calculatedDimensions.width + 'px',
        height: calculatedDimensions.height + 'px'
      }
    }, /*#__PURE__*/_react.default.createElement(PreviewImg, {
      alt: "",
      src: preview.uri,
      style: {
        width: calculatedDimensions.unrotatedWidth + 'px',
        height: calculatedDimensions.unrotatedHeight + 'px',
        transform: "rotate(".concat(calculatedDimensions.rotation, "deg)")
      },
      draggable: "false",
      onDragStart: e => e.preventDefault()
    })), /*#__PURE__*/_react.default.createElement(PageRemoveButton, {
      onMouseDown: e => e.stopPropagation(),
      onClick: () => {
        setBuildPdfData({
          files: buildPdfData.files,
          pages: buildPdfData.pages.map((p, i) => i === pageIdx ? _objectSpread(_objectSpread({}, p), {}, {
            disappeared: true
          }) : p)
        });
        setTimeout(() => setBuildPdfData({
          files: buildPdfData.files,
          pages: buildPdfData.pages.filter((_, i) => i !== pageIdx)
        }), 300);
      }
    }, /*#__PURE__*/_react.default.createElement(_reactFeather.X, {
      color: "white",
      size: "1rem"
    })))), /*#__PURE__*/_react.default.createElement(PreviewControls, {
      style: {
        height: previewControlsHeight + 'px'
      }
    }, /*#__PURE__*/_react.default.createElement(RotateButton, {
      onMouseDown: e => e.stopPropagation(),
      onClick: () => addPageModification(pageIdx, {
        type: 'rotate',
        degrees: -90
      })
    }, /*#__PURE__*/_react.default.createElement(_reactFeather.RotateCcw, {
      color: "#888",
      size: "0.8rem"
    })), /*#__PURE__*/_react.default.createElement("span", {
      style: {
        margin: '0 1rem'
      }
    }, /*#__PURE__*/_react.default.createElement(PageNumber, {
      n: pageIdx + 1
    })), /*#__PURE__*/_react.default.createElement(RotateButton, {
      onMouseDown: e => e.stopPropagation(),
      onClick: () => addPageModification(pageIdx, {
        type: 'rotate',
        degrees: 90
      })
    }, /*#__PURE__*/_react.default.createElement(_reactFeather.RotateCw, {
      color: "#888",
      size: "0.8rem"
    }))))));
  })), previewsLoading || buildPdfLoading ? /*#__PURE__*/_react.default.createElement(UploadedPagesInteractionBlocker, null) : null) : null);
};
exports.default = _default;