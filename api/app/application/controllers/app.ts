import { app, router } from "../../../config/index";
import HttpResponse from "../../presentation/representers/http-response-representer";
import GetCoins from "../services/get-coins";
import Failure from "../services/lib/error";

router.get("/api/v1/crypto", async (request, response) => {
  const { coins } = request.body;

  try {
    const allCoins = await new GetCoins(coins).call();
    const result = new HttpResponse("ok", allCoins);

    response
      .status(result.http_status_code())
      .send({ message: result.message });
  } catch (error) {
    let result;

    if (error instanceof Failure) {
      result = new HttpResponse(error.status, error.message);
    } else {
      result = new HttpResponse("internal_error", String(error));
    }

    response
      .status(result.http_status_code())
      .send({ message: result?.message });
  }
});

app.use(router);

export default app;
