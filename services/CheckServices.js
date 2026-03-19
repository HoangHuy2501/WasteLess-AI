const AuthRepository = require("../repository/AuthRepository");
const ApiError = require("../utils/ApiError");
const ErrorMessageBase = require("../utils/ErrorMessageBase");
const bcrypt = require('bcryptjs'); 
class CheckServices {
    async checkMailExit(email) {
        try {
            // check email tồn tại
            const check = await AuthRepository.SelectMail(email);
            if(check){
                throw ApiError.ValidationError(ErrorMessageBase.format(ErrorMessageBase.EXIST, { PropertyName: "email" }));
            }
            return true
        } catch (error) {
            throw error;
        }
    }
    // check pass and mail
    async checkMailPass(email, password) {
        try {
            const user =  await AuthRepository.SelectMail(email);
            const check = await this.checkHash(password, user.password);
            if(!user || !check){
                throw ApiError.Unauthorized("Invalid email or password");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
    async hashPassword (password) {
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            throw error;
        }
    }
    async checkHash(password, hash) {
        try {
            const isMatch = await bcrypt.compare(password, hash);
            if(isMatch){
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }
    // check user có tồn tại và đang hoạt động hay không
    async checkUserActive(id) {
        try {
            const user = await AuthRepository.checkUserActive(id);
            if(!user){
                throw ApiError.Unauthorized("User is not active");
            }
            return user
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new CheckServices();