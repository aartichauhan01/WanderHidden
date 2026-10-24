import { Destination } from '@/types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-ziro-valley',
    slug: 'ziro-valley',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    region: 'North-East',
    category: 'Villages',
    shortDescription: 'Pristine pine-clad plateau inhabited by the gentle Apatani tribe with ancient sustainable paddy-fish cultivation.',
    description: 'Tucked away in the gentle rolling hills of Lower Subansiri district, Ziro Valley is a breathtaking UNESCO tentative heritage site. Home to the indigenous Apatani community known for their geometric facial tattoos, nose plugs (Yapin Hullo), and intricate water-sharing irrigation systems, Ziro offers a serene escape amidst whispering pine groves and vibrant green rice terraces.',
    highlights: [
      'Apatani tribal villages of Hong and Hari',
      'Pine grove and bamboo grove walking trails',
      'Tarin Fish Farm with traditional co-culture techniques',
      'Kile Pakho ridge offering a panoramic view of the entire plateau'
    ],
    latitude: 27.5458,
    longitude: 93.8347,
    best_season: 'September to November & March to May',
    idealSeasons: ['Autumn', 'Spring'],
    suggested_duration_days: 4,
    estimated_budget: 14500,
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Hollongi Airport, Itanagar (120 km) or Lilabari Airport, Assam (123 km)',
      nearestRailwayStation: 'Naharlagun Railway Station (100 km)',
      roadRoute: 'Connected via NH-13 from Guwahati or Itanagar through Kimin or Potin',
      localTransport: 'Shared Tata Sumos, local taxis, and scenic walking trails'
    },
    nearbyAttractions: ['Talley Valley Wildlife Sanctuary', 'Meghna Cave Temple', 'Dolo Mando Hill'],
    travelTips: [
      'Inner Line Permit (ILP) is mandatory for domestic travelers; PAP for foreign nationals.',
      'Carry cash as ATMs are sparse and networks can be intermittent.',
      'Respect village elders and always seek consent before taking portraits.'
    ],
    safetyAndResponsibleTourism: [
      'Avoid single-use plastic water bottles; homestays offer filtered mountain water.',
      'Do not pluck indigenous bamboo or trespass on sacred family burial plots.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    tags: ['Tribal Culture', 'Trekking', 'Sustainable Living', 'Rice Terraces']
  },
  {
    id: 'dest-tirthan-valley',
    slug: 'tirthan-valley',
    name: 'Tirthan Valley',
    state: 'Himachal Pradesh',
    region: 'North',
    category: 'Rivers & Mountains' as any,
    shortDescription: 'Quiet Himalayan haven of crystal-clear glacial streams, apple orchards, and the Great Himalayan National Park.',
    description: 'Away from the bustling highways of Manali, Tirthan Valley unfolds along the turquoise Tirthan River. Known for prized brown and rainbow trout angling, traditional cedar-wood kathkuni architecture, and peaceful walking trails into the buffer zone of the UNESCO-inscribed Great Himalayan National Park, it is an idyllic refuge for mindful nature seekers.',
    highlights: [
      'Great Himalayan National Park (GHNP) gate day trek',
      'Chehni Kothi 1500-year-old multi-story wood-stone defensive tower',
      'Serolsar Lake sacred forest trek via Jalori Pass',
      'Trout fishing in designated eco-zones with permits'
    ],
    latitude: 31.6369,
    longitude: 77.3468,
    best_season: 'March to June & September to November',
    idealSeasons: ['Spring', 'Summer', 'Autumn'],
    suggested_duration_days: 5,
    estimated_budget: 16000,
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Bhuntar Airport, Kullu (50 km)',
      nearestRailwayStation: 'Chandigarh Junction (245 km)',
      roadRoute: 'Overnight Volvo buses from Delhi/Chandigarh to Aut Tunnel, followed by local taxi/cab',
      localTransport: 'Local private cabs and occasional HRTC mountain buses'
    },
    nearbyAttractions: ['Jibhi Waterfalls', 'Jalori Pass 3120m', 'Shringi Rishi Temple Banjar'],
    travelTips: [
      'Catch trout fishing permits early at the Banjar fisheries office.',
      'Jalori Pass can experience snow blocks until late March.',
      'Support local village homestays serving siddu and lingri.'
    ],
    safetyAndResponsibleTourism: [
      'Catch-and-release fishing practices are strictly encouraged.',
      'Never step into the gushing Tirthan River during monsoon swells.'
    ],
    verifiedStatus: 'verified_local',
    isTrending: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 64,
    tags: ['Trout Fishing', 'National Park', 'Cedar Forests', 'Kathkuni Architecture']
  },
  {
    id: 'dest-chopta',
    slug: 'chopta',
    name: 'Chopta & Tungnath',
    state: 'Uttarakhand',
    region: 'North',
    category: 'Mountains',
    shortDescription: 'The "Mini Switzerland of India" nestled amidst high bugyals (alpine meadows) facing Chaukhamba peaks.',
    description: 'Chopta is a high-altitude meadow in Rudraprayag surrounded by dense deodar and rhododendron forests. It is the base for the sacred Tungnath Temple—the highest Shiva temple in the world at 3,680m—and the breathtaking Chandrashila peak at 4,000m offering uninterrupted 360-degree views of Nanda Devi, Trishul, and Chaukhamba.',
    highlights: [
      'Trek to Tungnath and Chandrashila sunrise summit',
      'Camp in alpine bugyals covered in spring rhododendrons',
      'Himalayan monal and rare bird sightings in Kedarnath Wildlife Sanctuary',
      'Starlit night skies with zero light pollution'
    ],
    latitude: 30.4855,
    longitude: 79.1764,
    best_season: 'April to June & September to December (Snow in Jan-Feb)',
    idealSeasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 11000,
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Jolly Grant Airport, Dehradun (220 km)',
      nearestRailwayStation: 'Rishikesh / Haridwar Railway Station (200 km)',
      roadRoute: 'Rishikesh > Devprayag > Rudraprayag > Ukhimath > Chopta',
      localTransport: 'Private 4x4 or shared jeeps between Ukhimath and Chopta'
    },
    nearbyAttractions: ['Deoria Tal', 'Rohini Bugyal', 'Ukhimath Omkareshwar Temple'],
    travelTips: [
      'Electricity is solar-powered and limited; carry reliable power banks.',
      'Temperatures drop below freezing at night even in spring.',
      'Start the Chandrashila trek by 4:00 AM for an unforgettable golden sunrise.'
    ],
    safetyAndResponsibleTourism: [
      'Leave no trace: pack down all energy bar wrappers and plastic bottles.',
      'Stay on designated shepherd trails to prevent fragile alpine soil erosion.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 92,
    tags: ['Alpine Meadows', 'Chandrashila', 'High-altitude Trek', 'Bird Watching']
  },
  {
    id: 'dest-mawlynnong',
    slug: 'mawlynnong',
    name: 'Mawlynnong & Riwai',
    state: 'Meghalaya',
    region: 'North-East',
    category: 'Villages',
    shortDescription: 'God’s own garden village celebrated for living root bridges, community cleanliness, and Khasi matrilineal traditions.',
    description: 'Renowned as Asia’s cleanest village, Mawlynnong in the East Khasi Hills is a garden hamlet where blooming orchids, pitcher plants, and bamboo conical baskets (khoh) line every stone path. Just minutes away in Riwai village lies the astounding Jingmaham living root bridge, woven over generations across cascading streams from the aerial roots of Ficus elastica.',
    highlights: [
      'Riwai Single-Decker Living Root Bridge',
      'Sky View 85-foot bamboo machan looking across Bangladesh plains',
      'Balancing Rock natural geological curiosity',
      'Authentic Khasi tribal homestays with home-cooked bamboo shoot delicacies'
    ],
    latitude: 25.2017,
    longitude: 91.9056,
    best_season: 'October to April',
    idealSeasons: ['Autumn', 'Winter', 'Spring'],
    suggested_duration_days: 2,
    estimated_budget: 8500,
    image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Shillong Umroi Airport (95 km) or Guwahati Airport (170 km)',
      nearestRailwayStation: 'Guwahati Railway Station (165 km)',
      roadRoute: 'Shillong to Mawlynnong via Pynursla on smooth hill roads',
      localTransport: 'Foot exploration and local tourist taxis'
    },
    nearbyAttractions: ['Dawki Umngot River', 'Krang Shuri Falls', 'Shnongpdeng Camping'],
    travelTips: [
      'Combine your visit with crystal-clear boating at Dawki River 30 km away.',
      'Stay overnight instead of a rushed day-trip to experience the peaceful morning village rhythm.'
    ],
    safetyAndResponsibleTourism: [
      'Strict zero-littering and smoking laws enforced by the village council.',
      'Use the bamboo dustbins placed at every 10 meters.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: true,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 45,
    tags: ['Root Bridges', 'Eco Tourism', 'Khasi Culture', 'Cleanest Village']
  },
  {
    id: 'dest-dzukou-valley',
    slug: 'dzukou-valley',
    name: 'Dzukou Valley',
    state: 'Nagaland',
    region: 'North-East',
    category: 'Offbeat',
    shortDescription: 'Surreal amphitheater of velvet-green rolling knolls, endemic Dzukou lilies, and winding icy streams at 2,450m.',
    description: 'Straddling the misty border of Nagaland and Manipur, Dzukou Valley is a mystical landscape that resembles an enchanted fairytale kingdom. Untouched by vehicular roads, the trek starts from Viswema or Jakhama village. In early summer, the valley floor blushes with rare endemic white and pink Dzukou lilies blooming along serpentine brooks.',
    highlights: [
      'Endless emerald knolls carved like rippled moss carpets',
      'Dzukou Lily bloom between June and July',
      'Natural cavern shelters and night bonfire bivouacs',
      'Panoramic sunrise overlooking the sea of floating clouds'
    ],
    latitude: 25.5562,
    longitude: 94.0628,
    best_season: 'October to March (for clear skies) or June-July (for flower blooms)',
    idealSeasons: ['Monsoon', 'Autumn', 'Winter'],
    suggested_duration_days: 4,
    estimated_budget: 13500,
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Dimapur Airport (90 km)',
      nearestRailwayStation: 'Dimapur Railway Station (85 km)',
      roadRoute: 'Dimapur > Kohima > Viswema Village > Trek start point',
      localTransport: 'Shared cabs to Viswema; steep 4-5 hour hike up'
    },
    nearbyAttractions: ['Khonoma Green Village', 'Kohima War Cemetery', 'Dzuleke eco-hamlet'],
    travelTips: [
      'Trek is moderately challenging; good trekking shoes and rain gear are essential.',
      'Basic accommodation available at the SAYO rest house (bring your own sleeping bag for comfort).'
    ],
    safetyAndResponsibleTourism: [
      'Dzukou is a strictly plastic-free zone with entry checkpoint deposits.',
      'Camp only at designated spots; do not harvest rare flowers.'
    ],
    verifiedStatus: 'verified_local',
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 51,
    tags: ['Wilderness Trek', 'Flora', 'Nagaland', 'Backpacking']
  },
  {
    id: 'dest-gokarna-hidden-coves',
    slug: 'gokarna-hidden-coves',
    name: 'Gokarna Quiet Coves',
    state: 'Karnataka',
    region: 'South',
    category: 'Beaches',
    shortDescription: 'Secluded boulder-strewn crescent beaches, bioluminescent waters, and peaceful cliff trails away from tourist hubs.',
    description: 'While mainstream travelers flock to Om and Kudle beach shacks, Gokarna’s secluded southern coastline holds hidden gems like Paradise Beach, Half Moon Cove, and Belekan Bay. Accessible primarily via picturesque coastal cliff treks or traditional wooden fishing ferries, these tranquil shores offer golden sands, gentle swells, and breathtaking Arabian Sea sunsets.',
    highlights: [
      'Cliff trek connecting Belekan, Paradise, Half Moon, and Om Beach',
      'Occasional winter night bioluminescence sightings',
      'Secluded camping under coconut groves with listening tides',
      'Dolphin sightings during morning coastal boat rides'
    ],
    latitude: 14.5186,
    longitude: 74.3168,
    best_season: 'October to March',
    idealSeasons: ['Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 9500,
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Goa Dabolim Airport (145 km) or Manohar International Airport (170 km)',
      nearestRailwayStation: 'Gokarna Road Railway Station (9 km) or Kumta (30 km)',
      roadRoute: 'Connected via NH-66 along the Konkan coastal highway',
      localTransport: 'Hike along the cliff trail or take licensed fisherman boats'
    },
    nearbyAttractions: ['Mirjan Fort', 'Yana Rocks geological caves', 'Kodi Beach'],
    travelTips: [
      'Carry headlamps if returning after sunset along the cliff path.',
      'Paradise Beach has no permanent commercial shacks; carry your own water and return with all waste.'
    ],
    safetyAndResponsibleTourism: [
      'Strong undercurrents near rocky promontories; swim only in sheltered bays.',
      'Respect sacred beach boundaries near coastal shrines.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 77,
    tags: ['Coastal Cliff Trek', 'Hidden Beach', 'Sunset', 'Slow Living']
  },
  {
    id: 'dest-hampi-anegundi',
    slug: 'hampi-anegundi',
    name: 'Anegundi & Sanapur Lake',
    state: 'Karnataka',
    region: 'South',
    category: 'Heritage',
    shortDescription: 'The mystical boulder-strewn realm of ancient Kishkindha across the Tungabhadra River.',
    description: 'Across the Tungabhadra river from the famed UNESCO ruins of Hampi lies Anegundi, an idyllic village older than the Vijayanagara Empire itself. Legends tie this boulder-studded kingdom to Kishkindha of the Ramayana. With emerald paddy fields nestled between prehistoric megalithic boulders, Sanapur Lake coracle rides, and prehistoric rock art at Maurya Mane, it offers a poetic sanctuary.',
    highlights: [
      'Round wicker coracle rides across tranquil Sanapur Lake',
      'Sunset at Anjaneya Hill (birthplace of Hanuman) with 575 stone stairs',
      'Prehistoric cave paintings at Onake Kindi',
      'Exploring rural bylanes on vintage rented mopeds'
    ],
    latitude: 15.3524,
    longitude: 76.4952,
    best_season: 'October to February',
    idealSeasons: ['Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 10500,
    image_url: 'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Jindal Vidyanagar Airport, Bellary (45 km) or Hubli (150 km)',
      nearestRailwayStation: 'Hosapete Junction (18 km)',
      roadRoute: 'Drive through Hosapete or cross via Bukkasagara bridge',
      localTransport: 'Bicycles, vintage scooters, and three-wheeler tuk-tuks'
    },
    nearbyAttractions: ['Virupaksha Temple', 'Vitthala Stone Chariot', 'Daroji Sloth Bear Sanctuary'],
    travelTips: [
      'Rent a bicycle or scooter to uncover tucked-away bouldering zones.',
      'Check local water level advisories before boarding coracles in monsoon.'
    ],
    safetyAndResponsibleTourism: [
      'Cliff jumping in Sanapur Lake is prohibited due to submerged granite boulders.',
      'Honor the rural heritage by dressing modestly in village lanes.'
    ],
    verifiedStatus: 'verified_local',
    isTrending: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 110,
    tags: ['Ancient Ruins', 'Granite Boulders', 'Coracle Ride', 'Mythology']
  },
  {
    id: 'dest-gandikota',
    slug: 'gandikota',
    name: 'Gandikota Canyon',
    state: 'Andhra Pradesh',
    region: 'South',
    category: 'Offbeat',
    shortDescription: 'The spectacular "Grand Canyon of India" sculpted by River Pennar through the Erramala hills.',
    description: 'Perched high on the jagged red granite gorge of the Pennar River, Gandikota is a stunning geological spectacle. Inside the sprawling 13th-century sandstone fortress lies the majestic Madhavaraya and Ranganatha temples, an enormous granary, and the Jama Masjid. Sitting upon the edge of the 300-foot precipice as sunset paints the river gorge is an unforgettable Indian experience.',
    highlights: [
      'Dramatic 300-foot red sandstone Pennar river canyon view',
      '13th-century Gandikota Fort ramparts and towering gopurams',
      'Stargazing campsites along the canyon rim',
      'Kayaking and boating in the placid Pennar river below'
    ],
    latitude: 14.8144,
    longitude: 78.2862,
    best_season: 'September to February',
    idealSeasons: ['Autumn', 'Winter'],
    suggested_duration_days: 2,
    estimated_budget: 7500,
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Kadapa Airport (80 km) or Bengaluru International Airport (280 km)',
      nearestRailwayStation: 'Jammalamadugu (15 km) or Muddanuru (40 km)',
      roadRoute: 'Scenic drive via NH-44 and state highway from Hyderabad or Bengaluru',
      localTransport: 'Private vehicles or auto-rickshaws from Jammalamadugu'
    },
    nearbyAttractions: ['Belum Caves (second largest cave system in India)', 'Rayalaseema spice farms'],
    travelTips: [
      'Summers are scorching; visit strictly during cooler winter mornings and evenings.',
      'Carry adequate footwear with good grip for navigating the granite rocks.'
    ],
    safetyAndResponsibleTourism: [
      'There are no safety railings along the cliff edge; exercise extreme caution.',
      'Do not carve names or graffiti on historic fort monuments.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 88,
    tags: ['Gorge', 'Sandstone Canyon', 'Fortress', 'Camping']
  },
  {
    id: 'dest-araku-valley',
    slug: 'araku-valley',
    name: 'Araku Valley & Borra Caves',
    state: 'Andhra Pradesh',
    region: 'South',
    category: 'Forests',
    shortDescription: 'Verdant Eastern Ghats sanctuary of organic Arabica coffee estates, cascading waterfalls, and million-year-old speleothems.',
    description: 'Enveloped in the Eastern Ghats at 910 meters above sea level, Araku Valley is the aromatic heart of organic tribal coffee cultivation in South India. Traversed by the celebrated Vistadome train route that passes through 58 tunnels and over 84 bridges, Araku treats travelers to misty hills, vibrant Dhimsa dance, and the astonishing million-year-old karstic Borra Caves.',
    highlights: [
      'Vistadome glass-roof train journey from Visakhapatnam to Araku',
      'One-million-year-old limestone stalactite formations at Borra Caves',
      'Sip fresh single-origin Araku tribal artisan coffee at farm cooperatives',
      'Katiki and Chaparai water cascades'
    ],
    latitude: 18.3273,
    longitude: 82.8775,
    best_season: 'September to March',
    idealSeasons: ['Monsoon', 'Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 9000,
    image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Visakhapatnam International Airport (115 km)',
      nearestRailwayStation: 'Araku Railway Station (Kothavalasa-Kirandul line)',
      roadRoute: 'Ghat road with sweeping hairpin bends from Vizag via Tyda',
      localTransport: 'Jeeps, hired cars, and village walking trails'
    },
    nearbyAttractions: ['Padmapuram Botanical Gardens', 'Tribal Cultural Museum', 'Ananthagiri Hills'],
    travelTips: [
      'Book the Vistadome coach weeks in advance on IRCTC as seats sell out quickly.',
      'Purchase certified GI-tagged Araku Valley tribal coffee directly from tribal outlets.'
    ],
    safetyAndResponsibleTourism: [
      'Cave floors in Borra can be slippery; wear sturdy rubber-soled footwear.',
      'Respect tribal traditions and photography guidelines during Dhimsa dances.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 73,
    tags: ['Coffee Plantations', 'Limestone Caves', 'Vistadome Train', 'Tribal Art']
  },
  {
    id: 'dest-lonar-crater',
    slug: 'lonar-crater',
    name: 'Lonar Meteorite Crater',
    state: 'Maharashtra',
    region: 'West',
    category: 'Lakes',
    shortDescription: 'The world’s only hyper-velocity impact crater formed in basalt rock, home to ancient 8th-century temple ruins.',
    description: 'Created approximately 52,000 years ago when a two-million-ton meteor slammed into the Deccan basalt plateau at 90,000 km/h, Lonar Lake is a unique geo-heritage site. The oval saline-alkaline lake is surrounded by a dense dry deciduous forest teaming with peacocks and migratory flamingos. Hidden within the crater rim are exquisite Hemadpanthi stone temples slowly reclaimed by nature.',
    highlights: [
      'Trek down the crater rim to the tranquil alkaline lake shore',
      'Daitya Sudan Temple with intricate Khajuraho-style stone carvings',
      'Kamalja Devi Temple hidden deep inside the crater canopy',
      'Birdwatching for winter resident flamingos and herons'
    ],
    latitude: 19.9757,
    longitude: 76.5064,
    best_season: 'November to March',
    idealSeasons: ['Winter'],
    suggested_duration_days: 2,
    estimated_budget: 6800,
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Aurangabad Chhatrapati Sambhajinagar Airport (140 km)',
      nearestRailwayStation: 'Jalna Railway Station (85 km) or Malkapur (90 km)',
      roadRoute: 'Well-connected by road from Aurangabad or Pune via Mehkar',
      localTransport: 'Walking around the crater trails; auto-rickshaws in Lonar town'
    },
    nearbyAttractions: ['Sindkhed Raja (birthplace of Jijabai)', 'Gomukh Temple spring'],
    travelTips: [
      'Hire a knowledgeable local forest guide to navigate the crater trails safely.',
      'Wear covered trail clothing to protect against thorny acacia vegetation.'
    ],
    safetyAndResponsibleTourism: [
      'The lake water is highly alkaline with unique microorganisms; never swim or contaminate it.',
      'Treat the geological rock strata with strict conservation respect.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 56,
    tags: ['Meteorite Crater', 'Geo Heritage', 'Ancient Temples', 'Flamingos']
  },
  {
    id: 'dest-bhandardara',
    slug: 'bhandardara',
    name: 'Bhandardara & Sandhan Valley',
    state: 'Maharashtra',
    region: 'West',
    category: 'Waterfalls',
    shortDescription: 'Misty Sahyadri jewel known for Arthur Lake, roaring Umbrella Falls, and the dramatic Sandhan shadow canyon.',
    description: 'Set on the banks of Pravara River in the Western Ghats of Ahmednagar, Bhandardara is an enchanting hill retreat crowned by Mount Kalsubai (highest peak in Maharashtra at 1,646m). From firefly breeding spectacles in pre-monsoon to roaring Umbrella and Randha waterfalls, and the sheer cliff walls of Sandhan Valley (Valley of Shadows), it is an adventurer’s dream.',
    highlights: [
      'Wilson Dam and roaring Umbrella Falls',
      'Sandhan Valley natural canyon trek through 200ft rock walls',
      'Arthur Lake lakeside tent camping under stars',
      'Spectacular pre-monsoon million-firefly festival in May-June'
    ],
    latitude: 19.5397,
    longitude: 73.7578,
    best_season: 'July to October (for falls) & May-June (for fireflies) & Nov-Feb (for camping)',
    idealSeasons: ['Monsoon', 'Autumn', 'Winter', 'Summer'],
    suggested_duration_days: 3,
    estimated_budget: 8200,
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Mumbai Chhatrapati Shivaji Maharaj Airport (165 km) or Pune (175 km)',
      nearestRailwayStation: 'Igatpuri Railway Station (45 km)',
      roadRoute: 'Mumbai > Asangaon > Kasara Ghat > Igatpuri > Ghoti > Bhandardara',
      localTransport: 'Private cabs, rural jeeps, and walking'
    },
    nearbyAttractions: ['Kalsubai Peak Trek', 'Ratangad Fort', 'Amruteshwar 1200-year-old temple'],
    travelTips: [
      'Sandhan Valley full descent requires technical rappelling gear and professional guides.',
      'Book camping lakeside spots with licensed local villagers.'
    ],
    safetyAndResponsibleTourism: [
      'During monsoon flash floods can occur quickly in narrow gorges; check rainfall alerts.',
      'Never shine artificial flashlights directly at fireflies during mating displays.'
    ],
    verifiedStatus: 'verified_local',
    isTrending: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 104,
    tags: ['Waterfalls', 'Canyon Trek', 'Fireflies', 'Sahyadri Camping']
  },
  {
    id: 'dest-sandakphu',
    slug: 'sandakphu',
    name: 'Sandakphu & Singalila',
    state: 'West Bengal',
    region: 'East',
    category: 'Mountains',
    shortDescription: 'The highest summit in West Bengal showcasing the Sleeping Buddha panorama of Everest, Kanchenjunga, Lhotse, and Makalu.',
    description: 'Sandakphu stands tall at 3,636 meters on the Singalila Ridge along the Indo-Nepal international border. It is one of the only places on Earth where you can simultaneously witness four of the five highest mountain peaks in the world—Mount Everest, Kanchenjunga, Lhotse, and Makalu. The trail is also famous for vintage 1950s Land Rover rides winding through pine forests.',
    highlights: [
      'The "Sleeping Buddha" view of Kanchenjunga range bathed in dawn pink',
      'Riding vintage British 1950s series Land Rovers up gravel paths',
      'Singalila National Park birding and elusive Red Panda habitat',
      'Authentic mountain homestays in Tumling and Kalipokhri serving hot thukpa'
    ],
    latitude: 27.1068,
    longitude: 88.0019,
    best_season: 'October to December (clear views) & April to May (rhododendrons)',
    idealSeasons: ['Autumn', 'Spring', 'Winter'],
    suggested_duration_days: 5,
    estimated_budget: 18500,
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Bagdogra Airport, Siliguri (115 km)',
      nearestRailwayStation: 'New Jalpaiguri NJP (120 km)',
      roadRoute: 'Siliguri > Mirik > Manebhanjan (trek base point)',
      localTransport: 'Classic 4x4 Land Rovers through the Singalila Land Rover Association or trekking'
    },
    nearbyAttractions: ['Mirik Lake', 'Chitre Buddhist Monastery', 'Phalut peak'],
    travelTips: [
      'Valid national identity card is mandatory for Singalila National Park permits.',
      'Temperatures routinely dip to -5°C at night in winter; multi-layer thermal clothing is essential.'
    ],
    safetyAndResponsibleTourism: [
      'The ridge traverses the open border with Nepal; remain on verified path routes.',
      'Singalila is a critical sanctuary for the red panda; strictly maintain silence in sanctuary woods.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 78,
    tags: ['Everest View', 'Kanchenjunga', 'Vintage Land Rovers', 'Red Panda']
  },
  {
    id: 'dest-barsey-rhododendron',
    slug: 'barsey-rhododendron',
    name: 'Barsey Sanctuary',
    state: 'Sikkim',
    region: 'East',
    category: 'Forests',
    shortDescription: 'Canopy of scarlet, pink, and white blossoms spreading across the Singalila ridge facing Mt. Kanchenjunga.',
    description: 'Tucked away in West Sikkim, Barsey Rhododendron Sanctuary covers 104 square kilometers of pristine montane moist temperate forest. In spring, the entire sanctuary transforms into an intoxicating sea of color as over 40 species of rhododendrons erupt in bloom, framing unobstructed views of the snow-mantled Kanchenjunga range.',
    highlights: [
      'Walking beneath flaming scarlet arches of wild rhododendron trees',
      'Breathtaking unobstructed view of Mt. Pandim and Kanchenjunga',
      'Peaceful forest rest house stays in Okhrey and Hilley',
      'Birdwatcher haven for scarlet minivets, laughingthrushes, and crimson sunbirds'
    ],
    latitude: 27.1648,
    longitude: 88.1092,
    best_season: 'March to May (for peak bloom) & October to November (for mountain clarity)',
    idealSeasons: ['Spring', 'Autumn'],
    suggested_duration_days: 4,
    estimated_budget: 15000,
    image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Pakyong Airport (130 km) or Bagdogra Airport (145 km)',
      nearestRailwayStation: 'New Jalpaiguri NJP (140 km)',
      roadRoute: 'Siliguri > Jorethang > Sombaria > Okhrey > Hilley checkpoint',
      localTransport: 'Shared and reserved private jeeps from Jorethang'
    },
    nearbyAttractions: ['Okhrey Monastery', 'Dentam Valley cheese factory', 'Varsey Guras Kunj'],
    travelTips: [
      'Obtain Sikkim entry permit at Rangpo or Melli if visiting with international passport.',
      'The walk from Hilley gate to Barsey is a gentle 4 km paved forest stroll suitable for all age groups.'
    ],
    safetyAndResponsibleTourism: [
      'Strictly do not pluck wild blossoms; collecting plant specimens is a punishable offence.',
      'Carry back all plastic and wrappers to your homestay in Okhrey.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 39,
    tags: ['Wild Flowers', 'Himalayan Ridge', 'Sikkim', 'Eco Trail']
  },
  {
    id: 'dest-patalkot-valley',
    slug: 'patalkot-valley',
    name: 'Patalkot Valley',
    state: 'Madhya Pradesh',
    region: 'Central',
    category: 'Offbeat',
    shortDescription: 'A horseshoe-shaped gorge 3,000 feet deep inhabited by the Bharia tribe, keepers of ancient herbal wisdom.',
    description: 'Hidden deep in the Satpura hills of Chhindwara district, Patalkot is a bowl-shaped gorge descending more than 3,000 feet below the surrounding plateau. Inhabited by the secluded Bharia and Gond tribes for centuries, it is so steep that parts of the valley floor receive sunlight for only a few hours each day. The valley is renowned as a treasure trove of medicinal ethnobotanical plants.',
    highlights: [
      'Dramatic view of the horseshoe gorge from Tamia cliff viewpoint',
      'Learning ancient ethnobotanical herbal medicine from local Bhumia healers',
      'Trek through dense sal and teak canopies down to Dudhi riverbed',
      'Traditional Mahua honey and tribal corn preparations'
    ],
    latitude: 22.2856,
    longitude: 78.7369,
    best_season: 'October to March (post-monsoon greenery)',
    idealSeasons: ['Monsoon', 'Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 8500,
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Nagpur Dr. Babasaheb Ambedkar Airport (190 km) or Bhopal (215 km)',
      nearestRailwayStation: 'Chhindwara Junction (75 km) or Pipariya (110 km)',
      roadRoute: 'Chhindwara > Parasia > Tamia > Patalkot rim',
      localTransport: 'Private 4WD vehicles and walking trails with forest guides'
    },
    nearbyAttractions: ['Tamia Rest House colonial viewpoint', 'Chhota Mahadev cave', 'Pachmarhi Hill Station'],
    travelTips: [
      'Never venture into the deep ravines without an experienced local Bharia guide.',
      'Mobile connectivity is non-existent within the gorge depths.'
    ],
    safetyAndResponsibleTourism: [
      'Respect sacred groves (Devsthan) of the indigenous inhabitants.',
      'Do not harvest wild medicinal herbs or alter the natural forest canopy.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 31,
    tags: ['Secret Gorge', 'Tribal Ethnobotany', 'Hidden Canyon', 'Satpura']
  },
  {
    id: 'dest-mandu-heritage',
    slug: 'mandu-heritage',
    name: 'Mandu (City of Joy)',
    state: 'Madhya Pradesh',
    region: 'Central',
    category: 'Heritage',
    shortDescription: 'Floating Afghan stone palaces, baobab trees, and poetic royal love legends atop the Vindhyan plateau.',
    description: 'Perched on an isolated 600-meter plateau overlooking the Nimar valley, Mandav (Mandu) was celebrated by Mughal emperors as Shadiabad—"The City of Joy." It is home to India’s finest Afghan architecture: Jahaz Mahal (Ship Palace floating between two artificial lakes), the Hindola Mahal with leaning walls, and the romantic pavilion of Rani Roopmati gazing across the Narmada river.',
    highlights: [
      'Jahaz Mahal floating illusion between Munja and Kapur talaos',
      'Sunset at Roopmati Pavilion with sweeping vistas of the Narmada river',
      'Marveling at 500-year-old African Baobab trees growing across the plateau',
      'Acoustic resonance inside the monumental Hoshang Shah marble mausoleum'
    ],
    latitude: 22.3664,
    longitude: 75.3941,
    best_season: 'July to March (spectacular during monsoon mist)',
    idealSeasons: ['Monsoon', 'Autumn', 'Winter'],
    suggested_duration_days: 2,
    estimated_budget: 7200,
    image_url: 'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Devi Ahilyabai Holkar Airport, Indore (95 km)',
      nearestRailwayStation: 'Indore Junction (98 km) or Ratlam (125 km)',
      roadRoute: 'Indore > Dhar > Mandu along smooth highways and scenic plateau climb',
      localTransport: 'Bicycles, e-rickshaws, and leisurely walks'
    },
    nearbyAttractions: ['Maheshwar fort ghats on Narmada', 'Bagh prehistoric Buddhist caves', 'Dhar Fort'],
    travelTips: [
      'Rent a bicycle to explore monuments nestled peacefully in rural countryside.',
      'Try the local delicacy Dal Bafla and the unique sour fruit of the Mandu Baobab (Khorasani Imli).'
    ],
    safetyAndResponsibleTourism: [
      'Monsoon makes the stone ramparts slippery; use caution on stairways.',
      'Hire authorized MP Tourism guides to hear the haunting poetry of Baz Bahadur.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 68,
    tags: ['Afghan Architecture', 'Royal Romance', 'Baobab Trees', 'Monsoon Retreat']
  },
  {
    id: 'dest-orchha-cenotaphs',
    slug: 'orchha-cenotaphs',
    name: 'Orchha on the Betwa',
    state: 'Madhya Pradesh',
    region: 'Central',
    category: 'Heritage',
    shortDescription: 'Timeless Bundela royal palaces, multi-tiered river chhatris, and vulture sanctuaries on the boulder-strewn Betwa.',
    description: 'Frozen in 16th-century Bundela splendour, Orchha ("The Hidden Place") rises dreamily on the banks of the Betwa River. With monumental multi-tiered cenotaphs (chhatris) reflected in the rippling water, the imposing Raja Mahal adorned with vibrant mural frescoes, and the tranquil Orchha Wildlife Sanctuary right across the wooden footbridge, it remains one of Central India’s most atmospheric escapes.',
    highlights: [
      'Sunset kayak on the Betwa River facing the 14 royal cenotaphs',
      'Stunning 16th-century Bundelkhand murals in Raja Mahal and Laxminarayan Temple',
      'Jeep safari in Orchha Nature Reserve watching nesting endangered vultures',
      'Evening Aarti ceremony at the Ram Raja Temple'
    ],
    latitude: 25.3516,
    longitude: 78.6416,
    best_season: 'October to March',
    idealSeasons: ['Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 8000,
    image_url: 'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Gwalior Airport (125 km) or Khajuraho (170 km)',
      nearestRailwayStation: 'Jhansi Junction (VGLB) (18 km)',
      roadRoute: 'Direct 30-minute cab ride from Jhansi Railway Station',
      localTransport: 'Walking, auto-rickshaws, and bicycles'
    },
    nearbyAttractions: ['Jhansi Rani Fort', 'Datia Palace', 'Khajuraho temples (3 hours away)'],
    travelTips: [
      'Jhansi is connected to Delhi by fast Vande Bharat and Shatabdi express trains.',
      'Visit the rooftop of the Jahangir Mahal at dawn for panoramic countryside mist.'
    ],
    safetyAndResponsibleTourism: [
      'The Betwa can have strong whirlpools near weir gates; swim only in designated tranquil shallows.',
      'The palace towers host fragile vulture colonies; strictly avoid drone flights around the domes.'
    ],
    verifiedStatus: 'verified_local',
    isTrending: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 85,
    tags: ['Chhatris', 'Betwa River', 'Bundelkhand', 'Vulture Haven']
  },
  {
    id: 'dest-kumbhalgarh-countryside',
    slug: 'kumbhalgarh-countryside',
    name: 'Kumbhalgarh Aravalli Trails',
    state: 'Rajasthan',
    region: 'North',
    category: 'Heritage',
    shortDescription: 'The Great Wall of India winding 36 km along jagged Aravalli ridges with leopard sanctuaries and quiet forest hamlets.',
    description: 'Beyond the grand ramparts of Kumbhalgarh Fort—featuring the world’s second longest continuous wall after the Great Wall of China—lies the rugged, untamed wilderness of the Kumbhalgarh Wildlife Sanctuary. Here, the craggy Aravalli ranges hide leopard caves, century-old Jain stepwells, and peaceful countryside homestays run by Rajput and Garasia pastoralist families.',
    highlights: [
      'Walking atop the 36 km long historic defensive stone rampart',
      'Sunset wildlife safari in the Aravalli leopard corridor',
      'Hike down to the 1444-pillar marble marvel of Ranakpur Jain Temple',
      'Traditional Mewari folk dinners under starry desert skies'
    ],
    latitude: 25.1477,
    longitude: 73.5873,
    best_season: 'October to March',
    idealSeasons: ['Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 12000,
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Maharana Pratap Airport, Udaipur (95 km)',
      nearestRailwayStation: 'Falna Railway Station (80 km) or Udaipur (85 km)',
      roadRoute: 'Udaipur > Gogunda > Iswal > Kumbhalgarh over scenic mountain roads',
      localTransport: 'Hired private vehicles, jeep safaris, and equestrian horse trails'
    },
    nearbyAttractions: ['Ranakpur Sun Temple', 'Haldighati battlefield pass', 'Muchhal Mahavir temple'],
    travelTips: [
      'The sound and light show at the fort starts at 6:45 PM every evening.',
      'A morning trek from Kumbhalgarh to Ranakpur through the sanctuary requires a forest permit.'
    ],
    safetyAndResponsibleTourism: [
      'Leopards roam freely in the rocky scrubland; avoid unguided nocturnal walks beyond villages.',
      'Support traditional lacquerware and leather mojari artisans in nearby villages.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 76,
    tags: ['Great Wall of India', 'Aravalli Hills', 'Leopard Safari', 'Mewar Heritage']
  },
  {
    id: 'dest-little-rann-of-kutch',
    slug: 'little-rann-of-kutch',
    name: 'Little Rann of Kutch',
    state: 'Gujarat',
    region: 'West',
    category: 'Offbeat',
    shortDescription: 'Vast shimmering cracked-mud salt flats, endangered Indian Wild Ass, and seasonal flamingo colonies.',
    description: 'A surreal cracked landscape stretching as far as the eye can see, the Little Rann of Kutch (LRK) is an extraordinary biosphere reserve. In winter, this prehistoric ocean bed dries into a white and golden salt flat. It is the last global refuge of the Indian Wild Ass (Khur), along with thousands of Greater and Lesser flamingos feeding in saline wetlands alongside nomadic Agariya salt workers.',
    highlights: [
      '4x4 open safari across cracked mudflats tracking wild ass herds',
      'Visiting generational Agariya salt crystals harvesting pans',
      'Witnessing massive flocks of pink flamingos in Bajana lake',
      'Mirage formations and endless 360-degree horizon sunsets'
    ],
    latitude: 23.3167,
    longitude: 71.5000,
    best_season: 'November to March',
    idealSeasons: ['Winter'],
    suggested_duration_days: 3,
    estimated_budget: 11500,
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Sardar Vallabhbhai Patel Airport, Ahmedabad (130 km)',
      nearestRailwayStation: 'Viramgam Junction (60 km) or Dhrangadhra (30 km)',
      roadRoute: 'Ahmedabad > Sanand > Viramgam > Dasada or Patdi',
      localTransport: 'Authorized 4WD open safaris with registered eco-resorts'
    },
    nearbyAttractions: ['Sun Temple Modhera', 'Rani ki Vav Patan (UNESCO stepwell)', 'Nalsarovar Bird Sanctuary'],
    travelTips: [
      'Never drive private vehicles into the Rann without a local guide; mud crusts can swallow tires.',
      'Wear polarized sunglasses and wide-brim hats due to intense salt glare.'
    ],
    safetyAndResponsibleTourism: [
      'Maintain at least 50 meters distance from wildlife; never chase animals in vehicles.',
      'Fairly compensate Agariya salt-pan workers if purchasing authentic sea crystals.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 52,
    tags: ['Wild Ass Sanctuary', 'Salt Desert', 'Flamingos', 'Surreal Landscapes']
  },
  {
    id: 'dest-daringbadi',
    slug: 'daringbadi',
    name: 'Daringbadi',
    state: 'Odisha',
    region: 'East',
    category: 'Mountains',
    shortDescription: 'The "Kashmir of Odisha" known for pine forests, coffee plantations, winter morning frost, and waterfalls.',
    description: 'Perched at 3,000 feet in the tribal Kandhamal district of Odisha, Daringbadi is a pleasantly cool mountain surprise. Shrouded by dense pine woods, pepper vines, and organic coffee estates, it is one of the rare places in eastern India where sub-zero temperatures and morning ground frost can occur in peak winter.',
    highlights: [
      'Strolls through aromatic tribal coffee and black pepper plantations',
      'Midubanda and Dasingbadi cascading waterfalls',
      'Silent pine forest picnics at Lovers’ Point',
      'Emu bird conservation farm and herbal gardens'
    ],
    latitude: 19.9075,
    longitude: 84.1332,
    best_season: 'September to March',
    idealSeasons: ['Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 8500,
    image_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Biju Patnaik Airport, Bhubaneswar (250 km)',
      nearestRailwayStation: 'Berhampur (BAM) Railway Station (120 km)',
      roadRoute: 'Bhubaneswar or Berhampur via Sorada and Surada Ghat road',
      localTransport: 'Private taxis and local shared auto-rickshaws'
    },
    nearbyAttractions: ['Belghar tribal bamboo sanctuary', 'Rushikulya river source', 'Ludu waterfall'],
    travelTips: [
      'December and January offer the crispest winter mornings; bring warm fleeces.',
      'Support local Kandhamal haldi (GI-tagged organic turmeric) tribal producers.'
    ],
    safetyAndResponsibleTourism: [
      'Stick to recognized ecotourism routes in forest zones.',
      'Eco-retreat glamping by Odisha Tourism is available in winter months.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 41,
    tags: ['Pine Forests', 'Coffee Estates', 'Winter Frost', 'Eastern Ghats']
  },
  {
    id: 'dest-unakoti-sculptures',
    slug: 'unakoti-sculptures',
    name: 'Unakoti Heritage Rocks',
    state: 'Tripura',
    region: 'North-East',
    category: 'Heritage',
    shortDescription: 'Colossal 7th-century rock-carved Shaivite bas-relief sculptures hidden in deep jungle gorges.',
    description: 'Unakoti, meaning "one less than a crore" (99,99,999) in Bengali, is an awe-inspiring open-air rock-cut gallery nestled deep in the lush Raghunandan hills of Tripura. Carved into vertical granite cliffs between the 7th and 9th centuries, the centerpiece is the 30-foot tall Unakotiswara Kal Bhairava head with a monumental 10-foot embroidered headdress, flanked by forest streams.',
    highlights: [
      '30-foot gigantic rock-carved Unakotiswara Kal Bhairava face',
      'Ganga waterfall cascading over rock reliefs',
      'Carved elephant friezes and Ganesha reliefs into jungle bedrock',
      'The annual Ashokastami Mela tribal pilgrim gathering'
    ],
    latitude: 24.3217,
    longitude: 92.0194,
    best_season: 'October to April',
    idealSeasons: ['Autumn', 'Winter', 'Spring'],
    suggested_duration_days: 2,
    estimated_budget: 7800,
    image_url: 'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600100397608-f010f443b7ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Maharaja Bir Bikram Airport, Agartala (160 km)',
      nearestRailwayStation: 'Kumarghat Railway Station (20 km) or Dharmanagar (35 km)',
      roadRoute: 'Agartala > Teliamura > Ambassa > Kailashahar > Unakoti',
      localTransport: 'Auto-rickshaws and local cabs from Kailashahar town'
    },
    nearbyAttractions: ['Jampui Hills (Orange hill festival)', 'Rowa Wildlife Sanctuary', 'Kailashahar tea gardens'],
    travelTips: [
      'Wear shoes with good traction as mossy stone stairs can be slick near the stream.',
      'Morning light between 8 AM and 11 AM provides the most striking angles for photography.'
    ],
    safetyAndResponsibleTourism: [
      'Do not touch or lean on fragile rock bas-reliefs to prevent stone erosion.',
      'Plastic disposal is strictly regulated by the Archaeological Survey of India (ASI).'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 37,
    tags: ['Rock-cut Art', 'Ancient Relics', 'Jungle Sanctuary', 'Shaivite Heritage']
  },
  {
    id: 'dest-spiti-langza-demul',
    slug: 'spiti-langza-demul',
    name: 'Langza & Demul Highlands',
    state: 'Himachal Pradesh',
    region: 'North',
    category: 'Offbeat',
    shortDescription: 'High-altitude fossil village at 4,400m guarded by a golden Buddha, ancient ammonites, and starry galaxies.',
    description: 'Perched in the Trans-Himalayan rain shadow of Spiti Valley, Langza sits beneath the dramatic peak of Chau Chau Kang Nilda. Known as the "Fossil Village," you can find 200-million-year-old marine ammonite fossils (Chaudua) embedded in clay scree from when the Himalayas were the ancient Tethys Sea. Nearby Demul preserves traditional community homestays with zero electricity and million-star night skies.',
    highlights: [
      'Gigantic 1000-year-old golden Buddha statue overlooking the valley',
      'Discovering marine fossil shells from the prehistoric Tethys Ocean',
      'Stargazing the Milky Way with pristine bortle-class 1 dark skies',
      'Warm butter tea and Tsampa with Spitian families in mud-brick homes'
    ],
    latitude: 32.2612,
    longitude: 78.0772,
    best_season: 'May to October (roads open); Winter for snow leopards',
    idealSeasons: ['Summer', 'Autumn'],
    suggested_duration_days: 6,
    estimated_budget: 19500,
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Bhuntar Airport, Kullu (230 km) or Shimla (410 km)',
      nearestRailwayStation: 'Chandigarh Junction (450 km)',
      roadRoute: 'Via Manali > Atal Tunnel > Kunzum Pass > Kaza > Langza (seasonal), or via Shimla > Reckong Peo > Tabo',
      localTransport: 'Local 4x4 Bolero campers and rugged mountain walking trails'
    },
    nearbyAttractions: ['Komic (highest motorable village)', 'Hikkim (highest post office)', 'Key Monastery'],
    travelTips: [
      'Acute Mountain Sickness (AMS) is a real risk at 4,400m; acclimatize in Kaza for at least 24 hours first.',
      'Drink plenty of warm water, avoid alcohol, and carry Diamox if recommended by your physician.'
    ],
    safetyAndResponsibleTourism: [
      'Do not buy or remove marine fossils; leave them in place for scientific preservation.',
      'Water is precious in the cold desert; use dry composting toilets respectfully.'
    ],
    verifiedStatus: 'verified_local',
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 82,
    tags: ['Trans-Himalaya', 'Fossil Village', 'Dark Skies', 'Cold Desert']
  },
  {
    id: 'dest-chembra-wayanad',
    slug: 'chembra-wayanad',
    name: 'Chembra Peak & Secret Lakes',
    state: 'Kerala',
    region: 'South',
    category: 'Lakes',
    shortDescription: 'The highest summit in Wayanad cradling a perennial heart-shaped lake amidst misty shola grasslands.',
    description: 'Rising to 2,100 meters above sea level in the Western Ghats, Chembra Peak is surrounded by rolling tea plantations and dense shola forest patches. Halfway up the trek lies the mystical "Hridayathadakam"—a natural perennial lake perfectly contoured in the shape of a heart, enveloped in ethereal mountain mist that never dries up.',
    highlights: [
      'Trek through rolling emerald tea gardens into shola cloud forests',
      'The naturally shaped Heart Lake (Hridayathadakam) at 1,500m',
      'Sweeping 360-degree panorama of Wayanad, Kozhikode, and Malappuram valleys',
      'Fresh cardamom and tribal spice plantation walks'
    ],
    latitude: 11.5147,
    longitude: 76.0858,
    best_season: 'September to March',
    idealSeasons: ['Monsoon', 'Autumn', 'Winter'],
    suggested_duration_days: 3,
    estimated_budget: 11000,
    image_url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    travelOptions: {
      nearestAirport: 'Calicut (Kozhikode) International Airport (85 km)',
      nearestRailwayStation: 'Kozhikode Railway Station (80 km)',
      roadRoute: 'Calicut > Thamarassery Churam ghat road > Vythiri > Kalpetta > Meppadi',
      localTransport: 'Jeeps from Meppadi to the Forest Department ticket counter'
    },
    nearbyAttractions: ['Soochipara Falls', 'Banasura Sagar earthen dam', 'Edakkal Caves neolithic petroglyphs'],
    travelTips: [
      'Daily trekking passes are capped by the Forest Department; arrive at Meppadi office before 7:30 AM.',
      'Leeches are active during monsoon and post-monsoon; carry salt or tobacco powder.'
    ],
    safetyAndResponsibleTourism: [
      'Trekking beyond the Heart Lake to the absolute summit is restricted to protect shola biodiversity.',
      'Strict zero-plastic enforcement; bags are inspected at the forest post.'
    ],
    verifiedStatus: 'curated_gem',
    isTrending: false,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 95,
    tags: ['Heart Lake', 'Shola Forest', 'Western Ghats', 'Tea Estates']
  }
];
