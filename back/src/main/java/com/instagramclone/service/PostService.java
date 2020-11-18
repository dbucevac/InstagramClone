package com.instagramclone.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

import com.instagramclone.model.Post;
import com.instagramclone.model.User;

public interface PostService {
	
	List<Post> all();
	Optional<Post> one(Long id);
	Post save(Post post);
	List<Post> byUser(Long userId);
	List<Post> byUsersFollowingUsers(Long userId);
	
}
