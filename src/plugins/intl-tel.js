(function ($) {
  inputopia.register('intl-tel', 'intl-tel', {
    available: function () {
      return $.fn.intlTelInput;
    },
    render: function (options) {
      var element = $(this);
      var hidden = $('<input type="hidden"/>')
        .attr('name', element.attr('name'))
        .val(element.val())
        .insertAfter(element);
      element.intlTelInput(options);

      element.removeAttr('name')
        .data('hidden', hidden)
        .attr('type', 'tel')
        .closest('form').submit(function () {
          hidden.val(element.intlTelInput('getNumber'));
        });
    },
    getValue: function () {
      return $(this).intlTelInput('getNumber');
    },
    setValue: function (value) {
      $(this).intlTelInput('setNumber', value);
    },
    setDisabled: function (value) {
      $(this).prop('disabled', value).data('hidden').prop('disabled', value);
    }
  });
})(jQuery);
