import { random, authentication } from "./index";

describe("helpers", () => {
  it("random should be defined", () => {
    expect(random).toBeDefined();
  });

  it("random should return a string", () => {
    const result: string = random();
    expect(typeof result).toBe("string");
  });

  it("authentication should be defined", () => {
    expect(authentication).toBeDefined();
  });

  it(`authentication should return a string, and 
    should return same string for same input`, () => {
    const salt: string = "someSalt";
    const password: string = "somePassword";
    const result1: string = authentication(salt, password);
    const result2: string = authentication(salt, password);
    expect(typeof result1).toBe("string");
    expect(result1.length).toBe(64);
    expect(result1).toBe(result2);
  });
});
