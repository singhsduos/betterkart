const sendToken = (user, statusCode, res, msg) => {

    const jwtToken = user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        
    httpOnly: true,
        
    }

    res.status(statusCode).cookie("token", jwtToken, options).json({
        success: true,
        message: msg,
        user,
        jwtToken
    });

}

module.exports = sendToken;