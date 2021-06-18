import { app, router } from "../../../config/index";

router.get(
  "/api/v1/crypto",
  (request: Express.Request, response: Express.Response) => {}
);

app.use(router);

export default app;
