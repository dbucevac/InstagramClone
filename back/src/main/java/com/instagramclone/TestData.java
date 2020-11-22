package com.instagramclone;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.instagramclone.model.Comment;
import com.instagramclone.model.Like;
import com.instagramclone.model.Post;
import com.instagramclone.model.User;
import com.instagramclone.model.UserRole;
import com.instagramclone.repository.CommentRepository;
import com.instagramclone.repository.LikeRepository;
import com.instagramclone.repository.PostRepository;
import com.instagramclone.repository.UserRepository;


@Component
public class TestData {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private LikeRepository likeRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@PostConstruct
	public void init() throws IOException {
		
		//Users
		
		User user0 = new User();
		user0.setEmail("nikolaC@gmail.com");
		user0.setUsername("dzoni89");
		String encodedPass1 = passwordEncoder.encode("nekaSifra123!");
		user0.setPassword(encodedPass1);
		user0.setRole(UserRole.USER);
		user0.setDescription("life lover");
		userRepository.save(user0);
		
		User user1 = new User();
		user1.setEmail("mare@gmail.com");
		user1.setUsername("markoni");
		String encodedPass2 = passwordEncoder.encode("nekaSifra456!");
		user1.setPassword(encodedPass2);
		user1.setRole(UserRole.USER);
		user1.setDescription("always ready for an adventure");
		userRepository.save(user1);
		
		User user2 = new User();
		user2.setEmail("milica.radic@gmail.com");
		user2.setUsername("mica");
		String encodedPass3 = passwordEncoder.encode("nekaSifra789!");
		user2.setPassword(encodedPass3);
		user2.setRole(UserRole.USER);
		user2.setDescription("No filter");
		userRepository.save(user2);
		
		/*
		
		List<User> followingUsers1 = new ArrayList<User>();
		followingUsers1.add(user0);
		followingUsers1.add(user1);
		user2.setFollowingUsers(followingUsers1);
		userRepository.save(user2);
		
		
		*/
	}

}
