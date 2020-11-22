package com.instagramclone.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.instagramclone.dto.PasswordChangeDTO;
import com.instagramclone.model.User;
import com.instagramclone.repository.UserRepository;
import com.instagramclone.service.UserService;

@Service
public class JpaUserService implements UserService{
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

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
	public Optional<User> byEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findFirstByEmail(email);
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


		String encodedPass = passwordEncoder.encode(changeDto.getPassword());
		user.setPassword(encodedPass);

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
	public List<User> findFollowingUsersByUserId(Long userId) {
		// TODO Auto-generated method stub
		return userRepository.findByFollowedUsersId(userId);
	}

	@Override
	public List<User> findFollowersByUserId(Long userId) {
		// TODO Auto-generated method stub
		return userRepository.findByFollowingUsersId(userId);
	}

	@Override
	public Optional<User> byPost(Long postId) {
		// TODO Auto-generated method stub
		return userRepository.findByPostsId(postId);
	}

	@Override
	public Optional<User> byLike(Long likeId) {
		// TODO Auto-generated method stub
		return userRepository.findByLikesId(likeId);
	}

	@Override
	public Optional<User> byComment(Long commentId) {
		// TODO Auto-generated method stub
		return userRepository.findByCommentsId(commentId);
	}

	@Override
	public List<User> suggestUsers(Long id) {
		// TODO Auto-generated method stub
		Optional<User> user = userRepository.findById(id);
		
		if(!user.isPresent()) {
			throw new EntityNotFoundException();
		}
		
		User result = user.get();
		
		List<User> suggestions = new ArrayList<>();
		List<User> allUsers = userRepository.findAll();
		List<User> followings = userRepository.findByFollowedUsersId(id);
		
		if(!allUsers.isEmpty() && !followings.isEmpty()) {
			
			for(User u : followings) {
				List<User> followingUsersFollowings = u.getFollowingUsers();
				for(User f: followingUsersFollowings) {
					if(!followings.contains(f) && !f.getId().equals(result.getId())) {
						suggestions.add(f);
					}
				}
				
			}
		}
		
		return suggestions;
		
	}

	
	
	

}
