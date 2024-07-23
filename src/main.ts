import { createApp } from "vue";
import App from "./App.vue";
import routes from "./routes/index";
import "./style.css";

import BaseDialog from "./components/layout/BaseDialog.vue";
import store from "./store/index";
const app = createApp(App);
app.use(routes);
app.component("BaseDialog", BaseDialog);
app.use(store);
app.mount("#app");
