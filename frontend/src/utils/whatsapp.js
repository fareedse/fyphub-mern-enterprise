export const whatsappLink = (message, number = import.meta.env.VITE_WHATSAPP_NUMBER || '923001234567') => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
