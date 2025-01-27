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
	Optional<User> byEmail(String email);
	Optional<User> byPost(Long postId);
	Optional<User> byLike(Long likeId);
	Optional<User> byComment(Long commentId);
	boolean changePassword(Long id, PasswordChangeDTO changeDto);
	List<User> searchUsers(@Param("username") String username);
	List<User> findFollowingUsersByUserId(@Param("userId") Long userId);
	List<User> findFollowersByUserId(@Param("userId") Long userId);
	List<User> suggestUsers(Long id);
	
}
