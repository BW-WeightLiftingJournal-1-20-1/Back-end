const server = require("./server");
const request = require("supertest");

describe("the server root", () => {
  it("tests", async () => {
    expect(true).toBe(true);
  });

  describe("GET /", () => {
    it("returns", async () => {
      const res = await request(server).get("/");

      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
      expect(res.body.message).toEqual("It's alive! It's alive!!!");
    });
  });
});

