package com.instagramclone.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.PostDTO;
import com.instagramclone.model.Post;
import com.instagramclone.service.PostService;

@Component
public class PostDTOToPost implements Converter<PostDTO, Post>{

	@Autowired
	PostService postService;
	
	@Override
	public Post convert(PostDTO source) {
		// TODO Auto-generated method stub
		Long id = source.getId();
		Post target = id == null ? new Post() : postService.one(id).get();
		
		if(target != null) {
			target.setId(id);
			target.setCaption(source.getCaption());
		}
		
		return target;
	}

}
