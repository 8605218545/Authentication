
// // we create this isLoggedIn middlwere for Authentication ( for checking user login or not, if not then we redirect the login page and when login then we use all function on our webpage )
// module.exports.isLoggedIn = (req, res, next) => {
//     // console.log(req.user);                             // check the user id password and store it .
//     // console.log(req.path, ".." originalUrl)            // check the path and its orignal url befor the user for login .
//     if(!req.isAuthenticated()) {                         // req.isAuthenticated() method check krti h ki user login h ya nhi 
//         return res.redirect("/login")
//     }
//     next();
// }