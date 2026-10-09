# Playwright UI Automation Framework

A scalable E2E test automation framework built from scratch using **Playwright** and **JavaScript** for the SauceDemo e-commerce platform.

## 🏗️ Architecture & Features

- **Page Object Model (POM):** Strict separation between UI locators/actions (`pages/`) and test scenarios (`tests/`).
- **Flaky Test Mitigation:** Implemented an asynchronous conditional cleanup method (`clearCartIfNotEmpty`) using `isVisible()` to reset the application state between runs without hardcoded delays.
- **Cross-Browser Testing:** Optimized for parallel headless execution across Chromium, Firefox, and WebKit.

## 🛠️ Tech Stack

JavaScript (ES6+), Playwright Test, Node.js, Git/GitHub.

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run all tests in parallel (headless mode):
   ```bash
   npx playwright test
   ```
3. Open Playwright UI mode:
   ```bash
   npx playwright test --ui
   ```
