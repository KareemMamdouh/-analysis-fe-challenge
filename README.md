# Analysis Chart Front-End Challenge

The challenge is to implement an analytics dashboard

## [DEMO](https://analysis-fe-challenge.netlify.app/) [https://analysis-fe-challenge.netlify.app/]

## Requirements

1. A loading screen is expected while fetching the `data.json` from the server. You can use the `raw` file
   directly from Github or serve it from a local server. 10
2. The 3 drop-down lists at the top should filter the data. `Select School` should have the option to
   `Show all`. 11
3. A chart renders the data of the selected schools similar to the image above. 12
4. On the right of the screen, the total number of lessons is displayed for the selected Camp, School, and
   Country, followed by a list of the schools with how many lessons each offers. 13
5. The school's list from **point 4** should include toggles to show or hide the line chart of a certain
   school. 14
6. Upon clicking on a point in the chart from **point 3**, the app should navigate to another page where all
   the details of that item are shown. No UX is provided, but use a simple layout that shows: like country,
   camp, school, month, and a number of lessons. 15
7. After coming back from the details page implemented in **point 6**, the last filtering state should be
   preserved.

## Application Tools

- React, Hooks, Redux
- TypeScript
- Sass
- Chart.js
- unit tests for every component
- add Eslint and Prettier configuration
- Implement a toggle to switch on/off dark mode.
- Multi-lingual support.
