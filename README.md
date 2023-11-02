# Custom Calendar

This is a custom calendar created using `JavaScript` and `moment.js`.
## Live Link
https://calendar-customer.netlify.app/

### Features
- This calendar allows users to choose a `startDate` and an `endDate`.
- When a user selects a `startDate`, it is displayed in the "start date" field above the calendar, and the same applies to the `endDate`.
- Once both the `startDate` and `endDate` are selected, they are displayed in their respective fields above the calendar, and the search button changes color to green. 
- When both the `startDate` and `endDate` are selected, the calendar will maintain their `highlighted dates` even if a user navigates back and forth between different months, ensuring that the exactly selected dates remain highlighted and visible.

### Validation
- It enforces the restriction that users cannot select any date in the past. 
- If a user selects a `startDate` and subsequently chooses an `endDate` that precedes the previously selected `startDate`, the `endDate` is replaced by the initially selected `startDate`. This behavior prevents users from selecting dates in reverse order, as an `endDate` cannot be earlier than the `startDate`. 
- The `Previous button icon` is disabled and hidden when a user clicks it and is about to enter the past month, ensuring that users cannot navigate to earlier days or months in the past when they are in close proximity to the present date. It is enabled again when they click the `Next button` and return to the present.

### Technologies
- JavaScript
- Moment.js
- CSS
- Tailwind CSS

### Screeshots
![image](https://github.com/Delyc/custom-calendar/assets/90575886/b87386e0-fc87-4857-acbe-0267e863f155)

Selecting startDate
![image](https://github.com/Delyc/custom-calendar/assets/90575886/07701c71-be45-4570-b5bd-32eafd629b0e)

Both starDate and endDate selected and highlighting date range
![image](https://github.com/Delyc/custom-calendar/assets/90575886/75b4477d-3175-4e22-a52d-e99e7d00b49c)

 Dates in past are disabled and can not be selected
![image](https://github.com/Delyc/custom-calendar/assets/90575886/9bbd5d42-2529-461e-b058-26ee51e77315)



