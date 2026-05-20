package com.example.demo.Repository;

import com.example.demo.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmplRepo extends JpaRepository<Employee,Integer> {
    Optional<Employee> findByEid(String id);
    void deleteByEid(String id);

}
