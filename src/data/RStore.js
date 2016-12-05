
let order_items = [];
let item_id = 0;



let RStore = {
    getOrders: function() {
        return order_items;
    },
    addOrder: function(item) {
        order_items.push(item);
    }
};

export default RStore