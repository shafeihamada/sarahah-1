import jwt from "jsonwebtoken";
import configService from "../../config/config.service.js";
import { RoleEnum, tokenTypeEnum } from "../enum/index.js";

const getSecretsByRole = (role = RoleEnum.user) => {
    if (role === RoleEnum.admin) {
        return {
            accessSecret: configService.JWT_ACCESS_ADMIN_SECRET,
            refreshSecret: configService.JWT_REFRESH_ADMIN_SECRET
        };
    }
    return {
        accessSecret: configService.JWT_ACCESS_USER_SECRET,
        refreshSecret: configService.JWT_REFRESH_USER_SECRET
    };
};

export const createTokens = ({ payload = {}, options = {}, secret = configService.JWT_ACCESS_USER_SECRET }) => {
    return jwt.sign(payload, secret, {
        expiresIn: configService.JWT_ACCESS_EXP,
        ...options
    });
};

export const createLoginTokens = ({ payload = {}, options = {}, role = RoleEnum.user }) => {
    const { accessSecret, refreshSecret } = getSecretsByRole(role);
    const fullpayload ={...payload,role}

    const accessToken = createTokens({
        payload:fullpayload,
        options: { expiresIn: configService.JWT_ACCESS_EXP, ...options },
        secret: accessSecret
    });

    const refreshToken = createTokens({
        payload:fullpayload,
        options: { expiresIn: configService.JWT_REFRESH_EXP, ...options },
        secret: refreshSecret
    });

    return { accessToken, refreshToken };
};

export const verifyToken = ({ token, tokenType = tokenTypeEnum.ACCESS }) => {
    const decodedpayload=jwt.decode(token)
    const role= decodedpayload?.role??RoleEnum.user
    const { accessSecret, refreshSecret } = getSecretsByRole(role);
    const secret = tokenType === tokenTypeEnum.ACCESS ? accessSecret : refreshSecret;
 
    return jwt.verify(token, secret);
};