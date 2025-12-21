export class RateLimitService {
  private static instance: RateLimitService;
  private limitMap: Map<string, { count: number, resetTime: number }>;
  private lockMap: Map<string, number>;

  private constructor() {
    this.limitMap = new Map();
    this.lockMap = new Map();
    // Prune expired entries every minute
    setInterval(() => this.prune(), 60000);
  }

  public static getInstance(): RateLimitService {
    if (!RateLimitService.instance) {
      RateLimitService.instance = new RateLimitService();
    }
    return RateLimitService.instance;
  }

  checkLimit(key: string, limit: number, windowMs: number): { allowed: boolean, remaining: number, reset: number } {
    const now = Date.now();
    const entry = this.limitMap.get(key);

    if (!entry || now > entry.resetTime) {
      // New window
      this.limitMap.set(key, { count: 1, resetTime: now + windowMs });
      return { allowed: true, remaining: limit - 1, reset: Math.ceil((now + windowMs) / 1000) };
    }

    if (entry.count >= limit) {
      // Limit exceeded
      return { allowed: false, remaining: 0, reset: Math.ceil(entry.resetTime / 1000) };
    }

    // Increment count
    entry.count++;
    return { allowed: true, remaining: limit - entry.count, reset: Math.ceil(entry.resetTime / 1000) };
  }

  checkDuplicate(key: string, lockDurationMs: number): boolean {
    const now = Date.now();
    const unlockTime = this.lockMap.get(key);

    if (unlockTime && now < unlockTime) {
      return true; // Is duplicate (locked)
    }

    this.lockMap.set(key, now + lockDurationMs);
    return false; // Not duplicate
  }

  private prune() {
    const now = Date.now();
    
    // Cleanup limit map
    for (const [key, value] of this.limitMap.entries()) {
      if (now > value.resetTime) {
        this.limitMap.delete(key);
      }
    }

    // Cleanup lock map
    for (const [key, unlockTime] of this.lockMap.entries()) {
      if (now > unlockTime) {
        this.lockMap.delete(key);
      }
    }
  }
}
