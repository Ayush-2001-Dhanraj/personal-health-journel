export const testTypes = [
  {
    value: "RES",
    label: "Test Result",
  },
  {
    value: "GEN",
    label: "General Entry",
  },
];

export const addEntrySteps = [
  "Type",
  "Title & Subtitle",
  "Description & Files",
  "Event Date",
];

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_SERVER_VERSION}`;
