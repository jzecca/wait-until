const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));

const waitUntil = require('./index');

describe('waitUntil', () => {
    let startTime;

    const elapsedTime = () => Date.now() - startTime;

    beforeEach(() => startTime = Date.now());

    describe('Basic function', () => {
        it('should resolve with function result', async () => {
            const fn = () => {
                return (elapsedTime() > 200)
                    ? 2
                    : false;
            };

            expect(await waitUntil(fn)).to.equal(2);
        });

        it('should timeout if function never returns a truthy value', async () => {
            const fn = () => {
                return (elapsedTime() > 400)
                    ? 2
                    : false;
            };

            await expect(waitUntil(fn, 200)).to.be.rejectedWith(Error);
        });

        it('should reject if function throws', async () => {
            const fn = () => {
                if (elapsedTime() > 200) {
                    throw 'Boom';
                }

                return false;
            };

            await expect(waitUntil(fn)).to.be.rejectedWith('Boom');
        })
    });

    describe('Function returning a Promise', () => {
        it('should resolve with Promise result', async () => {
            const fn = () => new Promise(resolve => {
                return (elapsedTime() > 200)
                    ? resolve(2)
                    : resolve(false);
            });

            expect(await waitUntil(fn)).to.equal(2);
        });

        it('should timeout if Promise never resolves a truthy value', async () => {
            const fn = () => new Promise(resolve => {
                return (elapsedTime() > 400)
                    ? resolve(2)
                    : resolve(false);
            });

            await expect(waitUntil(fn, 200)).to.be.rejectedWith(Error);
        });

        it('should reject if Promise rejects', async () => {
            const fn = () => new Promise((resolve, reject) => {
                return (elapsedTime() > 200)
                    ? reject('Boom')
                    : resolve(false);
            });

            await expect(waitUntil(fn)).to.be.rejectedWith('Boom');
        });
    });
});
