/**
* @jest-environment node
*/

jest.useFakeTimers();

import request from 'supertest';
import { app } from '../../../../app';

import { Connect, DisConnect } from '../../../../Test/ClientTest';

describe("Create a new Category Controller", () => {

  beforeAll(async () => {

    await Connect();
    jest.setTimeout(10000);

  });

  // afterAll(async () => {

  //   await DisConnect();
  // });

  it("[Integration] Should be able create a new Category, new Category Controller Instance", async () => {

    const requireAuthToken = await request(app)
      .post("/session")
      .send(
        {
          email: "admin@gmail.com",
          password: "mabel_admin"
        }
      );

    expect(requireAuthToken.body)
      .toHaveProperty("token");

    const { token } = requireAuthToken.body;

    const requireResponseCategories = await request(app)
      .get("/categories/")
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(requireResponseCategories.status)
      .toBe(200);

  });
});