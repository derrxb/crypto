import { app, router } from "../../../config/index";
import HttpResponse from "../../presentation/representers/http-response-representer";
import FindCoins from "../services/find-coins";
import GetCoins from "../services/get-coins";
import Failure from "../services/lib/error";

/**
 * NOTE: If we go strictly by the REST specs we would use a HTTP Get here. However,
 * we would like to client to send the coins list in the body of the request rather
 * than the head for a number of reasons: i.e. can send a large number of coins request
 *
 * So to keep things simple we set this endpoint up to receive the results in the body of the request.
 */
router.post("/api/v1/crypto", async (request, response) => {
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

router.get("/api/v1/search", async (request, response) => {
  const { q } = request.query;

  try {
    const allCoins = await new FindCoins(q as string).call();
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
