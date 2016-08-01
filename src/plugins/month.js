(function ($) {
  formosa.register('jquery-ui-month-picker', 'month', {
    available: function () {
      return $.fn.datepicker;
    },
    render: function (options) {
      $(this).attr('type', 'text').on('mousedown click', formosa._readonly).MonthPicker(options);
    }
  });
})(jQuery);
