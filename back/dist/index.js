"use strict";
var userRole;
(function (userRole) {
    userRole["ADMIN"] = "admin";
    userRole["USER"] = "user";
    userRole["GUEST"] = "guest";
})(userRole || (userRole = {}));
const user1 = {
    name: "steven",
    age: 26,
    email: "steven@mail.com",
    active: true,
    address: {
        street: "timiza",
        city: "Bogota"
    },
    role: userRole.USER
};
console.log(user1);
