package com.instagramclone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

import com.instagramclone.dto.PasswordChangeDTO;
import com.instagramclone.model.User;

public interface UserService {
	Optional<User> one(Long id);	
	List<User> all();
	User save(User user);
	void delete(Long id);
	Optional<User> byUsername(String username);
	boolean changePassword(Long id, PasswordChangeDTO changeDto);
	List<User> searchUsers(@Param("username") String username);
	List<User> findFollowersByUserId(@Param("userId") Long userId);
	
}
