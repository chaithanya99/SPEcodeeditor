const User=require('../models/User')
const File=require('../models/File')
const {addfile}=require('../functions/addfileFunction')
const jwt=require('jsonwebtoken')
jest.mock('../models/User');
jest.mock('../models/File');
User.findOne=jest.fn();
File.save=jest.fn();
User.addFile=jest.fn();
const token = jwt.sign({
    name:"fake",
    email:"fake@mail.com"
},'secrettext')

const u1={
    email:"fake@mail.com",
    password:"12345",
    name:"fake",
    files:[{name:"file1"},{name:"file2"},{name:"file"}]
}

const request={
    body:{
        email:"fake@mail.com",
        password:"12345",
        name:"fake",
        filename:"file"
    },
    headers:{
        'x-access-token': token
    }
};
const request2={
    body:{
        email:"fake@mail.com",
        password:"12345",
        name:"fake",
        filename:"file5"
    },
    headers:{
        'x-access-token': token
    }
};

const response={
    json: jest.fn((x)=>x),
};

test('addfile test-1', async () => {
    jest.spyOn(User,'findOne').mockReturnValue(u1);
    await addfile(request,response);
    expect(response.json).toHaveBeenCalledWith({status:"error",error:"File already exists"});
})

test('addfile test-2', async () => {
    jest.spyOn(User,'findOne').mockReturnValue(u1);
    jest.spyOn(User,'addFile').mockReturnValue(null);
    jest.spyOn(File,'save').mockReturnValue(null);
    await addfile(request,response);
    expect(response.json).toHaveBeenCalled();
})