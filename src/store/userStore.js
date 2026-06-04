import { MOCK_USER, MOCK_ANALYTICS } from './mockData';

// Simple mock user store implementation
class UserStore {
  constructor() {
    this.user = MOCK_USER;
    this.analytics = MOCK_ANALYTICS;
  }

  getUser() {
    return this.user;
  }

  getAnalytics() {
    return this.analytics;
  }

  updateProfile(data) {
    this.user = { ...this.user, ...data };
    return this.user;
  }

  addXP(points) {
    this.user.xp += points;
    if (this.user.xp >= this.user.xpNeeded + this.user.xp) {
        // Mock leveling up logic
        this.user.level += 1;
    }
  }
}

export const userStore = new UserStore();
