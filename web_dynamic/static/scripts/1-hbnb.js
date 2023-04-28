// $(document).ready(function() {
//     let selectedAmenities = {};
//     let checkbox = $('.checkbox');
//     checkbox.change(function() {
//         const amenityId = $(this).data('data-id');
//         const amenityName = $(this).data('name')
//         if ($(this).is(":checked")) {
//             selectedAmenities[amenityId] = amenityName;
//             // $(".selected_amenities").text(selectedAmenities)
//         } else {
//             delete selectedAmenities[amenityId];
//             // $(".selected_amenities").text(selectedAmenities)
//         }
//         if (Object.keys(selectedAmenities).length > 0) {
//             let amenityList = Object.values(selectedAmenities).join(', ');
//             $(".selected_amenities").text(amenityList)
//         } else {
//             $(".selected_amenities").html("&nbsp;")
//         }
//     })
// });
/////////////////////////////////////////////////////////////////////////////////////
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
});
