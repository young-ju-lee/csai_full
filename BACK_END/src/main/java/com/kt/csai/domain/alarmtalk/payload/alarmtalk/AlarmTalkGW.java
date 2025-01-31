package com.kt.csai.domain.alarmtalk.payload.alarmtalk;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kt.csai.domain.alarmtalk.payload.MsgAttrGW;
import com.kt.csai.domain.alarmtalk.payload.MsgDataGW;
import com.kt.csai.domain.alarmtalk.service.AlarmTalkDataService;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@AllArgsConstructor
@Builder
public class AlarmTalkGW {
	@JsonProperty("msg_type")
	private String msgType;
	@JsonProperty("mt_failover")
	private String mtFailover;
	@JsonProperty("msg_data")
	private MsgDataGW msgData;
	@JsonProperty("msg_attr")
	private MsgAttrGW msgAttr;

	public AlarmTalkGW() {
		this.msgType = "AL";
		this.mtFailover = "N";
		this.msgData = new MsgDataGW();
		this.msgAttr = new MsgAttrGW();
	}

	public AlarmTalkGW(ErrInfoGWDto errinfo) {
		this();
		this.msgData.setTo(errinfo.getTelNum());
		this.msgAttr = new MsgAttrGW();
	}
}
