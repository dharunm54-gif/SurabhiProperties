# Customization & Maintenance Guide

## Centralized Configuration

To change contact numbers, addresses, social links, or founder details without editing source code across dozens of files, simply update:

### `lib/config/site.ts`

Contains:
- `name`: Business display name
- `phone`: Human-readable phone number
- `phoneRaw`: E.164 phone string for direct call links
- `whatsapp`: WhatsApp number with country code (no +)
- `email`: Contact email address
- `address`: Street, city, state, pin code
- `mapsEmbedUrl`: Google Maps embed iframe URL
- `mapsDirectionsUrl`: Google Maps driving directions link
- `workingHours`: Timings displayed across navbar and contact sections
- `consultant`: Name, experience, biography, and photo URL
