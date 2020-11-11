package com.instagramclone.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class LoginDTO {
	
	@NotEmpty
	@Pattern(regexp="/^\\S*$/")
	private String username;
	@NotEmpty
	@Pattern(regexp="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
	private String password;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}
