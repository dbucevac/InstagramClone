package com.instagramclone.service.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagramclone.dto.PasswordChangeDTO;
import com.instagramclone.model.User;
import com.instagramclone.repository.UserRepository;
import com.instagramclone.service.UserService;

@Service
public class JpaUserService implements UserService{
	
	@Autowired
	UserRepository userRepository;

	@Override
	public Optional<User> one(Long id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id);
	}

	@Override
	public List<User> all() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	@Override
	public User save(User user) {
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		userRepository.deleteById(id);
		
	}

	@Override
	public Optional<User> byUsername(String username) {
		// TODO Auto-generated method stub
		return userRepository.findFirstByUsername(username);
	}

	@Override
	public boolean changePassword(Long id, PasswordChangeDTO changeDto) {
		// TODO Auto-generated method stub
		Optional<User> result = userRepository.findById(id);
		
		if(!result.isPresent()) {
			throw new EntityNotFoundException();
		}
		
		User user = result.get();
		
		if(!user.getEmail().equals(changeDto.getEmail())){
			return false;
		}

		// ubacen deo koda zbog greske koja se desavala ako kroz ubacivanje podataka dva puta
		// kriptujemo lozinku
		//String encodedPass = passwordEncoder.encode(changeDto.getPassword());
		//user.setPassword(encodedPass);

		userRepository.save(user);
		return true;
	}

	@Override
	public List<User> searchUsers(String username) {
		// TODO Auto-generated method stub
		if(username != null) {
			username = '%' + username + '%';
		}
		return userRepository.searchUsers(username);
	}

	@Override
	public List<User> findFollowersByUserId(Long userId) {
		// TODO Auto-generated method stub
		return userRepository.findFollowersByUserId(userId);
	}
	
	

}
