import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { getCookies } from '@/lib/action';

const locales = ['en', 'vi'];

function getLocale() {
  const acceptedLanguages = headers().get('accept-language') ?? undefined;
  const requestHeaders = { 'accept-language': acceptedLanguages };
  const defaultLocale = 'en';
  const languages = new Negotiator({ headers: requestHeaders }).languages();
  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export default getRequestConfig(async () => {
  const locale = getCookies('NEXT_LOCALE') ?? getLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
