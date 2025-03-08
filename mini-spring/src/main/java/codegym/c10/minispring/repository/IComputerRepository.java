package codegym.c10.minispring.repository;


import codegym.c10.minispring.model.Computer;
import codegym.c10.minispring.model.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface IComputerRepository extends CrudRepository<Computer, Long> {
    Iterable<Computer> findAllByType(Type type);
    Page<Computer> findAll(Pageable pageable);
    Page<Computer> findAllByNameContaining(Pageable pageable, String name);
}

