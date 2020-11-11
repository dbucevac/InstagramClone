package com.instagramclone.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.UserDTO;
import com.instagramclone.model.User;

@Component
public class UserToUserDTO implements Converter<User, UserDTO>{

	@Override
	public UserDTO convert(User source) {
		// TODO Auto-generated method stub
		UserDTO target = new UserDTO();
		
		target.setId(source.getId());
		target.setEmail(source.getEmail());
		target.setDescription(source.getDescription());
		target.setUsername(source.getUsername());
		
		return target;
	}
	
	public List<UserDTO> convert(List<User> source) {
		List<UserDTO> target = new ArrayList<>();
		
		for(User u : source) {
			UserDTO dto = convert(u);
			target.add(dto);
		}
		
		return target;
	}

	
}
