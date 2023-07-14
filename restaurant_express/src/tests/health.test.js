import chai from "chai";
import app from "../index.js";

const expect = chai.expect;

describe("Check API Health", function () {
  describe("GET /api/health", function () {
    it("should return 'OK' and status 200", async function () {
      return chai
        .request(app)
        .get("/api/health")
        .end((err, res) => {
          if (res) {
            expect(res).to.have.status(200);
          }
        });
    });
  });
});
