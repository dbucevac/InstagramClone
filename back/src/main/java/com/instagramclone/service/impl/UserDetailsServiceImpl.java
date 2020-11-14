package com.instagramclone.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.instagramclone.model.User;
import com.instagramclone.service.UserService;

@Service
@Primary
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	  private UserService userService;

	  @Override
	  @Transactional
	  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    User user = userService.byUsername(username).orElse(null);

	    if (user == null) {
	      throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
	    } else {
	        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

	        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole().toString()));

	        return new org.springframework.security.core.userdetails.User(
	                user.getUsername().trim(),
	                user.getPassword().trim(),
	                grantedAuthorities);
	    }
	  }

}
