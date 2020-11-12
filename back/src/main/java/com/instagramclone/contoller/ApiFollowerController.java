package com.instagramclone.contoller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instagramclone.dto.PostDTO;
import com.instagramclone.dto.UserDTO;
import com.instagramclone.model.Post;
import com.instagramclone.model.User;
import com.instagramclone.service.PostService;
import com.instagramclone.service.UserService;
import com.instagramclone.support.PostToPostDTO;
import com.instagramclone.support.UserDTOToUser;
import com.instagramclone.support.UserToUserDTO;

@RestController
@RequestMapping("api/users/{userId}/followers")
public class ApiFollowerController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserToUserDTO toDto;

	@Autowired
	private UserDTOToUser toUser;
	
	@Autowired
	private PostToPostDTO toPostDto;
	
	@GetMapping("/followers")
	public ResponseEntity<List<UserDTO>> getFollowers(@PathVariable Long id){
		Optional<User> user = userService.one(id);
		
		if(user.isPresent()) {
			List<User> followers = userService.findFollowersByUserId(id);
			List<UserDTO> body = toDto.convert(followers);
			return new ResponseEntity<>(body, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/followers/posts")
	public ResponseEntity<List<PostDTO>> getPostsOfUsersFollowers(@PathVariable Long userId){
		
		List<Post> postsOfFollowers = postService.byUsersFollowers(userId);
		return new ResponseEntity<>(toPostDto.convert(postsOfFollowers), HttpStatus.OK);
	}

}
