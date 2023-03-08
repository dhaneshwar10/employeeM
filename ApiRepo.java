package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiRepo extends JpaRepository<Employee,Integer>{

}
