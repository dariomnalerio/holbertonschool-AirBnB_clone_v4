$(document).ready(function() {
    let selectedAmenities = [];
    let checkbox = $('.checkbox');
    checkbox.change(function() {
        if ($(this).is(":checked")) {
            selectedAmenities.push($(this).attr('data-id'));
        } else {
            if (selectedAmenities.indexOf($(this).attr('data-id')) !== -1) {
                selectedAmenities.splice(selectedAmenities.indexOf($(this).attr('data-id')), 1);
            }
        }
    })
});