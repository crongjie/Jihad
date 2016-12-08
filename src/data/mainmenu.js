import Ri18n from '../Ri18n.js' 

const mainmenu = {
    title: 'JiBuy!',
    items: [
        { text: Ri18n.home, url: '/' },
        { text: Ri18n.account_setting, url: '/accountSettings' },
        { text: Ri18n.rongjie_buy, url: '/', items:[
                { text: Ri18n.add_order, url: '/addOrder' },
                { text: Ri18n.check_order, url: '/orderList' },
                { text: Ri18n.history, url: '/' }
            ]  
        },
        { text: Ri18n.benji_buy, url: '/', items:[
                { text: Ri18n.add_order, url: '/addOrder' },
                { text: Ri18n.check_order, url: '/orderList' },
                { text: Ri18n.history, url: '/' }
            ]  
        },
        { text: Ri18n.charge, url: '/payment' },
        { text: Ri18n.qr_confirm, url: '/' },
        { text: Ri18n.about, url: '/' },
        { text: Ri18n.login, url: '/' }
    ]
};

export default mainmenu