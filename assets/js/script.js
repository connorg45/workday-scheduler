$(document).ready(function () {
    // Function to display notification
    function showNotification() {
        $('.notification').addClass('show');
        // Set a timeout to hide the notification after 5 seconds
        setTimeout(function () {
            hideNotification();
        }, 5000);
    }

    // Function to hide notification
    function hideNotification() {
        $('.notification').removeClass('show');
    }

    // Listen for save button clicks
    $('.saveBtn').on('click', function () {
        // Get the value from the description field
        let value = $(this).siblings('.description').val();
        // Get the time block's ID (hour) to use as the localStorage key
        let time = $(this).parent().attr('id');

        // Save input value in localStorage using the hour as the key
        localStorage.setItem(time, value);

        // Show notification for 5 seconds when an item is saved
        showNotification();
    });

    // Update time block classes based on the current hour
    function updateHourClasses() {
        // Get the current hour using dayjs library
        let currentHour = dayjs().hour();

        // Loop through all time blocks to update their classes
        $('.time-block').each(function () {
            // Extract the hour from the time block's ID
            let blockHour = parseInt($(this).attr('id').split('-')[1]);

            // Check if the block time is in the past, present, or future
            if (blockHour < currentHour) {
                // Add 'past' class and remove 'present' and 'future' classes
                $(this).addClass('past').removeClass('present future');
            } else if (blockHour === currentHour) {
                // Add 'present' class and remove 'past' and 'future' classes
                $(this).addClass('present').removeClass('past future');
            } else {
                // Add 'future' class and remove 'past' and 'present' classes
                $(this).addClass('future').removeClass('past present');
            }
        });
    }

    // Call the function initially to update the classes on page load
    updateHourClasses();

    // Set up interval to update the classes every 15 seconds
    setInterval(updateHourClasses, 15000);

    // Load any saved data from localStorage to corresponding time blocks
    for (let hour = 9; hour <= 17; hour++) {
        // Construct the localStorage key for each hour
        let localStorageKey = 'hour-' + hour;
        // Get the saved value for this hour from localStorage
        let description = localStorage.getItem(localStorageKey);
        // Set the value to the corresponding time block description field
        $('#hour-' + hour + ' .description').val(description);
    }

    // Display the current day on the page using dayjs library
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});
