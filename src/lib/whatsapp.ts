import { trackEvent } from "@/lib/gtag";

export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbDNMcR7Noa9qCrHIh3Q";

export const trackWhatsAppClick = (
  ctaType: "homepage_cta" | "tool_cta" | "popup",
  details?: { pageType?: string; toolName?: string }
) => {
  const pageType = details?.pageType || "utility_page";
  const toolName = details?.toolName || undefined;

  if (ctaType === "homepage_cta") {
    trackEvent("whatsapp_homepage_cta_click", {
      cta_location: "homepage_section",
      page_type: "homepage",
      destination: WHATSAPP_CHANNEL_URL,
    });
  } else if (ctaType === "tool_cta") {
    trackEvent("whatsapp_tool_cta_click", {
      cta_location: "tool_bottom_cta",
      page_type: pageType,
      tool_name: toolName,
      destination: WHATSAPP_CHANNEL_URL,
    });
  } else if (ctaType === "popup") {
    trackEvent("whatsapp_popup_click", {
      cta_location: "floating_popup",
      page_type: pageType,
      tool_name: toolName,
      destination: WHATSAPP_CHANNEL_URL,
    });
  }

  trackEvent("whatsapp_channel_click", {
    cta_location: ctaType,
    page_type: pageType,
    tool_name: toolName,
  });
};
