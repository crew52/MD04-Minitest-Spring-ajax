package codegym.c10.minispring.controller;

import codegym.c10.minispring.dto.ITypeDTO;
import codegym.c10.minispring.model.Computer;
import codegym.c10.minispring.model.Type;
import codegym.c10.minispring.service.IComputerService;
import codegym.c10.minispring.service.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("/api/types")
@CrossOrigin("*")
public class TypeController {
    @Autowired
    private ITypeService typeService;
    @Autowired
    private IComputerService computerService;

    @GetMapping
    public ResponseEntity<Iterable<Type>> findAllType() {
        List<Type> types = (List<Type>) typeService.findAll();
        if (types.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(types, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Type> findTypeById(@PathVariable Long id) {
        Optional<Type> typeOptional = typeService.findById(id);
        if (!typeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(typeOptional.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Type> saveType(@RequestBody Type type) {
        Type type1 = typeService.save(type);
        return type1 != null
                ? ResponseEntity.status(HttpStatus.CREATED).body(type1)
                : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Type> updateType(@PathVariable Long id, @RequestBody Type type) {
        Optional<Type> typeOptional = typeService.findById(id);
        if (!typeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        type.setId(typeOptional.get().getId());
        return new ResponseEntity<>(typeService.save(type), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Type> deleteType(@PathVariable Long id) {
        Optional<Type> typeOptional = typeService.findById(id);
        if (!typeOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        typeService.remove(id);
        return new ResponseEntity<>(typeOptional.get(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Iterable<ITypeDTO>> countType() {
        Iterable<ITypeDTO> typeDTOS = typeService.getAllTypes();
        if (!typeDTOS.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(typeDTOS, HttpStatus.OK);
    }


    @GetMapping("/view-type/{id}")
    public ResponseEntity<?> viewType(@PathVariable("id") Long id) {
        Optional<Type> typeOptional = typeService.findById(id);

        if (!typeOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Type with ID " + id + " not found");
        }

        Iterable<Computer> computers = computerService.findAllByType(typeOptional.get());

        return ResponseEntity.ok(computers);
    }

}
