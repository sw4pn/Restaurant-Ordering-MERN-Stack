import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET /api/dishes", () => {
  it("Should fetch all Dishes with [name,description,price, image] information.", () => {
    return chai
      .request(app)
      .get("/api/dishes")
      .end((err, res) => {
        if (err) {
          expect(res).to.have.status(500);
          expect(res.body)
            .to.have.property("message")
            .that.is.equal("An error occurred while fetching user data");
        } else {
          expect(res).to.have.status(
            200,
            "GET /api/dishes expects the status code 200"
          );
          expect(res.body).to.be.an(
            "array"
            // "Response should be an array of dishes."
          );
          for (const dish of res.body) {
            expect(dish).to.have.property(
              "name"
              // "Dish should have name property"
            ); //.that.is.not.empty;
            expect(dish).to.have.property(
              "description"
              // "Dish should have description property"
            ).that.is.not.empty;
            expect(dish).to.have.property(
              "price"
              // "Dish should have price property"
            ).that.is.not.null;
            expect(dish).to.have.property(
              "image"
              // "Dish should have image property"
            ).that.is.not.empty;
          }
        }
      });
  });
});
