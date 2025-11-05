const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BadRequestException = require('../exceptions/BadRequestException.js');
const NotFoundException = require('../exceptions/NotFoundException.js');
const ConflictException = require('../exceptions/ConflictException.js');
const userDao = require('../daos/userDao');
require('dotenv').config();

const validRoles = ['business_owner', 'user'];

class AuthService {
    
    async getUser(email){
        const user = await userDao.findUserByEmail(email);
        if (!user) throw new NotFoundException('User not found');

         const userDTO = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role || "user"
        };

        return userDTO
    }

    async generateAuthToken(email, inputPassword) {

        const user = await userDao.findUserByEmail(email);

        if (!user) throw new BadRequestException('Invalid Credentials');
                    
        const passwordMatches = bcrypt.compareSync(inputPassword, user.password);

        if (!passwordMatches) throw new BadRequestException('Invalid Credentials');

        const payload = { userId: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name };
        const secretKey = process.env.JWT_SECRET;
        const expiration = process.env.TOKE_EXPIRATION || '4h'; // Default to 30 seconds if not set
        console.log(`Token expiration: ${expiration}`);
        const authToken = jwt.sign(
           payload,
            secretKey,
            { expiresIn: expiration } 
        );

        return authToken;
    }

    async registerUser(data) {

        const { email, password, first_name, last_name, role } = data;

        if (!checkUserRoleIsvalid) {
            throw { message: `Role "${role}" is not valid. Must be one of the list: ${validRoles}` };
        }

        const userExist = await userDao.findUserByEmail(email);
        
        if (userExist)
            throw new ConflictException(`Already exist user with email: ${data.email}`);
    
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        const newUser = { 
            email: email, 
            password: hashedPassword ,
            first_name: first_name,
            last_name: last_name,
            role: role
        };

        return userDao.createUser(newUser);
    }
}

function checkUserRoleIsvalid(role) {
    return validRoles.includes(role)
}

module.exports = new AuthService();