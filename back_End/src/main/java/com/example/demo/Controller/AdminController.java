package com.example.demo.Controller;

import com.example.demo.IO.Adminreq;
import com.example.demo.IO.Adminresp;
import com.example.demo.Service.userdetailsserv;
import com.example.demo.filters.jwtutil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/access")
@RequiredArgsConstructor
public class AdminController {
    @Autowired
    userdetailsserv serv;
    @Autowired
    jwtutil jwt;
    @Autowired
    AuthenticationManager mang;
    @Autowired
    PasswordEncoder pass;
    @PostMapping("/login")
    public Adminresp get(@RequestBody Adminreq authreq)
    {
        authenticate(authreq.getEmail(),authreq.getPassword());
        UserDetails u=serv.loadUserByUsername(authreq.getEmail());
        String token=jwt.generateToken(u);
        return  Adminresp.builder().email(authreq.getEmail()).token(token).password("can't expose ").build();
    }

    private void authenticate(String email, String password) {
        try{
            mang.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }
        catch(Exception e)
        {
            throw new RuntimeException("Error occured    "+e);
        }
    }

    @PostMapping("/encode")
    public String encode(@RequestBody Map<String,String> m)
    {
        return pass.encode(m.get("password"));
    }
}
