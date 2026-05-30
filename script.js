const editorCanvas = document.getElementById("editorCanvas");
const overlayCanvas = document.getElementById("overlayCanvas");
const editorCtx = editorCanvas.getContext("2d");
const overlayCtx = overlayCanvas.getContext("2d");
const canvasStage = document.getElementById("canvasStage");

const fileInput = document.getElementById("fileInput");
const saveBtn = document.getElementById("saveBtn");
const rotateBtn = document.getElementById("rotateBtn");
const scalePreset = document.getElementById("scalePreset");
const toggleLayersBtn = document.getElementById("toggleLayersBtn");
const languageSelect = document.getElementById("languageSelect");
const closeLayersBtn = document.getElementById("closeLayersBtn");
const addLayerBtn = document.getElementById("addLayerBtn");
const layersList = document.getElementById("layersList");
const layerPopup = document.getElementById("layerPopup");
const layerItemTemplate = document.getElementById("layerItemTemplate");
const statusText = document.getElementById("statusText");
const toolName = document.getElementById("toolName");
const canvasArea = document.querySelector(".canvas-area");

const quickActionButtons = [...document.querySelectorAll(".quick-action")];
const toolDetailPanels = [...document.querySelectorAll(".tool-detail")];
const drawModeButtons = [...document.querySelectorAll(".mode-button")];

const brightnessRange = document.getElementById("brightnessRange");
const brightnessValue = document.getElementById("brightnessValue");
const contrastRange = document.getElementById("contrastRange");
const contrastValue = document.getElementById("contrastValue");
const hueRange = document.getElementById("hueRange");
const hueValue = document.getElementById("hueValue");
const saturationRange = document.getElementById("saturationRange");
const saturationValue = document.getElementById("saturationValue");
const resetToneBtn = document.getElementById("resetToneBtn");
const resetColorBtn = document.getElementById("resetColorBtn");

const drawColorInput = document.getElementById("drawColor");
const textColorInput = document.getElementById("textColor");
const brushSizeInput = document.getElementById("brushSize");
const brushSizeValue = document.getElementById("brushSizeValue");
const mosaicSizeInput = document.getElementById("mosaicSize");
const mosaicSizeValue = document.getElementById("mosaicSizeValue");
const textValueInput = document.getElementById("textValue");
const fontSizeInput = document.getElementById("fontSize");
const fontFamilyInput = document.getElementById("fontFamily");

const historyLimit = 40;
const defaultLanguage = "zh-CN";
const languageStorageKey = "xiaoHuaTangGuoWu.language";
const translations = {
  "zh-CN": {
    "app.title": "小画糖果屋",
    "toolbar.fileGroup": "文件管理",
    "toolbar.openFile": "打开文件",
    "toolbar.saveFile": "保存文件",
    "toolbar.rotateScaleGroup": "旋转和缩放",
    "toolbar.rotate90": "旋转 90°",
    "toolbar.scale": "缩放",
    "toolbar.scaleFit": "自适应",
    "toolbar.layerGroup": "图层管理",
    "toolbar.languageGroup": "语言切换",
    "toolbar.language": "语言",
    "toolbar.languageZh": "中文",
    "toolbar.languageEn": "English",
    "quick.tone": "亮度",
    "quick.color": "色相",
    "quick.crop": "裁剪",
    "quick.draw": "绘制",
    "quick.mosaic": "马赛克",
    "quick.text": "文字",
    "home.title": "快速说明",
    "home.line1": "先打开图片，再点左侧图标切换功能。",
    "home.line2": "需要局部修改时，可以先点上方“图层管理”复制图层。",
    "home.line3": "右侧是主操作区，拖动、点击、框选都在那边完成。",
    "tone.title": "亮度与对比度",
    "tone.tip": "只作用于当前选中的图层。",
    "tone.brightness": "亮度",
    "tone.contrast": "对比度",
    "tone.reset": "重置亮度对比度",
    "color.title": "色相与饱和度",
    "color.tip": "适合让图片颜色更鲜艳或更柔和。",
    "color.hue": "色相",
    "color.saturation": "饱和度",
    "color.reset": "重置色相饱和度",
    "crop.title": "裁剪图片",
    "crop.tip": "切换到裁剪后，在右侧图片上拖出一个矩形区域，松手就会完成裁剪。",
    "draw.title": "绘制线条",
    "draw.brush": "涂鸦",
    "draw.line": "直线",
    "draw.curve": "曲线",
    "draw.color": "线条颜色",
    "draw.size": "线条粗细",
    "mosaic.title": "矩形马赛克",
    "mosaic.tip": "在右侧框选区域后，会自动打上马赛克。",
    "mosaic.size": "颗粒大小",
    "text.title": "添加文字",
    "text.tip": "输入内容后，到右侧图片上点一下就能放字。",
    "text.color": "文字颜色",
    "text.input": "输入文字",
    "text.placeholder": "输入文字后，到右侧图片上点击放置",
    "text.fontSize": "字号",
    "text.fontFamily": "字体",
    "text.fontCute": "圆润可爱",
    "text.fontHand": "手写感",
    "text.fontClean": "清爽简洁",
    "layerPopup.title": "图层管理",
    "layerPopup.tip": "先选中图层，再去右侧进行图片处理。",
    "layerPopup.duplicate": "复制图层",
    "layerPopup.delete": "删除",
    "layerPopup.visible": "显示中",
    "layerPopup.hidden": "已隐藏",
    "runtime.currentMode": "当前模式：{label}",
    "runtime.drawMode": "绘制 · {tool}",
    "runtime.layerToggle": "图层管理 · {count}",
    "runtime.panel.home": "浏览",
    "runtime.panel.tone": "亮度 / 对比度",
    "runtime.panel.color": "色相 / 饱和度",
    "runtime.panel.crop": "裁剪图片",
    "runtime.panel.draw": "绘制线条",
    "runtime.panel.mosaic": "马赛克",
    "runtime.panel.text": "文字",
    "runtime.tool.pan": "浏览",
    "runtime.tool.brush": "涂鸦",
    "runtime.tool.line": "直线",
    "runtime.tool.curve": "曲线",
    "runtime.tool.crop": "裁剪",
    "runtime.tool.mosaic": "马赛克",
    "runtime.tool.text": "文字",
    "runtime.layerName": "图层 {index}",
    "runtime.baseLayer": "底图图层",
    "runtime.currentLayer": "当前图层",
    "runtime.layerCopyName": "{name} 副本 {index}",
    "runtime.defaultSaveName": "已编辑图片.png",
    "runtime.saveSuffix": "-已编辑",
    "runtime.welcomeTitle": "小画糖果屋",
    "runtime.welcomeSubtitle": "打开图片后，点左侧图标就能开始编辑",
    "status.undo.empty": "已经没有可以撤销的操作了。",
    "status.undo.done": "已撤销上一步操作。",
    "status.layer.switched": "已切换到 {name}",
    "status.layer.visible": "{name} 已显示",
    "status.layer.hidden": "{name} 已隐藏",
    "status.layer.minOne": "至少保留一个图层哦。",
    "status.layer.deleted": "已删除 {name}",
    "status.text.moved": "文字位置已移动。",
    "status.draw.line": "已画出一条直线。",
    "status.draw.curve": "已画出一条曲线。",
    "status.crop.done": "裁剪完成。",
    "status.mosaic.done": "马赛克已经盖好了。",
    "status.text.empty": "先输入文字内容，再到右侧图片上点一下哦。",
    "status.text.added": "文字已经放到图片上了，可继续拖动调整位置。",
    "status.exported": "图片已经导出为 {filename}",
    "status.image.opened": "已打开 {filename}，可以开始编辑了。",
    "status.image.openFailed": "图片打开失败，请换一张常见格式的图片试试。",
    "status.adjust.toneReset": "当前图层的亮度和对比度已重置。",
    "status.adjust.colorReset": "当前图层的色相和饱和度已重置。",
    "status.layer.duplicated": "{name} 已复制，可在副本上继续处理并对比效果。",
    "status.scale.fit": "图片已切换为自适应显示。",
    "status.scale.percent": "图片已切换为 {scale}% 显示。",
    "status.panel.tone": "正在调整当前图层的亮度和对比度。",
    "status.panel.color": "正在调整当前图层的色相和饱和度。",
    "status.panel.crop": "请在右侧图片上拖出裁剪区域。",
    "status.panel.draw": "请在右侧图片上绘制线条或涂鸦。",
    "status.panel.mosaic": "请在右侧框选需要打马赛克的区域。",
    "status.panel.text": "点击添加文字，拖动可调整文字位置。",
    "status.rotate": "整张图片已旋转 90°",
    "status.layerPopup.open": "图层弹窗已打开。",
    "status.layerPopup.close": "图层弹窗已关闭。",
    "status.drawMode.current": "当前绘制模式：{tool}",
    "status.text.colorUpdated": "已更新当前文字颜色。",
    "status.text.contentUpdated": "已更新当前文字内容。",
    "status.text.sizeUpdated": "已更新当前文字字号。",
    "status.text.fontUpdated": "已更新当前文字字体。",
    "status.text.selected": "已选中文字，可切换到文字功能后拖动。",
    "status.tool.selectAction": "请选择左侧一个具体功能，再到右侧图片上操作。",
  },
  en: {
    "app.title": "Candy Art House",
    "toolbar.fileGroup": "File",
    "toolbar.openFile": "Open",
    "toolbar.saveFile": "Save",
    "toolbar.rotateScaleGroup": "Rotate & Scale",
    "toolbar.rotate90": "Rotate 90°",
    "toolbar.scale": "Scale",
    "toolbar.scaleFit": "Fit",
    "toolbar.layerGroup": "Layers",
    "toolbar.languageGroup": "Language",
    "toolbar.language": "Language",
    "toolbar.languageZh": "Chinese",
    "toolbar.languageEn": "English",
    "quick.tone": "Tone",
    "quick.color": "Color",
    "quick.crop": "Crop",
    "quick.draw": "Draw",
    "quick.mosaic": "Mosaic",
    "quick.text": "Text",
    "home.title": "Quick Start",
    "home.line1": "Open an image first, then tap a tool button on the left.",
    "home.line2": "For safer edits, open Layer Manager above and duplicate the layer first.",
    "home.line3": "Use the large panel on the right to drag, click, and select on the image.",
    "tone.title": "Brightness & Contrast",
    "tone.tip": "Only affects the currently selected layer.",
    "tone.brightness": "Brightness",
    "tone.contrast": "Contrast",
    "tone.reset": "Reset Brightness & Contrast",
    "color.title": "Hue & Saturation",
    "color.tip": "Use this to make colors more vivid or softer.",
    "color.hue": "Hue",
    "color.saturation": "Saturation",
    "color.reset": "Reset Hue & Saturation",
    "crop.title": "Crop Image",
    "crop.tip": "After switching to Crop, drag a rectangle on the image and release to finish cropping.",
    "draw.title": "Draw Lines",
    "draw.brush": "Brush",
    "draw.line": "Line",
    "draw.curve": "Curve",
    "draw.color": "Stroke Color",
    "draw.size": "Stroke Size",
    "mosaic.title": "Rectangular Mosaic",
    "mosaic.tip": "Drag-select an area on the image and mosaic will be applied automatically.",
    "mosaic.size": "Block Size",
    "text.title": "Add Text",
    "text.tip": "Enter text, then click on the image to place it.",
    "text.color": "Text Color",
    "text.input": "Text",
    "text.placeholder": "Type text here, then click the image to place it",
    "text.fontSize": "Size",
    "text.fontFamily": "Font",
    "text.fontCute": "Cute Round",
    "text.fontHand": "Handwritten",
    "text.fontClean": "Clean",
    "layerPopup.title": "Layers",
    "layerPopup.tip": "Select a layer first, then edit it on the canvas.",
    "layerPopup.duplicate": "Duplicate Layer",
    "layerPopup.delete": "Delete",
    "layerPopup.visible": "Visible",
    "layerPopup.hidden": "Hidden",
    "runtime.currentMode": "Mode: {label}",
    "runtime.drawMode": "Draw · {tool}",
    "runtime.layerToggle": "Layers · {count}",
    "runtime.panel.home": "Browse",
    "runtime.panel.tone": "Brightness / Contrast",
    "runtime.panel.color": "Hue / Saturation",
    "runtime.panel.crop": "Crop Image",
    "runtime.panel.draw": "Draw Lines",
    "runtime.panel.mosaic": "Mosaic",
    "runtime.panel.text": "Text",
    "runtime.tool.pan": "Browse",
    "runtime.tool.brush": "Brush",
    "runtime.tool.line": "Line",
    "runtime.tool.curve": "Curve",
    "runtime.tool.crop": "Crop",
    "runtime.tool.mosaic": "Mosaic",
    "runtime.tool.text": "Text",
    "runtime.layerName": "Layer {index}",
    "runtime.baseLayer": "Base Layer",
    "runtime.currentLayer": "Current Layer",
    "runtime.layerCopyName": "{name} Copy {index}",
    "runtime.defaultSaveName": "edited-image.png",
    "runtime.saveSuffix": "-edited",
    "runtime.welcomeTitle": "Candy Art House",
    "runtime.welcomeSubtitle": "Open an image, then tap a tool on the left to start editing",
    "status.undo.empty": "There is nothing left to undo.",
    "status.undo.done": "The last action was undone.",
    "status.layer.switched": "Switched to {name}.",
    "status.layer.visible": "{name} is now visible.",
    "status.layer.hidden": "{name} is now hidden.",
    "status.layer.minOne": "Please keep at least one layer.",
    "status.layer.deleted": "Deleted {name}.",
    "status.text.moved": "The text position was updated.",
    "status.draw.line": "A straight line was added.",
    "status.draw.curve": "A curved line was added.",
    "status.crop.done": "Cropping is complete.",
    "status.mosaic.done": "Mosaic was applied.",
    "status.text.empty": "Enter some text first, then click once on the image.",
    "status.text.added": "Text was added. You can keep dragging it to adjust the position.",
    "status.exported": "The image was exported as {filename}.",
    "status.image.opened": "{filename} is open and ready to edit.",
    "status.image.openFailed": "The image could not be opened. Please try a common image format.",
    "status.adjust.toneReset": "Brightness and contrast were reset for the current layer.",
    "status.adjust.colorReset": "Hue and saturation were reset for the current layer.",
    "status.layer.duplicated": "{name} was duplicated. Keep editing the copy to compare results.",
    "status.scale.fit": "The image is now shown in fit mode.",
    "status.scale.percent": "The image is now shown at {scale}%.",
    "status.panel.tone": "Adjusting brightness and contrast for the current layer.",
    "status.panel.color": "Adjusting hue and saturation for the current layer.",
    "status.panel.crop": "Drag on the image to choose a crop area.",
    "status.panel.draw": "Draw lines or doodles on the image.",
    "status.panel.mosaic": "Drag-select the area that needs a mosaic effect.",
    "status.panel.text": "Click to add text, then drag it to reposition.",
    "status.rotate": "The image was rotated by 90°.",
    "status.layerPopup.open": "Layer popup opened.",
    "status.layerPopup.close": "Layer popup closed.",
    "status.drawMode.current": "Current draw mode: {tool}",
    "status.text.colorUpdated": "The selected text color was updated.",
    "status.text.contentUpdated": "The selected text content was updated.",
    "status.text.sizeUpdated": "The selected text size was updated.",
    "status.text.fontUpdated": "The selected text font was updated.",
    "status.text.selected": "Text selected. Switch to the Text tool to drag it.",
    "status.tool.selectAction": "Choose a tool on the left, then work on the image on the right.",
  },
};

function resolveLanguage(language) {
  return Object.prototype.hasOwnProperty.call(translations, language) ? language : defaultLanguage;
}

function formatMessage(template, params = {}) {
  return template.replace(/\{(\w+)\}/g, (_, token) => {
    const value = params[token];
    return value === undefined || value === null ? "" : String(value);
  });
}

function hasTranslationKey(key, language) {
  const currentLanguage = resolveLanguage(language);
  return (
    Object.prototype.hasOwnProperty.call(translations[currentLanguage] || {}, key) ||
    Object.prototype.hasOwnProperty.call(translations[defaultLanguage] || {}, key)
  );
}

function t(key, params = {}, language) {
  const currentLanguage = resolveLanguage(language || state.language || defaultLanguage);
  const message = translations[currentLanguage]?.[key] ?? translations[defaultLanguage]?.[key] ?? key;
  return formatMessage(message, params);
}

function readStoredLanguage() {
  try {
    return resolveLanguage(window.localStorage.getItem(languageStorageKey));
  } catch (error) {
    return defaultLanguage;
  }
}

function writeStoredLanguage(language) {
  try {
    window.localStorage.setItem(languageStorageKey, resolveLanguage(language));
  } catch (error) {
    return;
  }
}

const state = {
  language: defaultLanguage,
  docWidth: 960,
  docHeight: 640,
  layers: [],
  activeLayerId: null,
  nextLayerId: 1,
  nextTextId: 1,
  currentTool: "pan",
  activePanel: "home",
  layerPopupOpen: false,
  isPointerDown: false,
  draftStart: null,
  draftCurrent: null,
  lastPointer: null,
  lastSavedName: "edited-image.png",
  sourceFileName: "",
  viewScale: 1,
  scaleMode: "fit",
  selectedTextId: null,
  dragTextState: null,
  history: [],
  isPristineWelcome: false,
  lastStatus: null,
};

function createOffscreenCanvas(width, height) {
  if (typeof OffscreenCanvas !== "undefined") {
    return new OffscreenCanvas(width, height);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function getCanvasContext(canvas, needsRead = false) {
  const context = canvas.getContext("2d", needsRead ? { willReadFrequently: true } : undefined);
  return context;
}

function resetLayerContextDefaults(ctx) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function getForegroundColor() {
  return drawColorInput.value;
}

function syncForegroundColor(nextValue) {
  drawColorInput.value = nextValue;
  textColorInput.value = nextValue;
}

function getPanelLabel(panel) {
  return t(`runtime.panel.${panel}`);
}

function getToolLabel(tool) {
  return t(`runtime.tool.${tool}`);
}

function getLayerName(index) {
  return t("runtime.layerName", { index });
}

function getBaseLayerName() {
  return t("runtime.baseLayer");
}

function getCurrentLayerLabel() {
  return t("runtime.currentLayer");
}

function getDuplicatedLayerName(sourceName, index) {
  return t("runtime.layerCopyName", { name: sourceName, index });
}

function localizeLayerName(name) {
  if (!name) {
    return getLayerName(state.layers.length + 1);
  }

  if (name === "runtime.baseLayer" || name === "runtime.currentLayer") {
    return t(name);
  }

  return name;
}

function refreshLayerNames() {
  state.layers.forEach((layer, index) => {
    if (layer.nameKey === "runtime.baseLayer") {
      layer.name = getBaseLayerName();
    } else if (layer.nameKey === "runtime.layerName") {
      layer.name = getLayerName(index + 1);
    } else if (layer.nameKey === "runtime.layerCopyName") {
      const sourceLayer = state.layers.find((current) => current.id === layer.copySourceLayerId);
      const sourceName = sourceLayer?.name || localizeLayerName(layer.copySourceName || "");
      layer.name = getDuplicatedLayerName(sourceName, layer.copyIndex || index + 1);
    }
  });
}

function rememberStatus(key, params = {}) {
  state.lastStatus = { key, params };
  updateStatus(t(key, params));
}

function createLayer(name) {
  const canvas = createOffscreenCanvas(state.docWidth, state.docHeight);
  const ctx = getCanvasContext(canvas, true);
  resetLayerContextDefaults(ctx);

  return {
    id: `layer-${state.nextLayerId++}`,
    name: name || getLayerName(state.layers.length + 1),
    nameKey: name ? null : "runtime.layerName",
    canvas,
    ctx,
    visible: true,
    textItems: [],
    copySourceName: null,
    copySourceLayerId: null,
    copyIndex: null,
    adjustments: {
      brightness: 100,
      contrast: 100,
      hue: 0,
      saturation: 100,
    },
  };
}

function createTextItem({ text, x, y, color, fontSize, fontFamily }) {
  return {
    id: `text-${state.nextTextId++}`,
    text,
    x,
    y,
    color,
    fontSize,
    fontFamily,
  };
}

function cloneTextItem(item) {
  return {
    id: item.id,
    text: item.text,
    x: item.x,
    y: item.y,
    color: item.color,
    fontSize: item.fontSize,
    fontFamily: item.fontFamily,
  };
}

function measureTextItem(item) {
  const measureCanvas = createOffscreenCanvas(1, 1);
  const measureCtx = getCanvasContext(measureCanvas);
  measureCtx.font = `${item.fontSize}px ${item.fontFamily}`;

  const lines = item.text.split(/\n+/);
  let maxWidth = 0;
  lines.forEach((line) => {
    maxWidth = Math.max(maxWidth, measureCtx.measureText(line).width);
  });

  const lineHeight = item.fontSize + 8;
  return {
    width: Math.max(1, Math.ceil(maxWidth)),
    height: Math.max(item.fontSize, lines.length * lineHeight - 8),
    lineHeight,
  };
}

function drawTextItem(ctx, item) {
  ctx.save();
  ctx.font = `${item.fontSize}px ${item.fontFamily}`;
  ctx.fillStyle = item.color;
  ctx.textBaseline = "top";
  const lines = item.text.split(/\n+/);
  const metrics = measureTextItem(item);
  lines.forEach((line, index) => {
    ctx.fillText(line, item.x, item.y + index * metrics.lineHeight);
  });
  ctx.restore();
}

function findTextItemAtPoint(point) {
  for (let layerIndex = state.layers.length - 1; layerIndex >= 0; layerIndex -= 1) {
    const layer = state.layers[layerIndex];
    if (!layer.visible) {
      continue;
    }

    for (let textIndex = layer.textItems.length - 1; textIndex >= 0; textIndex -= 1) {
      const item = layer.textItems[textIndex];
      const metrics = measureTextItem(item);
      const inside =
        point.x >= item.x &&
        point.x <= item.x + metrics.width &&
        point.y >= item.y &&
        point.y <= item.y + metrics.height;

      if (inside) {
        return {
          layer,
          item,
          metrics,
        };
      }
    }
  }

  return null;
}

function getSelectedTextItem() {
  if (!state.selectedTextId) {
    return null;
  }

  for (const layer of state.layers) {
    const item = layer.textItems.find((textItem) => textItem.id === state.selectedTextId);
    if (item) {
      return { layer, item };
    }
  }

  return null;
}

function ensureBaseLayer() {
  if (state.layers.length > 0) {
    return getActiveLayer();
  }

  const layer = createLayer(getBaseLayerName());
  layer.nameKey = "runtime.baseLayer";
  state.layers.push(layer);
  state.activeLayerId = layer.id;
  syncAdjustmentInputs();
  syncDocumentIndicators();
  renderLayersPanel();
  renderCanvas();
  return layer;
}

function getActiveLayer() {
  return state.layers.find((layer) => layer.id === state.activeLayerId) || null;
}

function setActiveLayer(layerId) {
  state.activeLayerId = layerId;
  syncAdjustmentInputs();
  renderLayersPanel();
  renderCanvas();
  rememberStatus("status.layer.switched", {
    name: getActiveLayer()?.name || getCurrentLayerLabel(),
  });
}

function buildHistorySnapshot() {
  return {
    docWidth: state.docWidth,
    docHeight: state.docHeight,
    activeLayerId: state.activeLayerId,
    nextLayerId: state.nextLayerId,
    nextTextId: state.nextTextId,
    selectedTextId: state.selectedTextId,
    layers: state.layers.map((layer) => {
      const imageData = layer.ctx.getImageData(0, 0, state.docWidth, state.docHeight);
      return {
        id: layer.id,
        name: layer.name,
        nameKey: layer.nameKey || null,
        visible: layer.visible,
        copySourceName: layer.copySourceName || null,
        copySourceLayerId: layer.copySourceLayerId || null,
        copyIndex: layer.copyIndex || null,
        adjustments: {
          brightness: layer.adjustments.brightness,
          contrast: layer.adjustments.contrast,
          hue: layer.adjustments.hue,
          saturation: layer.adjustments.saturation,
        },
        textItems: layer.textItems.map(cloneTextItem),
        imageData,
      };
    }),
  };
}

function restoreSnapshot(snapshot) {
  state.docWidth = snapshot.docWidth;
  state.docHeight = snapshot.docHeight;
  state.activeLayerId = snapshot.activeLayerId;
  state.nextLayerId = snapshot.nextLayerId;
  state.nextTextId = snapshot.nextTextId;
  state.selectedTextId = snapshot.selectedTextId;
  state.layers = snapshot.layers.map((layerData) => {
    const canvas = createOffscreenCanvas(snapshot.docWidth, snapshot.docHeight);
    const ctx = getCanvasContext(canvas, true);
    resetLayerContextDefaults(ctx);
    if (layerData.imageData) {
      ctx.putImageData(layerData.imageData, 0, 0);
    }
    return {
      id: layerData.id,
      name: layerData.name,
      nameKey: layerData.nameKey || null,
      canvas,
      ctx,
      visible: layerData.visible,
      textItems: layerData.textItems.map(cloneTextItem),
      copySourceName: layerData.copySourceName || null,
      copySourceLayerId: layerData.copySourceLayerId || null,
      copyIndex: layerData.copyIndex || null,
      adjustments: {
        brightness: layerData.adjustments.brightness,
        contrast: layerData.adjustments.contrast,
        hue: layerData.adjustments.hue,
        saturation: layerData.adjustments.saturation,
      },
    };
  });
}

function pushHistorySnapshot() {
  state.history.push(buildHistorySnapshot());
  if (state.history.length > historyLimit) {
    state.history.shift();
  }
}

function undoLastAction() {
  if (state.history.length === 0) {
    rememberStatus("status.undo.empty");
    return;
  }

  const snapshot = state.history.pop();
  restoreSnapshot(snapshot);
  refreshLayerNames();
  syncDocumentIndicators();
  syncAdjustmentInputs();
  renderLayersPanel();
  renderCanvas();
  rememberStatus("status.undo.done");
}

function withHistory(action) {
  pushHistorySnapshot();
  state.isPristineWelcome = false;
  action();
}

function resizeMainCanvases() {
  editorCanvas.width = state.docWidth;
  editorCanvas.height = state.docHeight;
  overlayCanvas.width = state.docWidth;
  overlayCanvas.height = state.docHeight;
  applyViewScale();
}

function calculateFitScale() {
  if (!canvasArea) {
    return 1;
  }

  const canvasAreaRect = canvasArea.getBoundingClientRect();
  const availableWidth = Math.max(220, canvasAreaRect.width - 24);
  const availableHeight = Math.max(220, canvasAreaRect.height - 24);
  const widthScale = availableWidth / state.docWidth;
  const heightScale = availableHeight / state.docHeight;
  return Math.min(widthScale, heightScale, 1);
}

function applyViewScale() {
  let scale = 1;

  if (state.scaleMode === "fit") {
    scale = calculateFitScale();
  } else {
    scale = Number(state.scaleMode) / 100;
  }

  state.viewScale = scale;
  const scaledWidth = Math.max(1, Math.round(state.docWidth * scale));
  const scaledHeight = Math.max(1, Math.round(state.docHeight * scale));
  canvasStage.style.width = `${scaledWidth}px`;
  canvasStage.style.height = `${scaledHeight}px`;
  editorCanvas.style.width = `${scaledWidth}px`;
  editorCanvas.style.height = `${scaledHeight}px`;
  overlayCanvas.style.width = `${scaledWidth}px`;
  overlayCanvas.style.height = `${scaledHeight}px`;
}

function syncDocumentIndicators() {
  resizeMainCanvases();
}

function syncAdjustmentInputs() {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }

  brightnessRange.value = layer.adjustments.brightness;
  contrastRange.value = layer.adjustments.contrast;
  hueRange.value = layer.adjustments.hue;
  saturationRange.value = layer.adjustments.saturation;

  brightnessValue.textContent = `${layer.adjustments.brightness}%`;
  contrastValue.textContent = `${layer.adjustments.contrast}%`;
  hueValue.textContent = `${layer.adjustments.hue}°`;
  saturationValue.textContent = `${layer.adjustments.saturation}%`;
}

function updateToolName() {
  let label = getPanelLabel(state.activePanel);
  if (state.activePanel === "draw") {
    label = t("runtime.drawMode", { tool: getToolLabel(state.currentTool || "line") });
  } else if (["crop", "mosaic", "text"].includes(state.currentTool)) {
    label = getPanelLabel(state.activePanel);
  }

  toolName.textContent = t("runtime.currentMode", { label });
}

function setActivePanel(panel) {
  state.activePanel = panel;

  quickActionButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panel === panel);
  });

  toolDetailPanels.forEach((panelNode) => {
    panelNode.classList.toggle("active", panelNode.dataset.panel === panel);
  });

  updateToolName();
}

function setTool(tool) {
  state.currentTool = tool;
  drawModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.drawMode === tool);
  });
  updateToolName();
  drawOverlay();
}

function setLayerPopupVisible(visible) {
  state.layerPopupOpen = visible;
  layerPopup.hidden = !visible;
  toggleLayersBtn.classList.toggle("is-active", visible);
  updateLayerToggleButton();
}

function updateLayerToggleButton() {
  toggleLayersBtn.textContent = t("runtime.layerToggle", { count: state.layers.length || 1 });
}

function renderLayersPanel() {
  layersList.innerHTML = "";

  [...state.layers]
    .reverse()
    .forEach((layer) => {
      const fragment = layerItemTemplate.content.cloneNode(true);
      const mainButton = fragment.querySelector(".layer-main");
      const visibilityButton = fragment.querySelector(".visibility-button");
      const deleteButton = fragment.querySelector(".delete-button");

      if (layer.id === state.activeLayerId) {
        mainButton.classList.add("active-layer");
      }

      mainButton.textContent = layer.name;
      mainButton.addEventListener("click", () => setActiveLayer(layer.id));

      visibilityButton.textContent = layer.visible ? t("layerPopup.visible") : t("layerPopup.hidden");
      visibilityButton.addEventListener("click", () => {
        withHistory(() => {
          layer.visible = !layer.visible;
          renderLayersPanel();
          renderCanvas();
          rememberStatus(layer.visible ? "status.layer.visible" : "status.layer.hidden", {
            name: layer.name,
          });
        });
      });

      deleteButton.disabled = state.layers.length === 1;
      deleteButton.textContent = t("layerPopup.delete");
      deleteButton.addEventListener("click", () => {
        if (state.layers.length === 1) {
          rememberStatus("status.layer.minOne");
          return;
        }

        withHistory(() => {
          state.layers = state.layers.filter((current) => current.id !== layer.id);
          if (state.activeLayerId === layer.id) {
            state.activeLayerId = state.layers[state.layers.length - 1]?.id || null;
          }
          if (state.selectedTextId && !getSelectedTextItem()) {
            state.selectedTextId = null;
          }
          syncAdjustmentInputs();
          renderLayersPanel();
          renderCanvas();
          rememberStatus("status.layer.deleted", { name: layer.name });
        });
      });

      layersList.appendChild(fragment);
    });

  updateLayerToggleButton();
}

function renderCanvas() {
  editorCtx.clearRect(0, 0, state.docWidth, state.docHeight);
  editorCtx.fillStyle = "#ffffff";
  editorCtx.fillRect(0, 0, state.docWidth, state.docHeight);

  state.layers.forEach((layer) => {
    if (!layer.visible) {
      return;
    }

    editorCtx.save();
    editorCtx.filter = [
      `brightness(${layer.adjustments.brightness}%)`,
      `contrast(${layer.adjustments.contrast}%)`,
      `hue-rotate(${layer.adjustments.hue}deg)`,
      `saturate(${layer.adjustments.saturation}%)`,
    ].join(" ");
    editorCtx.drawImage(layer.canvas, 0, 0);
    layer.textItems.forEach((item) => drawTextItem(editorCtx, item));
    editorCtx.restore();
  });

  drawOverlay();
}

function drawTextSelection(item) {
  const metrics = measureTextItem(item);
  overlayCtx.save();
  overlayCtx.strokeStyle = "rgba(255, 118, 158, 0.95)";
  overlayCtx.fillStyle = "rgba(255, 208, 221, 0.18)";
  overlayCtx.lineWidth = 2;
  overlayCtx.setLineDash([8, 5]);
  overlayCtx.fillRect(item.x - 4, item.y - 4, metrics.width + 8, metrics.height + 8);
  overlayCtx.strokeRect(item.x - 4, item.y - 4, metrics.width + 8, metrics.height + 8);
  overlayCtx.restore();
}

function drawOverlay() {
  overlayCtx.clearRect(0, 0, state.docWidth, state.docHeight);

  const selectedText = getSelectedTextItem();
  if (selectedText && state.currentTool === "text") {
    drawTextSelection(selectedText.item);
  }

  if (!state.isPointerDown || !state.draftStart || !state.draftCurrent) {
    return;
  }

  if (state.dragTextState) {
    const dragTarget = getSelectedTextItem();
    if (dragTarget) {
      drawTextSelection(dragTarget.item);
    }
    return;
  }

  overlayCtx.save();
  overlayCtx.strokeStyle = "rgba(255, 108, 152, 0.95)";
  overlayCtx.fillStyle = "rgba(255, 209, 223, 0.25)";
  overlayCtx.lineWidth = 2;
  overlayCtx.setLineDash([10, 6]);

  const rect = normalizeRect(state.draftStart, state.draftCurrent);
  if (state.currentTool === "crop" || state.currentTool === "mosaic") {
    overlayCtx.fillRect(rect.x, rect.y, rect.width, rect.height);
    overlayCtx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  } else if (state.currentTool === "line") {
    overlayCtx.setLineDash([]);
    overlayCtx.beginPath();
    overlayCtx.moveTo(state.draftStart.x, state.draftStart.y);
    overlayCtx.lineTo(state.draftCurrent.x, state.draftCurrent.y);
    overlayCtx.stroke();
  } else if (state.currentTool === "curve") {
    overlayCtx.setLineDash([]);
    drawCurvePath(
      overlayCtx,
      state.draftStart,
      state.draftCurrent,
      state.lastPointer || state.draftCurrent,
      true
    );
  }

  overlayCtx.restore();
}

function updateStatus(message) {
  statusText.textContent = message;
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = t("app.title");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (key) {
      node.textContent = t(key);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.getAttribute("data-i18n-placeholder");
    if (key) {
      node.setAttribute("placeholder", t(key));
    }
  });

  if (languageSelect) {
    languageSelect.value = state.language;
  }

  refreshLayerNames();
  updateToolName();
  renderLayersPanel();

  if (state.lastStatus) {
    updateStatus(t(state.lastStatus.key, state.lastStatus.params));
  } else {
    updateStatus(t("status.tool.selectAction"));
  }
}

function applyLanguage(language, options = {}) {
  const nextLanguage = resolveLanguage(language);
  state.language = nextLanguage;

  if (!options.skipPersist) {
    writeStoredLanguage(nextLanguage);
  }

  if (state.isPristineWelcome) {
    seedWelcomeLayer();
  }

  applyTranslations();
}

function toolNeedsLayer(tool) {
  return tool !== "pan";
}

function getCanvasPoint(event) {
  const rect = overlayCanvas.getBoundingClientRect();
  const scaleX = state.docWidth / rect.width;
  const scaleY = state.docHeight / rect.height;
  return {
    x: clamp((event.clientX - rect.left) * scaleX, 0, state.docWidth),
    y: clamp((event.clientY - rect.top) * scaleY, 0, state.docHeight),
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeRect(start, end) {
  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  return {
    x,
    y,
    width: Math.max(1, Math.abs(end.x - start.x)),
    height: Math.max(1, Math.abs(end.y - start.y)),
  };
}

function startTextInteraction(layer, point) {
  const hit = findTextItemAtPoint(point);
  if (hit && hit.layer.id === layer.id) {
    state.selectedTextId = hit.item.id;
    state.dragTextState = {
      layerId: hit.layer.id,
      textId: hit.item.id,
      offsetX: point.x - hit.item.x,
      offsetY: point.y - hit.item.y,
      originX: hit.item.x,
      originY: hit.item.y,
    };
    setActiveLayer(hit.layer.id);
    return true;
  }

  state.selectedTextId = null;
  addTextAtPoint(layer, point);
  return false;
}

function startDrawing(event) {
  if (toolNeedsLayer(state.currentTool)) {
    ensureBaseLayer();
  }

  const layer = getActiveLayer();
  if (!layer && toolNeedsLayer(state.currentTool)) {
    return;
  }

  const point = getCanvasPoint(event);

  if (state.currentTool === "text") {
    if (startTextInteraction(layer, point)) {
      state.isPointerDown = true;
      state.draftStart = point;
      state.draftCurrent = point;
      state.lastPointer = point;
      drawOverlay();
    } else {
      resetDraftState();
    }
    return;
  }

  state.isPointerDown = true;
  state.draftStart = point;
  state.draftCurrent = point;
  state.lastPointer = point;

  if (state.currentTool === "brush") {
    withHistory(() => {
      drawBrushPoint(layer, point, true);
    });
  }
}

function continueDrawing(event) {
  if (!state.isPointerDown) {
    return;
  }

  const layer = getActiveLayer();
  const point = getCanvasPoint(event);
  state.draftCurrent = point;

  if (state.dragTextState) {
    const selected = getSelectedTextItem();
    if (selected) {
      selected.item.x = clamp(point.x - state.dragTextState.offsetX, 0, state.docWidth);
      selected.item.y = clamp(point.y - state.dragTextState.offsetY, 0, state.docHeight);
      renderCanvas();
    }
  } else if (state.currentTool === "brush" && layer) {
    drawBrushStroke(layer, state.lastPointer || point, point);
    renderCanvas();
  } else if (state.currentTool === "curve") {
    state.lastPointer = point;
    drawOverlay();
  } else {
    drawOverlay();
  }

  state.lastPointer = point;
}

function stopDrawing() {
  if (!state.isPointerDown) {
    return;
  }

  const layer = getActiveLayer();

  if (state.dragTextState) {
    const selected = getSelectedTextItem();
    if (selected) {
      const moved =
        selected.item.x !== state.dragTextState.originX ||
        selected.item.y !== state.dragTextState.originY;
      if (moved) {
        pushHistorySnapshot();
        const latest = state.history.pop();
        if (latest) {
          latest.layers.forEach((historyLayer) => {
            const historyText = historyLayer.textItems.find((item) => item.id === state.dragTextState.textId);
            if (historyText) {
              historyText.x = state.dragTextState.originX;
              historyText.y = state.dragTextState.originY;
            }
          });
          state.history.push(latest);
        }
        rememberStatus("status.text.moved");
      }
    }
    state.dragTextState = null;
    renderCanvas();
    resetDraftState();
    return;
  }

  if (layer && state.draftStart && state.draftCurrent) {
    if (state.currentTool === "line") {
      withHistory(() => {
        drawLine(layer, state.draftStart, state.draftCurrent);
        rememberStatus("status.draw.line");
      });
    } else if (state.currentTool === "curve") {
      withHistory(() => {
        drawCurve(layer, state.draftStart, state.draftCurrent, state.lastPointer || state.draftCurrent);
        rememberStatus("status.draw.curve");
      });
    } else if (state.currentTool === "crop") {
      const rect = normalizeRect(state.draftStart, state.draftCurrent);
      withHistory(() => {
        cropDocument(rect);
        state.selectedTextId = null;
        rememberStatus("status.crop.done");
      });
    } else if (state.currentTool === "mosaic") {
      const rect = normalizeRect(state.draftStart, state.draftCurrent);
      withHistory(() => {
        applyMosaic(layer, rect, Number(mosaicSizeInput.value));
        rememberStatus("status.mosaic.done");
      });
    }
  }

  renderCanvas();
  resetDraftState();
}

function resetDraftState() {
  state.isPointerDown = false;
  state.draftStart = null;
  state.draftCurrent = null;
  state.lastPointer = null;
  drawOverlay();
}

function drawBrushPoint(layer, point, drawNow = false) {
  layer.ctx.save();
  layer.ctx.fillStyle = getForegroundColor();
  layer.ctx.beginPath();
  layer.ctx.arc(point.x, point.y, Number(brushSizeInput.value) / 2, 0, Math.PI * 2);
  layer.ctx.fill();
  layer.ctx.restore();
  if (drawNow) {
    renderCanvas();
  }
}

function drawBrushStroke(layer, start, end) {
  layer.ctx.save();
  layer.ctx.strokeStyle = getForegroundColor();
  layer.ctx.lineWidth = Number(brushSizeInput.value);
  layer.ctx.lineCap = "round";
  layer.ctx.lineJoin = "round";
  layer.ctx.beginPath();
  layer.ctx.moveTo(start.x, start.y);
  layer.ctx.lineTo(end.x, end.y);
  layer.ctx.stroke();
  layer.ctx.restore();
}

function drawLine(layer, start, end) {
  layer.ctx.save();
  layer.ctx.strokeStyle = getForegroundColor();
  layer.ctx.lineWidth = Number(brushSizeInput.value);
  layer.ctx.lineCap = "round";
  layer.ctx.beginPath();
  layer.ctx.moveTo(start.x, start.y);
  layer.ctx.lineTo(end.x, end.y);
  layer.ctx.stroke();
  layer.ctx.restore();
}

function drawCurvePath(ctx, start, end, controlHint, preview = false) {
  const control = {
    x: (start.x + end.x) / 2,
    y: controlHint.y,
  };

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.quadraticCurveTo(control.x, control.y, end.x, end.y);
  ctx.stroke();

  if (preview) {
    ctx.beginPath();
    ctx.arc(control.x, control.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCurve(layer, start, end, controlHint) {
  layer.ctx.save();
  layer.ctx.strokeStyle = getForegroundColor();
  layer.ctx.lineWidth = Number(brushSizeInput.value);
  drawCurvePath(layer.ctx, start, end, controlHint);
  layer.ctx.restore();
}

function addTextAtPoint(layer, point) {
  const text = textValueInput.value.trim();
  if (!text) {
    rememberStatus("status.text.empty");
    return;
  }

  withHistory(() => {
    const fontSize = Number(fontSizeInput.value) || 32;
    const item = createTextItem({
      text,
      x: point.x,
      y: point.y,
      color: textColorInput.value,
      fontSize,
      fontFamily: fontFamilyInput.value,
    });
    layer.textItems.push(item);
    state.selectedTextId = item.id;
    renderCanvas();
    rememberStatus("status.text.added");
  });
}

function applyMosaic(layer, rect, blockSize) {
  const source = layer.ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  const tempCanvas = createOffscreenCanvas(rect.width, rect.height);
  const tempCtx = getCanvasContext(tempCanvas, true);
  tempCtx.putImageData(source, 0, 0);

  for (let y = 0; y < rect.height; y += blockSize) {
    for (let x = 0; x < rect.width; x += blockSize) {
      const sampleWidth = Math.min(blockSize, rect.width - x);
      const sampleHeight = Math.min(blockSize, rect.height - y);
      const data = tempCtx.getImageData(x, y, sampleWidth, sampleHeight).data;
      const color = averageColor(data);
      layer.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      layer.ctx.fillRect(rect.x + x, rect.y + y, sampleWidth, sampleHeight);
    }
  }
}

function averageColor(data) {
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 0;
  const count = data.length / 4 || 1;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    a += data[i + 3];
  }

  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
    a: (a / count) / 255,
  };
}

function resizeDocument(width, height) {
  const nextWidth = Math.max(1, Math.floor(width));
  const nextHeight = Math.max(1, Math.floor(height));
  const scaleX = nextWidth / state.docWidth;
  const scaleY = nextHeight / state.docHeight;

  state.layers.forEach((layer) => {
    const nextCanvas = createOffscreenCanvas(nextWidth, nextHeight);
    const nextCtx = getCanvasContext(nextCanvas, true);
    resetLayerContextDefaults(nextCtx);
    nextCtx.drawImage(layer.canvas, 0, 0, nextWidth, nextHeight);
    layer.canvas = nextCanvas;
    layer.ctx = nextCtx;
    layer.textItems = layer.textItems.map((item) => ({
      ...item,
      x: item.x * scaleX,
      y: item.y * scaleY,
      fontSize: Math.max(12, Math.round(item.fontSize * Math.min(scaleX, scaleY))),
    }));
  });

  state.docWidth = nextWidth;
  state.docHeight = nextHeight;
  syncDocumentIndicators();
  renderCanvas();
}

function cropDocument(rect) {
  const safeX = Math.round(clamp(rect.x, 0, state.docWidth - 1));
  const safeY = Math.round(clamp(rect.y, 0, state.docHeight - 1));
  const safeRect = {
    x: safeX,
    y: safeY,
    width: Math.round(clamp(rect.width, 1, state.docWidth - safeX)),
    height: Math.round(clamp(rect.height, 1, state.docHeight - safeY)),
  };

  state.layers.forEach((layer) => {
    const nextCanvas = createOffscreenCanvas(safeRect.width, safeRect.height);
    const nextCtx = getCanvasContext(nextCanvas, true);
    resetLayerContextDefaults(nextCtx);
    nextCtx.drawImage(
      layer.canvas,
      safeRect.x,
      safeRect.y,
      safeRect.width,
      safeRect.height,
      0,
      0,
      safeRect.width,
      safeRect.height
    );
    layer.canvas = nextCanvas;
    layer.ctx = nextCtx;
    layer.textItems = layer.textItems
      .map((item) => ({
        ...item,
        x: item.x - safeRect.x,
        y: item.y - safeRect.y,
      }))
      .filter((item) => {
        const metrics = measureTextItem(item);
        return item.x + metrics.width > 0 && item.y + metrics.height > 0 && item.x < safeRect.width && item.y < safeRect.height;
      });
  });

  state.docWidth = safeRect.width;
  state.docHeight = safeRect.height;
  syncDocumentIndicators();
  renderCanvas();
}

function rotatePoint(point, centerX, centerY, radians, nextWidth, nextHeight) {
  const translatedX = point.x - centerX;
  const translatedY = point.y - centerY;
  const rotatedX = translatedX * Math.cos(radians) - translatedY * Math.sin(radians);
  const rotatedY = translatedX * Math.sin(radians) + translatedY * Math.cos(radians);
  return {
    x: rotatedX + nextWidth / 2,
    y: rotatedY + nextHeight / 2,
  };
}

function rotateDocument(angle) {
  const radians = (angle * Math.PI) / 180;
  const cos = Math.abs(Math.cos(radians));
  const sin = Math.abs(Math.sin(radians));
  const nextWidth = Math.ceil(state.docWidth * cos + state.docHeight * sin);
  const nextHeight = Math.ceil(state.docWidth * sin + state.docHeight * cos);
  const centerX = state.docWidth / 2;
  const centerY = state.docHeight / 2;

  state.layers.forEach((layer) => {
    const nextCanvas = createOffscreenCanvas(nextWidth, nextHeight);
    const nextCtx = getCanvasContext(nextCanvas, true);
    resetLayerContextDefaults(nextCtx);
    nextCtx.save();
    nextCtx.translate(nextWidth / 2, nextHeight / 2);
    nextCtx.rotate(radians);
    nextCtx.drawImage(layer.canvas, -state.docWidth / 2, -state.docHeight / 2);
    nextCtx.restore();
    resetLayerContextDefaults(nextCtx);
    layer.canvas = nextCanvas;
    layer.ctx = nextCtx;
    layer.textItems = layer.textItems.map((item) => {
      const rotatedPoint = rotatePoint(item, centerX, centerY, radians, nextWidth, nextHeight);
      return {
        ...item,
        x: rotatedPoint.x,
        y: rotatedPoint.y,
      };
    });
  });

  state.docWidth = nextWidth;
  state.docHeight = nextHeight;
  syncDocumentIndicators();
  renderCanvas();
}

function exportComposite(filename = state.lastSavedName) {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = state.docWidth;
  exportCanvas.height = state.docHeight;
  const exportCtx = exportCanvas.getContext("2d");
  exportCtx.fillStyle = "#ffffff";
  exportCtx.fillRect(0, 0, state.docWidth, state.docHeight);

  state.layers.forEach((layer) => {
    if (!layer.visible) {
      return;
    }

    exportCtx.save();
    exportCtx.filter = [
      `brightness(${layer.adjustments.brightness}%)`,
      `contrast(${layer.adjustments.contrast}%)`,
      `hue-rotate(${layer.adjustments.hue}deg)`,
      `saturate(${layer.adjustments.saturation}%)`,
    ].join(" ");
    exportCtx.drawImage(layer.canvas, 0, 0);
    layer.textItems.forEach((item) => drawTextItem(exportCtx, item));
    exportCtx.restore();
  });

  const link = document.createElement("a");
  link.href = exportCanvas.toDataURL("image/png");
  link.download = filename;
  link.click();
  rememberStatus("status.exported", { filename });
}

function loadImageFromFile(file) {
  const image = new Image();
  image.onload = () => {
    withHistory(() => {
      state.docWidth = image.naturalWidth;
      state.docHeight = image.naturalHeight;
      state.layers = [];
      state.nextLayerId = 1;
      state.nextTextId = 1;
      state.selectedTextId = null;

      const baseLayer = createLayer(getBaseLayerName());
      baseLayer.nameKey = "runtime.baseLayer";
      baseLayer.ctx.drawImage(image, 0, 0);
      state.layers.push(baseLayer);
      state.activeLayerId = baseLayer.id;
      state.sourceFileName = file.name;
      state.lastSavedName = buildDefaultSaveName(file.name);
      state.isPristineWelcome = false;
      state.scaleMode = "fit";
      scalePreset.value = "fit";
      syncDocumentIndicators();
      syncAdjustmentInputs();
      renderLayersPanel();
      renderCanvas();
      rememberStatus("status.image.opened", { filename: file.name });
      URL.revokeObjectURL(image.src);
    });
  };
  image.onerror = () => rememberStatus("status.image.openFailed");
  image.src = URL.createObjectURL(file);
  fileInput.value = "";
}

function buildDefaultSaveName(fileName) {
  if (!fileName) {
    return t("runtime.defaultSaveName");
  }
  const dotIndex = fileName.lastIndexOf(".");
  const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  return `${baseName}${t("runtime.saveSuffix")}.png`;
}

function applyActiveLayerAdjustment(key, value) {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }
  withHistory(() => {
    layer.adjustments[key] = value;
    syncAdjustmentInputs();
    renderCanvas();
  });
}

function resetToneAdjustments() {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }
  withHistory(() => {
    layer.adjustments.brightness = 100;
    layer.adjustments.contrast = 100;
    syncAdjustmentInputs();
    renderCanvas();
    rememberStatus("status.adjust.toneReset");
  });
}

function resetColorAdjustments() {
  const layer = getActiveLayer();
  if (!layer) {
    return;
  }
  withHistory(() => {
    layer.adjustments.hue = 0;
    layer.adjustments.saturation = 100;
    syncAdjustmentInputs();
    renderCanvas();
    rememberStatus("status.adjust.colorReset");
  });
}

function duplicateActiveLayer() {
  const sourceLayer = ensureBaseLayer();
  if (!sourceLayer) {
    return;
  }

  withHistory(() => {
    const copyIndex = state.layers.length + 1;
    const duplicatedLayer = createLayer(getDuplicatedLayerName(sourceLayer.name, copyIndex));
    duplicatedLayer.nameKey = "runtime.layerCopyName";
    duplicatedLayer.copySourceName = sourceLayer.nameKey || sourceLayer.name;
    duplicatedLayer.copySourceLayerId = sourceLayer.id;
    duplicatedLayer.copyIndex = copyIndex;
    duplicatedLayer.ctx.drawImage(sourceLayer.canvas, 0, 0);
    duplicatedLayer.visible = sourceLayer.visible;
    duplicatedLayer.textItems = sourceLayer.textItems.map((item) => {
      const copied = cloneTextItem(item);
      copied.id = `text-${state.nextTextId++}`;
      return copied;
    });
    duplicatedLayer.adjustments = {
      brightness: sourceLayer.adjustments.brightness,
      contrast: sourceLayer.adjustments.contrast,
      hue: sourceLayer.adjustments.hue,
      saturation: sourceLayer.adjustments.saturation,
    };

    const sourceIndex = state.layers.findIndex((layer) => layer.id === sourceLayer.id);
    if (sourceIndex >= 0) {
      state.layers.splice(sourceIndex + 1, 0, duplicatedLayer);
    } else {
      state.layers.push(duplicatedLayer);
    }

    state.activeLayerId = duplicatedLayer.id;
    state.selectedTextId = null;
    syncAdjustmentInputs();
    renderLayersPanel();
    renderCanvas();
    rememberStatus("status.layer.duplicated", { name: sourceLayer.name });
  });
}

function applyScaleMode(mode) {
  state.scaleMode = mode;
  applyViewScale();
  if (mode === "fit") {
    rememberStatus("status.scale.fit");
  } else {
    rememberStatus("status.scale.percent", { scale: mode });
  }
}

function handleQuickPanel(panel) {
  ensureBaseLayer();
  setActivePanel(panel);

  if (panel === "tone") {
    setTool("pan");
    rememberStatus("status.panel.tone");
  } else if (panel === "color") {
    setTool("pan");
    rememberStatus("status.panel.color");
  } else if (panel === "crop") {
    setTool("crop");
    rememberStatus("status.panel.crop");
  } else if (panel === "draw") {
    if (!["brush", "line", "curve"].includes(state.currentTool)) {
      setTool("line");
    }
    rememberStatus("status.panel.draw");
  } else if (panel === "mosaic") {
    setTool("mosaic");
    rememberStatus("status.panel.mosaic");
  } else if (panel === "text") {
    setTool("text");
    rememberStatus("status.panel.text");
  }
}

fileInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }
  loadImageFromFile(file);
});

saveBtn.addEventListener("click", () => {
  ensureBaseLayer();
  exportComposite(state.lastSavedName);
});

rotateBtn.addEventListener("click", () => {
  ensureBaseLayer();
  withHistory(() => {
    rotateDocument(90);
    rememberStatus("status.rotate");
  });
});

scalePreset.addEventListener("change", () => {
  applyScaleMode(scalePreset.value);
});

toggleLayersBtn.addEventListener("click", () => {
  setLayerPopupVisible(!state.layerPopupOpen);
  rememberStatus(state.layerPopupOpen ? "status.layerPopup.open" : "status.layerPopup.close");
});

closeLayersBtn.addEventListener("click", () => {
  setLayerPopupVisible(false);
  rememberStatus("status.layerPopup.close");
});

addLayerBtn.addEventListener("click", duplicateActiveLayer);

languageSelect.addEventListener("change", () => {
  applyLanguage(languageSelect.value);
});

quickActionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleQuickPanel(button.dataset.panel);
  });
});

drawModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActivePanel("draw");
    setTool(button.dataset.drawMode);
    rememberStatus("status.drawMode.current", {
      tool: getToolLabel(button.dataset.drawMode),
    });
  });
});

drawColorInput.addEventListener("input", () => {
  syncForegroundColor(drawColorInput.value);
});

textColorInput.addEventListener("input", () => {
  syncForegroundColor(textColorInput.value);
  const selected = getSelectedTextItem();
  if (selected) {
    withHistory(() => {
      selected.item.color = textColorInput.value;
      renderCanvas();
      rememberStatus("status.text.colorUpdated");
    });
  }
});

textValueInput.addEventListener("change", () => {
  const selected = getSelectedTextItem();
  if (selected && textValueInput.value.trim()) {
    withHistory(() => {
      selected.item.text = textValueInput.value.trim();
      renderCanvas();
      rememberStatus("status.text.contentUpdated");
    });
  }
});

fontSizeInput.addEventListener("change", () => {
  const selected = getSelectedTextItem();
  if (selected) {
    withHistory(() => {
      selected.item.fontSize = Math.max(12, Number(fontSizeInput.value) || 32);
      renderCanvas();
      rememberStatus("status.text.sizeUpdated");
    });
  }
});

fontFamilyInput.addEventListener("change", () => {
  const selected = getSelectedTextItem();
  if (selected) {
    withHistory(() => {
      selected.item.fontFamily = fontFamilyInput.value;
      renderCanvas();
      rememberStatus("status.text.fontUpdated");
    });
  }
});

brushSizeInput.addEventListener("input", () => {
  brushSizeValue.textContent = `${brushSizeInput.value}px`;
});

mosaicSizeInput.addEventListener("input", () => {
  mosaicSizeValue.textContent = `${mosaicSizeInput.value}px`;
});

brightnessRange.addEventListener("change", () => {
  applyActiveLayerAdjustment("brightness", Number(brightnessRange.value));
});

contrastRange.addEventListener("change", () => {
  applyActiveLayerAdjustment("contrast", Number(contrastRange.value));
});

hueRange.addEventListener("change", () => {
  applyActiveLayerAdjustment("hue", Number(hueRange.value));
});

saturationRange.addEventListener("change", () => {
  applyActiveLayerAdjustment("saturation", Number(saturationRange.value));
});

resetToneBtn.addEventListener("click", resetToneAdjustments);
resetColorBtn.addEventListener("click", resetColorAdjustments);

overlayCanvas.addEventListener("pointerdown", (event) => {
  if (state.currentTool === "pan") {
    const hit = findTextItemAtPoint(getCanvasPoint(event));
    if (hit) {
      state.selectedTextId = hit.item.id;
      setActiveLayer(hit.layer.id);
      textValueInput.value = hit.item.text;
      fontSizeInput.value = hit.item.fontSize;
      fontFamilyInput.value = hit.item.fontFamily;
      textColorInput.value = hit.item.color;
      syncForegroundColor(hit.item.color);
      renderCanvas();
      rememberStatus("status.text.selected");
      return;
    }
    rememberStatus("status.tool.selectAction");
    return;
  }
  startDrawing(event);
});

overlayCanvas.addEventListener("pointermove", continueDrawing);
overlayCanvas.addEventListener("pointerup", stopDrawing);
overlayCanvas.addEventListener("pointerleave", stopDrawing);
window.addEventListener("pointerup", stopDrawing);

document.addEventListener("pointerdown", (event) => {
  if (!state.layerPopupOpen) {
    return;
  }

  const target = event.target;
  if (layerPopup.contains(target) || toggleLayersBtn.contains(target)) {
    return;
  }

  setLayerPopupVisible(false);
});

window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault();
    undoLastAction();
    return;
  }

  if (event.key === "Escape" && state.layerPopupOpen) {
    setLayerPopupVisible(false);
    rememberStatus("status.layerPopup.close");
  }
});

function seedWelcomeLayer() {
  const layer = ensureBaseLayer();
  layer.ctx.fillStyle = "#ffffff";
  layer.ctx.fillRect(0, 0, state.docWidth, state.docHeight);
  const gradient = layer.ctx.createLinearGradient(0, 0, state.docWidth, state.docHeight);
  gradient.addColorStop(0, "#fff8d6");
  gradient.addColorStop(0.5, "#ffe4f1");
  gradient.addColorStop(1, "#dff7ff");
  layer.ctx.fillStyle = gradient;
  layer.ctx.fillRect(0, 0, state.docWidth, state.docHeight);
  layer.ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  layer.ctx.beginPath();
  layer.ctx.arc(210, 180, 90, 0, Math.PI * 2);
  layer.ctx.arc(300, 150, 70, 0, Math.PI * 2);
  layer.ctx.arc(380, 190, 85, 0, Math.PI * 2);
  layer.ctx.fill();
  layer.nameKey = "runtime.baseLayer";
  layer.textItems = [
    createTextItem({
      text: t("runtime.welcomeTitle"),
      x: 220,
      y: 310,
      color: "#ff89ad",
      fontSize: 58,
      fontFamily: "'Comic Sans MS', 'Trebuchet MS', cursive",
    }),
    createTextItem({
      text: t("runtime.welcomeSubtitle"),
      x: 182,
      y: 360,
      color: "#7a688b",
      fontSize: 28,
      fontFamily: "'Microsoft YaHei', sans-serif",
    }),
  ];
  state.isPristineWelcome = true;
  renderCanvas();
}

state.language = readStoredLanguage();
syncForegroundColor(drawColorInput.value);
brushSizeValue.textContent = `${brushSizeInput.value}px`;
mosaicSizeValue.textContent = `${mosaicSizeInput.value}px`;
syncDocumentIndicators();
seedWelcomeLayer();
pushHistorySnapshot();
setActivePanel("home");
setTool("pan");
renderLayersPanel();
syncAdjustmentInputs();
setLayerPopupVisible(false);
applyTranslations();
rememberStatus("status.tool.selectAction");

window.addEventListener("resize", () => {
  if (state.scaleMode === "fit") {
    applyViewScale();
  }
});
