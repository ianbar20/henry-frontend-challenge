# Reservation Application

written in React, includes tailwindCSS for styling and fontawesome for icons. Unit testing with jest and react-testing-library.
The data is hardcoded to local storage. I will hold off on a lengthy explanation of my choices, as I understand a code explanation is part of the the next interview.

## Setup
- npm i
- npm start

to run tests:
- npm test


### Notes for explanation interview
- I wanted to spend time ensuring the task was complete, and ran out of time before being able to add sufficient unit tests
- Providers must make their availability 24 hours in advance too. It would not make sense to allow the provider to add availability same-day if the client is unable to book less than 24 hours in advance.
- I chose to list the slots for providers because the task specifically said clients should be able to list available slots. I went with the assumption that seeing all possible slots on one screen is important, rather than selecting a date from a calendar and then seeing available slots.
- I think a more ideal solution would be similar to restaurant reservation apps. You select a provider, then a date, then a time slot from a bunch of bubbles (maybe)

### improvements in later versions
- cleaner UI, spacing, element sizing
- unit tests!!
- I think a block-based visual schedule would have better UX. IE a client sees a gmail calendar style daily schedule after selecting a provider and a date.
- persist reserved slots after refreshing page
- responsive ui
- The slot confirmation button logic is sloppy
- since API is being worked on in parallel, begin integrating real API to frontend
- Add user authentication
- Accessibility plugins
- Possibly the ability to remove time slots as a provider. This was not done initially as it would likely need to involve some notification system to any clients with confirmed time slots.
- more consistent storing of date and time.
-- can store a provider's availability as startTime and endTime, both being date objects. the date can be taken from startTime
-- store client slot times in the same way. 
-- this makes the date and time utils more versatile, since they take date objects instead of HH:MM
-- overall better naming of time related data IE client "time" should be named slotStartTime
