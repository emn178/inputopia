(function ($) {
  formosa.register('bootstrap-datetimepicker', 'datetime', {
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
