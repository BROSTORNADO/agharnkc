import { formatter } from '@lingui/format-json';

export default {
  locales: ['en', 'ar', 'fr'],
  sourceLocale: 'en',
  format: formatter({ style: 'minimal' }),
  catalogs: [
    {
      path: './src/locales/{locale}/messages',
      include: ['./src'],
    },
  ],
  compileNamespace: 'es', // Use ES modules for compatibility
};

