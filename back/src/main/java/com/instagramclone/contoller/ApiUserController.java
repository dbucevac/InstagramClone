package com.instagramclone.contoller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.instagramclone.dto.PictureDTO;
import com.instagramclone.dto.PostDTO;
import com.instagramclone.dto.UserDTO;
import com.instagramclone.model.Picture;
import com.instagramclone.model.Post;
import com.instagramclone.model.User;
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
	
	@PostMapping("/{id}/followers/{userIdToFollowUnfollow}")
	public ResponseEntity<UserDTO> followUnfollow(@PathVariable Long id, @PathVariable Long userIdToFollowUnfollow){
		Optional<User> user = userService.one(id);
		Optional<User> userToFollowUnfollow = userService.one(userIdToFollowUnfollow);
		
		if(user.isPresent() && userToFollowUnfollow.isPresent()) {
			
			if(!user.get().getId().equals(userToFollowUnfollow.get().getId())){
				List<User> followers = userService.findFollowersByUserId(id);
				if(followers.contains(userToFollowUnfollow.get())) {

					List<User> newListFollowers = new ArrayList<>();
					
					for(User u : followers) {
						if(!u.getId().equals(userIdToFollowUnfollow)) {
							newListFollowers.add(u);
						}else {
							continue;
						}
					}
					user.get().setFollowers(newListFollowers);			
					userService.save(user.get());
					
					UserDTO body = toUserDto.convert(userToFollowUnfollow.get());
					return new ResponseEntity<>(body, HttpStatus.OK);
				}
				
				followers.add(userToFollowUnfollow.get());
				user.get().setFollowers(followers);			
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
	
	@GetMapping("/{id}/followers/posts")
	public ResponseEntity<List<PostDTO>> getPostsOfUsersFollowers(@PathVariable Long id){
		
		List<Post> postsOfFollowers = postService.byUsersFollowers(id);
		return new ResponseEntity<>(toPostDto.convert(postsOfFollowers), HttpStatus.OK);
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<Void> delete(@PathVariable Long userId){
		if(!userService.one(userId).isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} 

		userService.delete(userId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	
	

}
