const mainmenu = {
    title: 'JiBuy',
    items: [
        { text: 'Home', url: '/' },
        { text: 'Orders', url: '/', items:[
                { text: 'Add Orders', url: '/' },
                { text: 'Check Status', url: '/' },
                { text: 'History', url: '/' },
                { type: 'separator' },
                { text: 'JiBuy!', url: '/' }
            ]  
        },
        { text: 'Payment', url: '/payment' },
        { text: 'About', url: '/' },
        { text: 'Logout', url: '/' }
    ]
};

export default mainmenu