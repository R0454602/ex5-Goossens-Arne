module.exports = {
    devices: {},

    saveDevice: function(device) {
        this.devices[device.id] = device;
    },
    AllDevices: function() {
        var rtnValue = [];
        for (var item in this.devices) {
            rtnValue.push(this.devices[item]);
        };
        return rtnValue;
    },
    findDevice: function(id) {
        return this.devices[id];
    },

};