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
