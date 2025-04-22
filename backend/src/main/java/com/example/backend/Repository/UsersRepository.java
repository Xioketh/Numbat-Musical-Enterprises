package com.example.backend.Repository;

import com.example.backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users,Long> {

    @Query(value = "SELECT EXISTS(SELECT 1 FROM users WHERE user_name = ?1) AS user_exists", nativeQuery = true)
    public boolean checkIfUserNameExists(String userName);

    @Query(value = "SELECT * FROM users WHERE user_name = ?1", nativeQuery = true)
    Optional<Users> getAllById(String userName);

    @Query(value = "SELECT user_id FROM users WHERE user_id = (SELECT MAX(user_id) FROM users);", nativeQuery = true)
    String lastID();

    @Query(value = "SELECT * FROM users", nativeQuery = true)
    List<Users> getAll();

    @Query(value = "  SELECT * FROM users WHERE user_id != 'U0001';", nativeQuery = true)
    List<Users> getAllUsers();

    @Query(value = "SELECT * FROM users WHERE user_id = ?1", nativeQuery = true)
    Optional<Users> findByUserId(String userId);

    @Modifying
    @Query(value = "UPDATE  users SET user_grade =?1,discount_rate=?2,update_date = now() WHERE user_id = ?3", nativeQuery = true)
    int updateGrade(String user_grade, int discount_rate, String userId);
}
