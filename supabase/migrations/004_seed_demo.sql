-- ============================================================
-- Migration: 004_seed_demo.sql
-- Surabi Properties — Initial & Demo Data for Development
-- (All clearly identifiable as realistic samples)
-- ============================================================

-- Seed Services
INSERT INTO public.services (title, description, icon, sort_order, is_active) VALUES
('Property Buying & Selling', 'Complete end-to-end guidance in identifying clear-title residential plots, agricultural lands, and independent houses across Thanjavur.', 'Building2', 1, true),
('Bank Loan Consultancy', 'Expert loan assistance with leading public & private sector banks (SBI, Canara, HDFC, ICICI). Document vetting, subsidy guidance, and swift approval support.', 'Landmark', 2, true),
('Plot & Layout Consultation', 'DTCP & RERA approved plot advisory, verification of survey numbers, encumbrance certificates (EC), and patta transfer procedures.', 'Compass', 3, true),
('Property Legal Verification', 'Pre-purchase legal scrutiny by experienced property advocates to ensure 100% dispute-free ownership before you commit funds.', 'ShieldCheck', 4, true),
('Property Asset Management', 'Periodic boundary monitoring, fence maintenance, rental tenancy assistance, and tax clearance for non-resident property owners.', 'Briefcase', 5, true)
ON CONFLICT DO NOTHING;

-- Seed Achievements
INSERT INTO public.achievements (title, description, icon, value, sort_order, is_active) VALUES
('Properties Transacted', 'Successfully assisted families & investors in acquiring prime real estate in Thanjavur.', 'Home', '450+', 1, true),
('Bank Loans Sanctioned', 'Assisted seamless loan processing amounting to over ₹35 Crores with nationalized banks.', 'BadgeCheck', '₹35+ Cr', 2, true),
('Years of Trusted Service', 'Continuous presence in Thanjavur property consultancy with zero compromise on ethics.', 'Award', '15+ Years', 3, true),
('Satisfied Client Families', 'Direct personal relationships built upon trust, transparency, and clear legal guidance.', 'Users', '600+', 4, true)
ON CONFLICT DO NOTHING;

-- Seed Properties
INSERT INTO public.properties (slug, title, property_type, location, city, area_sqft, price, price_label, description, features, status, is_featured, cover_image_url) VALUES
(
  'dtcp-approved-residential-plots-near-new-bus-stand',
  'DTCP Approved Residential Plots near New Bus Stand',
  'plot',
  'Raja Rajan Nagar, New Bus Stand Extension',
  'Thanjavur',
  1800,
  3200000,
  '₹32 Lakhs',
  'Premium DTCP approved east-facing residential plots in a fast-developing neighborhood. 30ft tar roads, clear underground drainage provision, street lights, and clear water table. Ready for immediate construction. Bank loan arranged up to 80%.',
  ARRAY['DTCP & RERA Approved', 'East & North Facing Plots', '30 ft Wide Tar Road', 'Clear Drinking Water Table', 'Bank Loan Available up to 80%', 'Immediate Patta Transfer'],
  'available',
  true,
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
),
(
  '3-bhk-independent-luxury-villa-pudukkottai-road',
  '3 BHK Independent Luxury Villa on Pudukkottai Road',
  'house',
  'Sundaram Nagar, Pudukkottai Road',
  'Thanjavur',
  2400,
  6800000,
  '₹68 Lakhs',
  'Architect-designed contemporary 3 BHK independent house with car parking, modular kitchen, and private terrace. 100% Vaastu compliant with premium teak wood carpentry and branded sanitary fittings.',
  ARRAY['Individual Borewell & Sump', '100% Vaastu Compliant', 'Covered Car Parking', 'Teak Wood Doors & Windows', 'Modular Kitchen Fitted', 'RERA Registered Builder'],
  'available',
  true,
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
),
(
  'prime-commercial-land-medical-college-road',
  'Prime Commercial Plot near Thanjavur Medical College Road',
  'commercial',
  'Medical College Road Main Junction',
  'Thanjavur',
  3600,
  12000000,
  '₹1.20 Crores',
  'High footfall commercial frontage plot suitable for clinics, corporate branch offices, educational centers, or retail showrooms. Outstanding connectivity to National Highway with 60ft frontage.',
  ARRAY['60 ft Main Road Frontage', 'Commercial Zone Classification', 'High Return on Investment', 'Clear Parent Documents (40 Years)', 'Suitable for Multi-Storey Construction'],
  'available',
  true,
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
),
(
  'fertile-agricultural-farmland-kallanai-belt',
  'Fertile Coconut Farmland near Grand Anicut (Kallanai) Belt',
  'agricultural',
  'Kallanai Canal Belt, Thiruvaiyaru Road',
  'Thanjavur',
  43560,
  4500000,
  '₹45 Lakhs',
  '1 Acre fertile agricultural soil with 70 mature yielding coconut trees, drip irrigation network, free agricultural electricity connection, and sweet water channel frontage. Dispute-free single ownership.',
  ARRAY['1 Acre Clear Land', '70 Yielding Coconut Trees', 'Free Agri Power Connection', 'All-Season Canal Irrigation', 'Tractor Accessible Road'],
  'available',
  false,
  'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Surabi Stories
INSERT INTO public.posts (slug, title, description, category, image_url, status, published_at) VALUES
(
  '45-lakhs-sbi-home-loan-sanctioned-in-7-working-days',
  'Seamless SBI Home Loan Sanction for Dr. K. Ramanathan in 7 Days',
  'Dr. Ramanathan, a medical practitioner working in Thanjavur Medical College, approached us after facing confusion regarding agricultural land conversion and legal vet requirements for his dream home construction. Our dedicated banking consultancy team streamlined the parent title verification, revenue approvals, and secured an SBI MaxGain sanction in record time.',
  'client_success',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  'published',
  now() - interval '3 days'
),
(
  'surabi-properties-surpasses-15-years-of-ethical-consultancy',
  'Celebrating 15 Years of Serving Thanjavur Property Seekers',
  '15 years ago, Surabi Properties was founded on a simple promise: No misleading claims, no hidden commissions, and 100% honest paperwork. Today, with over 600+ families having consulted with us, we reiterate our commitment to safeguarding your hard-earned savings during property transactions.',
  'achievement',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  'published',
  now() - interval '10 days'
),
(
  'thanjavur-smart-city-road-widening-property-impact',
  'Thanjavur Ring Road & Master Plan Expansion: Insights for Land Buyers',
  'With the progression of the Thanjavur Outer Ring Road and bypass expansion, specific pockets around Pudukkottai Road, Trichy Road, and Vallam are seeing accelerated infrastructure growth. Here is our grounded perspective on what to check before investing in these corridors.',
  'property_update',
  'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
  'published',
  now() - interval '20 days'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Testimonials
INSERT INTO public.testimonials (name, location, content, rating, source, is_featured, is_active, sort_order) VALUES
('R. Kalyanasundaram', 'Retired Bank Manager, Thanjavur', 'Surabi Properties helped me identify an authentic DTCP plot for my daughter. What impressed me was their absolute insistence on verifying 35-year parent deeds. Mr. Shenthil Kumaris truly an advisor you can trust blindly.', 5, 'google', true, true, 1),
('Dr. S. Preethi & S. Vignesh', 'Medical College Road, Thanjavur', 'We had zero knowledge about building permission rules and bank loans. Surabi team managed both our villa purchase and HDFC loan sanction without a single hassle. Highly recommended for busy professionals!', 5, 'manual', true, true, 2),
('M. Chelladurai', 'Farmer & Business Owner, Thiruvaiyaru', 'Direct dealing, transparent commission, and personal accompaniment to the Sub-Registrar office. In a field full of brokers who make empty promises, Surabi Properties stands tall as true professionals.', 5, 'google', true, true, 3)
ON CONFLICT DO NOTHING;
