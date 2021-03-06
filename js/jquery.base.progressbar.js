(function() {
  var $, $$, initProgressBar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = window.jQuery;

  $$ = window.BASE;

  /**
   * [progressBar description]
   * @param  {[Object]} {[Optional]} options [description]
   * @return {[jQuery, Others]}         [description]
  */


  $.fn.progressBar = function(options) {
    var args, result, self;
    self = this;
    args = Array.prototype.slice.call(arguments);
    args.push($$.ProgressBar);
    result = $$.createWidgetByJQuery.apply(self, args);
    if ((result.jqObj != null) && options !== 'widget') {
      return self;
    }
    return result;
  };

  $$.ProgressBar = (function(_super) {

    __extends(ProgressBar, _super);

    /**
     * [constructor description]
     * @param  {[jquery]} self    [description]
     * @param  {[Object]} {[Optional]} options [description]
     * @return {[ProgressBar]}         [description]
    */


    function ProgressBar(self, options) {
      var defaults, opts, progressBarObj;
      progressBarObj = this;
      if (!(progressBarObj instanceof $$.ProgressBar)) {
        return new $$.ProgressBar(self, options);
      }
      defaults = {
        progressBarClass: "" + $$.defaultGradientBG + " " + $$.defaultBorder,
        progressBlockClass: $$.hoverGradientBG,
        blockWidth: 12,
        marginValue: null,
        type: "normal",
        scrollTime: 3000,
        scrollValue: 0.19,
        value: 0,
        progressBarLength: 0,
        scrolling: false
      };
      opts = $.extend(defaults, options);
      progressBarObj.constructor.__super__.constructor.call(progressBarObj, self, opts);
      progressBarObj.init();
    }

    /**
     * [init description]
     * @return {[ProgressBar]} [description]
    */


    ProgressBar.prototype.init = function() {
      var opts, progressBarObj;
      progressBarObj = this;
      opts = progressBarObj.opts;
      progressBarObj.createWidget();
      initProgressBar(progressBarObj.jqObj, progressBarObj.opts);
      progressBarObj.val(opts.scrollValue);
      if (opts.type === 'scroll') {
        progressBarObj.scroll(true);
      }
      return progressBarObj;
    };

    /**
     * [val description]
     * @param  {[Float]} {[Optional]} value [description]
     * @return {[ProgressBar, Float]}       [description]
    */


    ProgressBar.prototype.val = function(value) {
      var opts, progressBarObj, self;
      progressBarObj = this;
      self = progressBarObj.jqObj;
      opts = progressBarObj.opts;
      if (arguments.length === 0) {
        return opts.value;
      }
      opts.value = value > 1 ? 1 : (value < 0 ? 0 : value);
      self.children('.progressValue').width(opts.progressBarLength * opts.value);
      return progressBarObj;
    };

    /**
     * [scroll description]
     * @param  {[Boolean]} {[Optional]} scrolling [description]
     * @return {[ProgressBar]}           [description]
    */


    ProgressBar.prototype.scroll = function(scrolling) {
      var marginLeftValue, obj, opts, progressBarObj, self;
      progressBarObj = this;
      self = progressBarObj.jqObj;
      opts = progressBarObj.opts;
      if (opts.type !== 'scroll' || (scrolling && opts.scrolling)) {
        return progressBarObj;
      }
      obj = self.children('.progressValue');
      if (!scrolling) {
        opts.scrolling = false;
        obj.stop();
      } else {
        marginLeftValue = opts.progressBarLength - (obj.width() + parseInt(obj.css('marginLeft')));
        opts.scrolling = true;
        obj.animate({
          marginLeft: marginLeftValue
        }, opts.scrollTime, function() {
          opts.scrolling = false;
          return progressBarObj.scroll(self, opts, true);
        });
      }
      return progressBarObj;
    };

    return ProgressBar;

  })($$.Widget);

  /**
   * [initProgressBar description]
   * @param  {[jQuery]} self [description]
   * @param  {[Object]} opts [description]
  */


  initProgressBar = function(self, opts) {
    var blockTotal, i, marginValue, obj, progressValue, _i;
    progressValue = $('<div class="progressValue"></div>');
    marginValue = opts.marginValue || 2;
    blockTotal = Math.ceil(self.width() / (opts.blockWidth + marginValue));
    for (i = _i = 1; 1 <= blockTotal ? _i <= blockTotal : _i >= blockTotal; i = 1 <= blockTotal ? ++_i : --_i) {
      obj = $('<div class="progressBlock"></div>').addClass(opts.progressBlockClass).width(opts.blockWidth);
      if (opts.marginValue !== null) {
        obj.css('marginRight', opts.marginValue);
      }
      progressValue.append(obj);
    }
    opts.progressBarLength = self.addClass("uiProgressBar uiWidget " + opts.progressBarClass).append(progressValue).width();
    return null;
  };

}).call(this);
