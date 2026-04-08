// Product Data
const productsData = [
    {
        id: 'pomade',
        name: 'Executive Pomade',
        description: 'High-hold matte finish pomade for all-day styling control',
        price: 25,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&auto=format&fit=crop',
        category: 'styling'
    },
    {
        id: 'shampoo',
        name: 'Clarifying Shampoo',
        description: 'Deep cleansing formula, perfect for pomade removal and daily use',
        price: 20,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop',
        category: 'care'
    },
    {
        id: 'beard-oil',
        name: 'Signature Beard Oil',
        description: 'Nourishing blend with sandalwood scent for a luxurious beard',
        price: 18,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&auto=format&fit=crop',
        category: 'beard'
    },
    {
        id: 'shaving-cream',
        name: 'Luxury Shaving Cream',
        description: 'Organic, rich lather formula for the smoothest shave',
        price: 22,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop',
        category: 'shave'
    },
    {
        id: 'hair-serum',
        name: 'Anti-Frizz Hair Serum',
        description: 'Professional serum for shine and frizz control',
        price: 28,
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&auto=format&fit=crop',
        category: 'care'
    },
    {
        id: 'clay',
        name: 'Texturizing Clay',
        description: 'Matte finish clay for textured, natural-looking styles',
        price: 24,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&auto=format&fit=crop',
        category: 'styling'
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = productsData;
}