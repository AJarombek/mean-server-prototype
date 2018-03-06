/**
 * Unit tests for the application
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const request = require('supertest');
const app = require('../src/app');

// Tests for the default endpoint '/'
describe("GET '/'", () => {
    it('responded with a 200', () => {
        return request(app).get('/').expect(200);
    });

    it("returned correct JSON", () => {
        return request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect('Content-Length', '36');
            // Helmet disables X-Powered-By.  This is more secure because attackers will not know that the application
            // is using Node.js and Express for the API
            //.expect('X-Powered-By', 'Express');
    });

    it("Uses Helmet", () => {
        return request(app)
            .get('/files')
            .expect('X-Content-Type-Options', 'nosniff') // Prevent browsers from trying to guess the MIME type
            .expect('X-DNS-Prefetch-Control', 'off') // Don't prefetch the URL from the DNS (this can
                                                     // cause users to appear to view websites they arent visiting
            .expect('X-Download-Options', 'noopen') // For old IE versions, disables IE from executing downloads on the site
            .expect('X-Frame-Options', 'SAMEORIGIN') // Prevent users putting this page in an iframe
            .expect('X-XSS-Protection', '1; mode=block') // Protects from Cross-site Scripting
    });
});