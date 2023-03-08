package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ApiService {
	@Autowired
	ApiRepo repository;

	public String updateTodo(Employee d) {
		repository.save( d);
		return "updated";
	}
	public String deleteTodo(int id) {
		repository.deleteById( id);
		return "ID DELETED";
	}
}
