package com.example.backend.Repository;

import com.example.backend.Model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository  extends CrudRepository<Role,String> {
}
