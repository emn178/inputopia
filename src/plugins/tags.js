(function ($) {
  function setAttribute(element, attribute, value) {
    var tagsInput = $(element).prop(attribute, value).next();
    tagsInput.find('input').prop(attribute, value);
    tagsInput.find('a').toggle(!value);
  }

  formosa.register('jquery-tags-input', 'tags', {
    available: function () {
      return $.fn.tagsInput;
    },
    render: function (options) {
      $(this).tagsInput(options);
    },
    setReadonly: function (value) {
      setAttribute(this, 'readonly', value);
    },
    setDisabled: function (value) {
      setAttribute(this, 'disabled', value);
    }
  });

  formosa.register('bootstrap-tags-input', 'tags', {
    available: function () {
      return $.fn.tagsinput;
    },
    render: function (options) {
      $(this).tagsinput(options);
    },
    setReadonly: function (value) {
      var tagsInput = $(this).prop('readonly', value).prev();
      tagsInput.find('input').prop('readonly', value);
      tagsInput.find('[data-role="remove"]').toggle(!value);
    },
  });
})(jQuery);
