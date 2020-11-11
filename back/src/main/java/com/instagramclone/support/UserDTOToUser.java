package com.instagramclone.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.UserDTO;
import com.instagramclone.model.User;
import com.instagramclone.service.UserService;

@Component
public class UserDTOToUser implements Converter<UserDTO, User>{

	@Autowired
	private UserService userService;
	
	@Override
	public User convert(UserDTO source) {
		// TODO Auto-generated method stub
		User target = null;
		if(source.getId() != null) {
			target = userService.one(source.getId()).get();
		}
		
		if(target == null) { 
			target = new User();
		}
				
		target.setUsername(source.getUsername());
		target.setEmail(source.getEmail());
		target.setDescription(source.getDescription());
		
		return target;

	}
	

}
