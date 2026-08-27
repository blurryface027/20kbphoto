export const GA_MEASUREMENT_ID = "G-PGWE6ZM55Y";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};

// Generic event tracker
export const trackEvent = (action: string, params?: Record<string, string | number | boolean | undefined>) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    // Filter out undefined parameters to keep payload clean
    const cleanedParams: Record<string, string | number | boolean> = {};
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          cleanedParams[key] = value;
        }
      }
    }
    window.gtag("event", action, cleanedParams);
  }
};
