package com.kt.csai.domain.alarmtalk.api;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kt.csai.domain.alarmtalk.payload.ReportRequest;
import com.kt.csai.domain.alarmtalk.payload.alarmtalk.AlarmTalkHistDto;
import com.kt.csai.domain.alarmtalk.payload.alarmtalk.AlarmTalkHistRequest;
import com.kt.csai.domain.alarmtalk.payload.alarmtalk.AlarmTalkRequest;
import com.kt.csai.domain.alarmtalk.payload.alarmtalk.ErrInfoCsaiDto;
import com.kt.csai.domain.alarmtalk.payload.alarmtalk.ErrInfoGWDto;
import com.kt.csai.domain.alarmtalk.repository.AlarmTalkRepositoryCsai;
import com.kt.csai.domain.alarmtalk.repository.AlarmTalkRepositoryGW;
import com.kt.csai.domain.alarmtalk.service.AlarmTalkService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/alarm")
public class AlarmTalkController {
	
	private final AlarmTalkService alarmTalkService;
	private final AlarmTalkRepositoryGW alarmTalkRepositoryGW;
	private final AlarmTalkRepositoryCsai alarmTalkRepositoryCsai;
	
	@PostMapping("/send")
	public ResponseEntity<?> sendAlarmTalk(@RequestBody AlarmTalkRequest requestAlarmTalk) {
		return new ResponseEntity<>(alarmTalkService.sendAlarmTalk(requestAlarmTalk), HttpStatus.OK);
	}
	
	@PostMapping("/report")
	public ResponseEntity<?> receiveReport(@RequestBody ReportRequest reportRequest) {
		return new ResponseEntity<>(alarmTalkService.sendReportMessage(reportRequest), HttpStatus.OK);
	}
	
	/**
	 * 알림톡 발송이력 Get
	 * @param sndNm
	 * @param sndDt
	 * @param pageable
	 * @return
	 */
	@GetMapping("/alarmTalkSndHistList")
	@ResponseBody
    public ResponseEntity<Page<AlarmTalkHistDto>> getAlarmTalkSndHistList(    		
    		@RequestParam(required=false) String sndCmpNo,
    		@RequestParam(required=false) String custName,
    		@RequestParam(required=false) String custTelNo,
    		@RequestParam(required=false) String sndFromDt,
    		@RequestParam(required=false) String sndToDt,
    		Pageable pageable) {		
		List<AlarmTalkHistDto> list = alarmTalkService.getAlarmTalkSndHistList(sndCmpNo, custName, custTelNo, sndFromDt, sndToDt);	
		int start = (int)pageable.getOffset();
		int end = (start + pageable.getPageSize()) > list.size() ? list.size() : (start + pageable.getPageSize());
		Page<AlarmTalkHistDto> pageList = new PageImpl<AlarmTalkHistDto>(list.subList(start, end), pageable, list.size());						
        return new ResponseEntity<>(pageList, HttpStatus.OK);		
    }
	
	/**
	 * 알림톡 발송이력 Post
	 * @param req
	 * @return
	 */
	@PostMapping("/alarmTalkSndHistListP")
	@ResponseBody
    public ResponseEntity<Page<AlarmTalkHistDto>> getAlarmTalkSndHistListP(@RequestBody AlarmTalkHistRequest req) {	
		String sndCmpNo = req.getSndCmpNo(); 
		String custName = req.getCustName();
		String custTelNo = req.getCustTelNo();
		String sndFromDt = req.getSndFromDt();
		String sndToDt = req.getSndToDt();				
		int page = req.getPage();
		int size = req.getSize();		
		Pageable pageable = PageRequest.of(page, size);
		
		List<AlarmTalkHistDto> list = alarmTalkService.getAlarmTalkSndHistList(sndCmpNo, custName, custTelNo, sndFromDt, sndToDt);	
		
//		for(AlarmTalkHistDto alarmTalkHist : list) {
//			alarmTalkHist.getSender().setSndCmpNo(StringUtil.maskingForEmployeeNumber(alarmTalkHist.getSender().getSndCmpNo()));
//			alarmTalkHist.getSender().setSndNm(StringUtil.maskingForName(alarmTalkHist.getSender().getSndNm()));
//			
//			alarmTalkHist.getCustomer().setCustNm(StringUtil.maskingForName(alarmTalkHist.getCustomer().getCustNm()));
//			alarmTalkHist.getCustomer().setCustTelNo(StringUtil.maskingForTel(alarmTalkHist.getCustomer().getCustTelNo()));
//		}
		
		int start = (int)pageable.getOffset();
		int end = (start + pageable.getPageSize()) > list.size() ? list.size() : (start + pageable.getPageSize());
		Page<AlarmTalkHistDto> pageList = new PageImpl<AlarmTalkHistDto>(list.subList(start, end), pageable, list.size());						
        return new ResponseEntity<>(pageList, HttpStatus.OK);		
    }
	
	/**
	 * 알림톡 발송 - GW에러에 의한 SMS발송 오류시 호출
	 * @param 
	 * @return
	 */
	@PostMapping("/sendGW")
	public ResponseEntity<?> sendAlarmTalkGW() {
					
		/* tb_gw_log 테이블 건수 조회 */
		String cnt = alarmTalkRepositoryGW.findByCnt();		
		
		System.out.println("@@@@ GW start & cnt :: "+cnt+" @@@@");
		
		if( Integer.parseInt(cnt) > 0 ) {
			
			ErrInfoGWDto errinfo = new ErrInfoGWDto();		
			errinfo = (ErrInfoGWDto) alarmTalkService.setAlarmTalk("1",false);
			
			String[] TelNo = {"821088718198","821064289816","821095830777"};			
			for(int i=0; i<TelNo.length; i++) {						
				errinfo.setTelNum(TelNo[i]);                          // 전화번호 하드코딩
				new ResponseEntity<>(alarmTalkService.sendAlarmTalkGW(errinfo), HttpStatus.OK);				
			}			
			alarmTalkService.setAlarmTalk("1",true); //초기화
		}	
		
		return null;  
	}
	
	/**
	 * 알림톡 발송 - CSAI에러에 의한 SMS발송 오류시 호출
	 * @param 
	 * @return
	 */
	@PostMapping("/sendCSAI")
	public ResponseEntity<?> sendAlarmTalkCsai() {
					
		/* 테이블 건수 조회 */
		String cnt = alarmTalkRepositoryCsai.findByCnt();		
		
		System.out.println("@@@@ CSAI start & cnt :: "+cnt+" @@@@"); 
		
		if( Integer.parseInt(cnt) > 0 ) {
			
			ErrInfoCsaiDto errinfo = new ErrInfoCsaiDto();			
			errinfo = (ErrInfoCsaiDto) alarmTalkService.setAlarmTalk("2",false);			
			
			String[] TelNo = {"821088718198","821064289816","821025467536","821095830777"};
			for(int i=0; i<TelNo.length; i++) {						
				errinfo.setTelNum(TelNo[i]);                          // 전화번호 하드코딩
				new ResponseEntity<>(alarmTalkService.sendAlarmTalkCsai(errinfo), HttpStatus.OK);				
			}
			
			alarmTalkService.setAlarmTalk("2",true); //초기화
		}		
			
		return null;  
	}
	
}
