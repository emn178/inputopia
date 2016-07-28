/**
 * [formosa]{@link https://github.com/emn178/formosa}
 *
 * @version 0.1.0
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
