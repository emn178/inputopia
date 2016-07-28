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
