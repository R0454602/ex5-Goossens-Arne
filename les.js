module.exports = {
    les: {},

    saveles: function(les) {
        this.les[les.id] = les;
    },
    Allles: function() {
        var rtnValue = [];
        for (var item in this.les) {
            rtnValue.push(this.les[item]);
        };
        return rtnValue;
    },
    findles: function(id) {
        return this.les[id];
    },

};