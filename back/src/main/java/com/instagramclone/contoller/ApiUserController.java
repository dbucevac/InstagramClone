package com.instagramclone.contoller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.instagramclone.dto.LoginDTO;
import com.instagramclone.dto.PasswordChangeDTO;
import com.instagramclone.dto.PictureDTO;
import com.instagramclone.dto.PostDTO;
import com.instagramclone.dto.RegistrationDTO;
import com.instagramclone.dto.UserDTO;
import com.instagramclone.model.Picture;
import com.instagramclone.model.Post;
import com.instagramclone.model.User;
import com.instagramclone.model.UserRole;
import com.instagramclone.repository.UserRepository;
import com.instagramclone.security.TokenUtils;
import com.instagramclone.service.PictureService;
import com.instagramclone.service.PostService;
import com.instagramclone.service.UserService;
import com.instagramclone.support.PictureToPictureDTO;
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
	private PictureService pictureService;
	
	@Autowired
	private UserToUserDTO toUserDto;

	@Autowired
	private UserDTOToUser toUser;
	
	@Autowired
	private PostToPostDTO toPostDto;
	
	@Autowired
	private PictureToPictureDTO toPictureDto;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private TokenUtils tokenUtils;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private static final List<String> contentTypes = Arrays.asList("image/png", "image/jpeg", "image/gif");
	
	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUser(@PathVariable Long id){
		Optional<User> user = userService.one(id);
		
		if(user.isPresent()) {
			UserDTO body = toUserDto.convert(user.get());
			return new ResponseEntity<>(body, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping
	ResponseEntity<List<UserDTO>> getUsers(@RequestParam(required=false) String username){
		
		List<User> users = null;
		
		if(username != null) {
			users = userService.searchUsers(username);
		}
		else {
			users = userService.all();
		}
		
		return new ResponseEntity<>(toUserDto.convert(users),HttpStatus.OK);
	}
	
	@GetMapping("/{id}/picture")
	public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long id){
		Optional<Picture> picture = pictureService.byUser(id);
		
		if(picture.isPresent()) {
			PictureDTO body = toPictureDto.convert(picture.get());
			return ResponseEntity.ok()
			        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + body.getFileName() + "\"")
			        .body(body.getData());
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping("/{id}/picture")
	public ResponseEntity<Void> uploadProfilePicture(@RequestParam("file") MultipartFile file, @PathVariable Long id){
		
		
		Optional<User> user = userService.one(id);
		
		String fileContentType = file.getContentType();
		
		if(!user.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		if(!contentTypes.contains(fileContentType)) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	    try {
	      Picture p = pictureService.save(file);    

	      User toUpdate = user.get();
	      
	      toUpdate.setPicture(p);
	      
	      userService.save(toUpdate);
    	  
	      return new ResponseEntity<>(HttpStatus.OK);
	      
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
	    }
		
		
	}
	
	@PostMapping("/{id}/follow/{userIdToFollowUnfollow}")
	public ResponseEntity<UserDTO> followUnfollow(@PathVariable Long id, @PathVariable Long userIdToFollowUnfollow){
		Optional<User> user = userService.one(id);
		Optional<User> userToFollowUnfollow = userService.one(userIdToFollowUnfollow);
		
		if(user.isPresent() && userToFollowUnfollow.isPresent()) {
			
			if(!user.get().getId().equals(userToFollowUnfollow.get().getId())){
				List<User> followingUsers = userService.findFollowingUsersByUserId(id);
				if(followingUsers.contains(userToFollowUnfollow.get())) {

					List<User> newListFollowingUsers = new ArrayList<>();
					
					for(User u : followingUsers) {
						if(!u.getId().equals(userIdToFollowUnfollow)) {
							newListFollowingUsers.add(u);
						}else {
							continue;
						}
					}
					user.get().setFollowingUsers(newListFollowingUsers);		
					userService.save(user.get());
					
					UserDTO body = toUserDto.convert(userToFollowUnfollow.get());
					return new ResponseEntity<>(body, HttpStatus.OK);
				}
				
				followingUsers.add(userToFollowUnfollow.get());
				user.get().setFollowingUsers(followingUsers);			
				userService.save(user.get());
				
				UserDTO body = toUserDto.convert(userToFollowUnfollow.get());
				return new ResponseEntity<>(body, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping("/{id}/followings")
	public ResponseEntity<List<UserDTO>> getFollowingUsers(@PathVariable Long id){
		Optional<User> user = userService.one(id);
		
		if(user.isPresent()) {
			List<User> followers = userService.findFollowingUsersByUserId(id);
			List<UserDTO> body = toUserDto.convert(followers);
			return new ResponseEntity<>(body, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/{id}/followings/posts")
	public ResponseEntity<List<PostDTO>> getPostsOfUsersFollowingUsers(@PathVariable Long id){
		
		List<Post> postsOfFollingUsers = postService.byUsersFollowingUsers(id);
		return new ResponseEntity<>(toPostDto.convert(postsOfFollingUsers), HttpStatus.OK);
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> delete(@PathVariable Long userId){
		if(!userService.one(userId).isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} 

		userService.delete(userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	@GetMapping("/{id}/followers")
	public ResponseEntity<List<UserDTO>> getFollowers(@PathVariable Long id){
		Optional<User> user = userService.one(id);
		
		if(user.isPresent()) {
			List<User> followers = userService.findFollowersByUserId(id);
			List<UserDTO> body = toUserDto.convert(followers);
			return new ResponseEntity<>(body, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody LoginDTO dto) {
		// Perform the authentication
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword());
		Authentication authentication = authenticationManager.authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		try {
			// Reload user details so we can generate token
			UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());
			return ResponseEntity.ok(tokenUtils.generateToken(userDetails));
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<UserDTO> register(
			@RequestBody @Validated RegistrationDTO reqBody){

		if(reqBody.getId() != null 
				|| !reqBody.getPassword().equals(reqBody.getPasswordConfirm())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		String username = reqBody.getUsername();
		String email = reqBody.getEmail();
		
		Optional<User> userWithSameUsername = userService.byUsername(username);
		Optional<User> userWithSameEmail = userService.byEmail(email);
		
		if(userWithSameUsername.isPresent() || userWithSameEmail.isPresent()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		User toAdd = toUser.convert(reqBody);
		toAdd.setPassword(passwordEncoder.encode(reqBody.getPassword()));
		toAdd.setRole(UserRole.USER);
		
		User persisted = userService.save(toAdd);
		
		UserDTO respBody = toUserDto.convert(persisted);
		return new ResponseEntity<>(respBody, HttpStatus.CREATED);
	}
	
	
	
	@PutMapping("/{id}")
	public ResponseEntity<UserDTO> edit(
			@PathVariable Long id,
			@RequestBody UserDTO reqBody){
		
		if(!id.equals(reqBody.getId())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		User toEdit = toUser.convert(reqBody);
		User persisted = userService.save(toEdit);
		
		UserDTO respBody = toUserDto.convert(persisted);
		return new ResponseEntity<>(respBody, HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/{id}", method = RequestMethod.PUT, params = "chpass")
	public ResponseEntity<Void> changePassword(
			@PathVariable Long id,
			@RequestBody PasswordChangeDTO reqBody){
		
		if(!reqBody.getPassword().equals(reqBody.getPasswordConfirm())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		boolean result;
		try {
			result = userService.changePassword(id, reqBody);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} 
		
		if(result) {
			return new ResponseEntity<>(HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
	}
	
	
	
	
	

}
