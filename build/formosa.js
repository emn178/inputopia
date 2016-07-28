/**
 * [formosa]{@link https://github.com/emn178/formosa}
 *
 * @version 0.1.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2016
 * @license MIT
 */
(function ($) {
  'use strict';

  var typeSettings = {};
  var vendorSettings = {};
  var vendorHandlers = {};

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

  function render() {
    $('input:not([data-norender])').each(function () {
      var element = $(this);
      element.attr('data-norender', true);
      var type = element.attr('type');
      var vendor = element.data('vendor') || typeSettings[type] && typeSettings[type].vendor;
      var handlers = vendorHandlers[vendor];
      if (handlers && handlers[type]) {
        element.attr('data-type', type);
        var options = element.data('options') || vendorSettings[vendor][type].options || typeSettings[type].options || {};
        handlers[type].call(this, options);
      }
    });
  }

  $(document).on('ready page:load', function () {
    $('<style>' + formosa.css + '</style>').appendTo(document.body);
    setTimeout(render);
  });

  window.formosa = $.formosa = {
    render: render,
    register: register,
    types: typeSettings,
    vendors: vendorSettings
  };
})(jQuery);

formosa.css=".kolor-picker-input{width:35px;height:30px;border:1px solid #000;text-indent:-999px;cursor:default}.kolor-picker-input:focus{outline-offset:0;outline:0}.kolor-picker-wrapper{display:inline-flex;background-image:url(data:image/gif;base64,R0lGODlhDAAMAIABAMzMzP///yH5BAEAAAEALAAAAAAMAAwAAAIWhB+ph5ps3IMyQFBvzVRq3zmfGC5QAQA7)}";
(function ($) {
  var colorPicker  = $();

  formosa.register('kolor-picker', 'color', function (options) {
    if (!$.fn.kolorPicker) {
      return;
    }
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
        .wrap('<span class="kolor-picker-wrapper" />');
  });

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
})(jQuery);

(function ($) {
  if ($.fn.datepicker && $.fn.datepicker.noConflict) {
    $.fn.bootstrapDP = $.fn.datepicker.noConflict();
  }

  formosa.register('jquery-ui', 'date', function (options) {
    if (!$.fn.datepicker) {
      return;
    }
    $(this).attr('type', 'text').datepicker(options);
  });
  formosa.register('bootstrap-datepicker', 'date', function (options) {
    if (!$.fn.bootstrapDP) {
      return;
    }
    $(this).attr('type', 'text').bootstrapDP(options);
  });
})(jQuery);

(function ($) {
  formosa.register('bootstrap-datetimepicker', 'datetime', function (options) {
    if (!$.fn.datetimepicker) {
      return;
    }
    var element = $(this);
    var hidden = $('<input type="hidden"/>')
      .attr('name', element.attr('name'))
      .val(element.val())
      .insertAfter(element);
    element.datetimepicker(options)
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
  });
})(jQuery);

(function ($) {
  formosa.register('intl-tel', 'intl-tel', function (options) {
    if (!$.fn.intlTelInput) {
      return;
    }
    var element = $(this);
    var hidden = $('<input type="hidden"/>')
      .attr('name', element.attr('name'))
      .val(element.val())
      .insertAfter(element);
    element.intlTelInput(options);

    element.removeAttr('name')
      .attr('type', 'tel')
      .closest('form').submit(function () {
        hidden.val(element.intlTelInput('getNumber'));
      });
  });
})(jQuery);
