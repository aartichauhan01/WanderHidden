-- WanderHidden - Seed Destinations Data
-- 20+ Curated Hidden Gems across India

INSERT INTO public.destinations (
  slug, name, state, region, category, short_description, description, highlights,
  latitude, longitude, best_season, ideal_seasons, suggested_duration_days, estimated_budget,
  image_url, gallery, travel_options, nearby_attractions, travel_tips, safety_tips,
  verified_status, is_published, is_trending, is_featured, rating, reviews_count, tags
)
VALUES
(
  'ziro-valley',
  'Ziro Valley',
  'Arunachal Pradesh',
  'North-East',
  'Villages',
  'Pristine pine-clad plateau inhabited by the gentle Apatani tribe with ancient sustainable paddy-fish cultivation.',
  'Tucked away in the gentle rolling hills of Lower Subansiri district, Ziro Valley is a breathtaking UNESCO tentative heritage site. Home to the indigenous Apatani community known for their geometric facial tattoos and intricate water-sharing irrigation systems.',
  ARRAY['Apatani tribal villages of Hong and Hari', 'Pine grove and bamboo grove walking trails', 'Tarin Fish Farm with traditional co-culture techniques', 'Kile Pakho ridge panoramic view'],
  27.5458, 93.8347,
  'September to November & March to May',
  ARRAY['Autumn', 'Spring'],
  4, 14500.00,
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
  '{"nearestAirport": "Hollongi Airport, Itanagar (120 km)", "nearestRailwayStation": "Naharlagun (100 km)", "roadRoute": "NH-13 from Guwahati or Itanagar", "localTransport": "Shared Sumos, local cabs"}'::jsonb,
  ARRAY['Talley Valley Wildlife Sanctuary', 'Meghna Cave Temple', 'Dolo Mando Hill'],
  ARRAY['Inner Line Permit (ILP) is mandatory for domestic travelers', 'Carry cash as ATMs are sparse'],
  ARRAY['Avoid single-use plastic water bottles', 'Do not trespass on sacred family burial plots'],
  'curated_gem', true, true, true, 4.9, 38,
  ARRAY['Tribal Culture', 'Trekking', 'Sustainable Living', 'Rice Terraces']
),
(
  'tirthan-valley',
  'Tirthan Valley',
  'Himachal Pradesh',
  'North',
  'Mountains',
  'Quiet Himalayan haven of crystal-clear glacial streams, apple orchards, and the Great Himalayan National Park.',
  'Away from the bustling highways of Manali, Tirthan Valley unfolds along the turquoise Tirthan River. Known for prized brown and rainbow trout angling, traditional cedar-wood kathkuni architecture, and peaceful walking trails into the buffer zone of the UNESCO-inscribed Great Himalayan National Park.',
  ARRAY['Great Himalayan National Park day trek', 'Chehni Kothi 1500-year-old defensive tower', 'Serolsar Lake sacred forest trek via Jalori Pass', 'Trout fishing in designated eco-zones'],
  31.6369, 77.3468,
  'March to June & September to November',
  ARRAY['Spring', 'Summer', 'Autumn'],
  5, 16000.00,
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'],
  '{"nearestAirport": "Bhuntar Airport, Kullu (50 km)", "nearestRailwayStation": "Chandigarh Junction (245 km)", "roadRoute": "Overnight buses to Aut Tunnel, followed by taxi", "localTransport": "Private cabs and HRTC buses"}'::jsonb,
  ARRAY['Jibhi Waterfalls', 'Jalori Pass 3120m', 'Shringi Rishi Temple Banjar'],
  ARRAY['Catch trout fishing permits at Banjar fisheries office', 'Support local village homestays serving siddu'],
  ARRAY['Catch-and-release fishing practices are strictly encouraged', 'Never step into gushing river during monsoon'],
  'verified_local', true, true, true, 4.8, 64,
  ARRAY['Trout Fishing', 'National Park', 'Cedar Forests', 'Kathkuni Architecture']
),
(
  'chopta',
  'Chopta & Tungnath',
  'Uttarakhand',
  'North',
  'Mountains',
  'The "Mini Switzerland of India" nestled amidst high bugyals facing Chaukhamba peaks.',
  'Chopta is a high-altitude meadow in Rudraprayag surrounded by dense deodar and rhododendron forests. It is the base for Tungnath Temple—the highest Shiva temple in the world at 3,680m—and the breathtaking Chandrashila peak at 4,000m.',
  ARRAY['Trek to Tungnath and Chandrashila sunrise summit', 'Camp in alpine bugyals', 'Himalayan monal and rare bird sightings', 'Starlit night skies with zero light pollution'],
  30.4855, 79.1764,
  'April to June & September to December',
  ARRAY['Spring', 'Summer', 'Autumn', 'Winter'],
  3, 11000.00,
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  ARRAY['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'],
  '{"nearestAirport": "Jolly Grant Airport, Dehradun (220 km)", "nearestRailwayStation": "Rishikesh / Haridwar (200 km)", "roadRoute": "Rishikesh > Rudraprayag > Ukhimath > Chopta", "localTransport": "Private 4x4 or shared jeeps"}'::jsonb,
  ARRAY['Deoria Tal', 'Rohini Bugyal', 'Ukhimath Omkareshwar Temple'],
  ARRAY['Electricity is solar-powered and limited; carry power banks', 'Temperatures drop below freezing at night'],
  ARRAY['Leave no trace: pack down all energy bar wrappers', 'Stay on designated shepherd trails'],
  'curated_gem', true, false, true, 4.9, 92,
  ARRAY['Alpine Meadows', 'Chandrashila', 'High-altitude Trek', 'Bird Watching']
)
ON CONFLICT (slug) DO NOTHING;
