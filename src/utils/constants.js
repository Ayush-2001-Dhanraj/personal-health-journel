export const testTypes = [
  {
    value: "VIS",
    label: "Doctor Visit",
  },
  {
    value: "GEN",
    label: "General Entry",
  },
  {
    value: "TES",
    label: "Test",
  },
];

export const addEntrySteps = [
  "Type",
  "Title & Subtitle",
  "Description & Files",
  "Event Date",
  "Preview",
];

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_SERVER_VERSION}`;
