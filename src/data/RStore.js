
let order_items = [];
let item_id = 0;
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
        order_items.push(item);
    }
};

export default RStore