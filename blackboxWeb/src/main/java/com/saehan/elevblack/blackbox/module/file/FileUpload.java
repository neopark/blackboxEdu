package com.saehan.elevblack.blackbox.module.file;



import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.Thumbnails.Builder;

import javax.imageio.ImageIO;

import com.saehan.elevblack.blackbox.domain.ElevContactDataDTO;
import com.saehan.elevblack.blackbox.domain.FileDtl;
import com.saehan.elevblack.blackbox.domain.FileMst;
import com.saehan.elevblack.blackbox.mapper.ElevMapper;
import com.saehan.elevblack.blackbox.mapper.FileMapper;
import com.saehan.elevblack.blackbox.model.dto.ResponseDto;
import com.saehan.elevblack.blackbox.model.enums.Extension;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static com.saehan.elevblack.blackbox.model.enums.Extension.*;
import static java.time.LocalDate.now;
import static org.apache.commons.io.FileUtils.copyToFile;
import static net.coobird.thumbnailator.geometry.Positions.CENTER;
import static java.lang.Integer.parseInt;

@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class FileUpload {

	@Value("${custom.path.upload-images}")
	private String filesPath;

    private final String year = String.valueOf(now().getYear());
	private final String month = String.valueOf(now().getMonthValue());
	private final String day = String.valueOf(now().getDayOfMonth());
	@Autowired FileMapper fileMapper;
	@Autowired ElevMapper elevMapper;

	@Transactional
	public Map<String, Object> handleFileUpload(List<MultipartFile> fileUpload, FileMst fileMst) throws Exception {

		String baseDir = filesPath + "/" + year + "/" + month + "/" + day + "/" + "/" + "thumbnail";
		String saveUrlNm = year + "/" + month + "/" + day + "/";
		String fileUrl = filesPath + "/" + year + "/" + month + "/" + day + "/";

		List<FileDtl> fileDtls = new ArrayList<>();
		Map<String, Object> result = new HashMap<>();
		
		fileMapper.insertFileMst(fileMst);
		for (MultipartFile file : fileUpload) {
			FileDtl fileDtl = new FileDtl();
			File folder = new File(baseDir);
			if (!folder.exists()) {
				folder.mkdirs();
				log.info("오늘 날짜의 폴더를 생성하였습니다.");
			} else {
				log.warn("이미 폴더가 존재 합니다. 기존 폴더의 저장이 됩니다.");
			}
			if (file.getSize() > 0) {
				try {
				//	fileMst = fileMstRepository.saveAndFlush(fileMst);
					// FileDtl 엔티티에 상세내용 저장
//					fileMst.setIdx(fileMstIdx);
					fileDtl = fileDtlSave(fileMst.getIdx(), fileDtl, file, saveUrlNm);

					Path path = Path.of(fileUrl + "//" + fileDtl.getFileNm());
					File fileObj = path.toFile();

					if (file.getSize() / 1048576 >= 1) {
						FileOutputStream fileOutputStream = new FileOutputStream(fileObj);

						Builder<BufferedImage> builder = Thumbnails.of(ImageIO.read(file.getInputStream()));

						builder
								.outputQuality(0.4)
								.scale(0.3)
								.outputFormat(fileDtl.getFileExt().toString()) // 파일의 확장명 지정
								.toOutputStream(fileOutputStream); // 저장할 파일경로 지정
					} else {
						// 지정된 경로에 파일 저장
						copyToFile(file.getInputStream(), fileObj);
					}


					// 썸네일 생성
					if (fileDtl.getFileExt().equals(PNG) || fileDtl.getFileExt().equals(JPG) || fileDtl.getFileExt().equals(JPEG)) {
						log.error("썸네일생성");
						String thumbnailUrl = this.createThumbnail(fileUrl, fileDtl.getFileNm(), 400, 400,
								false, fileDtl.getFileNm());
						fileDtl.setThumbnailUrl(thumbnailUrl);
					}

					fileMapper.insertFileDtl(fileDtl);
					log.info("uploadFile = " + fileDtl.getFileNm());
				} catch (FileNotFoundException e) {
					e.printStackTrace();
					log.error(e.getLocalizedMessage());
					log.error("파일을 찾을 수 없습니다.");
				}
			} else {
				throw new FileUploadException("업로드 하려는 파일이 존재 하지 않습니다.");
			}

			fileDtls.add(fileDtl);
		}
		log.info("ddd:");
		result.put("Boolean", true);
		result.put("FileMstIdx", fileMst.getIdx());
		result.put("FileDtl", fileDtls);
	
		return result;
	}

	/**
	 * @param fileMst
	 * @param FileDtl
	 * @param file
	 * @param saveUrlName
	 * @return FileDtl
	 */
	public FileDtl fileDtlSave(int fileMstIdx, FileDtl fileDtl, MultipartFile file, String saveUrlName) {
		long currentTimeMillis = System.currentTimeMillis();
		String fileUrl = saveUrlName + currentTimeMillis + file.getOriginalFilename();
		Extension extension = Extension.valueOf(FilenameUtils.getExtension(file.getOriginalFilename()).toUpperCase());
			fileDtl.setFileOrgNm(file.getOriginalFilename());
			fileDtl.setFileNm(currentTimeMillis + file.getOriginalFilename());
			fileDtl.setFileExt(extension.toString());
			fileDtl.setFileSize(String.valueOf(file.getSize()));
			fileDtl.setFileMstIdx(fileMstIdx);
			fileDtl.setFileUrl(fileUrl);
	//	fileMapper.insertFileDtl(FileDtl);
		return 	fileDtl;	
	}

	/**
	 * @Author : 우경식 (kswoo@bpnsolution.com)
	 * @Description : filedownload 비지니스 로직
	 * @Date : 2020-06-03
	 * @Time : 오후 4:33
	 */
	public String getFileUrl(FileDtl fileDtl)  {

		Path path = Paths.get(filesPath+"/"+fileDtl.getFileUrl());
		Resource resource=null;
		log.info("path:{}",path.toString());
		try {
			resource = new InputStreamResource(Files.newInputStream(path));
			return resource.getURL().toString();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			log.info("error:{}",e.toString());
			return e.toString();
		}
		
	}

	public ResponseEntity<Resource> download(FileDtl fileDtl) throws IOException {
		// 다운로드 하고자 하는 파일

		String pathStr = new StringBuilder().append(filesPath).append("/").append(year).append("/").append(month)
				.append("/").append(day).append("/").append("/").append(fileDtl.getFileNm())
				.toString();

		Path path = Paths.get(pathStr);
		HttpHeaders headers = new HttpHeaders();

		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + path.getFileName().toString());
		Resource resource = new InputStreamResource(Files.newInputStream(path));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);

	}

	public ResponseEntity<ResponseDto> download2(String file_nm, String file_url) throws IOException {
		String filePath = new StringBuilder().append(filesPath).append("/").append(file_url).toString();
		byte[] byteArr = FileUtils.readFileToByteArray(new File(filePath));

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(MediaType.APPLICATION_JSON);
		responseHeaders.set(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=\"" + URLEncoder.encode(file_nm, StandardCharsets.UTF_8.toString()) + "\"");
		responseHeaders.set(HttpHeaders.CONTENT_LANGUAGE, "ko-KR");
		responseHeaders.set("Transfer-Encoding", "chunked");

		String encodeStr = Base64.getEncoder().encodeToString(byteArr);
		String value = new StringBuilder().append(encodeStr).append("fileName").append(file_nm).toString();
		return new ResponseEntity<>(new ResponseDto(value, "1", "파일 다운로드에 성공했습니다."), responseHeaders, HttpStatus.OK);
	}

	// @Transactional
	// public void deleteFileDtl(FileMst fileMst) {

	// 	List<FileDto> fileList = fileDtlRepository.getFileDtlList(fileMst.getFileMstIdx(), null, null);
	// 	File delOrgFile = null;
	// 	File delThmFile = null;

	// 	for (FileDto fd : fileList) {
	// 		delOrgFile = new File(filesPath + "/" + fd.getFileUrl());
	// 		delThmFile = new File(filesPath + "/" + fd.getThumbnailUrl());

	// 		log.info("delOrgFile = " + delOrgFile);
	// 		log.info("delOrgFile = " + delThmFile);
	// 		log.info("FileDtl.getFile_org_nm() = " + fd.getFileOrgNm());

	// 		if (delOrgFile.exists()) delOrgFile.delete();
	// 		if (delThmFile.exists()) delThmFile.delete();
	// 	}

	// 	List<Long> collect = fileList.stream().map(FileDto::getFileIdx).collect(Collectors.toList());

	// 	fileDtlRepository.deleteAllById(collect);
	// 	fileDtlRepository.flush();

	// }

	// public void deleteFileDtl(List<Long> fileDtlIdxs) throws Exception {
	// 	List<FileDtl> findAllById = fileDtlRepository.findAllById(fileDtlIdxs);
	// 	File delOrgFile = null;
	// 	File delThmFile = null;

	// 	for (FileDtl fd : findAllById) {
	// 		delOrgFile = new File(filesPath + "/" + fd.getFileUrl());
	// 		delThmFile = new File(filesPath + "/" + fd.getThumbnailUrl());

	// 		log.info("delOrgFile = " + delOrgFile);
	// 		log.info("delOrgFile = " + delThmFile);
	// 		log.info("FileDtl.getFileOrgNm() = " + fd.getFileOrgNm());

	// 		if (delOrgFile.exists()) delOrgFile.delete();
	// 		if (delThmFile.exists()) delThmFile.delete();
	// 	}

	// 	fileDtlRepository.deleteAllInBatch(findAllById);
	// 	fileDtlRepository.flush();
	// }

	/**
	 * 리사이즈 된 썸네일 이미지를 생성하고 경로를 리턴한다.
	 *
	 * @param width  - 최대 이미지 가로 크기
	 * @param height - 최대 이미지 세로 크기
	 * @param crop   - 이미지 크롭 사용 여부
	 * @return 생성된 이미지의 절대 경로
	 * @throws Exception
	 */
	public String createThumbnail(String dir, String path, int width, int height, boolean crop, String thumbnail_name)
			throws Exception {

		/** 1) 썸네일 생성 정보를 로그로 기록하기 */
		log.debug(String.format("[Thumbnail] path: %s, size: %dx%d, crop: %s", path, width, height,
				crop));

		/** 2) 저장될 썸네일 이미지의 경로 문자열 만들기 */
		File loadFile = new File(dir, path); // 원본파일의 전체경로 --> 업로드 폴더(상수값) + 파일명
		String dirPath = loadFile.getParent(); // 전체 경로에서 파일이 위치한 폴더 경로 분리
		log.info("dirPath = " + dirPath);

		String fileName = loadFile.getName(); // 전체 경로에서 파일 이름만 분리
		int p = fileName.lastIndexOf("."); // 파일이름에서 마지막 점(.)의 위치

		String name = fileName.substring(0, p); // 파일명 분리 --> 파일이름에서 마지막 점의 위치 전까지
		String ext = fileName.substring(p + 1); // 확장자 분리 --> 파일이름에서 마지막 점위 위치 다음부터 끝까지
		String prefix = crop ? "_crop_" : "_resize_"; // 크롭인지 리사이즈 인지에 대한 문자열

		// 최종 파일이름을 구성한다. --> 원본이름 + 크롭여부 + 요청된 사이즈
		// -> ex) myphoto.jpg --> myphoto_resize_320x240.jpg
		// String thumbName = name + prefix + width + "x" + height + "." + ext;

		File file = new File(dirPath + "/" + "thumbnail", thumbnail_name); // 생성될 썸네일 파일 객체 --> 업로드폴더 + 썸네일이름
		String saveFile = file.getAbsolutePath(); // 생성될 썸네일 파일 객체로부터 절대경로 추출 (리턴할 값)

		// 생성될 썸네일 이미지의 경로를 로그로 기록
		log.debug(String.format("[Thumbnail] saveFile: %s", saveFile));

		/** 3) 썸네일 이미지 생성하고 최종 경로 리턴 */
		// 해당 경로에 이미지가 없는 경우만 수행
		if (!file.exists()) {
			// 원본 이미지 가져오기
			Builder<File> builder = Thumbnails.of(loadFile);

			// 이미지 크롭 여부 파라미터에 따라 크롭 옵션을 지정한다.
			if (crop) builder.crop(CENTER);

			builder.size(width, height); // 축소할 사이즈 지정
			builder.useExifOrientation(true); // 세로로 촬영된 사진을 회전시킴
			builder.outputFormat(ext); // 파일의 확장명 지정
			builder.toFile(saveFile); // 저장할 파일경로 지정
		}

		// 최종적으로 생성된 경로에서 업로드 폴더까지의 경로를 제거한다.
		saveFile = saveFile.replace("\\", "/").replace(filesPath, "");
		// saveFile = StringUtils.substringAfterLast(saveFile, filesPath);
		return saveFile;
	}


	static String bytesToBinaryString(Byte b) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            builder.append(((0x80 >>> i) & b) == 0 ? '0' : '1');
        }

        return builder.toString();
    }

	static int bytesToBinaryInt(Byte b, int i) {
            return (((0x80 >>> i) & b) == 0 ? 0 : 1);
    }

	public int dataProcess(String elevatorNo){ // 데이터 저장처리
		log.info(filesPath);
		try{
		FileInputStream in = new FileInputStream(filesPath+"\\F0423.bin");
			byte[] data = new byte[6];
			int i;
			while((i = in.read(data))!=-1){
				String insTime = String.format("%02d",data[0])+":"+ String.format("%02d",data[1])+":"+ String.format("%02d",data[2]);		
				String senSor = bytesToBinaryString(data[3]) + bytesToBinaryString(data[4]) +bytesToBinaryString(data[5]);
				log.info(insTime+" "+senSor); 	
			}
		// 입력 스트림을 다 사용했으면 파일을 닫아라
		// => 파일을 다루기 위해 준비했던 메모리를 해제시킨다.
		// => OS 파일 시스템과의 연결도 끊는다.
		in.close();
		}catch(Exception e){
			log.info(e.toString());
		}

	return 1;

	}

	@Transactional
	public  int handleData(List<MultipartFile> fileUpload, String elevatorNo) throws Exception {

		log.info("size:",elevatorNo);
			for (MultipartFile file : fileUpload) {
			log.info("size:",file.getName());
			InputStream in =	file.getInputStream();
			byte[] data = new byte[7];
			int i;
				while((i = in.read(data))!=-1){
					String insTime = String.format("%02d",data[0])+":"+ String.format("%02d",data[1])+":"+ String.format("%02d",data[2]);		
					// String senSor = bytesToBinaryString(data[3]) + bytesToBinaryString(data[4]) +bytesToBinaryString(data[5]);
					int p = file.getOriginalFilename().lastIndexOf("."); // 파일이름에서 마지막 점(.)의 위치
					String name = "20"+file.getOriginalFilename().substring(0, p).replace("F", ""); 
					// log.info(name);	
					// log.info(insTime);	
					ElevContactDataDTO contactData = new ElevContactDataDTO();
				//	log.info("ddd:",bytesToBinaryString(data[3]));	
					contactData.setElevatorNo(elevatorNo);
					contactData.setWdate(name);
					contactData.setWtime(insTime);
					contactData.setSeq(data[3]);
					contactData.setP1(bytesToBinaryInt(data[6],7));
					contactData.setP2(bytesToBinaryInt(data[6],6));
					contactData.setP3(bytesToBinaryInt(data[6],5));
					contactData.setP4(bytesToBinaryInt(data[6],4));
					contactData.setP5(bytesToBinaryInt(data[6],3));
					contactData.setP6(bytesToBinaryInt(data[6],2));
					contactData.setP7(bytesToBinaryInt(data[6],1));
					contactData.setP8(bytesToBinaryInt(data[6],0));
					contactData.setP9(bytesToBinaryInt(data[5],7));
					contactData.setP10(bytesToBinaryInt(data[5],6));
					contactData.setP11(bytesToBinaryInt(data[5],5));
					contactData.setP12(bytesToBinaryInt(data[5],4));
					contactData.setP13(bytesToBinaryInt(data[5],3));
					contactData.setP14(bytesToBinaryInt(data[5],2));
					contactData.setP15(bytesToBinaryInt(data[5],1));
					contactData.setP16(bytesToBinaryInt(data[5],0));
					contactData.setP17(bytesToBinaryInt(data[4],7));
					contactData.setP18(bytesToBinaryInt(data[4],6));
					contactData.setP19(bytesToBinaryInt(data[4],5));
					contactData.setP20(bytesToBinaryInt(data[4],4));
					contactData.setP21(bytesToBinaryInt(data[4],3));
					contactData.setP22(bytesToBinaryInt(data[4],2));
					contactData.setP23(bytesToBinaryInt(data[4],1));
					contactData.setP24(bytesToBinaryInt(data[4],0));
					//	log.info(Integer.toString(contactData.getP1()));
					// contactData.setP1(parseInt(senSor.substring(0,1)));
					// contactData.setP2(parseInt(senSor.substring(1,2)));
					// contactData.setP3(parseInt(senSor.substring(2,3)));
					// contactData.setP4(parseInt(senSor.substring(3,4)));
					// contactData.setP5(parseInt(senSor.substring(4,5)));
					// contactData.setP6(parseInt(senSor.substring(5,6)));
					// contactData.setP7(parseInt(senSor.substring(6,7)));
					// contactData.setP8(parseInt(senSor.substring(7,8)));
					// contactData.setP9(parseInt(senSor.substring(8,9)));
					// contactData.setP10(parseInt(senSor.substring(9,10)));
					// contactData.setP11(parseInt(senSor.substring(10,11)));
					// contactData.setP12(parseInt(senSor.substring(11,12)));
					// contactData.setP13(parseInt(senSor.substring(12,13)));
					// contactData.setP14(parseInt(senSor.substring(13,14)));
					// contactData.setP15(parseInt(senSor.substring(14,15)));
					// contactData.setP16(parseInt(senSor.substring(15,16)));
					// contactData.setP17(parseInt(senSor.substring(16,17)));
					// contactData.setP18(parseInt(senSor.substring(17,18)));
					// contactData.setP19(parseInt(senSor.substring(18,19)));
					// contactData.setP20(parseInt(senSor.substring(19,20)));
					// contactData.setP21(parseInt(senSor.substring(20,21)));
					// contactData.setP22(parseInt(senSor.substring(21,22)));
					// contactData.setP23(parseInt(senSor.substring(22,23)));
					// contactData.setP24(parseInt(senSor.substring(23,24)));
					// log.info(contactData.getElevatorNo());
					// log.info(contactData.getWdate());
					// log.info(contactData.getWtime());
					// log.info(Integer.toString(contactData.getP1()));
					// log.info(Integer.toString(contactData.getP2()));
					// log.info(Integer.toString(contactData.getP3()));
					// log.info(Integer.toString(contactData.getP4()));
					// log.info(Integer.toString(contactData.getP5()));
					// log.info(Integer.toString(contactData.getP6()));
					// log.info(Integer.toString(contactData.getP7()));
					// log.info(Integer.toString(contactData.getP8()));
					// log.info(Integer.toString(contactData.getP9()));
					// log.info(Integer.toString(contactData.getP10()));
					// log.info(Integer.toString(contactData.getP11()));
					// log.info(Integer.toString(contactData.getP12()));
					// log.info(Integer.toString(contactData.getP13()));
					// log.info(Integer.toString(contactData.getP14()));
					
					try{
						elevMapper.insertContactData(contactData);
					}catch(Exception e){

						log.info(e.toString());
					}
				}
			in.close();
			}
			return 1;
	}

	@Transactional
	public  int handleDataBulk(List<MultipartFile> fileUpload, String elevatorNo) throws Exception {

			for (MultipartFile file : fileUpload) {
				List<ElevContactDataDTO> contactDataList = new ArrayList<ElevContactDataDTO>();
				log.info("filename:{}",file.getOriginalFilename());
				InputStream in =	file.getInputStream();
				byte[] data = new byte[7];
				int i;
				String hisTime="";
				int hisSeq=-1;

				while((i = in.read(data))!=-1){
					String insTime = String.format("%02d",data[0])+":"+ String.format("%02d",data[1])+":"+ String.format("%02d",data[2]);		
					// String senSor = bytesToBinaryString(data[3]) + bytesToBinaryString(data[4]) +bytesToBinaryString(data[5]);
					int p = file.getOriginalFilename().lastIndexOf("."); // 파일이름에서 마지막 점(.)의 위치
					String name = "20"+file.getOriginalFilename().substring(0, p).replace("F", ""); 
					// log.info(name);	
					// log.info(insTime);	
					ElevContactDataDTO contactData = new ElevContactDataDTO();
				//	log.info("ddd:",bytesToBinaryString(data[3]));	
					contactData.setElevatorNo(elevatorNo);
					contactData.setWdate(name);
					contactData.setWtime(insTime);
					contactData.setSeq(data[3]);
					contactData.setP1(bytesToBinaryInt(data[6],7));
					contactData.setP2(bytesToBinaryInt(data[6],6));
					contactData.setP3(bytesToBinaryInt(data[6],5));
					contactData.setP4(bytesToBinaryInt(data[6],4));
					contactData.setP5(bytesToBinaryInt(data[6],3));
					contactData.setP6(bytesToBinaryInt(data[6],2));
					contactData.setP7(bytesToBinaryInt(data[6],1));
					contactData.setP8(bytesToBinaryInt(data[6],0));
					contactData.setP9(bytesToBinaryInt(data[5],7));
					contactData.setP10(bytesToBinaryInt(data[5],6));
					contactData.setP11(bytesToBinaryInt(data[5],5));
					contactData.setP12(bytesToBinaryInt(data[5],4));
					contactData.setP13(bytesToBinaryInt(data[5],3));
					contactData.setP14(bytesToBinaryInt(data[5],2));
					contactData.setP15(bytesToBinaryInt(data[5],1));
					contactData.setP16(bytesToBinaryInt(data[5],0));
					contactData.setP17(bytesToBinaryInt(data[4],7));
					contactData.setP18(bytesToBinaryInt(data[4],6));
					contactData.setP19(bytesToBinaryInt(data[4],5));
					contactData.setP20(bytesToBinaryInt(data[4],4));
					contactData.setP21(bytesToBinaryInt(data[4],3));
					contactData.setP22(bytesToBinaryInt(data[4],2));
					contactData.setP23(bytesToBinaryInt(data[4],1));
					contactData.setP24(bytesToBinaryInt(data[4],0));
					//	log.info(Integer.toString(contactData.getP1()));
					// contactData.setP1(parseInt(senSor.substring(0,1)));
					// contactData.setP2(parseInt(senSor.substring(1,2)));
					// contactData.setP3(parseInt(senSor.substring(2,3)));
					// contactData.setP4(parseInt(senSor.substring(3,4)));
					// contactData.setP5(parseInt(senSor.substring(4,5)));
					// contactData.setP6(parseInt(senSor.substring(5,6)));
					// contactData.setP7(parseInt(senSor.substring(6,7)));
					// contactData.setP8(parseInt(senSor.substring(7,8)));
					// contactData.setP9(parseInt(senSor.substring(8,9)));
					// contactData.setP10(parseInt(senSor.substring(9,10)));
					// contactData.setP11(parseInt(senSor.substring(10,11)));
					// contactData.setP12(parseInt(senSor.substring(11,12)));
					// contactData.setP13(parseInt(senSor.substring(12,13)));
					// contactData.setP14(parseInt(senSor.substring(13,14)));
					// contactData.setP15(parseInt(senSor.substring(14,15)));
					// contactData.setP16(parseInt(senSor.substring(15,16)));
					// contactData.setP17(parseInt(senSor.substring(16,17)));
					// contactData.setP18(parseInt(senSor.substring(17,18)));
					// contactData.setP19(parseInt(senSor.substring(18,19)));
					// contactData.setP20(parseInt(senSor.substring(19,20)));
					// contactData.setP21(parseInt(senSor.substring(20,21)));
					// contactData.setP22(parseInt(senSor.substring(21,22)));
					// contactData.setP23(parseInt(senSor.substring(22,23)));
					// contactData.setP24(parseInt(senSor.substring(23,24)));
					// log.info(contactData.getElevatorNo());
					// log.info(contactData.getWdate());
					// log.info(contactData.getWtime());
					// log.info(Integer.toString(contactData.getP1()));
					// log.info(Integer.toString(contactData.getP2()));
					// log.info(Integer.toString(contactData.getP3()));
					// log.info(Integer.toString(contactData.getP4()));
					// log.info(Integer.toString(contactData.getP5()));
					// log.info(Integer.toString(contactData.getP6()));
					// log.info(Integer.toString(contactData.getP7()));
					// log.info(Integer.toString(contactData.getP8()));
					// log.info(Integer.toString(contactData.getP9()));
					// log.info(Integer.toString(contactData.getP10()));
					// log.info(Integer.toString(contactData.getP11()));
					// log.info(Integer.toString(contactData.getP12()));
					// log.info(Integer.toString(contactData.getP13()));
					// log.info(Integer.toString(contactData.getP14()));
			
						contactDataList.add(contactData);
				}
			try{
				log.info("count:{}",contactDataList.size());
				elevMapper.insertContactDataList(contactDataList);
			}catch(Exception e){
				log.info(e.toString());
			}
			in.close();
			}
			return 1;
	}
    
}
