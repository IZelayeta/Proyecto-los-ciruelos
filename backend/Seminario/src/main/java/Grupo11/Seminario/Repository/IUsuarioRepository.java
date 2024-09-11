package Grupo11.Seminario.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Grupo11.Seminario.Entities.Usuario;

@Repository
public interface IUsuarioRepository extends CrudRepository<Usuario,Integer>{

    // Funcion que nos devuelve si encontro o no a un Usuario con ese Email
    Optional<Usuario> findByEmail(String email);
}