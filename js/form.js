'use strict';

(function () {
  const MAX_ROOMS = 100;
  const PALACE_TYPE = `palace`;
  const HOUSE_TYPE = `house`;
  const FLAT_TYPE = `flat`;
  const BUNGALOW_TYPE = `bungalow`;

  const adForm = document.querySelector(`.ad-form`);
  const rooms = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const title = adForm.querySelector(`#title`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);
  const map = document.querySelector(`.map`);
  const adFormElements = adForm.querySelectorAll(`fieldset`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filtersFormFields = filtersForm.querySelectorAll(`fieldset`);
  const filtersFormSelects = filtersForm.querySelectorAll(`select`);
  const formResetButton = adForm.querySelector(`.ad-form__reset`);
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);
  const pin = document.querySelector(`.map__pin--main`);

  const priceMinMap = {
    [PALACE_TYPE]: 10000,
    [HOUSE_TYPE]: 5000,
    [FLAT_TYPE]: 1000,
    [BUNGALOW_TYPE]: 0,
  };

  let offers = [];

  const successHandler = (data) => {
    offers = [...data];
  };

  const addAttributeDisabled = (array) => {
    array.forEach(function (element) {
      element.setAttribute(`disabled`, true);
    });
  };

  const removeAttributeDisabled = (array) => {
    array.forEach(function (element) {
      element.removeAttribute(`disabled`);
    });
  };

  const checkTitle = () => {
    if (title.value.length < 30) {
      title.setCustomValidity(`минимальная длина - 30 символов`);
    } else if (title.value.length > 100) {
      title.setCustomValidity(`максимальная длина - 100 символов`);
    } else {
      title.setCustomValidity(``);
    }
  };

  const checkType = () => {
    if (type.value === `bungalow`) {
      price.setAttribute(`placeholder`, `0`);
    }

    if (type.value === PALACE_TYPE && price.value < priceMinMap[PALACE_TYPE]) {
      price.setAttribute(`placeholder`, `10000`);
      price.setCustomValidity(`Минимальная цена за ночь: 10 000`);
    } else if (type.value === HOUSE_TYPE && price.value < priceMinMap[HOUSE_TYPE]) {
      price.setAttribute(`placeholder`, `5000`);
      price.setCustomValidity(`Минимальная цена за ночь: 5 000`);
    } else if (type.value === FLAT_TYPE && price.value < priceMinMap[FLAT_TYPE]) {
      price.setAttribute(`placeholder`, `1000`);
      price.setCustomValidity(`Минимальная цена за ночь: 1 000`);
    } else if (price.value.length === 0) {
      price.setCustomValidity(`Нужно задать цену за ночь`);
    } else {
      price.setCustomValidity(``);
    }
  };

  const checkTimeIn = () => {
    timeOut.value = timeIn.value;
  };

  const checkTimeOut = () => {
    timeIn.value = timeOut.value;
  };

  const checkRoomsValidity = () => {
    if (rooms.value === `${MAX_ROOMS}` && capacity.value !== `0`) {
      capacity.setCustomValidity(`Не для гостей`);
    } else if (rooms.value === `1` && capacity.value !== `1`) {
      capacity.setCustomValidity(`для 1 гостя`);
    } else if (rooms.value === `2`) {
      capacity.setCustomValidity(`для 2 гостей или для 1 гостя`);
      if (capacity.value === `1` || capacity.value === `2`) {
        capacity.setCustomValidity(``);
      }
    } else if (rooms.value === `3`) {
      capacity.setCustomValidity(`для 3 гостей, для 2 гостей или для 1 гостя`);
      if (capacity.value === `1` || capacity.value === `2` || capacity.value === `3`) {
        capacity.setCustomValidity(``);
      }
    } else {
      capacity.setCustomValidity(``);
    }
  };

  const activate = () => {
    // formResetButton.addEventListener(`click`, );
    pin.removeEventListener(`mousedown`, window.form.mouseMainButtonHandler);
    pin.removeEventListener(`keydown`, window.form.enterPressHandler);

    if (map.classList.contains(`map--faded`)) {
      window.map.renderFragment(offers);
    }

    window.map.setAddress(window.map.getAddressCoords(pin)[`x`], window.map.getAddressCoords(pin)[`y`]);

    map.classList.remove(`map--faded`);

    adForm.classList.remove(`ad-form--disabled`);

    removeAttributeDisabled(adFormElements);
    removeAttributeDisabled(filtersFormFields);
    removeAttributeDisabled(filtersFormSelects);

    filtersForm.classList.remove(`map__filters--disabled`);
  };

  const enterPressHandler = (evt) => {
    window.util.isEnterEvent(evt, activate);
  };

  const mouseMainButtonHandler = (evt) => {
    window.util.isMouseMainButton(evt, activate);
  };


  housingType.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingPrice.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingRooms.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingGuests.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingFeatures.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  window.backend.load(successHandler, window.backend.errorHandler);

  window.form = {
    addAttributeDisabled,
    removeAttributeDisabled,
    checkRoomsValidity,
    checkTitle,
    checkType,
    checkTimeIn,
    checkTimeOut,
    activate,
    enterPressHandler,
    mouseMainButtonHandler
  };

})();
