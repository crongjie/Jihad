
let order_items = [];
let item_id = 0;
let user_info = {
    id: 0,
    name: 'Ben杯拾祺牛TaRoy',
    email: 'jibuy@jiMail.com',
    address: '竇',
    desc: 'Life is like a LGTM!',
    point: 1000,
    point_available: 500
};

let loggedIn = false;
let googleUserInfo = { displayName:'', email: '' };

let useFirebase = true;


let RStoreFireBase = {
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
        return loggedIn;
    },
    deleteOrder: function(orderId) {
        if (firebase.auth().currentUser && firebase.auth().currentUser.uid) {
            let userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/orderData/' + userId + '/' + orderId).remove();
        }
    },
    getOrders: function() {
        if (firebase.auth().currentUser && firebase.auth().currentUser.uid) {
            let userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/orderData/' + userId).once('value').then(function(snapshot) {
                //console.log(snapshot.val());
                if (snapshot.val())  {
                    return snapshot.val();
                }
                else{
                    return {}
                }
            });
        }else{
            return {}
        }
    },
    addOrder: function(item) {
        if (firebase.auth().currentUser && firebase.auth().currentUser.uid) {
            var newPostKey = firebase.database().ref().child('/orderData/' + userId).push().key;

            item.id = newPostKey;
            item.status = 0;
            item.ordered_at = _.now();
            item.updated_at = _.now();
            //order_items.push(item);

            let userId = firebase.auth().currentUser.uid;
            let updates = {};
            updates['/orderData/' + userId + '/' + newPostKey] = item;
            return firebase.database().ref().update(updates);
        }else{
            toastr.error('Error getting login information, please login again!'); 
        }
    },
    getUserInfo: function() {
        if (firebase.auth().currentUser && firebase.auth().currentUser.uid) {
            let userId = firebase.auth().currentUser.uid;
            return firebase.database().ref('/userData/' + userId).once('value').then(function(snapshot) {
                //console.log(snapshot.val());
                if (snapshot.val() && snapshot.val().email)  return snapshot.val();
                else{
                    return {
                        uid: userId,
                        name: googleUserInfo.displayName,
                        email: googleUserInfo.email,
                        address: '',
                        desc: '',
                        point_available: 0,
                        point: 0
                    }
                }
            });
        }else{
            return {
                        uid: '',
                        name: '',
                        email: '',
                        address: '',
                        desc: '',
                        point_available: 0,
                        point: 0
            }
        }

    },
    setUserInfo: function(uinfo){
        var userId = firebase.auth().currentUser.uid;
        var updates = {};
        updates['/userData/' + userId] = uinfo;
        return firebase.database().ref().update(updates);
    }
};

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
        //console.log('getLoggedIn' + loggedIn);
        return loggedIn;
    },
    getOrders: function() {
        return order_items;
    },
    addOrder: function(item) {
        ++item_id;
        item.id = item_id;
        item.status = 0;
        item.ordered_at = _.now();
        item.updated_at = _.now();
        order_items.push(item);
    },
    getUserInfo: function() {
        return user_info;
    },
    setUserInfo: function(uinfo){
        user_info = uinfo;
    }
};

export default (useFirebase)? RStoreFireBase : RStore