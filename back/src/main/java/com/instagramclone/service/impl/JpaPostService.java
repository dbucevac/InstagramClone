package com.instagramclone.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagramclone.model.Post;
import com.instagramclone.model.User;
import com.instagramclone.repository.PostRepository;
import com.instagramclone.repository.UserRepository;
import com.instagramclone.service.PostService;

@Service
public class JpaPostService implements PostService{
	
	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserRepository userRepository;

	@Override
	public List<Post> all() {
		// TODO Auto-generated method stub
		return postRepository.findAll();
	}

	@Override
	public Optional<Post> one(Long id) {
		// TODO Auto-generated method stub
		return postRepository.findById(id);
	}

	@Override
	public Post save(Post post) {
		// TODO Auto-generated method stub
		return postRepository.save(post);
	}

	@Override
	public List<Post> byUser(Long userId) {
		// TODO Auto-generated method stub
		return postRepository.findByUserId(userId);
	}

	@Override
	public List<Post> byUsersFollowingUsers(Long userId) {
		// TODO Auto-generated method stub
		Optional<User> result = userRepository.findById(userId);
		
		if(!result.isPresent()) {
			throw new EntityNotFoundException();
		}
		
		List<User> followingUses = userRepository.findByFollowedUsersId(userId);
		List<Post> followingUsesPosts = new ArrayList<Post>();
		List<Post> allPosts = new ArrayList<Post>();
		
		for(User usersFollowingUser: followingUses) {
			followingUsesPosts = postRepository.findByUserId(usersFollowingUser.getId());
			for(Post p : followingUsesPosts) {
				allPosts.add(p);
			}
		}
		
		return allPosts;
	}

	
	

}
