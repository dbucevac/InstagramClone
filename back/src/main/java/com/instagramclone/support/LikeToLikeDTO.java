package com.instagramclone.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.LikeDTO;
import com.instagramclone.model.Like;

@Component
public class LikeToLikeDTO implements Converter<Like, LikeDTO>{

	@Override
	public LikeDTO convert(Like source) {
		// TODO Auto-generated method stub
		LikeDTO retValue = new LikeDTO();
		retValue.setId(source.getId());
		
		return retValue;
	}
	
	public List<LikeDTO> convert(List<Like> likes){
		List<LikeDTO> ret = new ArrayList<LikeDTO>();
		
		for(Like like: likes) {
			ret.add(convert(like));
		}
		
		return ret;
	}

}
