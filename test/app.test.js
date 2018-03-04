/**
 * Unit tests for the application
 * @author Andrew Jarombek
 * @since 2/25/2018
 */

const request = require('supertest');
const assert = require('assert');
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
});