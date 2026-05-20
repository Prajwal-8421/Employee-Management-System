package com.example.demo.IO;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Emplresp {
    String eid;
    String name;
    String address;

    public String getPhoneno() {
        return phoneno;
    }

    public void setPhoneno(String phoneno) {
        this.phoneno = phoneno;
    }

    String email;
    String phoneno;
    String imgurl;
    Timestamp crAt;
    Timestamp upAt;
    String role;

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImgurl() {
        return imgurl;
    }

    public void setImgurl(String imgurl) {
        this.imgurl = imgurl;
    }

    public Timestamp getCrAt() {
        return crAt;
    }

    public void setCrAt(Timestamp crAt) {
        this.crAt = crAt;
    }

    public Timestamp getUpAt() {
        return upAt;
    }

    public void setUpAt(Timestamp upAt) {
        this.upAt = upAt;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
