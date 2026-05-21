package com.example.demo.Controller;

import com.example.demo.Entity.Employee;
import com.example.demo.IO.Emplreq;
import com.example.demo.IO.Emplresp;
import com.example.demo.Service.EmpleServ;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/employee")
public class Employeecontroller {

    @Autowired
    EmpleServ serv;

    @GetMapping("/getempls")
    public List<Employee> getAll()
    {
        return serv.getallempl();
    }

    @PostMapping("/addempl")
    public ResponseEntity<?> addempl(
            @ModelAttribute Emplreq req,
            @RequestParam(value = "fi", required = false) MultipartFile fi
    ) throws Exception {

        serv.addempl(req, fi);

        return ResponseEntity.ok("Employee Added Successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id)
    {
        try
        {
            serv.delete(id);
            return ResponseEntity.ok("Employee deleted successfully");
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Delete failed");
        }
    }

    @GetMapping("/getempl/{id}")
    public Emplresp getsingleempl(@PathVariable("id") String id)
    {
        return serv.getone(id);
    }

    @PutMapping("/update/{id}")
public ResponseEntity<?> update(
        @PathVariable("id") String id,
        @ModelAttribute Emplreq request,
        @RequestParam(value = "fi", required = false) MultipartFile fi)
{
    try
    {
        serv.update(request, fi, id);

        return ResponseEntity.ok("Employee Updated");
    }
    catch(Exception e)
    {
        System.out.println(e);

        return ResponseEntity.badRequest().body("Update Failed");
    }
}
}