interface IAddress {
    street: string,
    city: string
}

enum userRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}

type TUser = { // al usar una type generalmente se pone al principio del nombre se coloca                 
    name: string, // una T mayuscula para saber que es de tipo Types
    age: number, 
    email:string, 
    active: boolean,
    address: IAddress,
    role: string // "admin", "user", "guest"
}

const user1: TUser = {
    name: "steven",
    age: 26,
    email: "steven@mail.com",
    active: true,
    address: {
        street: "timiza",
        city: "Bogota"
    },
    role: userRole.USER
}

console.log(user1);
