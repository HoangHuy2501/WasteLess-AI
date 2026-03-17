
const AuthServices = require('../services/AuthServices');
exports.login = async (req, res) => {
    try {
        const user = await AuthServices.login();
        console.log("data:",user);
        
        return user
    } catch (error) {
        console.log(error);
        
    }
}