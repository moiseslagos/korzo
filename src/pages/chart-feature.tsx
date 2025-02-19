import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ChartFeatureView } from 'src/sections/chart-feature/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Chart Feature - ${CONFIG.appName}`}</title>
      </Helmet>

      <ChartFeatureView />
    </>
  );
}
