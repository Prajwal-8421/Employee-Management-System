package com.example.demo.Repository;

import com.example.demo.Entity.Admin;
import com.example.demo.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends JpaRepository<Admin,Integer> {
    Optional<Admin> findByEmail(String name);
}
