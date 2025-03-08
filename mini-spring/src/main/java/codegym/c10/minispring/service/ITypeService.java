package codegym.c10.minispring.service;

import codegym.c10.minispring.dto.ITypeDTO;
import codegym.c10.minispring.model.Type;

public interface ITypeService extends IGenerateService<Type>{
    Iterable<ITypeDTO> getAllTypes();
}
