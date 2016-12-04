const mainmenu = {
    title: 'JiBuy',
    items: [
        { text: 'Home', url: '/' },
        { text: 'Orders', url: '/', items:[
                { text: 'Add Orders', url: '/order' },
                { text: 'Check Status', url: '/' },
                { text: 'History', url: '/' },
                { type: 'separator' },
                { text: 'JiBuy!', url: '/' }
            ]  
        },
        { text: 'Payment', url: '/payment' },
        { text: 'QR Code 確認收貨', url: '/' },
        { text: 'About', url: '/' },
        { text: 'Logout', url: '/' }
    ]
};

export default mainmenu