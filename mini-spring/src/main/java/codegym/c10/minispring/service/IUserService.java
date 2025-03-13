package codegym.c10.minispring.service;

import codegym.c10.minispring.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface IUserService extends IGenerateService<User> {
    UserDetails loadUserByUsername(String username);
    User findByUsername(String username);
}
