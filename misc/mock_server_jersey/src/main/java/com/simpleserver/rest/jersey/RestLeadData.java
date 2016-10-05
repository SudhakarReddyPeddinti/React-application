package com.simpleserver.rest.jersey;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.simpleserver.data.model.UserData;

@Path("/Lead/data")
public class RestLeadData {
	
	
	// JavaBeans naming convention starts with lowercase
		@GET
		@Path("/get")
		@Produces(MediaType.APPLICATION_JSON)
		public ArrayList<UserData> getLeadData(){
			ArrayList<UserData> UserDataList = new ArrayList<UserData>();
			UserData UserData = new UserData();
			UserData.setAutoLeadId(10001);
			UserData.setYear(2011);
			UserData.setCustomerName("Ron Abrovinc");
			UserData.setMake("Tesla");
			UserData.setModel("Model S");
			UserData.setTrim("Electric");
			UserData.setLeadSource("Trilogy Smartleads");
			UserData.setLeadStatus("Waiting for prospect response");
			UserData.setLeadStatusType("Active");
			UserData.setLeadType("Internet");
			UserData.setGroupCategory("Recent");
			UserData.setGlobalCustomerId(269677328);
			UserData.setCreatedUtc("2016-03-09T15:00:00");
			UserData.setIsHot("null");
			UserData.setIsOnShowroom("true");
			UserData.setPredictionScore(0.20);
			UserDataList.add(UserData);
			
			UserData UserData2 = new UserData();
			UserData2.setAutoLeadId(10002);
			UserData2.setYear(2000);
			UserData2.setCustomerName("John Acharya");
			UserData2.setMake("Bentley");
			UserData2.setModel("Boomrang");
			UserData2.setTrim("SR-X");
			UserData2.setLeadSource("Trilogy Smartleads");
			UserData2.setLeadStatus("Waiting for prospect response");
			UserData2.setLeadStatusType("Active");
			UserData2.setLeadType("Internet");
			UserData2.setGroupCategory("Recent");
			UserData2.setGlobalCustomerId(269677328);
			UserData2.setCreatedUtc("2016-03-09T15:00:00");
			UserData2.setIsHot("null");
			UserData2.setIsOnShowroom("true");
			UserData2.setPredictionScore(0.90);
			UserDataList.add(UserData2);
			
			UserData UserData3 = new UserData();
			UserData3.setAutoLeadId(10003);
			UserData3.setYear(2015);
			UserData3.setCustomerName("Metilda Philips");
			UserData3.setMake("Kia");
			UserData3.setModel("Strader");
			UserData3.setTrim("Ultimate");
			UserData3.setLeadSource("Trilogy Smartleads");
			UserData3.setLeadStatus("Waiting for prospect response");
			UserData3.setLeadStatusType("Active");
			UserData3.setLeadType("Internet");
			UserData3.setGroupCategory("Recent");
			UserData3.setGlobalCustomerId(263128);
			UserData3.setCreatedUtc("2011-12-09T15:00:00");
			UserData3.setIsHot("null");
			UserData3.setIsOnShowroom("false");
			UserData3.setPredictionScore(0.34);
			UserDataList.add(UserData3);
			
			UserData UserData4 = new UserData();
			UserData4.setAutoLeadId(10004);
			UserData4.setYear(2000);
			UserData4.setCustomerName("Jacob Avoc");
			UserData4.setMake("Mercedes-Benz");
			UserData4.setModel("GL-C class");
			UserData4.setTrim("Sports");
			UserData4.setLeadSource("Hot leads");
			UserData4.setLeadStatus("Prospect");
			UserData4.setLeadStatusType("Active");
			UserData4.setLeadType("Phone");
			UserData4.setGroupCategory("Recent");
			UserData4.setGlobalCustomerId(269677328);
			UserData4.setCreatedUtc("2016-03-09T15:00:00");
			UserData4.setIsHot("null");
			UserData4.setIsOnShowroom("true");
			UserData4.setPredictionScore(0.45);
			UserDataList.add(UserData4);
			
			UserData UserData5 = new UserData();
			UserData5.setAutoLeadId(10005);
			UserData5.setYear(2008);
			UserData5.setCustomerName("Jamie Hale");
			UserData5.setMake("Ford");
			UserData5.setModel("Escape");
			UserData5.setTrim("Titanium");
			UserData5.setLeadSource("Trilogy Smartleads");
			UserData5.setLeadStatus("Waiting for prospect response");
			UserData5.setLeadStatusType("Active");
			UserData5.setLeadType("Internet");
			UserData5.setGroupCategory("Recent");
			UserData5.setGlobalCustomerId(269677328);
			UserData5.setCreatedUtc("2016-03-09T15:00:00");
			UserData5.setIsHot("false");
			UserData5.setIsOnShowroom("false");
			UserData5.setPredictionScore(0.90);
			UserDataList.add(UserData5);
			
			UserData UserData6 = new UserData();
			UserData6.setAutoLeadId(10006);
			UserData6.setYear(2012);
			UserData6.setCustomerName("Tim cook");
			UserData6.setMake("Ford");
			UserData6.setModel("F-150");
			UserData6.setTrim("Lariat");
			UserData6.setLeadSource("Fd");
			UserData6.setLeadStatus("Active lead");
			UserData6.setLeadStatusType("Active");
			UserData6.setLeadType("Internet");
			UserData6.setGroupCategory("Hot");
			UserData6.setGlobalCustomerId(192328);
			UserData6.setCreatedUtc("2016-05-09T15:00:00");
			UserData6.setIsHot("null");
			UserData6.setIsOnShowroom("true");
			UserData6.setPredictionScore(0.50);
			//UserDataList.add(UserData6);
			
			UserData UserData7 = new UserData();
			UserData7.setAutoLeadId(10007);
			UserData7.setYear(2000);
			UserData7.setCustomerName("Jason Holden");
			UserData7.setMake("Ford");
			UserData7.setModel("Explorer");
			UserData7.setTrim("4wd 4dr Sport");
			UserData7.setLeadSource("Dealer Safeguard Solutions");
			UserData7.setLeadStatus("Active Lead");
			UserData7.setLeadStatusType("Active");
			UserData7.setLeadType("Walk-in");
			UserData7.setGroupCategory("Hot");
			UserData7.setGlobalCustomerId(58393);
			UserData7.setCreatedUtc("2016-03-09T15:00:00");
			UserData7.setIsHot("false");
			UserData7.setIsOnShowroom("true");
			UserData7.setPredictionScore(0.80);
			//UserDataList.add(UserData7);
			
			UserData UserData8 = new UserData();
			UserData8.setAutoLeadId(10008);
			UserData8.setYear(2011);
			UserData8.setCustomerName("Matt Deamon");
			UserData8.setMake("Ford");
			UserData8.setModel("Fusion Hybrid");
			UserData8.setTrim("Fusion Hybrid 4dr sdn Titanium");
			UserData8.setLeadSource("AutoBytel");
			UserData8.setLeadStatus("Active Lead");
			UserData8.setLeadStatusType("Active");
			UserData8.setLeadType("Internet");
			UserData8.setGroupCategory("Recent");
			UserData8.setGlobalCustomerId(269672228);
			UserData8.setCreatedUtc("2014-11-09T12:00:00");
			UserData8.setIsHot("null");
			UserData8.setIsOnShowroom("false");
			UserData8.setPredictionScore(0.40);
			//UserDataList.add(UserData8);
			
			UserData UserData9 = new UserData();
			UserData9.setAutoLeadId(10009);
			UserData9.setYear(2015);
			UserData9.setCustomerName("Leslie Nelson");
			UserData9.setMake("Ford");
			UserData9.setModel("F-250");
			UserData9.setTrim("XLT");
			UserData9.setLeadSource("Autotrader tim Website");
			UserData9.setLeadStatus("Waiting for prospect response");
			UserData9.setLeadStatusType("Active");
			UserData9.setLeadType("Referral");
			UserData9.setGroupCategory("Recent");
			UserData9.setGlobalCustomerId(109677328);
			UserData9.setCreatedUtc("2015-03-09T15:00:00");
			UserData9.setIsHot("False");
			UserData9.setIsOnShowroom("true");
			UserData9.setPredictionScore(0.75);
			//UserDataList.add(UserData9);
			
			UserData UserData10 = new UserData();
			UserData10.setAutoLeadId(10010);
			UserData10.setYear(1991);
			UserData10.setCustomerName("Fred Quimbley");
			UserData10.setMake("Ford");
			UserData10.setModel("Transit Connect");
			UserData10.setTrim("Transit Connect");
			UserData10.setLeadSource("Referral");
			UserData10.setLeadStatus("Active Lead");
			UserData10.setLeadStatusType("Active");
			UserData10.setLeadType("Referral");
			UserData10.setGroupCategory("Hot");
			UserData10.setGlobalCustomerId(269671238);
			UserData10.setCreatedUtc("2016-06-11T15:00:00");
			UserData10.setIsHot("true");
			UserData10.setIsOnShowroom("true");
			UserData10.setPredictionScore(0.59);
			//UserDataList.add(UserData10);			
			return UserDataList;
		}
}
