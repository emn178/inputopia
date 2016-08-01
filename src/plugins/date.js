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
