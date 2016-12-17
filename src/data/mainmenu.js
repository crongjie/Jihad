import Ri18n from '../Ri18n.js' 

const mainmenu = {
    title: 'JiBuy!',
    items: [
        { text: Ri18n.home, allowAccessWithoutLogin: true, url: '/' },
        { text: Ri18n.account_setting, url: '/accountSettings' },
        { text: Ri18n.rongjie_buy, url: '/', items:[
                { text: Ri18n.add_order, url: '/addOrder' },
                { text: Ri18n.check_order, url: '/orderList' },
                { text: Ri18n.history, url: '/purchaseList' }
            ]  
        },
         /*{ text: Ri18n.benji_buy, url: '/', items:[
           
                { text: Ri18n.add_order, url: '/BJaddOrder' },
                { text: Ri18n.check_order, url: '/BJorderList' },
                { text: Ri18n.history, url: '/BJ' }
                { text: Ri18n.notImplemented, url: '/NI' }
            ]  
        },*/
        { text: Ri18n.charge, url: '/payment' },
        //{ text: Ri18n.qr_confirm, url: '/NI' },
        { text: Ri18n.about, allowAccessWithoutLogin: true, url: '/', items:[
                { text: Ri18n.about_charge_fee, url: '/payment' },
                { text: Ri18n.about_shippment_charge, url: '/aboutShipment' },
                { text: Ri18n.about_jibuy, url: '/aboutJibuy' },
                { text: Ri18n.about_rongjie_buy, url: '/aboutRongjiebuy' },
                { text: Ri18n.about_benji_buy, url: '/aboutBenjibuy' }
            ]  
        },
    ]
};

export default mainmenu