import { defineConfig } from '@playwright/test';

export default defineConfig({
    // Базовый URL для всех сетевых запросов в тестах
    use: {
        baseURL: 'https://graphqlzero.almansi.me',
    },
});