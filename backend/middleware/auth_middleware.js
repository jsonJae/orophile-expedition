import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({ message: "No token provided. Authorization denied"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        console.log("The decoded user is: ", req.user);
        console.log("req.body: ",req.body);
        next();
    }catch(error){
        res.status(400).json({ message: "Invalid token"});
    }

}

const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({ message: "Access denied. Admin only."});
    }
    next();
}

const isUser = (req, res, next) => {
    if(req.user.role !== 'user'){
        return res.status(403).json({ message: "Access denied. User only."})
    }
    next()
}

export { verifyToken, isAdmin, isUser };