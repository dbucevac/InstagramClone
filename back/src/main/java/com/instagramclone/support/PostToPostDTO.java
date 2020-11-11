package com.instagramclone.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.PostDTO;
import com.instagramclone.model.Post;

@Component
public class PostToPostDTO implements Converter<Post, PostDTO>{

	@Override
	public PostDTO convert(Post source) {
		// TODO Auto-generated method stub
		PostDTO retValue = new PostDTO();
		
		retValue.setId(source.getId());
		retValue.setCaption(source.getCaption());
		
		return retValue;
	}
	public List<PostDTO> convert(List<Post> posts){
		List<PostDTO> ret = new ArrayList<PostDTO>();
		
		for(Post post: posts) {
			ret.add(convert(post));
		}
		
		return ret;
	}
	

}
