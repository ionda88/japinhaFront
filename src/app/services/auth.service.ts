import {Injectable} from "@angular/core";
import {Usuario} from "../../entities/usuario";

@Injectable()
export class AuthService {
  usuario: Usuario = new Usuario();
  isLoggedIn = false;
}
