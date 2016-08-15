(function ($) {
  inputopia.register('bootstrap-fileinput', 'file', {
    available: function () {
      return $.fn.fileinput;
    },
    render: function (options) {
      $(this).fileinput(options);
    },
    setReadonly: function (value) {
      $(this).prop('readonly', value).fileinput('refresh');
    },
    setDisabled: function (value) {
      $(this).prop('disabled', value).fileinput('refresh');
    }
  });
})(jQuery);
