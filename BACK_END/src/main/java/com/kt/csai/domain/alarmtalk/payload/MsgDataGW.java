package com.kt.csai.domain.alarmtalk.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MsgDataGW {
	@JsonProperty("senderid")
	private String senderId;
	@JsonProperty("to")
	private String to;
	@JsonProperty("content")
	private String content;
	
	public MsgDataGW() {
		this.senderId = "";
		//this.content = "안녕하세요. KT고객센터 입니다.\n고객님께서 요청하신 빠른 고장 AS를 위해 상담원이 잠시 후 연락드릴 예정입니다.\n신속한 상담을 원하시면 ‘상담하기’ 버튼을 눌러주세요.";
		this.content = "OSS-OM GW 에러가 발생했으니 즉시 확인 바랍니다. ";
	}
	
	public MsgDataGW(String to) {
		this();
		this.to = to;
	}
}
