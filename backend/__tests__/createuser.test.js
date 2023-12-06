const {createuser} = require('../functions/createuserFunction')
const User=require('../models/User')
const jwt=require('jsonwebtoken')
jest.mock('../models/User');
User.findOne=jest.fn();
User.save=jest.fn();
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



test('createuser test-1', async () => {
    User.findOne.mockImplementationOnce(()=>({
        email:"fake@mail.com",
        password:"12345",
        name:"fake",
        files:[]
    }));
    await createuser(request,response);
    expect(response.json).toHaveBeenCalledWith({status: 'error',error:'user already exists'});
})

test('createuser test-2', async () => {
    jest.spyOn(User,'findOne').mockReturnValue(null);
    jest.spyOn(User,'save').mockReturnValue(null);
    await createuser(request,response);
    expect(response.json).toHaveBeenCalledWith({status: 'ok'});
})