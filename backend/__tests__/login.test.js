const {login} = require('../functions/loginFunction');
const User=require('../models/User')

jest.mock('../models/User');
User.findOne=jest.fn();

const request={
    body:{
        email:"fake@mail.com",
        password:"12345",
        name:"fake"
    },
};

const response={
    json: jest.fn((x)=>x),
};

test('login test-1', async () => {
    jest.spyOn(User,'findOne').mockReturnValue(null);
    await login(request,response);
    expect(response.json).toHaveBeenCalledWith({status: 'error',error:"wrong username or password"});
})

test('login test-2', async () => {
    jest.spyOn(User,'findOne').mockReturnValue({
        password:"123",
    });
    await login(request,response);
    expect(response.json).toHaveBeenCalledWith({status: 'error',error:"wrong username or password"});
})

test('login test-3', async () => {
    jest.spyOn(User,'findOne').mockReturnValue({
        password:"12345",
    });
    await login(request,response);
    expect(response.json).toHaveBeenCalled();
})