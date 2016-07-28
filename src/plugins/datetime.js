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
