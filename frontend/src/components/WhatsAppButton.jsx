/**
 * Floating WhatsApp chat button.
 * Set VITE_WHATSAPP_NUMBER in .env (e.g. 919876543210 — country code + number, no +)
 */
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919100000000'
const DEFAULT_MESSAGE = encodeURIComponent(
  'Hello! I would like to know more about your courses at Shakti Education Trust.'
)

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg shadow-primary/20 px-4 py-3 transition-all duration-300 hover:scale-105 group"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 fill-white flex-shrink-0"
      >
        <path d="M16.004 2C8.28 2 2 8.278 2 16c0 2.44.638 4.73 1.752 6.718L2 30l7.476-1.732A13.935 13.935 0 0 0 16.004 30C23.726 30 30 23.724 30 16 30 8.278 23.726 2 16.004 2zm0 2.154c6.534 0 11.842 5.306 11.842 11.846 0 6.538-5.308 11.844-11.842 11.844a11.78 11.78 0 0 1-5.998-1.638l-.43-.258-4.44 1.028.99-4.32-.282-.446A11.78 11.78 0 0 1 4.162 16c0-6.54 5.31-11.846 11.842-11.846zm-3.22 5.44a1.23 1.23 0 0 0-.87.396c-.3.326-1.14 1.11-1.14 2.71 0 1.6 1.164 3.144 1.326 3.36.162.216 2.28 3.488 5.526 4.754 2.718 1.068 3.27.856 3.858.8.588-.056 1.9-.776 2.168-1.524.27-.748.27-1.388.19-1.524-.08-.134-.294-.214-.618-.374-.324-.162-1.9-.938-2.196-1.044-.296-.108-.512-.162-.728.162-.216.324-.836 1.044-1.024 1.26-.188.216-.376.244-.7.082-.324-.162-1.366-.504-2.602-1.604-.962-.854-1.612-1.912-1.8-2.234-.188-.324-.02-.5.142-.66.146-.144.324-.374.486-.562.16-.188.212-.324.318-.54.106-.216.054-.406-.026-.568-.08-.162-.716-1.728-.98-2.368-.258-.622-.522-.524-.728-.532-.188-.006-.404-.008-.62-.008z" />
      </svg>
      <span className="text-sm font-semibold whitespace-nowrap">Chat on WhatsApp</span>
    </a>
  )
}
