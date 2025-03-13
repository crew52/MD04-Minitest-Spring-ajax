package codegym.c10.minispring.service.impl;

import codegym.c10.minispring.model.Role;
import codegym.c10.minispring.repository.IRoleRepo;
import codegym.c10.minispring.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepo roleRepo;

    @Override
    public List<Role> findAll() {
        return roleRepo.findAll();
    }


    @Override
    public void remove(Long id) {
        // TODO
    }

    @Override
    public Role save(Role role) {
        return null;
        // TODO
    }

    @Override
    public Optional<Role> findById(Long id) {
        return Optional.empty();
        // TODO
    }

}
