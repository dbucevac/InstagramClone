package com.instagramclone.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.LikeDTO;
import com.instagramclone.model.Like;
import com.instagramclone.service.LikeService;

@Component
public class LikeDTOToLike implements Converter<LikeDTO, Like>{

	@Autowired
	private LikeService likeService;
	
	@Override
	public Like convert(LikeDTO source) {
		// TODO Auto-generated method stub
		Long id = source.getId();
		Like target = id == null ? new Like() : likeService.one(id).get();
		
		if(target != null) {
			target.setId(id);
		}
		
		return target;
	}

}
