/**
 * [inputopia]{@link https://github.com/emn178/inputopia}
 *
 * @version 0.2.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2016
 * @license MIT
 */
(function ($) {
  'use strict';

  var typeSettings = {};
  var vendorSettings = {};
  var vendorHandlers = {};

  var defaultMethods = {
    value: function (args) {
      console.log(args);
      return $.fn.val.apply(this, args);
    },
    disabled: function (args) {
      args.unshift('disabled');
      return $.fn.prop.apply(this, args);
    },
    readonly: function (args) {
      args.unshift('readonly');
      return $.fn.prop.apply(this, args);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function register(vendor, type, handler) {
    if (!typeSettings[type]) {
      typeSettings[type] = {vendor: vendor};
    }
    if (!vendorHandlers[vendor]) {
      vendorHandlers[vendor] = {};
      vendorSettings[vendor] = {};
    }
    vendorHandlers[vendor][type] = handler;
    vendorSettings[vendor][type] = {};
  }

  function renderAll() {
    $('input:not([data-norender])').each(render);
  }

  function render() {
    var element = $(this);
    var type = element.attr('type');
    var vendor = element.data('vendor') || typeSettings[type] && typeSettings[type].vendor;
    var handlers = vendorHandlers[vendor];
    var handler = handlers && handlers[type];
    if (!handler || !handler.render) {
      return;
    }
    if (handler.available && handler.available !== true && !handler.available()) {
      return;
    }
    handler.available = true;
    element.data('norender', true).data('type', type);
    var options = element.data('options') || vendorSettings[vendor][type].options || typeSettings[type].options || {};
    handler.render.call(this, options);
  }

  function callMethod(args) {
    var method = args.shift();
    if (!defaultMethods[method]) {
      return this;
    }
    var action = args.length ? 'set' : 'get';
    var handlerMethod = action + capitalizeFirstLetter(method);
    var element = this.eq(0);
    var type = element.data('type');
    var result;
    if (type) {
      var vendor = element.data('vendor') || typeSettings[type] && typeSettings[type].vendor;
      var handler = vendorHandlers[vendor][type];
      if (handler[handlerMethod]) {
         result = handler[handlerMethod].apply(element[0], args);
      } else {
        result = defaultMethods[method].call(element, args);
      }
    } else {
      result = defaultMethods[method].call(element, args);
    }
    if (action == 'get') {
      return result;
    } else {
      return this;
    }
  }

  $.fn.input = function () {
    this.each(render);
    return callMethod.call(this, Array.prototype.slice.call(arguments, 0));
  };

  $(document).on('ready page:load', function () {
    $('<style>' + inputopia.css + '</style>').appendTo('head');
    setTimeout(renderAll);
  });

  function readonly(e) {
    if ($(this).prop('readonly')) {
      e.stopPropagation();
      return false;
    }
  }

  window.inputopia = $.inputopia = {
    _readonly: readonly,
    render: renderAll,
    register: register,
    types: typeSettings,
    vendors: vendorSettings
  };
})(jQuery);

inputopia.css=".kolor-picker-input{width:35px;height:30px;border:1px solid #000;text-indent:-999px;cursor:default}.kolor-picker-input:focus{outline-offset:0;outline:0}.kolor-picker-wrapper{position:relative;display:inline-flex;background-image:url(data:image/gif;base64,R0lGODlhDAAMAIABAMzMzP///yH5BAEAAAEALAAAAAAMAAwAAAIWhB+ph5ps3IMyQFBvzVRq3zmfGC5QAQA7)}.kolor-picker-readonly{display:none;position:absolute;top:0;left:0;width:35px;height:30px}.kolor-picker-input[readonly]+.kolor-picker-readonly{display:block;cursor:not-allowed}";
(function ($) {
  var colorPicker  = $();

  inputopia.register('kolor-picker', 'color', {
    available: function () {
      if ($.fn.kolorPicker) {
        $(document).on('page:before-unload', function() {
          if (!colorPicker.length) {
            colorPicker = $('.cp-color-picker');
          }
        });

        $(document).on('page:load', function() {
          if (colorPicker.length) {
            $('body').append(colorPicker);
          }
        });
      }
      return $.fn.kolorPicker;
    },
    render: function (options) {
      var element = $(this);
      var onSelect = options.onSelect;
      options.onSelect = function (color) {
        element.val(color);
        if (onSelect) {
          onSelect.call(this, color);
        }
      };
      element.addClass('kolor-picker-input')
          .attr('autocomplete', 'off')
          .attr('type', 'text')
          .kolorPicker(options)
          .wrap('<span class="kolor-picker-wrapper" />')
          .after('<span class="kolor-picker-readonly" />');
    },
    setValue: function (value) {
      $(this).kolorPicker('setColor', value);
    }
  });
})(jQuery);

(function ($) {
  if ($.fn.datepicker && $.fn.datepicker.noConflict) {
    $.fn.bootstrapDP = $.fn.datepicker.noConflict();
  }

  inputopia.register('jquery-ui', 'date', {
    available: function () {
      return $.fn.datepicker;
    },
    render: function (options) {
      var beforeShow = options.beforeShow;
      options.beforeShow = function (input, inst) { 
        if ($(input).prop('readonly')) {
          return false; 
        }
        if (beforeShow) {
          beforeShow.call(this, input, inst);
        }
      }
      $(this).attr('type', 'text').datepicker(options);
    }
  });

  inputopia.register('bootstrap-datepicker', 'date', {
    available: function () {
      return $.fn.bootstrapDP;
    },
    render: function (options) {
      $(this).attr('type', 'text').on('mousedown', inputopia._readonly).bootstrapDP(options).mousedown();
    }
  });
})(jQuery);

(function ($) {
  inputopia.register('bootstrap-datetimepicker', 'datetime', {
    available: function () {
      return $.fn.datetimepicker;
    },
    render: function (options) {
      var element = $(this);
      var hidden = $('<input type="hidden"/>')
        .attr('name', element.attr('name'))
        .val(element.val())
        .insertAfter(element);
      element.datetimepicker(options)
        .data('hidden', hidden)
        .removeAttr('name')
        .attr('type', 'text')
        .closest('form').submit(function () {
          hidden.val(moment(dateTimePicker.date()).format());
        });

      var dateTimePicker = element.data('DateTimePicker');
      dateTimePicker.date(new Date(hidden.val()));

      if (element.parent().css('position') == 'static') {
        element.parent().css('position', 'relative');
      }
    },
    getValue: function () {
      return moment($(this).data('DateTimePicker').date()).format();
    },
    setValue: function (value) {
      $(this).data('DateTimePicker').date(new Date(value));
    },
    setDisabled: function (value) {
      $(this).prop('disabled', value).data('hidden').prop('disabled', value);
    }
  });
})(jQuery);

(function ($) {
  inputopia.register('intl-tel', 'intl-tel', {
    available: function () {
      return $.fn.intlTelInput;
    },
    render: function (options) {
      var element = $(this);
      var hidden = $('<input type="hidden"/>')
        .attr('name', element.attr('name'))
        .val(element.val())
        .insertAfter(element);
      element.intlTelInput(options);

      element.removeAttr('name')
        .data('hidden', hidden)
        .attr('type', 'tel')
        .closest('form').submit(function () {
          hidden.val(element.intlTelInput('getNumber'));
        });
    },
    getValue: function () {
      return $(this).intlTelInput('getNumber');
    },
    setValue: function (value) {
      $(this).intlTelInput('setNumber', value);
    },
    setDisabled: function (value) {
      $(this).prop('disabled', value).data('hidden').prop('disabled', value);
    }
  });
})(jQuery);

(function ($) {
  inputopia.register('jquery-ui-month-picker', 'month', {
    available: function () {
      return $.fn.datepicker;
    },
    render: function (options) {
      $(this).attr('type', 'text').on('mousedown click', inputopia._readonly).MonthPicker(options);
    }
  });
})(jQuery);

(function ($) {
  function setAttribute(element, attribute, value) {
    var tagsInput = $(element).prop(attribute, value).next();
    tagsInput.find('input').prop(attribute, value);
    tagsInput.find('a').toggle(!value);
  }

  inputopia.register('jquery-tags-input', 'tags', {
    available: function () {
      return $.fn.tagsInput;
    },
    render: function (options) {
      $(this).tagsInput(options);
    },
    setReadonly: function (value) {
      setAttribute(this, 'readonly', value);
    },
    setDisabled: function (value) {
      setAttribute(this, 'disabled', value);
    }
  });

  inputopia.register('bootstrap-tags-input', 'tags', {
    available: function () {
      return $.fn.tagsinput;
    },
    render: function (options) {
      $(this).tagsinput(options);
    },
    setReadonly: function (value) {
      var tagsInput = $(this).prop('readonly', value).prev();
      tagsInput.find('input').prop('readonly', value);
      tagsInput.find('[data-role="remove"]').toggle(!value);
    },
  });
})(jQuery);
