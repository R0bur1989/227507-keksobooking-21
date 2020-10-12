'use strict';

(function () {
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;
  const PIN_WIDTH = 62;
  const PIN_HEIGHT = 62;
  const PIN_POINTER_HEIGHT = 22;

  const map = document.querySelector(`.map`);
  const pin = document.querySelector(`.map__pin--main`);
  const places = document.querySelector(`.map__pins`);

  const placeTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const renderPlace = (place) => {
    let placeElement = placeTemplate.cloneNode(true);
    let placeImg = placeElement.querySelector(`img`);

    placeElement.style.left = `${place.location.x - (PIN_WIDTH / 2)}px`;
    placeElement.style.top = `${place.location.y - PIN_HEIGHT}px`;
    placeImg.setAttribute(`src`, place.author.avatar);
    placeImg.setAttribute(`alt`, place.offer.title);

    return placeElement;
  };

  window.map = {
    getAddressCoords: (item) => {
      return {
        x: (parseInt(item.style.left, 10) + PIN_WIDTH / 2).toFixed(),
        y: (parseInt(pin.style.top, 10) + PIN_HEIGHT + PIN_POINTER_HEIGHT).toFixed(),
      };
    },
    setAddress: (x, y) => {
      return x + ` , ` + y;
    },
    renderFragment: (counter, place) => {
      let fragment = document.createDocumentFragment();

      for (let i = 1; i <= counter; i++) {
        let author = {
          avatar: `img/avatars/user0${i}.png`
        };
        fragment.appendChild(renderPlace(window.util.generatePlace(author, window.util.generateOffer(), window.util.generateLocation(map.offsetWidth, LOCATION_Y_MIN, LOCATION_Y_MAX))));
      }

      place.appendChild(fragment);
    },
    map,
    pin,
    places
  };

})();
