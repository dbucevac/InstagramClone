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
@RequestMapping("api/users")
public class ApiUserController {
	
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
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> get(@PathVariable Long id){
		Optional<User> user = userService.one(id);
		
		if(user.isPresent()) {
			UserDTO body = toDto.convert(user.get());
			return new ResponseEntity<>(body, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping
	public ResponseEntity<List<UserDTO>> get(){
		
		List<User> users = userService.all();
		List<UserDTO> body = toDto.convert(users);
		return new ResponseEntity<>(body, HttpStatus.OK);
	}
	

}
