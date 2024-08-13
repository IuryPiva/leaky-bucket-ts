class MapWithGetOrCreate<K, V> extends Map<K, V> {
  getOrCreate(key: K, creator: () => V): V {
    if (this.has(key)) {
      return this.get(key)!;
    }

    const value = creator();
    this.set(key, value);
    return value;
  }
}

type TokenBucket = {
  tokens: number;
};
const tokenBucketCreator: () => TokenBucket = () => ({
  tokens: 0,
});

export class LeakyTokenBucket {
  constructor(readonly maxTokens: number, private leakRateInMs = 1000) {
    setInterval(() => {
      this.tokensPerUser.forEach((_tokens, username) => {
        this.leak(username);
      });
    }, this.leakRateInMs);
  }

  private tokensPerUser: MapWithGetOrCreate<string, TokenBucket> =
    new MapWithGetOrCreate();

  level(username: string) {
    return this.tokensPerUser.getOrCreate(username, tokenBucketCreator);
  }

  add(username: string) {
    const tokenBucket = this.tokensPerUser.getOrCreate(
      username,
      tokenBucketCreator
    );

    if (tokenBucket.tokens + 1 > this.maxTokens) {
      throw new RangeError("Token bucket is full.");
    }

    tokenBucket.tokens++;
    return tokenBucket;
  }

  leak(username: string) {
    const tokenBucket = this.tokensPerUser.getOrCreate(
      username,
      tokenBucketCreator
    );

    if (!tokenBucket.tokens) {
      throw new RangeError("Token bucket is empty.");
    }

    tokenBucket.tokens--;
    return tokenBucket;
  }
}

const leakyBucket = new LeakyTokenBucket(10);
