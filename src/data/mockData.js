export const doctors = [
  {
    id: 1, name: 'Dr. Priya Sharma', specialty: 'Cardiologist', rating: 4.9, distance: '1.2 km',
    experience: '12 yrs', reviews: 248, avatar: '👩‍⚕️', available: true, fee: '₹500', feeNum: 500,
    mode: 'both', patients: '1.4K+', color: '#EF4444',
    education: ['MBBS – AIIMS Delhi', 'MD Cardiology – PGI Chandigarh', 'Fellowship – Cleveland Clinic'],
    about: 'Dr. Priya Sharma is a leading cardiologist with 12 years of experience in interventional cardiology. She specializes in heart failure management, echocardiography, and preventive cardiology.',
    clinic: 'Apollo Heart Centre, Andheri West, Mumbai',
    clinicAddress: 'Shop 4, Apollo Complex, SV Road, Andheri West, Mumbai – 400058',
    lat: 19.1197, lng: 72.8464, landmark: 'Near Andheri Station West Exit',
    slots: { morning: ['9:00 AM', '9:30 AM', '10:00 AM'], afternoon: ['2:00 PM', '2:30 PM'], evening: ['6:00 PM', '6:30 PM', '7:00 PM'] },
    reviewList: [
      { user: 'Rahul M.', rating: 5, comment: 'Excellent doctor! Very thorough and caring.', avatar: '👨' },
      { user: 'Sneha K.', rating: 5, comment: 'Best cardiologist in Mumbai. Highly recommend!', avatar: '👩' },
      { user: 'Arjun T.', rating: 4, comment: 'Very professional and knowledgeable.', avatar: '🧑' },
    ],
  },
  {
    id: 2, name: 'Dr. Arjun Mehta', specialty: 'Neurologist', rating: 4.8, distance: '2.3 km',
    experience: '9 yrs', reviews: 183, avatar: '👨‍⚕️', available: true, fee: '₹600', feeNum: 600,
    mode: 'both', patients: '980+', color: '#8B5CF6',
    education: ['MBBS – KEM Hospital Mumbai', 'DM Neurology – NIMHANS Bangalore'],
    about: 'Dr. Arjun Mehta specializes in epilepsy, stroke management, and neurodegenerative disorders. Known for his patient-first approach and evidence-based treatment protocols.',
    clinic: 'Mehta Neuro Clinic, Bandra East, Mumbai',
    clinicAddress: '12, Turner Road, Bandra East, Mumbai – 400051',
    lat: 19.0596, lng: 72.8295, landmark: 'Near Bandra Kurla Complex',
    slots: { morning: ['10:00 AM', '10:30 AM', '11:00 AM'], afternoon: ['1:00 PM', '1:30 PM'], evening: ['5:30 PM', '6:00 PM'] },
    reviewList: [
      { user: 'Priya S.', rating: 5, comment: 'Diagnosed my condition accurately when others couldn\'t.', avatar: '👩' },
      { user: 'Kavya R.', rating: 4, comment: 'Very patient and explains everything clearly.', avatar: '👩‍🦰' },
    ],
  },
  {
    id: 3, name: 'Dr. Sneha Patel', specialty: 'Dermatologist', rating: 4.7, distance: '3.1 km',
    experience: '7 yrs', reviews: 156, avatar: '👩‍⚕️', available: false, fee: '₹450', feeNum: 450,
    mode: 'online', patients: '820+', color: '#EC4899',
    education: ['MBBS – Grant Medical College', 'MD Dermatology – Bombay Hospital'],
    about: 'Dr. Sneha Patel is a certified dermatologist specializing in acne, skin allergies, hair loss, and cosmetic dermatology. She offers both clinical and online consultations.',
    clinic: 'SkinCare Clinic, Juhu, Mumbai',
    clinicAddress: '7, Gulmohar Road, JVPD Scheme, Juhu, Mumbai – 400049',
    lat: 19.1075, lng: 72.8263, landmark: 'Near Juhu Beach',
    slots: { morning: ['9:30 AM', '10:00 AM'], afternoon: ['3:00 PM', '3:30 PM', '4:00 PM'], evening: [] },
    reviewList: [
      { user: 'Anita V.', rating: 5, comment: 'My skin has never looked better! Amazing results.', avatar: '👩‍🦱' },
      { user: 'Rohan D.', rating: 4, comment: 'Very knowledgeable about skin conditions.', avatar: '👨' },
    ],
  },
  {
    id: 4, name: 'Dr. Rahul Gupta', specialty: 'Orthopedic', rating: 4.9, distance: '0.8 km',
    experience: '15 yrs', reviews: 312, avatar: '👨‍⚕️', available: true, fee: '₹700', feeNum: 700,
    mode: 'offline', patients: '2.1K+', color: '#F97316',
    education: ['MBBS – Maulana Azad Medical College', 'MS Orthopedics – AIIMS', 'Fellowship in Joint Replacement – Germany'],
    about: 'Dr. Rahul Gupta is a senior orthopedic surgeon with expertise in joint replacement, sports injuries, and spine surgery. He has performed over 2000 successful surgeries.',
    clinic: 'Gupta Ortho Centre, Powai, Mumbai',
    clinicAddress: 'B-204, Hiranandani Gardens, Powai, Mumbai – 400076',
    lat: 19.1176, lng: 72.9060, landmark: 'Near Hiranandani Hospital',
    slots: { morning: ['8:30 AM', '9:00 AM', '9:30 AM'], afternoon: ['12:00 PM', '12:30 PM'], evening: ['4:00 PM', '4:30 PM', '5:00 PM'] },
    reviewList: [
      { user: 'Suresh P.', rating: 5, comment: 'Excellent surgeon. My knee replacement was perfect.', avatar: '👴' },
      { user: 'Meena R.', rating: 5, comment: 'Very experienced and trustworthy doctor.', avatar: '👩‍🦳' },
      { user: 'Vikram S.', rating: 4, comment: 'Good doctor, slight wait time but worth it.', avatar: '👨' },
    ],
  },
  {
    id: 5, name: 'Dr. Kavya Reddy', specialty: 'Pediatrician', rating: 4.8, distance: '1.9 km',
    experience: '10 yrs', reviews: 201, avatar: '👩‍⚕️', available: true, fee: '₹400', feeNum: 400,
    mode: 'both', patients: '1.1K+', color: '#10B981',
    education: ['MBBS – Osmania Medical College', 'MD Pediatrics – NIMHANS'],
    about: 'Dr. Kavya Reddy is a compassionate pediatrician specializing in child development, vaccinations, and pediatric nutrition. She is known for her gentle approach with children.',
    clinic: 'Little Stars Clinic, Malad West, Mumbai',
    clinicAddress: '3, Marve Road, Malad West, Mumbai – 400064',
    lat: 19.1874, lng: 72.8479, landmark: 'Near Malad Station',
    slots: { morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'], afternoon: ['2:00 PM', '2:30 PM', '3:00 PM'], evening: ['6:00 PM', '6:30 PM'] },
    reviewList: [
      { user: 'Pooja M.', rating: 5, comment: 'My kids love her! She makes them feel so comfortable.', avatar: '👩' },
      { user: 'Arun K.', rating: 5, comment: 'Best pediatrician we\'ve ever had. Very thorough.', avatar: '👨' },
    ],
  },
  {
    id: 6, name: 'Dr. Vikram Singh', specialty: 'General Physician', rating: 4.6, distance: '0.5 km',
    experience: '8 yrs', reviews: 142, avatar: '👨‍⚕️', available: true, fee: '₹300', feeNum: 300,
    mode: 'both', patients: '900+', color: '#2563EB',
    education: ['MBBS – Seth GS Medical College', 'DNB General Medicine'],
    about: 'Dr. Vikram Singh is a trusted general physician providing comprehensive primary care. He handles everything from routine checkups to managing chronic conditions.',
    clinic: 'Singh Medical Centre, Goregaon, Mumbai',
    clinicAddress: '15, Aarey Road, Goregaon East, Mumbai – 400063',
    lat: 19.1663, lng: 72.8526, landmark: 'Near Goregaon Station',
    slots: { morning: ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM'], afternoon: ['1:00 PM', '1:30 PM', '2:00 PM'], evening: ['5:00 PM', '5:30 PM', '6:00 PM'] },
    reviewList: [
      { user: 'Ravi T.', rating: 5, comment: 'Very accessible and always available. Great doctor!', avatar: '👨' },
      { user: 'Sunita B.', rating: 4, comment: 'Thorough checkup and clear explanations.', avatar: '👩' },
    ],
  },
];

export const appointments = [
  { id: 1, doctor: 'Dr. Priya Sharma', specialty: 'Cardiologist', date: 'Today', time: '3:00 PM', status: 'Confirmed', avatar: '👩‍⚕️', type: 'offline', queuePosition: 4, totalQueue: 9, estimatedWait: 18, doctorSeeing: 2 },
  { id: 2, doctor: 'Dr. Arjun Mehta', specialty: 'Neurologist', date: 'Tomorrow', time: '11:30 AM', status: 'Pending', avatar: '👨‍⚕️', type: 'online', scheduledTime: '11:30 AM' },
  { id: 3, doctor: 'Dr. Sneha Patel', specialty: 'Dermatologist', date: 'Dec 28', time: '2:00 PM', status: 'Confirmed', avatar: '👩‍⚕️', type: 'online', scheduledTime: '2:00 PM' },
];

export const reports = [
  { id: 1, name: 'Blood Test', date: 'Dec 20, 2024', icon: '🩸', type: 'Lab Report', size: '1.2 MB' },
  { id: 2, name: 'Chest X-Ray', date: 'Dec 15, 2024', icon: '🫁', type: 'Radiology', size: '3.4 MB' },
  { id: 3, name: 'ECG Report', date: 'Dec 10, 2024', icon: '❤️', type: 'Cardiology', size: '0.8 MB' },
  { id: 4, name: 'MRI Scan', date: 'Nov 28, 2024', icon: '🧠', type: 'Radiology', size: '8.1 MB' },
  { id: 5, name: 'Urine Analysis', date: 'Nov 20, 2024', icon: '🔬', type: 'Lab Report', size: '0.5 MB' },
];

export const videoCategories = ['All', 'Fitness', 'Mental Health', 'Diet & Nutrition', 'Heart Health', 'Skin Care', 'Diabetes Care', 'Home Remedies'];

// Short-form videos (reels style)
export const shorts = [
  { id: 101, type: 'short', title: 'Drink water first thing in the morning', description: 'Kickstart your metabolism and flush toxins with 2 glasses of water before anything else. 💧', category: 'Diet & Nutrition', duration: '0:28', views: '142K', likes: 8400, emoji: '💧', color: '#06B6D4', creator: 'Dr. Priya Sharma', creatorEmoji: '👩‍⚕️' },
  { id: 102, type: 'short', title: '3 deep breaths to calm anxiety instantly', description: 'Inhale 4s → Hold 4s → Exhale 6s. Repeat 3 times. Your nervous system will thank you. 🌬️', category: 'Mental Health', duration: '0:45', views: '89K', likes: 6200, emoji: '🌬️', color: '#8B5CF6', creator: 'Dr. Arjun Mehta', creatorEmoji: '👨‍⚕️' },
  { id: 103, type: 'short', title: 'Myth: Eating fat makes you fat ❌', description: 'FACT: Healthy fats from avocado, nuts & olive oil are essential for brain health and hormone balance. 🥑', category: 'Diet & Nutrition', duration: '0:52', views: '203K', likes: 15600, emoji: '🥑', color: '#10B981', creator: 'Dr. Kavya Reddy', creatorEmoji: '👩‍⚕️' },
  { id: 104, type: 'short', title: '5-minute morning stretch routine', description: 'Wake up your spine, hips and shoulders with this quick daily stretch. No equipment needed! 🧘', category: 'Fitness', duration: '0:58', views: '67K', likes: 4100, emoji: '🧘', color: '#F97316', creator: 'Dr. Rahul Gupta', creatorEmoji: '👨‍⚕️' },
  { id: 105, type: 'short', title: 'Check your heart rate right now', description: 'Place 2 fingers on your wrist. Count beats for 15 seconds × 4. Normal: 60–100 bpm. ❤️', category: 'Heart Health', duration: '0:35', views: '118K', likes: 9300, emoji: '❤️', color: '#EF4444', creator: 'Dr. Priya Sharma', creatorEmoji: '👩‍⚕️' },
  { id: 106, type: 'short', title: 'SPF every day — yes, even indoors', description: 'UV rays penetrate windows. Apply SPF 30+ every morning to prevent premature aging and skin cancer. ☀️', category: 'Skin Care', duration: '0:40', views: '55K', likes: 3800, emoji: '☀️', color: '#FBBF24', creator: 'Dr. Sneha Patel', creatorEmoji: '👩‍⚕️' },
  { id: 107, type: 'short', title: 'Blood sugar spike? Walk for 10 minutes', description: 'A short walk after meals reduces post-meal glucose spikes by up to 30%. Simple and effective! 🚶', category: 'Diabetes Care', duration: '0:30', views: '76K', likes: 5200, emoji: '🚶', color: '#3B82F6', creator: 'Dr. Kavya Reddy', creatorEmoji: '👩‍⚕️' },
  { id: 108, type: 'short', title: 'Ginger tea for sore throat', description: 'Boil ginger + honey + lemon in water for 5 mins. Sip warm. Natural anti-inflammatory relief. 🍵', category: 'Home Remedies', duration: '0:48', views: '94K', likes: 7100, emoji: '🍵', color: '#84CC16', creator: 'Dr. Arjun Mehta', creatorEmoji: '👨‍⚕️' },
];

// Long-form videos
export const videos = [
  { id: 1, type: 'long', title: '5 Tips for Better Sleep', category: 'Mental Health', duration: '4:32', views: '12K', likes: 890, emoji: '😴', color: '#6366F1', description: 'Discover science-backed sleep hygiene habits that help you fall asleep faster and wake up refreshed every morning.', creator: 'Dr. Arjun Mehta', creatorEmoji: '👨‍⚕️' },
  { id: 2, type: 'long', title: 'Heart Health Basics', category: 'Heart Health', duration: '6:15', views: '8.4K', likes: 620, emoji: '❤️', color: '#EF4444', description: 'Learn the fundamentals of cardiovascular health — from diet and exercise to warning signs you should never ignore.', creator: 'Dr. Priya Sharma', creatorEmoji: '👩‍⚕️' },
  { id: 3, type: 'long', title: 'Yoga for Stress Relief', category: 'Fitness', duration: '8:20', views: '21K', likes: 1800, emoji: '🧘', color: '#10B981', description: 'A beginner-friendly yoga flow designed to calm your nervous system, reduce cortisol, and restore mental clarity.', creator: 'Dr. Rahul Gupta', creatorEmoji: '👨‍⚕️' },
  { id: 4, type: 'long', title: 'Healthy Diet Guide', category: 'Diet & Nutrition', duration: '5:45', views: '15K', likes: 1100, emoji: '🥗', color: '#F59E0B', description: 'Build a balanced plate with the right macros. Practical tips for meal planning without counting every calorie.', creator: 'Dr. Kavya Reddy', creatorEmoji: '👩‍⚕️' },
  { id: 5, type: 'long', title: 'Managing Diabetes Daily', category: 'Diabetes Care', duration: '7:10', views: '9.2K', likes: 740, emoji: '💉', color: '#3B82F6', description: 'Daily routines, food choices, and monitoring habits that help keep blood sugar levels stable and prevent complications.', creator: 'Dr. Kavya Reddy', creatorEmoji: '👩‍⚕️' },
  { id: 6, type: 'long', title: '10-Minute Morning Workout', category: 'Fitness', duration: '10:00', views: '34K', likes: 2900, emoji: '🏃', color: '#F97316', description: 'A quick full-body workout you can do at home with no equipment. Perfect for busy mornings to boost energy all day.', creator: 'Dr. Rahul Gupta', creatorEmoji: '👨‍⚕️' },
  { id: 7, type: 'long', title: 'Mindfulness Meditation Guide', category: 'Mental Health', duration: '12:00', views: '18K', likes: 1500, emoji: '🧠', color: '#8B5CF6', description: 'Step-by-step mindfulness meditation for beginners. Reduce anxiety, improve focus, and build emotional resilience.', creator: 'Dr. Arjun Mehta', creatorEmoji: '👨‍⚕️' },
  { id: 8, type: 'long', title: 'Anti-Inflammatory Foods', category: 'Diet & Nutrition', duration: '6:30', views: '11K', likes: 870, emoji: '🫐', color: '#06B6D4', description: 'Top foods that fight chronic inflammation naturally — from turmeric and berries to omega-3 rich fish and leafy greens.', creator: 'Dr. Sneha Patel', creatorEmoji: '👩‍⚕️' },
  { id: 9, type: 'long', title: 'Cardio for Beginners', category: 'Heart Health', duration: '9:00', views: '7.8K', likes: 590, emoji: '🚴', color: '#EC4899', description: 'Start your cardio journey safely. Low-impact exercises that strengthen your heart without risking injury.', creator: 'Dr. Priya Sharma', creatorEmoji: '👩‍⚕️' },
  { id: 10, type: 'long', title: 'Clear Skin Routine', category: 'Skin Care', duration: '5:00', views: '22K', likes: 1900, emoji: '✨', color: '#A78BFA', description: 'A dermatologist-approved morning and night skincare routine for glowing, healthy skin at any age.', creator: 'Dr. Sneha Patel', creatorEmoji: '👩‍⚕️' },
  { id: 11, type: 'long', title: 'Home Remedies for Cold & Flu', category: 'Home Remedies', duration: '4:45', views: '29K', likes: 2400, emoji: '🍵', color: '#84CC16', description: 'Natural remedies using ginger, honey, tulsi, and steam that help relieve cold and flu symptoms fast.', creator: 'Dr. Arjun Mehta', creatorEmoji: '👨‍⚕️' },
  { id: 12, type: 'long', title: 'Strength Training 101', category: 'Fitness', duration: '11:20', views: '16K', likes: 1300, emoji: '💪', color: '#F59E0B', description: 'Learn proper form for the most effective compound lifts. Build muscle, burn fat, and improve bone density.', creator: 'Dr. Rahul Gupta', creatorEmoji: '👨‍⚕️' },
  { id: 13, type: 'long', title: 'Low-Glycemic Meal Ideas', category: 'Diabetes Care', duration: '6:00', views: '8.1K', likes: 660, emoji: '🥦', color: '#10B981', description: 'Delicious meal ideas with a low glycemic index that keep blood sugar steady and energy levels consistent.', creator: 'Dr. Kavya Reddy', creatorEmoji: '👩‍⚕️' },
  { id: 14, type: 'long', title: 'Sunscreen & UV Protection', category: 'Skin Care', duration: '3:50', views: '13K', likes: 1050, emoji: '🌞', color: '#FBBF24', description: 'Why SPF matters every day — how to choose the right sunscreen and apply it correctly for maximum protection.', creator: 'Dr. Sneha Patel', creatorEmoji: '👩‍⚕️' },
  { id: 15, type: 'long', title: 'Breathing Exercises for Anxiety', category: 'Mental Health', duration: '7:30', views: '25K', likes: 2100, emoji: '🌬️', color: '#6366F1', description: 'Box breathing, 4-7-8, and diaphragmatic breathing techniques that activate your parasympathetic nervous system.', creator: 'Dr. Arjun Mehta', creatorEmoji: '👨‍⚕️' },
];

export const healthTips = [
  'Drink 8 glasses of water daily 💧',
  'Walk 10,000 steps every day 🚶',
  'Sleep 7–8 hours for recovery 😴',
  'Eat more fruits & vegetables 🥦',
];

export const aiResponses = {
  headache: 'Based on your symptoms, this could be a tension headache or migraine. Try resting in a dark room, staying hydrated, and taking OTC pain relief. If it persists more than 3 days, consult a doctor.',
  fever: 'A fever above 38°C (100.4°F) indicates your body is fighting an infection. Stay hydrated, rest, and monitor temperature. Seek medical attention if fever exceeds 39.5°C or lasts more than 3 days.',
  cough: 'A persistent cough could be due to a cold, allergies, or respiratory infection. Stay hydrated, use honey with warm water, and avoid irritants. See a doctor if it lasts more than 2 weeks.',
  default: 'I understand your concern. Based on what you\'ve described, I recommend monitoring your symptoms closely. If they worsen or persist, please consult a healthcare professional. Would you like me to help you book an appointment?',
};
