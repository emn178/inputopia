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
