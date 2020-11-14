package com.instagramclone.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique=true)
	private String username;
	@Column(unique=true)
	private String email;
	private String password;
	
	@Enumerated(EnumType.STRING)
	private UserRole role;
	
	@Column(columnDefinition="TEXT")
	private String description;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "picture_id", referencedColumnName = "id")
    private Picture picture;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Post> posts = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Like> likes = new ArrayList<>();
	
	@ManyToMany
	@JoinTable(name="followers",
	 joinColumns=@JoinColumn(name="userId"),
	 inverseJoinColumns=@JoinColumn(name="followedUserId")
	)
	private List<User> followingUsers = new ArrayList<>();

	@ManyToMany
	@JoinTable(name="followers",
	 joinColumns=@JoinColumn(name="followedUserId"),
	 inverseJoinColumns=@JoinColumn(name="userId")
	)
	private List<User> followedUsers = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Picture getPicture() {
		return picture;
	}

	public void setPicture(Picture picture) {
		this.picture = picture;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}
	
	public void addPost(Post post) {
		this.posts.add(post);
		if (!equals(post.getUser())) {
			post.setUser(this);
		}
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	public void addComment(Comment comment) {
		this.comments.add(comment);
		if (!equals(comment.getUser())) {
			comment.setUser(this);
		}
	}

	public List<Like> getLikes() {
		return likes;
	}

	public void setLikes(List<Like> likes) {
		this.likes = likes;
	}
	
	public void addLike(Like like) {
		this.likes.add(like);
		if (!equals(like.getUser())) {
			like.setUser(this);
		}
	}

	public List<User> getFollowingUsers() {
		return followingUsers;
	}

	public void setFollowingUsers(List<User> followingUsers) {
		this.followingUsers = followingUsers;
	}
	
	
	
}
