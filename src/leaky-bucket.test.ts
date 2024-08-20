import { test, expect, describe } from "bun:test";
import { LeakyTokenBucket } from "./leaky-bucket";
import { fakeTimers } from "./fake-timers";

const clock = fakeTimers();

describe("LeakyTokenBucket", () => {
  test("should create a new bucket", () => {
    const bucket = new LeakyTokenBucket(10);
    expect(bucket).toBeDefined();
  });

  test("should add token to the bucket", () => {
    const bucket = new LeakyTokenBucket(10);

    expect(bucket.level("test").tokens).toBe(0);
    bucket.add("test");
    expect(bucket.level("test").tokens).toBe(1);
  });

  test("should leak token from the bucket after leakRate", async () => {
    const bucket = new LeakyTokenBucket(10, 1000);

    expect(bucket.level("test").tokens).toBe(0);
    bucket.add("test");
    expect(bucket.level("test").tokens).toBe(1);
    await clock.tickAsync(500);
    expect(bucket.level("test").tokens).toBe(1);
    await clock.tickAsync(1000);
    expect(bucket.level("test").tokens).toBe(0);
  });
});
