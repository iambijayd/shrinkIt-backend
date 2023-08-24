
const request = require('supertest');
const app = require('../index');
const { User } = require('../models/users');


const signUpData = {
    email: "bijay123@gmail.com",
    password: "34521"
};

const wrongSignUpData = {
    email: "123",
    password: "123"
};


jest.mock('../models/users');


describe('Test /Signup Route',() => {

    beforeAll(() => {
        User.create.mockResolvedValue(signUpData);
    })

    test('should return signup successful', async () => {
        const response = await request(app).post("/signup").send(signUpData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('success');
        expect(User.create).toHaveBeenCalledWith(signUpData);
    });

    test('should return error 400 for invalid input', async () => {
        const response = await request(app).post("/signup").send(wrongSignUpData);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(User.create).not.toHaveBeenCalled();
    });
});

describe('Test /login Route', () => { 

 });