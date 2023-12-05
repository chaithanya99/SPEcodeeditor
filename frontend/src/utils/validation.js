export const validation=(email,password)=>{
    const isEmailValid=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isEmailValid){
        return "Email ID is not valid";
    }
    if(!isPasswordValid){
        return "Password length should be greater than 7, should contain special character, number";
    }
    return null;

}