# My Schiphol Frontend Assignment

Follow the steps below to run the app.

## Development

Run the dev server:

```sh
npm run dev
```

## Test

To run the unit tests:

```sh
npm run test
```

## Deployment

First, build the app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm run start
```

## Known limitations / Possible improvements

Given the time constraints, this app is not perfect. These are some known improvements that it would need:

- **Responsive Design:** Currently, only larger (desktop) viewports are taken into consideration. The app does not render properly on smaller viewports.
- **Error Handling:** Only the happy flow is supported currently. There is no UI for when flight data is loading or fetching fails.
- **Testing:** There is only one unit test to demonstrate the approach. Proper testing of the API and UI is needed to ensure quality.
- **UI Components:** There are only two UI components defined to show the approach. Even the current simple UI needs more components. Also the current UI components only support the specific use case they were implemented for. They should support many more use cases if implemented properly.
- **Image Handling:** Images should not be used directly from the production CDN.
- **Localization:** Translation of content is not supported.
