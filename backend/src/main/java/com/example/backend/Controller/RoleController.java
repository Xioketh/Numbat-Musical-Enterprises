package com.example.backend.Controller;

import com.example.backend.Model.Role;
import com.example.backend.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping({"/createNewRole"})
    public Role createNewRole(@RequestBody Role role) {
        return roleService.createNewRole(role);
    }

}
