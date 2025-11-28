// Función para enviar eventos a GA4
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Eventos específicos
export const trackFormSubmit = (formData) => {
  trackEvent('form_submit', {
    project_type: formData.projectType,
    budget: formData.budget,
    value: getBudgetValue(formData.budget),
  });
};

export const trackCTAClick = (ctaLocation) => {
  trackEvent('cta_click', {
    location: ctaLocation,
  });
};

export const trackScroll50 = () => {
  trackEvent('scroll_50_percent', {
    engagement_time_msec: Date.now(),
  });
};

export const trackTimeOnSite = (seconds) => {
  trackEvent('time_on_site', {
    time_seconds: seconds,
  });
};

// Helper para convertir budget a valor numérico
const getBudgetValue = (budget) => {
  const budgetMap = {
    '<3000': 2000,
    '3000-6000': 4500,
    '6000-12000': 9000,
    '>12000': 15000,
  };
  return budgetMap[budget] || 0;
};