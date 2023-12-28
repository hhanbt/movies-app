import { configureStore } from "@reduxjs/toolkit";

import homeSlide from "./homeSlide";

export const store = configureStore({
    reducer: {
        home: homeSlide
    },
});
