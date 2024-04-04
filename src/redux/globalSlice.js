import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  records: [
    {
      id: "1",
      title: "Thyroid test",
      type: "Test",
      subtitle: "Mid year regular test",
      description:
        "Attack feet behind the couch destroy couch flop over give attitude hide when guests come over hopped up on goofballs hunt anything that moves chase mice intently stare at the same spot  intrigued by the shower, leave dead animals as gifts swat at dog  rub face on everything why must they do that sweet beast under the bed shake treat  chew ipad power cord",
      testDate: "19 April 2023",
      files: [],
      group: [],
    },
    {
      id: "2",
      title: "Thyroid test",
      type: "Report",
      subtitle: "Mid year regular test",
      description:
        "Attack feet behind the couch destroy couch flop over give attitude hide when guests come over hopped up on goofballs hunt anything that moves chase mice intently stare at the same spot  intrigued by the shower, leave dead animals as gifts swat at dog  rub face on everything why must they do that sweet beast under the bed shake treat  chew ipad power cord",
      testDate: "19 March 2023",
      files: [],
      group: [],
    },
    {
      id: "3",
      title: "Thyroid test",
      type: "Test",
      subtitle: "Mid year regular test",
      description:
        "Attack feet behind the couch destroy couch flop over give attitude hide when guests come over hopped up on goofballs hunt anything that moves chase mice intently stare at the same spot  intrigued by the shower, leave dead animals as gifts swat at dog  rub face on everything why must they do that sweet beast under the bed shake treat  chew ipad power cord",
      testDate: "19 February 2023",
      files: [],
      group: [],
    },
  ],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = globalSlice.actions;
export default globalSlice.reducer;
