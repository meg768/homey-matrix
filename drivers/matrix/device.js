'use strict';

const { Device } = require('homey');

class MyDevice extends Device {
	async onInit() {
		this.debug = this.log;
        this.app = this.homey.app;
        this.mqtt = this.app.mqtt;
	}

	async publish(payload) {
		this.log(payload);
		await this.mqtt.publish(`${this.getSetting('mqtt').topic}`, JSON.stringify(payload), { retain: true });
	}

	async onUninit() {
		await this.homey.app.unregisterDevice(this);
	}

	async onSettings({ oldSettings, newSettings, changedKeys }) {
		this.log('MyDevice settings where changed');
	}
		


}

module.exports = MyDevice;
