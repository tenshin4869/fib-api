const request = require("supertest");
const { app, startServer, stopServer } = require("../fibAPI");

describe("フィボナッチAPI", () => {
  let server;

  beforeAll(() => {
    server = startServer();
  });

  afterAll((done) => {
    stopServer();
    done();
  });

  test("GET /fib?n=10 で有効な入力の場合", async () => {
    const response = await request(app).get("/fib?n=10");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: "55" });
  });

  test("GET /fib?n=0 の場合", async () => {
    const response = await request(app).get("/fib?n=0");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: "0" });
  });

  test("GET /fib?n=1 の場合", async () => {
    const response = await request(app).get("/fib?n=1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: "1" });
  });

  test("GET /fib?n=99 で大きな数値の場合", async () => {
    const response = await request(app).get("/fib?n=99");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: "218922995834555169026" });
  });

  test("GET /fib?n=2000 で大きな数値の場合", async () => {
    const response = await request(app).get("/fib?n=2000");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      result:
        "4224696333392304878706725602341482782579852840250681098010280137314308584370130707224123599639141511088446087538909603607640194711643596029271983312598737326253555802606991585915229492453904998722256795316982874482472992263901833716778060607011615497886719879858311468870876264597369086722884023654422295243347964480139515349562972087652656069529806499841977448720155612802665404554171717881930324025204312082516817125",
    });
  });

  test("GET /fib?n=-1 で負の数の場合", async () => {
    const response = await request(app).get("/fib?n=-1");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: "Bad request.",
    });
  });

  test("GET /fib?n=3.14 で小数の場合", async () => {
    const response = await request(app).get("/fib?n=3.14");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: "Bad request.",
    });
  });

  test("GET /クエリパラメータがない場合", async () => {
    const response = await request(app).get("/fib");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      status: 400,
      message: "Bad request.",
    });
  });

  test("GET /パスが存在しない場合", async () => {
    const response = await request(app).get("/non-existent-path");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      status: 404,
      message: "ページが見つかりません",
    });
  });
});
