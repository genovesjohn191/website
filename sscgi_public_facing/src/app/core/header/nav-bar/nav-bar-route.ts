// modify nav bar text and routings here
export const navBarItem = [
    {
        name: 'Our Solution',
        isShowed: false,
        subItems: [
            {
                title: 'Home Grown Solutions',
                items: [
                    { name: 'Acquisition of Resources and inventory system', link: '/our-solution/item1' },
                    { name: 'Watchlist screening and monitoring tool', link: '/our-solution/item2' },
                ]
            },
            {
                title: 'Partner Solutions',
                items: [
                    { name: 'Anti Money Laundering Software', link: '/our-solution/partner-item1' },
                    { name: 'Customer Relationship Management System', link: '/our-solution/partner-item2' },
                    { name: 'Digital Signing Software', link: '/our-solution/partner-item3' },
                    { name: 'Enterprise Content management system', link: '/our-solution/partner-item4' },
                    { name: 'Loans Origination and Management Collection system', link: '/our-solution/partner-item5' },
                    { name: 'Human Resources Information System', link: '/our-solution/partner-item6' }
                ]
            }
        ]
    },
    {
        name: 'Services',
        isShowed: false,
        subItems: [{
            title: '',
            items: [
                { name: 'Integration Services', link: '/services/item1' },
                { name: 'IT Consulting', link: '/services/item2' },
                { name: 'Scanning Services', link: '/services/item3' },
                { name: 'Staff Augmentation', link: '/services/item4' },
                { name: 'System Development', link: '/services/item5' },
            ]
        }]
    },
    {
        name: 'About Us',
        isShowed: false,
        subItems: [{
            title: '',
            items: [
                { name: 'About us', link: '/about-us/item1' },
                { name: 'Our Partners', link: '/about-us/item2' },
                { name: 'Our Clients', link: '/about-us/item3' },
            ]
        }]
    },
    { name: 'News & Insights', link: '/news-insights' },
    { name: 'Careers', link: '/careers' },
    { name: 'Contact Us', link: '/contact-us' }
];
