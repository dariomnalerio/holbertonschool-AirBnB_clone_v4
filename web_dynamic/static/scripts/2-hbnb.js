document.addEventListener("DOMContentLoaded", function () {
  const amenities = {};

  document
    .querySelectorAll('.popover input[type="checkbox"]')
    .forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        const amenityId = checkbox.dataset.id;
        const amenityName = checkbox.dataset.name;

        if (checkbox.checked) {
          amenities[amenityId] = amenityName;
        } else {
          delete amenities[amenityId];
        }

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
    const url = "http://localhost:5001/api/v1/status/";
    const response = fetch(url)
    
    response.then((response => {
      if (response.ok) {
        apiStatus.classList.add("available");
      } else {
        apiStatus.classList.remove("available");
      }
    }));
});
