/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/bundles/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/bundles/UserForms.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _i18n = __webpack_require__(0);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function ($) {
  var CONSTANTS = {};

  var commonMixin = {
    show: function show() {
      this.$el.attr('aria-hidden', false).show();
    },
    hide: function hide() {
      this.$el.attr('aria-hidden', true).hide();
    }
  };

  function ErrorContainer(element) {
    this.$el = element instanceof $ ? element : $(element);

    this.$el.find('h4').text(_i18n2.default._t('UserForms.ERROR_CONTAINER_HEADER', 'Please correct the following errors and try again:'));

    return this;
  }

  ErrorContainer.prototype.hasErrors = function hasErrors() {
    return this.$el.find('.error-list').children().length > 0;
  };

  ErrorContainer.prototype.removeErrorMessage = function removeErrorMessage(fieldId) {
    this.$el.find('#' + fieldId + '-top-error').remove();

    if (!this.hasErrors()) {
      this.hide();
    }
  };

  ErrorContainer.prototype.addStepLink = function addStepLink(step) {
    var userform = this.$el.closest('.userform').data('inst');
    var itemID = step.$el.attr('id') + '-error-link';
    var $itemElement = this.$el.find('#' + itemID);
    var stepID = step.$el.attr('id');
    var stepTitle = step.$el.data('title');

    if ($itemElement.length) {
      return;
    }

    $itemElement = $('<li id="' + itemID + '"><a href="#' + stepID + '">' + stepTitle + '</a></li>');

    $itemElement.on('click', function (e) {
      e.preventDefault();
      userform.jumpToStep(step.id);
    });

    this.$el.find('.error-list').append($itemElement);
  };

  ErrorContainer.prototype.removeStepLink = function removeStepLink(fieldId) {
    var stepID = $('#' + fieldId).closest('.form-step').attr('id');

    this.$el.find('#' + stepID + '-error-link').remove();

    if (this.$el.find('.error-list').is(':empty')) {
      this.hide();
    }
  };

  ErrorContainer.prototype.updateErrorMessage = function updateErrorMessage($input, message) {
    var _this = this;

    var inputID = $input.attr('id');
    var anchor = '#' + inputID;
    var elementID = inputID + '-top-error';
    var messageElement = $('#' + elementID);
    var describedBy = $input.attr('aria-describedby');

    if (!message) {
      messageElement.addClass('fixed');
      return;
    }

    messageElement.removeClass('fixed');

    this.show();

    if (messageElement.length === 1) {
      messageElement.show().find('a').html(message);
    } else {
      $input.closest('.field[id]').each(function () {
        var anchorID = $(_this).attr('id');

        if (!anchorID) {
          return;
        }

        anchor = '#' + anchorID;
      });

      messageElement = $('<li><a></a></li>');
      messageElement.attr('id', elementID).find('a').attr('href', location.pathname + location.search + anchor).html(message);

      this.$el.find('ul').append(messageElement);

      if (!describedBy) {
        describedBy = elementID;
      } else if (!describedBy.match(new RegExp('\\b' + elementID + '\\b'))) {
        describedBy += ' ' + elementID;
      }

      $input.attr('aria-describedby', describedBy);
    }
  };

  function FormStep(element) {
    var self = this;

    this.$el = element instanceof $ ? element : $(element);

    var userform = this.$el.closest('.userform').data('inst');

    this.$elButton = $('.step-button-wrapper[data-for=\'' + this.$el.prop('id') + '\']');

    this.viewed = false;

    this.valid = false;

    this.id = null;

    this.hide();

    if (CONSTANTS.DISPLAY_ERROR_MESSAGES_AT_TOP) {
      this.errorContainer = new ErrorContainer(this.$el.find('.error-container'));

      userform.$el.on('userform.form.error', function (e, validator) {
        if (!self.$el.is(':visible')) {
          return;
        }

        $.each(validator.errorList, function (i, error) {
          self.errorContainer.updateErrorMessage($(error.element), error.message);
        });
      });

      userform.$el.on('userform.form.valid', function (e, fieldId) {
        self.errorContainer.removeErrorMessage(fieldId);
      });
    }

    this.$elButton.on('userform.field.hide userform.field.show', function () {
      userform.$el.trigger('userform.form.conditionalstep');
    });

    return this;
  }

  FormStep.prototype.conditionallyHidden = function conditionallyHidden() {
    return !this.$elButton.find('button').is(':visible');
  };

  function ProgressBar(element) {
    var self = this;

    this.$el = element instanceof $ ? element : $(element);
    this.$buttons = this.$el.find('.step-button-jump');
    this.$jsAlign = this.$el.find('.js-align');
    var userform = this.$el.closest('.userform').data('inst');

    this.$buttons.each(function (i, stepButton) {
      $(stepButton).on('click', function (e) {
        e.preventDefault();
        var stepNumber = parseInt($(e.target).data('step'), 10);
        self.$el.trigger('userform.progress.changestep', stepNumber);
      });
    });

    userform.$el.on('userform.form.changestep', function (e, stepID) {
      self.update(stepID);
    });

    userform.$el.on('userform.form.conditionalstep', function () {
      var $visibleButtons = self.$buttons.filter(':visible');

      $visibleButtons.each(function (i, button) {
        $(button).text(i + 1);
      });

      self.$el.find('.progress-bar').attr('aria-valuemax', $visibleButtons.length);

      self.$el.find('.total-step-number').text($visibleButtons.length);
    });

    this.$jsAlign.each(function (index, button) {
      var $button = $(button);
      var leftPercent = 100 / (self.$jsAlign.length - 1) * index;
      var leftPercentCssValue = leftPercent + '%';
      var buttonOffset = -1 * ($button.innerWidth() / 2);

      $button.css({
        left: leftPercentCssValue,
        marginLeft: buttonOffset
      });

      if (index === self.$jsAlign.length - 1) {
        $button.css({ marginLeft: buttonOffset * 2 });
      } else if (index === 0) {
        $button.css({ marginLeft: 0 });
      }
    });

    return this;
  }

  ProgressBar.prototype.update = function update(stepID) {
    var $newStepElement = $(this.$el.parent('.userform').find('.form-step')[stepID]);
    var stepNumber = 0;
    var barWidth = stepID / (this.$buttons.length - 1) * 100;

    this.$buttons.each(function (i, button) {
      if (i > stepID) {
        return false;
      }

      if ($(button).is(':visible')) {
        stepNumber += 1;
      }
      return true;
    });

    this.$el.find('.current-step-number').each(function (i, element) {
      $(element).text(stepNumber);
    });

    this.$el.find('[aria-valuenow]').each(function (i, element) {
      $(element).attr('aria-valuenow', stepNumber);
    });

    this.$buttons.each(function (i, element) {
      var $element = $(element);
      var $item = $element.parent();

      if (parseInt($element.data('step'), 10) === stepNumber && $element.is(':visible')) {
        $item.addClass('current viewed');
        $element.removeAttr('disabled');

        return;
      }

      $item.removeClass('current');
    });

    this.$el.siblings('.progress-title').text($newStepElement.data('title'));

    barWidth = barWidth ? barWidth + '%' : '';
    this.$el.find('.progress-bar').width(barWidth);
  };

  function FormActions(element) {
    var self = this;

    this.$el = element instanceof $ ? element : $(element);
    var $elFormItself = this.$el.closest('.userform');

    this.userformInstance = $elFormItself.data('inst');

    this.$prevButton = this.$el.find('.step-button-prev');
    this.$nextButton = this.$el.find('.step-button-next');

    this.$prevButton.parent().attr('aria-hidden', false).show();
    this.$nextButton.parent().attr('aria-hidden', false).show();

    var scrollUpFx = function scrollUpFx(e) {
      var scrollTop = $elFormItself.offset();
      $('html, body').animate({ scrollTop: scrollTop.top }, 'slow');
    };

    this.$prevButton.on('click', function (e) {
      e.preventDefault();
      scrollUpFx(e);
      self.$el.trigger('userform.action.prev');
    });
    this.$nextButton.on('click', function (e) {
      e.preventDefault();
      scrollUpFx(e);
      self.$el.trigger('userform.action.next');
    });

    this.userformInstance.$el.on('userform.form.changestep userform.form.conditionalstep', function () {
      self.update();
    });

    return this;
  }

  FormActions.prototype.update = function update() {
    var numberOfSteps = this.userformInstance.steps.length;
    var stepID = this.userformInstance.currentStep ? this.userformInstance.currentStep.id : 0;
    var i = null;
    var lastStep = null;

    this.$el.find('.step-button-prev')[stepID === 0 ? 'hide' : 'show']();

    for (i = numberOfSteps - 1; i >= 0; i--) {
      lastStep = this.userformInstance.steps[i];

      if (!lastStep.conditionallyHidden()) {
        this.$el.find('.step-button-next')[stepID >= i ? 'hide' : 'show']();

        this.$el.find('.btn-toolbar')[stepID >= i ? 'show' : 'hide']();

        break;
      }
    }
  };

  function UserForm(element) {
    var self = this;

    this.$el = element instanceof $ ? element : $(element);
    this.steps = [];

    this.errorContainer = new ErrorContainer(this.$el.children('.error-container'));

    this.$el.on('userform.action.prev', function () {
      self.prevStep();
    });
    this.$el.on('userform.action.next', function () {
      self.nextStep();
    });

    this.$el.find('.userform-progress').on('userform.progress.changestep', function (e, stepNumber) {
      self.jumpToStep(stepNumber - 1);
    });

    this.$el.on('userform.form.valid', function (e, fieldId) {
      self.errorContainer.removeStepLink(fieldId);
    });

    this.$el.validate(this.validationOptions);

    this.$el.find('.optionset.requiredField input').each(function (a, field) {
      $(field).rules('add', {
        required: true
      });
    });

    return this;
  }

  UserForm.prototype.validationOptions = {
    ignore: ':hidden,ul',
    errorClass: 'error',
    errorElement: 'span',
    errorPlacement: function errorPlacement(error, element) {
      error.addClass('message');

      if (element.is(':radio') || element.parents('.checkboxset').length > 0) {
        error.appendTo(element.closest('.middleColumn, .field'));
      } else if (element.parents('.checkbox').length > 0) {
        error.appendTo(element.closest('.field'));
      } else {
        error.insertAfter(element);
      }
    },
    invalidHandler: function invalidHandler(event, validator) {
      setTimeout(function () {
        validator.currentElements.filter('.error').first().focus();
      }, 0);
    },

    submitHandler: function submitHandler(form) {
      var isValid = true;
      var userform = $(form).closest('.userform').data('inst');

      if (userform.currentStep) {
        userform.currentStep.valid = $(form).valid();
      }

      $.each(userform.steps, function (i, step) {
        if (!step.valid && !step.conditionallyHidden()) {
          isValid = false;
          userform.errorContainer.addStepLink(step);
        }
      });

      if (isValid) {
        var hiddenInputs = $(form).find('.field.requiredField.hide input');
        if (hiddenInputs.length > 0) {
          hiddenInputs.removeAttr('required aria-required data-rule-required').valid();
        }

        $(form).removeClass('dirty');

        form.submit();
        userform.$el.trigger('userform.form.submit');
      } else {
        userform.errorContainer.show();
      }
    },

    success: function success(error) {
      var userform = $(error).closest('.userform').data('inst');
      var errorId = $(error).attr('id');
      var fieldId = errorId.substr(0, errorId.indexOf('-error')).replace(/[\\[\\]]/, '');

      error.remove();

      userform.$el.trigger('userform.form.valid', [fieldId]);
    }
  };

  UserForm.prototype.addStep = function addStep(step) {
    if (!(step instanceof FormStep)) {
      return;
    }

    step.id = this.steps.length;

    this.steps.push(step);
  };

  UserForm.prototype.setCurrentStep = function setCurrentStep(step) {
    if (!(step instanceof FormStep)) {
      return;
    }

    this.currentStep = step;
    this.currentStep.show();

    this.currentStep.viewed = true;
    this.currentStep.$el.addClass('viewed');
  };

  UserForm.prototype.jumpToStep = function jumpToStep(stepNumber, direction) {
    var targetStep = this.steps[stepNumber];
    var isValid = false;
    var forward = direction === undefined ? true : direction;

    if (targetStep === undefined) {
      return;
    }

    if (targetStep.conditionallyHidden()) {
      if (forward) {
        this.jumpToStep(stepNumber + 1);
      } else {
        this.jumpToStep(stepNumber - 1);
      }

      return;
    }

    isValid = this.$el.valid();

    this.currentStep.valid = isValid;

    if (isValid === false && targetStep.viewed === false) {
      return;
    }

    this.currentStep.hide();
    this.setCurrentStep(targetStep);

    this.$el.trigger('userform.form.changestep', [targetStep.id]);
  };

  UserForm.prototype.nextStep = function nextStep() {
    this.jumpToStep(this.steps.indexOf(this.currentStep) + 1, true);
  };

  UserForm.prototype.prevStep = function prevStep() {
    this.jumpToStep(this.steps.indexOf(this.currentStep) - 1, false);
  };

  function main(index, userformElement) {
    var _this2 = this;

    var $userform = $(userformElement);

    if ($userform.length === 0) {
      return;
    }

    CONSTANTS.ENABLE_LIVE_VALIDATION = $userform.data('livevalidation') !== undefined;
    CONSTANTS.DISPLAY_ERROR_MESSAGES_AT_TOP = $userform.data('toperrors') !== undefined;

    if (CONSTANTS.ENABLE_LIVE_VALIDATION === false) {
      $.extend(UserForm.prototype.validationOptions, {
        onfocusout: false
      });
    }

    if (CONSTANTS.DISPLAY_ERROR_MESSAGES_AT_TOP) {
      $.extend(UserForm.prototype.validationOptions, {
        invalidHandler: function invalidHandler(event, validator) {
          $userform.trigger('userform.form.error', [validator]);
        },
        onfocusout: false
      });
    }

    $userform.find('.userform-progress, .step-navigation').attr('aria-hidden', false).show();

    $.extend(FormStep.prototype, commonMixin);
    $.extend(ErrorContainer.prototype, commonMixin);

    var userform = new UserForm($userform);
    $userform.data('inst', userform);

    if (CONSTANTS.HIDE_FIELD_LABELS) {
      $userform.find('label.left').each(function () {
        var $label = $(_this2);

        $('[name="' + $label.attr('for') + '"]').attr('placeholder', $label.text());
        $label.remove();
      });
    }

    userform.$el.find('.form-step').each(function (i, element) {
      var step = new FormStep(element);

      userform.addStep(step);
    });

    userform.setCurrentStep(userform.steps[0]);

    var $progressEl = $userform.find('.userform-progress');
    if ($progressEl.length) {
      var progressBar = new ProgressBar($progressEl);
      progressBar.update(0);
    }

    var $formActionsEl = $userform.find('.step-navigation');
    if ($formActionsEl.length) {
      var formActions = new FormActions($formActionsEl);
      formActions.update();
    }

    $(document).on('click', 'input.text[data-showcalendar]', function () {
      var $element = $(_this2);

      $element.ssDatepicker();

      if ($element.data('datepicker')) {
        $element.datepicker('show');
      }
    });

    setInterval(function () {
      $.ajax({ url: 'UserDefinedFormController/ping' });
    }, 180 * 1000);

    if (typeof $userform.areYouSure !== 'undefined') {
      $userform.areYouSure({
        message: _i18n2.default._t('UserForms.LEAVE_CONFIRMATION', 'You have unsaved changes!')
      });
    }
  }

  $('.userform').each(main);
});

/***/ }),

/***/ "./client/src/bundles/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("./client/src/bundles/UserForms.js");

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = i18n;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=userforms.js.map