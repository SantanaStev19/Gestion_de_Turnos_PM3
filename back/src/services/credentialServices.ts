
import { EntityManager } from "typeorm"
import { Credential } from "../entities/credentialEntity"
import { credentialRepository } from "../Repositories/credentialRespository"
import { CustomError } from "../utils/customError"


const crypPass = async (pass: string): Promise<string> => {

    const encoder = new TextEncoder()
    const data = encoder.encode(pass)
    const hash = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hash))
    const hasHex = hashArray.map( b => b.toString(16).padStart(2,"0")).join("")
    return hasHex
}

const checkUserExist = async (username: string): Promise<void> => {
    const credentialFound: Credential | null = await credentialRepository.findOne({ where: { username }})
    if(credentialFound) throw new Error(`El usuario con username: ${username} ya existe, intente con un nuevo username`)
}



export const getCredentialService = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {

    await checkUserExist(username)
    const passwordEncrypted = await crypPass(password)
    const objetoCredencials: Credential = entityManager.create( Credential, {
        username,
        password: passwordEncrypted
    }) 

    return await entityManager.save(objetoCredencials)

}

export const checkUserCredentials = async (username: string, password: string): Promise<number | undefined> => {

    const credentialFound: Credential | null = await credentialRepository.findOne({ where: { username }})

    if(!credentialFound) throw new CustomError(400,`Usuario ${username} no esta registrado`)
    else{
        const passwordEncrypt = await crypPass(password)
        if(credentialFound?.password != passwordEncrypt) throw new CustomError(400, `Usuario o Contraseña incorrectos`)
        else return credentialFound.id
        
    }
    
    
}


