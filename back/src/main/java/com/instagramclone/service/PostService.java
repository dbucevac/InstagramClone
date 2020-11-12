package com.instagramclone.service;

import java.util.List;
import java.util.Optional;

import com.instagramclone.model.Post;

public interface PostService {
	
	List<Post> all();
	Optional<Post> one(Long id);
	Post save(Post post);
	List<Post> byUser(Long userId);
	List<Post> byUsersFollowers(Long userId);

}
