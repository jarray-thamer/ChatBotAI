import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRouters from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);      
appRouter.use("/chat", chatRouters);

export default appRouter;