/**
 * Unit tests for the post router endpoints
 * @author Andrew Jarombek
 * @since 3/5/2018
 */

const request = require('supertest');
const app = require('../src/app');

// Tests for the default endpoint '/'
describe("GET '/api/post'", () => {
    it('responded with a 200', () => {
        return request(app).get('/api/post').expect(200);
    });

    // Make sure the JWT is properly configured and protects this endpoint
    it("should return unauthorized", () => {
        return request(app)
            .post('/api/post')
            .expect(401);
    });
});