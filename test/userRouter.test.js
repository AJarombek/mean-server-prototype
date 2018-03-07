/**
 * Unit tests for the user router endpoints
 * @author Andrew Jarombek
 * @since 3/6/2018
 */

const request = require('supertest');
const app = require('../src/app');

// Tests for the user api endpoint '/api/user'
describe("GET '/api/user'", () => {

    /**
     * This test will be successful when run in TravisCI since it is based off mocked data used there.  It will not
     * (most likely) work in a development environment where the database has different user documents.
     */
    it('responded with correct JSON from database', () => {
        return request(app).get('/api/user')
            .expect(200, [
                {
                    _id: '5a9616e6c5631b2e8bd0bd5e',
                    username: "andy",
                    first: "Andrew",
                    last: "Jarombek",
                    password: "pw",
                    postCount: 4
                }]);
    });
});