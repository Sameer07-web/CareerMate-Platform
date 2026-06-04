class AppStore {
  constructor() {
    this.settings = {
      notifications: true,
      darkMode: true,
      privacyMode: false,
    };
  }

  getSettings() {
    return this.settings;
  }

  updateSetting(key, value) {
    this.settings[key] = value;
  }
}

export const appStore = new AppStore();
