'use strict';

const { Driver } = require('homey');

class MyDriver extends Driver {

  /**
   * onInit is called when the driver is initialized.
   */
    async onInit() {
        this.log('MyDriver has been initialized');
        
        this.addAction('text', async ({device, message}) => {

            let payload = {};
            payload.animation = 'text';
            payload.text = message;
            payload.textColor = 'red';

            await device.publish(payload);
        });

        this.addAction('text-with-color', async ({ device, message, color }) => {

            let payload = {};
            payload.animation = 'text';
            payload.text = message;
            payload.textColor = color;

            await device.publish(payload);
        });

        this.addAction('random-gif', async ({ device, duration }) => {

            let payload = {};
            payload.animation = 'gif';
            payload.duration = duration * 1000

            await device.publish(payload);
        });
        
    }

    async addAction(name, fn) {
        let action = this.homey.flow.getActionCard(name);
        action.registerRunListener(fn);
    }

  /**
   * onPairListDevices is called when a user is adding a device
   * and the 'list_devices' view is called.
   * This should return an array with the data of devices that are available for pairing.
   */
  async onPairListDevices() {
    return [
        {
            name: 'Matrix 32x32',
            data: {
                id: 'matrix-32x32',
            },
            settings: {
                mqtt: {
                    topic:'matrix/32x32'
                }
            }
        },
        {
            name: 'Matrix 64x32',
            data: {
                id: 'matrix-64x32',
            },
            settings: {
                mqtt: {
                    topic:'matrix/64x32'
                }
            }
        },
        {
            name: 'Matrix 64x64',
            data: {
                id: 'matrix-64x64',
            },
            settings: {
                mqtt: {
                    topic: 'matrix/64x64'
                }
            }
        },
        {
            name: 'Matrix 96x96',
            data: {
                id: 'matrix-96x96',
            },
            settings: {
                mqtt: {
                    topic: 'matrix/96x96'
                }
            }
        }

    ];
  }

}

module.exports = MyDriver;
