/**
 * Lead Submission Utility
 * Handles data collection, IP tracking, and submission to multiple webhooks.
 */

interface LeadData {
    name: string;
    email: string;
    phone: string;
    source?: string;
    [key: string]: any;
}

// Configuration
const GOOGLE_CONVERSION_PIXEL = "AW-17689581194/988gCJmnlKMcEIqthvNB";
const WEBHOOK_OPTIMA = "https://propstory.com/optima/Leads_data";

// Make.com Webhooks Mapping
const WEBHOOK_MAPPING: Record<string, string> = {
    'chatbot': 'https://hook.eu1.make.com/2gxtky75s28nm5bln5zg9g1ibybfwh3v',
    'demand gen': 'https://hook.eu1.make.com/d3saae5k87tei54plu5395q4xfcfqad1',
    'google search': 'https://hook.eu1.make.com/5fr39gwjc8n91dapyooq5fz26fkui573',
    'taboola': 'https://hook.eu1.make.com/wwsvwbm9u46jmfatoq0163oker7ho74z',
    'youtube': 'https://hook.eu1.make.com/y69f6oy4wsyep8pu249myphj3nsdeu5k'
};

/**
 * Get the appropriate webhook URL based on traffic source
 */
function getWebhookUrl(): string {
    if (typeof window === 'undefined') return WEBHOOK_MAPPING['google search'];
    
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source')?.toLowerCase() || 'google search';
    
    // Exact match or fallback to Google Search
    return WEBHOOK_MAPPING[source] || WEBHOOK_MAPPING['google search'];
}

/**
 * Fetch client IP address with strict timeout
 */
async function getIP(): Promise<string> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1200);
        const response = await fetch("https://api.ipify.org?format=json", { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
            const data = await response.json();
            return data.ip || '';
        }
        return '';
    } catch {
        // Silently fallback; backend server automatically captures client IP via headers
        return '';
    }
}

/**
 * Trigger Google Conversion Pixel
 */
function reportGoogleConversion() {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
            'send_to': GOOGLE_CONVERSION_PIXEL,
        });
        
        // Report to Taboola if applicable
        if ((window as any)._tfa) {
            (window as any)._tfa.push({notify: 'event', name: 'lead', id: 1213114});
        }
    } else {
        console.warn("gtag not found for conversion reporting.");
    }
}

/**
 * Submit lead to Optima Database
 */
async function submitToOptima(payload: any) {
    try {
        const formData = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        await fetch(WEBHOOK_OPTIMA, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
    } catch (error) {
        console.error("Optima Submission Error:", error);
    }
}

/**
 * Submit lead to Make Webhook (Dynamic based on source)
 */
async function submitToMake(payload: any) {
    const webhookUrl = getWebhookUrl();
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Make Submission Error:", error);
    }
}

/**
 * Main submission function (Configured for Dummy Submit per client requirement)
 */
export async function submitLead(data: LeadData) {
    // Simulate natural network latency
    await new Promise(resolve => setTimeout(resolve, 450));

    console.log("[Grand Forest Privé - Dummy Lead Submission Received]:", {
        ...data,
        timestamp: new Date().toISOString(),
    });

    return true;
}
