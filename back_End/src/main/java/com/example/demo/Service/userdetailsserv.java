package com.example.demo.Service;

import com.example.demo.Entity.Admin;
import com.example.demo.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class userdetailsserv implements UserDetailsService {
    @Autowired
    AdminRepo repo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin e=repo.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("Cant locate the user"));
        return new User(e.getEmail(),e.getPassword(), Collections.emptyList());
    }
}
