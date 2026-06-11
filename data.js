// HostelVerse — Mock Data Store

const AppData = {
    // Complaints
    complaints: [
        {
            id: 'C001',
            title: 'Water supply disruption in Block B',
            category: 'water',
            description: 'No water supply since 6 AM in the entire Block B. Tanks seem empty and the motor is not running. Multiple residents affected.',
            room: 'B-204',
            status: 'open',
            priority: 'critical',
            author: 'Rahul Sharma',
            date: '2026-06-11',
            time: '06:15 AM',
            upvotes: 24,
            aiAnalysis: 'Critical infrastructure issue affecting multiple residents. Immediate attention required.'
        },
        {
            id: 'C002',
            title: 'WiFi not working in 3rd floor common room',
            category: 'wifi',
            description: 'The WiFi router in the 3rd floor common room has been down for 2 days. Students are unable to attend online classes.',
            room: 'Common Room - 3F',
            status: 'in-progress',
            priority: 'high',
            author: 'Ananya Patel',
            date: '2026-06-10',
            time: '09:30 AM',
            upvotes: 18,
            aiAnalysis: 'High priority - affects academic activities. Router replacement may be needed.'
        },
        {
            id: 'C003',
            title: 'Noisy construction near hostel during study hours',
            category: 'noise',
            description: 'Construction work going on right next to hostel during exam preparation time (8 AM - 10 PM). Very disturbing.',
            room: 'All Blocks',
            status: 'open',
            priority: 'medium',
            author: 'Vikram Singh',
            date: '2026-06-10',
            time: '02:00 PM',
            upvotes: 31,
            aiAnalysis: 'Medium priority - noise complaint during exam period. Suggest coordinating with admin for construction timing.'
        },
        {
            id: 'C004',
            title: 'Mess food quality has declined significantly',
            category: 'mess',
            description: 'The food quality in the evening mess has been consistently poor for the past week. Rice is undercooked and curries lack taste.',
            room: 'Mess Hall',
            status: 'in-progress',
            priority: 'medium',
            author: 'Priya Gupta',
            date: '2026-06-09',
            time: '08:45 PM',
            upvotes: 42,
            aiAnalysis: 'Recurring mess complaint. Sentiment analysis shows 67% negative reviews this week.'
        },
        {
            id: 'C005',
            title: 'Broken light in corridor - safety hazard',
            category: 'electricity',
            description: 'The corridor light on 2nd floor of Block A has been broken for a week. It is completely dark and dangerous at night.',
            room: 'Block A - 2F Corridor',
            status: 'resolved',
            priority: 'high',
            author: 'Deepak Kumar',
            date: '2026-06-08',
            time: '10:15 PM',
            upvotes: 15,
            aiAnalysis: 'Safety hazard resolved. Maintenance team replaced the fixture.'
        },
        {
            id: 'C006',
            title: 'AC not working in Room C-312',
            category: 'electricity',
            description: 'The AC unit has stopped working completely. Room temperature is unbearable during afternoon hours.',
            room: 'C-312',
            status: 'open',
            priority: 'medium',
            author: 'Sneha Reddy',
            date: '2026-06-11',
            time: '01:30 PM',
            upvotes: 5,
            aiAnalysis: 'Individual room issue. Schedule maintenance visit within 24 hours.'
        },
        {
            id: 'C007',
            title: 'Washroom drainage clogged in Block D',
            category: 'cleanliness',
            description: 'The washroom on the 1st floor of Block D has severely clogged drainage. Water is overflowing and it is unhygienic.',
            room: 'Block D - 1F Washroom',
            status: 'in-progress',
            priority: 'critical',
            author: 'Arjun Mehta',
            date: '2026-06-11',
            time: '07:00 AM',
            upvotes: 20,
            aiAnalysis: 'Critical hygiene issue. Plumber has been dispatched. Expected resolution: 4 hours.'
        },
        {
            id: 'C008',
            title: 'Security guard not present at main gate after 11 PM',
            category: 'security',
            description: 'Multiple instances observed where the main gate security guard was absent after 11 PM. This is a serious security concern.',
            room: 'Main Gate',
            status: 'open',
            priority: 'high',
            author: 'Karthik Nair',
            date: '2026-06-10',
            time: '11:45 PM',
            upvotes: 28,
            aiAnalysis: 'High priority security concern. Pattern detected: 3 similar reports in past 2 weeks.'
        }
    ],

    // Weekly mess menu
    messMenu: {
        Monday: {
            breakfast: { time: '7:30 - 9:00 AM', items: ['Poha', 'Boiled Eggs', 'Toast & Butter', 'Milk', 'Tea/Coffee'], rating: 3.8, totalRatings: 45 },
            lunch: { time: '12:30 - 2:00 PM', items: ['Rice', 'Dal Fry', 'Paneer Butter Masala', 'Roti', 'Salad', 'Buttermilk'], rating: 4.1, totalRatings: 62 },
            snacks: { time: '5:00 - 6:00 PM', items: ['Samosa', 'Tea/Coffee', 'Biscuits'], rating: 3.5, totalRatings: 30 },
            dinner: { time: '7:30 - 9:30 PM', items: ['Rice', 'Rajma', 'Mixed Veg', 'Roti', 'Gulab Jamun'], rating: 4.3, totalRatings: 55 }
        },
        Tuesday: {
            breakfast: { time: '7:30 - 9:00 AM', items: ['Idli Sambar', 'Chutney', 'Banana', 'Tea/Coffee'], rating: 4.2, totalRatings: 50 },
            lunch: { time: '12:30 - 2:00 PM', items: ['Rice', 'Sambar', 'Chole', 'Roti', 'Pickle', 'Lassi'], rating: 3.9, totalRatings: 58 },
            snacks: { time: '5:00 - 6:00 PM', items: ['Bread Pakora', 'Tea/Coffee'], rating: 3.7, totalRatings: 28 },
            dinner: { time: '7:30 - 9:30 PM', items: ['Rice', 'Dal Tadka', 'Aloo Gobi', 'Roti', 'Kheer'], rating: 4.0, totalRatings: 52 }
        },
        Wednesday: {
            breakfast: { time: '7:30 - 9:00 AM', items: ['Paratha', 'Curd', 'Pickle', 'Tea/Coffee'], rating: 4.4, totalRatings: 55 },
            lunch: { time: '12:30 - 2:00 PM', items: ['Biryani', 'Raita', 'Egg Curry', 'Salad', 'Buttermilk'], rating: 4.6, totalRatings: 72 },
            snacks: { time: '5:00 - 6:00 PM', items: ['Vada Pav', 'Tea/Coffee'], rating: 4.1, totalRatings: 35 },
            dinner: { time: '7:30 - 9:30 PM', items: ['Rice', 'Kadhi Pakora', 'Baingan Bharta', 'Roti', 'Ice Cream'], rating: 4.2, totalRatings: 60 }
        },
        Thursday: {
            breakfast: { time: '7:30 - 9:00 AM', items: ['Upma', 'Boiled Eggs', 'Fruit', 'Tea/Coffee'], rating: 3.6, totalRatings: 40 },
            lunch: { time: '12:30 - 2:00 PM', items: ['Rice', 'Yellow Dal', 'Matar Paneer', 'Roti', 'Salad'], rating: 4.0, totalRatings: 56 },
            snacks: { time: '5:00 - 6:00 PM', items: ['Maggi', 'Tea/Coffee'], rating: 4.5, totalRatings: 42 },
            dinner: { time: '7:30 - 9:30 PM', items: ['Rice', 'Chana Dal', 'Palak Paneer', 'Roti', 'Halwa'], rating: 4.1, totalRatings: 50 }
        },
        Friday: {
            breakfast: { time: '7:30 - 9:00 AM', items: ['Chole Bhature', 'Lassi', 'Tea/Coffee'], rating: 4.7, totalRatings: 65 },
            lunch: { time: '12:30 - 2:00 PM', items: ['Rice', 'Arhar Dal', 'Chicken/Soya Curry', 'Roti', 'Raita'], rating: 4.3, totalRatings: 68 },
            snacks: { time: '5:00 - 6:00 PM', items: ['Pav Bhaji', 'Tea/Coffee'], rating: 4.4, totalRatings: 38 },
            dinner: { time: '7:30 - 9:30 PM', items: ['Rice', 'Moong Dal', 'Mix Veg', 'Roti', 'Jalebi'], rating: 4.0, totalRatings: 48 }
        },
        Saturday: {
            breakfast: { time: '7:30 - 9:30 AM', items: ['Aloo Paratha', 'Curd', 'Butter', 'Tea/Coffee'], rating: 4.5, totalRatings: 58 },
            lunch: { time: '12:30 - 2:00 PM', items: ['Veg Pulao', 'Dal Makhani', 'Paneer Tikka', 'Naan', 'Salad'], rating: 4.4, totalRatings: 64 },
            snacks: { time: '5:00 - 6:00 PM', items: ['Sandwich', 'Juice', 'Cookies'], rating: 3.9, totalRatings: 30 },
            dinner: { time: '7:30 - 9:30 PM', items: ['Rice', 'Butter Chicken/Paneer', 'Dal', 'Garlic Naan', 'Rasgulla'], rating: 4.7, totalRatings: 75 }
        },
        Sunday: {
            breakfast: { time: '8:00 - 10:00 AM', items: ['Puri Sabzi', 'Banana', 'Omelette', 'Tea/Coffee'], rating: 4.3, totalRatings: 52 },
            lunch: { time: '12:30 - 2:30 PM', items: ['Special Biryani', 'Chicken/Paneer', 'Raita', 'Salad', 'Sweet'], rating: 4.8, totalRatings: 80 },
            snacks: { time: '5:00 - 6:00 PM', items: ['Momos', 'Tea/Coffee'], rating: 4.6, totalRatings: 45 },
            dinner: { time: '7:30 - 9:30 PM', items: ['Rice', 'Dal Fry', 'Seasonal Veg', 'Roti', 'Fruit Custard'], rating: 4.1, totalRatings: 55 }
        }
    },

    // Maintenance requests
    maintenance: [
        { id: 'M001', title: 'Leaking tap in washroom', type: 'plumbing', location: 'Block A - 3F Washroom', urgency: 'medium', status: 'pending', date: '2026-06-11', assignee: null },
        { id: 'M002', title: 'Fan making grinding noise', type: 'electrical', location: 'Room B-105', urgency: 'low', status: 'assigned', date: '2026-06-10', assignee: 'Electrician - Ramu' },
        { id: 'M003', title: 'Broken window latch', type: 'carpentry', location: 'Room C-201', urgency: 'medium', status: 'in-progress', date: '2026-06-09', assignee: 'Carpenter - Suresh' },
        { id: 'M004', title: 'Wall paint peeling off', type: 'painting', location: 'Block D - 2F Corridor', urgency: 'low', status: 'pending', date: '2026-06-11', assignee: null },
        { id: 'M005', title: 'AC gas refill needed', type: 'ac-repair', location: 'Room A-310', urgency: 'high', status: 'assigned', date: '2026-06-10', assignee: 'AC Tech - Mohan' },
        { id: 'M006', title: 'Toilet flush mechanism broken', type: 'plumbing', location: 'Block B - 1F', urgency: 'critical', status: 'in-progress', date: '2026-06-11', assignee: 'Plumber - Kishan' },
        { id: 'M007', title: 'Study table drawer stuck', type: 'furniture', location: 'Room A-112', urgency: 'low', status: 'completed', date: '2026-06-08', assignee: 'Carpenter - Suresh' },
        { id: 'M008', title: 'Power socket sparking', type: 'electrical', location: 'Room D-405', urgency: 'critical', status: 'pending', date: '2026-06-11', assignee: null },
        { id: 'M009', title: 'Geyser not heating water', type: 'electrical', location: 'Block C - 2F Washroom', urgency: 'high', status: 'completed', date: '2026-06-07', assignee: 'Electrician - Ramu' }
    ],

    // Announcements
    announcements: [
        {
            id: 'A001',
            title: '⚡ Emergency: Power Shutdown Scheduled',
            body: 'There will be a power shutdown on June 14th from 10 AM to 2 PM due to transformer maintenance. Please charge your devices beforehand. Emergency power will be available in the common areas.',
            type: 'urgent',
            author: 'Hostel Admin',
            date: '2026-06-12',
            icon: 'fas fa-bolt'
        },
        {
            id: 'A002',
            title: '🏏 Inter-Hostel Cricket Tournament',
            body: 'The annual Inter-Hostel Cricket Tournament starts June 18th! Register your team (min 11, max 15 players) at the sports room by June 15th. Exciting prizes worth ₹25,000 to be won!',
            type: 'event',
            author: 'Sports Secretary',
            date: '2026-06-11',
            icon: 'fas fa-trophy'
        },
        {
            id: 'A003',
            title: '📋 Room Allocation for Next Semester',
            body: 'Room allocation forms for the next semester are now available at the hostel office. Deadline: June 25th. Priority will be given based on seniority and CGPA. Current room residents get first preference.',
            type: 'important',
            author: 'Warden Office',
            date: '2026-06-10',
            icon: 'fas fa-door-open'
        },
        {
            id: 'A004',
            title: '🧹 Monthly Cleanliness Drive',
            body: 'Monthly room inspection and cleanliness drive will be conducted on June 16th. Please ensure your rooms are clean and well-maintained. Cleanest rooms will be awarded with prizes!',
            type: 'info',
            author: 'Hostel Council',
            date: '2026-06-10',
            icon: 'fas fa-broom'
        },
        {
            id: 'A005',
            title: '🎓 Career Counseling Session',
            body: 'Free career counseling session by industry experts from Google and Microsoft on June 20th at 6 PM in the seminar hall. Topics: Resume building, Interview prep, and Career roadmaps. All are welcome!',
            type: 'event',
            author: 'Placement Cell',
            date: '2026-06-09',
            icon: 'fas fa-graduation-cap'
        },
        {
            id: 'A006',
            title: '🍽️ Mess Committee Meeting',
            body: 'Open mess committee meeting on June 13th at 7 PM in the mess hall. Your feedback matters! We will discuss menu changes, food quality improvements, and vendor evaluation. All hostel residents are encouraged to attend.',
            type: 'important',
            author: 'Mess Committee',
            date: '2026-06-09',
            icon: 'fas fa-users'
        }
    ],

    // Upcoming events
    events: [
        { title: 'Cricket Tournament Registrations', date: '2026-06-15', description: 'Last date to register teams' },
        { title: 'Cleanliness Drive', date: '2026-06-16', description: 'Room inspections all day' },
        { title: 'Cricket Tournament Begins', date: '2026-06-18', description: 'Matches at 4 PM daily' },
        { title: 'Career Counseling Session', date: '2026-06-20', description: 'Seminar Hall, 6 PM' },
        { title: 'Room Allocation Deadline', date: '2026-06-25', description: 'Submit forms by 5 PM' }
    ],

    // Analytics chart data
    analytics: {
        complaintTrend: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [18, 14, 22, 12]
        },
        messRatings: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            breakfast: [3.8, 4.2, 4.4, 3.6, 4.7, 4.5, 4.3],
            lunch: [4.1, 3.9, 4.6, 4.0, 4.3, 4.4, 4.8],
            dinner: [4.3, 4.0, 4.2, 4.1, 4.0, 4.7, 4.1]
        },
        categories: {
            labels: ['Water', 'Electricity', 'WiFi', 'Cleanliness', 'Noise', 'Security', 'Mess', 'Other'],
            data: [15, 22, 18, 12, 8, 10, 25, 5]
        },
        sentimentTrend: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            positive: [55, 58, 52, 60, 65, 68],
            neutral: [30, 28, 33, 25, 22, 20],
            negative: [15, 14, 15, 15, 13, 12]
        }
    },

    // AI-generated insights
    insights: [
        {
            icon: 'fas fa-arrow-trend-down',
            type: 'positive',
            title: 'Complaints Decreasing',
            text: 'Overall complaints have decreased by 33% compared to last month. Water-related issues show the most improvement.'
        },
        {
            icon: 'fas fa-utensils',
            type: 'warning',
            title: 'Mess Rating Alert',
            text: 'Thursday breakfast consistently receives the lowest ratings (3.6). Consider menu diversification for that slot.'
        },
        {
            icon: 'fas fa-wifi',
            type: 'info',
            title: 'WiFi Issues Pattern',
            text: 'WiFi complaints spike between 8-10 PM. This correlates with peak usage. Bandwidth upgrade may be needed.'
        },
        {
            icon: 'fas fa-shield-alt',
            type: 'danger',
            title: 'Security Concern',
            text: '3 security-related complaints in 2 weeks, all after 11 PM. Guard duty roster needs immediate review.'
        }
    ]
};
