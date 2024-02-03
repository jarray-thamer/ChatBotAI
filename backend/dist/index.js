import app from "./app.js";
import { connectToDatabase } from "./db/connections.js";
const PORT = process.env.PORT || 5555;
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server Open & Connected To Database on PORT: ", PORT));
})
    .catch((e) => console.log(e));
//# sourceMappingURL=index.js.map