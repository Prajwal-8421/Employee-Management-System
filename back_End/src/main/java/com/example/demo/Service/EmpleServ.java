package com.example.demo.Service;

import com.example.demo.Entity.Employee;
import com.example.demo.IO.Emplreq;
import com.example.demo.IO.Emplresp;
import com.example.demo.Repository.EmplRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class EmpleServ {
    @Autowired
    EmplRepo repo;
    public List<Employee> getallempl()
    {
        List<Employee> g=repo.findAll();
        return g;
    }
 public Emplresp addempl(Emplreq req, MultipartFile fi) throws Exception
{
    Employee Enti = converttoEnt(req);

    Enti.setImgUrl("no-image");

    Enti.setEid(UUID.randomUUID().toString());

    Employee e = repo.save(Enti);

    return converttoresp(e);
}
    public Emplresp converttoresp(Employee e)
    {
        return Emplresp.builder()
                .eid(e.getEid())
                .name(e.getName())
                .address(e.getAddress())
                .phoneno(e.getPhoneNumber())
                .email(e.getEmail())
                .imgurl(e.getImgUrl())
                .crAt(e.getCreatedAt())
                .upAt(e.getUpdatedAt())
                .role(e.getRole())
                .build();
    }
    public Employee converttoEnt(Emplreq req)
    {
        return Employee.builder()
                .name(req.getName())
                .address(req.getAddress())
                .email(req.getEmail())
                .role(req.getRole())
                .phoneNumber(req.getPhone())
                .build();
    }

    public Emplresp getone(String id)
    {
        Employee empl=repo.findByEid(id).orElseThrow(()->new RuntimeException("the Employee is not found"));
        return converttoresp(empl);
    }
    @Transactional
    public void delete(String id)
    {
        try{
            repo.deleteByEid(id);
        }
        catch(Exception e)
        {
            System.out.println("cant find the Employee "+e);
        }
    }
    public void update(Emplreq req, MultipartFile fi, String id) throws Exception
{
    Employee en = repo.findByEid(id)
            .orElseThrow(() -> new UsernameNotFoundException("couldn't able to find the employee"));

    en.setAddress(req.getAddress());
    en.setEmail(req.getEmail());
    en.setPhoneNumber(req.getPhone());
    en.setRole(req.getRole());
    en.setName(req.getName());

    repo.save(en);
}
}
