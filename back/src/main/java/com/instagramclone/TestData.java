package com.instagramclone;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	@PostConstruct
	public void init() {
		
		//Users
		
		User user0 = new User();
		user0.setEmail("nikolaC@gmail.com");
		user0.setUsername("dzoni89");
		user0.setPassword("nekaSifra123!");
		user0.setRole(UserRole.USER);
		user0.setDescription("life lover");
		userRepository.save(user0);
		
		User user1 = new User();
		user1.setEmail("mare@gmail.com");
		user1.setUsername("markoni");
		user1.setPassword("nekaSifra456!");
		user1.setRole(UserRole.USER);
		user1.setDescription("always ready for an adventure");
		userRepository.save(user1);
		
		User user2 = new User();
		user2.setEmail("milica.radic@gmail.com");
		user2.setUsername("micaRad");
		user2.setPassword("Testing@89");
		user2.setRole(UserRole.USER);
		user2.setDescription("No filter");
		userRepository.save(user2);
		
		
		List<User> followers1 = new ArrayList<User>();
		followers1.add(user0);
		followers1.add(user1);
		user2.setFollowers(followers1);
		userRepository.save(user2);
		
		//Posts
		
		Post post1 = new Post();
		post1.setCaption("New Horizont");
		post1.setUser(user0);
		postRepository.save(post1);
		
		Post post2 = new Post();
		post2.setCaption("Party party party!");
		post2.setUser(user1);
		postRepository.save(post2);
		
		Post post3 = new Post();
		post3.setCaption("Loveee");
		post3.setUser(user2);
		postRepository.save(post3);
		
		Post post4 = new Post();
		post4.setCaption("Happy Birthday");
		post4.setUser(user2);
		postRepository.save(post4);
		
		
		Like like1 = new Like();
		like1.setPost(post1);
		like1.setUser(user2);
		likeRepository.save(like1);
		
		Like like2 = new Like();
		like2.setPost(post2);
		like2.setUser(user2);
		likeRepository.save(like2);
		
		//Comments
		
		Comment comment1 = new Comment();
		
		comment1.setMessage("Wooow!");
		comment1.setPost(post1);
		comment1.setUser(user2);
		commentRepository.save(comment1);
		
		Comment comment2 = new Comment();
		
		comment2.setMessage("Congratulation!");
		comment2.setPost(post2);
		comment2.setUser(user2);
		commentRepository.save(comment2);
		
		
		
	}

}
