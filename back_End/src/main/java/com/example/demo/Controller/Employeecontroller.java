package com.example.demo.Controller;

import com.example.demo.Entity.Employee;
import com.example.demo.IO.Emplreq;
import com.example.demo.IO.Emplresp;
import com.example.demo.Repository.EmplRepo;
import com.example.demo.Service.EmpleServ;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class Employeecontroller {
    @Autowired
    EmpleServ serv;
    @GetMapping("/getempls")
    public List<Employee> getAll()
    {
        List<Employee> l=serv.getallempl();
        return l;
    }
  @PostMapping("/Addempl")
public Emplresp add(@RequestBody Emplreq request)
{
    try
    {
        Emplresp resp = serv.addempl(request, null);
        return resp;
    }
    catch(Exception e)
    {
        System.out.println("something went wrong " + e);
    }

    return null;
}
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        try {
            serv.delete(id);
            System.out.println("Delete ed  "+ id);
            return ResponseEntity.ok("Employee deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Delete failed");
        }
    }
    @GetMapping("/getempl/{id}")
    public Emplresp getsingleempl(@PathVariable("id") String id)
    {
       return serv.getone(id);
    }
    @PutMapping("/update/{id}")
public void update(@PathVariable("id") String id,
                   @RequestBody Emplreq request)
{
    try
    {
        serv.update(request, null, id);
    }
    catch(Exception e)
    {
        System.out.println("something went wrong " + e);
    }

    }}
