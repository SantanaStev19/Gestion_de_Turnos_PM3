import { Repository } from "typeorm";
import { Credential } from "../entities/credentialEntity";
import { AppDataSource } from "../config/data-source";

export const credentialRepository: Repository<Credential> = AppDataSource.getRepository(Credential)