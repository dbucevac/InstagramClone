package com.instagramclone.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.PictureDTO;
import com.instagramclone.model.Picture;
import com.instagramclone.service.PictureService;

@Component
public class PictureDTOToPicture implements Converter<PictureDTO, Picture>{

	@Autowired
	PictureService pictureService;
	
	@Override
	public Picture convert(PictureDTO source) {
		// TODO Auto-generated method stub
		Long id = source.getId();
		Picture target = id == null ? new Picture() : pictureService.one(id).get();
		
		if(target != null) {
			target.setId(id);
			target.setFileName(source.getFileName());
			target.setFileType(source.getFileType());
			target.setData(source.getData());
		}
		
		return target;
	}
	
	

}
