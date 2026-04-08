// Service Data
const servicesData = [
    {
        id: 'haircut',
        icon: 'fa-cut',
        title: 'Executive Haircut',
        description: 'Precision cuts, fades, and styling tailored to your face shape and personal style. Includes consultation, wash, and styling.',
        price: 50,
        duration: '45 min',
        category: 'hair',
        requiresAdvance: false
    },
    {
        id: 'shave',
        icon: 'fa-magic',
        title: 'Royal Shave',
        description: 'Hot towel straight razor shave with premium products. Experience the ultimate relaxation with our traditional barbering techniques.',
        price: 35,
        duration: '30 min',
        category: 'shave',
        requiresAdvance: false
    },
    {
        id: 'coloring',
        icon: 'fa-palette',
        title: 'Hair Coloring',
        description: 'Full or partial coloring using natural, premium dyes. Perfect for covering gray or making a bold statement.',
        price: 80,
        duration: '60 min',
        category: 'color',
        requiresAdvance: false
    },
    {
        id: 'massage',
        icon: 'fa-spa',
        title: 'Relaxation Massage',
        description: 'Head, neck, and shoulder massage to relieve tension and stress. The perfect addition to your grooming routine.',
        price: 60,
        duration: '45 min',
        category: 'wellness',
        requiresAdvance: true,
        advanceDays: 2,
        notice: 'Must book 1-2 days in advance'
    },
    {
        id: 'scrub',
        icon: 'fa-spray-can',
        title: 'Deep Cleansing Scrub',
        description: 'Facial scrub treatment to deep cleanse and rejuvenate your skin. Leaves your face feeling fresh and revitalized.',
        price: 40,
        duration: '30 min',
        category: 'wellness',
        requiresAdvance: true,
        advanceDays: 2,
        notice: 'Must book 1-2 days in advance'
    },
    {
        id: 'beard',
        icon: 'fa-user-tie',
        title: 'Beard Trim & Shape',
        description: 'Expert beard shaping and conditioning. We will sculpt your beard to complement your features perfectly.',
        price: 25,
        duration: '20 min',
        category: 'beard',
        requiresAdvance: false
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = servicesData;
}