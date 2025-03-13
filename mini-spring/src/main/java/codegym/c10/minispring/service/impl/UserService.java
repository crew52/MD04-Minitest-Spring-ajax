package codegym.c10.minispring.service.impl;


import codegym.c10.minispring.configuration.dto.UserPrinciple;
import codegym.c10.minispring.model.User;
import codegym.c10.minispring.repository.UserRepo;
import codegym.c10.minispring.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService, UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<User> findAll() {
        return List.of();
        // TODO
    }

    @Override
    public void remove(Long id) {
        //TODO
    }

    @Override
    public User save(User user) {
        return null;
        // TODO
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.empty();
        // TODO
    }

    @Override
    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        return UserPrinciple.build(user);
    }
}
