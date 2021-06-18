### Real Time Tracker

A simple crypto tracker for realtime coin tracking.

### Dependencies

- Client:
  - Built with React, Create React App, React Query, and Tailwind
  - Hosted on Netlify as a SPA
- API:
  - Built NodeJS, Express, and Redis
  - Hosted on Heroku
  - Data obtained from Cryptonator API

### Requirements

- ✅ Demonstrate your development flow with commits and pull requests
  - Commits and PR follow Conventional commits
- ✅ Providing an architecture design
- ✅ Node.js and React are MUST
  - NodeJS is used with Express for the API and React is used for the front-end.
- ✅ Consideration of responsive design
  - Design is implemented via Tailwind and it is responsive
- ✅ Consideration of scalability
  - Redis is used to cache recent request to the Cryptonator API
- ✅ Consideration of minimizing charging fee for api calls
  - This is done via caching recent requests to the Cryptonator API. They only update coins once every 30 seconds and so we can cache requests for a number of seconds.
- ❌ (Optional) Dockerizing the whole application
- ✅ (Optional) Extra platform you are able to build on, show us how full stack you are
  - Built on Netlify and Heroku
- ✅ (Optional) Implementation of extra features you can think of
  - I added a search feature with the Cryptonator API. Built from the list of coins they support

### Architecture

The API client follows DDD and is structured around the crypto domain. In future works, one could extend this further to include concepts such as Data Mappers, Responses, and Representers. The current implementation has strong separation of concerns.
If additional business rules were to be added they could easily be done in the Entities (which we could include more over time).

Please find attached the architecture diagram.

![architecture](https://user-images.githubusercontent.com/15827103/122616256-9f4d3b80-d0bc-11eb-84cc-1f81cf61542f.png)

### Limitations and things I would love to improve on

- Implement websockets. Due to the nature of the Cryptonator API (it updated every second) I opted for a simple approach to let the client re-request the data they needed.
- Automated tests: I think a number of features could have been tested in automated tests. i.e Adding a coin to your watch list, searching for coins, etc.
