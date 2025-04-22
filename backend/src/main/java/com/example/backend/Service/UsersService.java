package com.example.backend.Service;

import com.example.backend.Model.Role;
import com.example.backend.Model.Users;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UsersService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {

        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleRepository.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("Customer");
        userRole.setRoleDescription("Default role for newly created record");
        roleRepository.save(userRole);

        Users adminUser = new Users();
        adminUser.setUserName("admin");
        adminUser.setUserPassword(getEncodedPassword("admin"));
        adminUser.setUserId("U0001");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        usersRepository.save(adminUser);
//
//        Users user = new Users();
//        user.setUserName("user");
//        user.setUserPassword(getEncodedPassword("user"));
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        usersRepository.save(user);
    }

    public Users registerNewUser(Users user) {
        Role role = roleRepository.findById("Customer").get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        String currentId = usersRepository.lastID();
        String nextID="";

        if (currentId !=null){
            int nextNumericValue = Integer.parseInt(currentId.substring(1)) + 1;
            nextID = String.format("U%04d", nextNumericValue);
            user.setUserId(nextID);
        }

        return usersRepository.save(user);
    }


    public ResponseEntity<?> getByUserId(Users user) {
        System.out.println(user.getUserId());
        Optional<Users> u= usersRepository.findByUserId(user.getUserId());
        return ResponseEntity.ok(u.get());
    }

    public boolean isUserNameExists(String userName) {
        return usersRepository.checkIfUserNameExists(userName);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public ResponseEntity<?> getAllUsers() {
        List<Users> users=usersRepository.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
