package com.example.backend.Controller;

import com.example.backend.Model.Users;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.util.Optional;

@RestController
//@RequestMapping("/api/v1")
@CrossOrigin
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UsersService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }


    @GetMapping("/Users/{userName}")
    public Optional<Users> getDataByEmail(@PathVariable("userName") String uname){

        Optional<Users> users= usersRepository.findById(Long.valueOf(uname));
        return users;
    }

    @PostMapping(value = "/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping({"/userName}/exists"})
    public boolean checkIfUserNameExists(@PathVariable String userName) {
        return userService.isUserNameExists(userName);
    }


    @PostMapping({"/registerNewUser"})
    public Users registerNewUser(@RequestBody Users user) {

        return userService.registerNewUser(user);
    }

    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }


    @PutMapping({"/updatePassword/{id}"})
    public ResponseEntity<Users> updateSupplier(@PathVariable String id, @RequestBody Users usersData){


        Users users = usersRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No suppliers are exist" + id));

        users.setUserPassword(getEncodedPassword(usersData.getUserPassword()));


        Users updatedUser = usersRepository.save(users);
        return ResponseEntity.ok(updatedUser );
    }
    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

}