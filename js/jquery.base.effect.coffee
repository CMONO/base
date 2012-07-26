$ = window.jQuery
$.each ['backgroundColor', 'borderBottomColor', 'borderLeftColor',   'borderRightColor', 'borderTopColor', 'borderColor', 'color', 'outlineColor'], (i, attr) ->
  $.fx.step[attr] = (fx) ->
    if not fx.colorInit
      fx.start = getColor fx.elem, attr
      fx.end = getRGB fx.end
      fx.colorInit = true
    rColor = Math.max (Math.min (parseInt fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0], 10), 255), 0
    gColor = Math.max (Math.min (parseInt fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1], 10), 255), 0
    bColor = Math.max (Math.min (parseInt fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2], 10), 255), 0
    fx.elem.style[attr] = 'rgb(' + rColor + ',' + gColor + ',' + bColor + ')'

getRGB = (color) ->
  if color and color.constructor is Array and color.length is 3
    return color
  if result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec color
    return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
  if result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec color
    return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
  if result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec color
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
  if result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec color
    return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
  if result = /rgba\(0, 0, 0, 0\)/.exec color
    return colors['transparent'];
  return colors[($.trim color).toLowerCase()];
getColor = (elem, attr) ->
  while elem?
    color = $.curCSS elem, attr
    if color isnt '' and (color isnt 'transparent') or $.nodeName elem, 'body'
      break;
    attr = "backgroundColor";
    elem = elem.parentNode
  return getRGB color
  