import { useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export default function useVisitorTracking() {
  useEffect(() => {
    const trackVisitor = async () => {
      // Get visitor data
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const geoData = await geoResponse.json();

      // Save to Supabase
      await supabase.from('visitor_analytics').insert([
        {
          ip_address: ip,
          country: geoData.country_name,
          region: geoData.region,
          city: geoData.city,
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'Direct',
          page_url: window.location.href,
        },
      ]);
    };

    trackVisitor();
  }, []);
}
