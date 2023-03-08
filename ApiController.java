package com.example.demo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin
@RestController
public class ApiController {
	@Autowired
	ApiRepo serviceRepository;
	@Autowired
	ApiService service;
	@GetMapping("/get")
	List<Employee> getList(){
		return serviceRepository.findAll();
	}
	@PostMapping("/post")
	public Employee create (@RequestBody Employee d) {
		return serviceRepository.save( d);
	}
	@PutMapping("/update")
	public String update(@RequestBody Employee d) {
		return service.updateTodo(d);
	}
	@DeleteMapping("/delete")
	public String delete(@RequestParam int id) {
		return service.deleteTodo(id);
	}
}
