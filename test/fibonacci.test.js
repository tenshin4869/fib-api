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

  test("GET /fibonacci/:n で有効な入力の場合", async () => {
    const response = await request(app).get("/fibonacci/10");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ n: 10, フィボナッチ数: 55 });
  });

  test("GET /fibonacci/0 の場合", async () => {
    const response = await request(app).get("/fibonacci/0");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ n: 0, フィボナッチ数: 0 });
  });

  test("GET /fibonacci/:n で負の数の場合", async () => {
    const response = await request(app).get("/fibonacci/-1");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      エラー: "無効な入力です。0以上の整数を入力してください。",
    });
  });

  test("GET /fibonacci/:n で小数の場合", async () => {
    const response = await request(app).get("/fibonacci/3.14");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      エラー: "無効な入力です。0以上の整数を入力してください。",
    });
  });
});
