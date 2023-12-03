'use client';

import React from 'react';
import { IntlProvider } from 'react-intl';
import msg from '@/locales/en-US/copy'; // Only en-US support for now

type Props = {
  children: React.ReactNode;
};

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <IntlProvider messages={msg} locale="en-US" defaultLocale="en-US">
      {children}
    </IntlProvider>
  );
};

export default Providers;
