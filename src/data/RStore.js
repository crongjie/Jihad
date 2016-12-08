
let order_items = [];
let item_id = 0;
let user_info = {
    id: 0,
    name: 'Ben杯拾祺牛TaRoy',
    email: 'jibuy@jiMail.com',
    address: '竇',
    desc: 'Life is like a LGTM!',
    point: 1000
};

let loggedIn = false;
let googleUserInfo = {};


let RStore = {
    setGoogleUserInfo : function(userInfo) {
        googleUserInfo = userInfo;
    },
    getGoogleUserInfo : function() {
        return googleUserInfo;
    },
    setLoggedIn : function(isLoggedIn) {
        loggedIn = isLoggedIn;
    },
    getLoggedIn : function() {
        console.log('getLoggedIn' + loggedIn);
        return loggedIn;
    },
    getOrders: function() {
        return order_items;
    },
    addOrder: function(item) {
        ++item_id;
        item.id = item_id;
        order_items.push(item);
    },
    getUserInfo: function() {
        return user_info;
    },
    setUserInfo: function(uinfo){
        user_info = uinfo;
    }
};

export default RStore