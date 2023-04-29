// Wait for the DOM to be fully loaded before executing any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize an empty object to store selected amenities
  const amenities = {};

  // Loop through all checkboxes in the popover and add event listener
  document
    .querySelectorAll('.popover input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        // Get the ID and name of the amenity
        const amenityId = checkbox.dataset.id;
        const amenityName = checkbox.dataset.name;

        // Add or remove the amenity from the amenities object based on checkbox state
        if (checkbox.checked) {
          amenities[amenityId] = amenityName;
        } else {
          delete amenities[amenityId];
        }

        // Update the amenities list in the UI
        if (Object.keys(amenities).length > 0) {
          const amenitiesList = Object.values(amenities).join(", ");
          document.querySelector(".amenities h4").textContent = amenitiesList;
        } else {
          document.querySelector(".amenities h4").innerHTML = "&nbsp;";
        }
      });
    });

  // Check API status
  const apiStatus = document.querySelector("#api_status");
  const apiStatusUrl = "http://localhost:5001/api/v1/status/";
  const response = fetch(apiStatusUrl);

  response.then((response) => {
    if (response.ok) {
      apiStatus.classList.add("available");
    } else {
      apiStatus.classList.remove("available");
    }
  });

  // Fetch data for search button results
  const searchApiUrl = "http://localhost:5001/api/v1/places_search/";
  const searchPostRequest = fetch(searchApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}), // send empty body
  });

  searchPostRequest
    .then((response) => response.json()) // extract JSON data from response
    .then((data) => {
      for (const place of data) {
        // Get the user information for the current place
        const userUrl = `http://localhost:5001/api/v1/users/${place.user_id}`;
        fetch(userUrl)
          .then((response) => response.json())
          .then((user) => {
            // Create HTML for the current place and user and insert it into the UI
            const html = `
              <article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${
              place.max_guest != 1 ? "s" : ""
            }</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${
              place.number_rooms != 1 ? "s" : ""
            }</div>
                  <div class="number_bathrooms">${
                    place.number_bathrooms
                  } Bathroom${place.number_bathrooms != 1 ? "s" : ""}</div>
                </div>
                <div class="user">
                  <b>Owner:</b> ${user.first_name} ${user.last_name}
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </article>
            `;
            sectionPlaces.insertAdjacentHTML("beforeend", html);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
