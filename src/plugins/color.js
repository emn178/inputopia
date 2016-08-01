(function ($) {
  var colorPicker  = $();

  formosa.register('kolor-picker', 'color', {
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
