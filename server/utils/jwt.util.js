const accessTokenRefresh = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == "") return res.status(400).json({ message: "refreshToken field is required" });

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decode) => {
            if (error) return res.status(400).json({ message: "Invalid Refresh Token" });
            const user = {
                user_id: decode.id,
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({ message: "Access Token Refreshed", tokens: { access: accessToken } });
        });
    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    accessTokenRefresh
}
