package com.simpleserver.rest.jersey;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.simpleserver.data.model.Customer;

@Path("/Customer/data")
public class RestCustomer {
	
	
	// JavaBeans naming convention starts with lowercase
		@GET
		@Path("/get")
		@Produces(MediaType.APPLICATION_JSON)
		public ArrayList<Customer> getCustomerData(){
			ArrayList<Customer> customerList = new ArrayList<Customer>();
			Customer customer = new Customer();
			customer.setUserID(1001);
			customer.setNo(30);
			customer.setYes(70);
			customer.setFirstName("Ron");
			customer.setLastName("Toner");
			customer.setCurrentStatus("Customer meeting");
			customer.setGreeterQueuePosition(20);
			customer.setIsBusy("True");
			customer.setIsClockedIn("True");
			customer.setEmailAddress("ront@testemail.com");
			customer.setCellPhone("8160000000");
			customer.setPhoneEXT("452");
			customer.setSalesPredictionScore(0.30);
			customerList.add(customer);
			
			Customer customer2 = new Customer();
			customer2.setUserID(1002);
			customer2.setNo(60);
			customer2.setYes(40);
			customer2.setFirstName("John");
			customer2.setLastName("MacParler");
			customer2.setCurrentStatus("On Break");
			customer2.setGreeterQueuePosition(13);
			customer2.setIsBusy("False");
			customer2.setIsClockedIn("False");
			customer2.setEmailAddress("jmp@testemail.com");
			customer2.setCellPhone("8161111111");
			customer2.setPhoneEXT("418");
			customer2.setSalesPredictionScore(0.15);
			customerList.add(customer2);
			
			Customer customer3 = new Customer();
			customer3.setUserID(1003);
			customer3.setNo(34);
			customer3.setYes(66);
			customer3.setFirstName("Metilda");
			customer3.setLastName("Parker");
			customer3.setCurrentStatus("On the lot");
			customer3.setGreeterQueuePosition(8);
			customer3.setIsBusy("True");
			customer3.setIsClockedIn("True");
			customer3.setEmailAddress("matilda@testemail.com");
			customer3.setCellPhone("8162222222");
			customer3.setPhoneEXT("403");
			customer3.setSalesPredictionScore(0.65);
			customerList.add(customer3);
			
			Customer customer4 = new Customer();
			customer4.setUserID(1004);
			customer4.setNo(18);
			customer4.setYes(82);
			customer4.setFirstName("Jacob");
			customer4.setLastName("Antony");
			customer4.setCurrentStatus("Attending Customer");
			customer4.setGreeterQueuePosition(18);
			customer4.setIsBusy("True");
			customer4.setIsClockedIn("True");
			customer4.setEmailAddress("JanthonyR@testemail.com");
			customer4.setCellPhone("8163333333");
			customer4.setPhoneEXT("453");
			customer4.setSalesPredictionScore(0.90);
			customerList.add(customer4);
			
			Customer customer5 = new Customer();
			customer5.setUserID(1005);
			customer5.setNo(18);
			customer5.setYes(82);
			customer5.setFirstName("Jamie");
			customer5.setLastName("Watson");
			customer5.setCurrentStatus("Available");
			customer5.setGreeterQueuePosition(18);
			customer5.setIsBusy("False");
			customer5.setIsClockedIn("True");
			customer5.setEmailAddress("JamesWatson@testemail.com");
			customer5.setCellPhone("8164444444");
			customer5.setPhoneEXT("453");
			customer5.setSalesPredictionScore(0.60);
			customerList.add(customer5);
			
			Customer customer6 = new Customer();
			customer6.setUserID(1006);
			customer6.setNo(04);
			customer6.setYes(96);
			customer6.setFirstName("Tim");
			customer6.setLastName("Cook");
			customer6.setCurrentStatus("Attending Customer");
			customer6.setGreeterQueuePosition(23);
			customer6.setIsBusy("True");
			customer6.setIsClockedIn("True");
			customer6.setEmailAddress("timCook@testemail.com");
			customer6.setCellPhone("8166666666");
			customer6.setPhoneEXT("816");
			customer6.setSalesPredictionScore(0.30);
			customerList.add(customer6);
			
			Customer customer7 = new Customer();
			customer7.setUserID(1007);
			customer7.setNo(61);
			customer7.setYes(39);
			customer7.setFirstName("Jason");
			customer7.setLastName("Frank");
			customer7.setCurrentStatus("Not Available");
			customer7.setGreeterQueuePosition(10);
			customer7.setIsBusy("False");
			customer7.setIsClockedIn("False");
			customer7.setEmailAddress("JasonFrank@testemail.com");
			customer7.setCellPhone("8167777777");
			customer7.setPhoneEXT("816");
			customer7.setSalesPredictionScore(1.00);
			customerList.add(customer7);
			
			Customer customer8 = new Customer();
			customer8.setUserID(1008);
			customer8.setNo(42);
			customer8.setYes(58);
			customer8.setFirstName("Matt");
			customer8.setLastName("Damon");
			customer8.setCurrentStatus("lot checking");
			customer8.setGreeterQueuePosition(14);
			customer8.setIsBusy("True");
			customer8.setIsClockedIn("True");
			customer8.setEmailAddress("MattDamon@testemail.com");
			customer8.setCellPhone("8168888888");
			customer8.setPhoneEXT("816");
			customer8.setSalesPredictionScore(0.25);
			customerList.add(customer8);
			
			Customer customer9 = new Customer();
			customer9.setUserID(1009);
			customer9.setNo(35);
			customer9.setYes(65);
			customer9.setFirstName("Leslie");
			customer9.setLastName("Nelson");
			customer9.setCurrentStatus("Available");
			customer9.setGreeterQueuePosition(16);
			customer9.setIsBusy("False");
			customer9.setIsClockedIn("True");
			customer9.setEmailAddress("LesNelson@testemail.com");
			customer9.setCellPhone("8169999999");
			customer9.setPhoneEXT("816");
			customer9.setSalesPredictionScore(0.40);
			customerList.add(customer9);
			
			Customer customer10 = new Customer();
			customer10.setUserID(1010);
			customer10.setNo(10);
			customer10.setYes(90);
			customer10.setFirstName("Fred");
			customer10.setLastName("Marker");
			customer10.setCurrentStatus("Attending Customer");
			customer10.setGreeterQueuePosition(01);
			customer10.setIsBusy("True");
			customer10.setIsClockedIn("True");
			customer10.setEmailAddress("FredM@testemail.com");
			customer10.setCellPhone("8161010100");
			customer10.setPhoneEXT("816");
			customer10.setSalesPredictionScore(0.22);
			customerList.add(customer10);
			
			Customer customer11 = new Customer();
			customer11.setUserID(1011);
			customer11.setNo(20);
			customer11.setYes(80);
			customer11.setFirstName("Pamela");
			customer11.setLastName("Vinson");
			customer11.setCurrentStatus("Available");
			customer11.setGreeterQueuePosition(04);
			customer11.setIsBusy("False");
			customer11.setIsClockedIn("True");
			customer11.setEmailAddress("PamV@testemail.com");
			customer11.setCellPhone("8161122333");
			customer11.setPhoneEXT("453");
			customer11.setSalesPredictionScore(0.71);
			customerList.add(customer11);
			
			Customer customer12 = new Customer();
			customer12.setUserID(1012);
			customer12.setNo(92);
			customer12.setYes(8);
			customer12.setFirstName("Robert");
			customer12.setLastName("Nickel");
			customer12.setCurrentStatus("Not Available");
			customer12.setGreeterQueuePosition(15);
			customer12.setIsBusy("False");
			customer12.setIsClockedIn("False");
			customer12.setEmailAddress("RobNickel@testemail.com");
			customer12.setCellPhone("8161231234");
			customer12.setPhoneEXT("453");
			customer12.setSalesPredictionScore(0.67);
			customerList.add(customer12);
			
			Customer customer13 = new Customer();
			customer13.setUserID(1013);
			customer13.setNo(42);
			customer13.setYes(58);
			customer13.setFirstName("Mahesh");
			customer13.setLastName("Reddy");
			customer13.setCurrentStatus("Client visit");
			customer13.setGreeterQueuePosition(56);
			customer13.setIsBusy("False");
			customer13.setIsClockedIn("True");
			customer13.setEmailAddress("MaheshBabu@testemail.com");
			customer13.setCellPhone("8165534555");
			customer13.setPhoneEXT("453");
			customer13.setSalesPredictionScore(0.43);
			customerList.add(customer13);
			
			Customer customer14 = new Customer();
			customer14.setUserID(1014);
			customer14.setNo(27);
			customer14.setYes(73);
			customer14.setFirstName("Racheal");
			customer14.setLastName("Mendis");
			customer14.setCurrentStatus("On lot tour");
			customer14.setGreeterQueuePosition(26);
			customer14.setIsBusy("False");
			customer14.setIsClockedIn("True");
			customer14.setEmailAddress("RacheMenis@testemail.com");
			customer14.setCellPhone("8165009555");
			customer14.setPhoneEXT("173");
			customer14.setSalesPredictionScore(0.22);
			customerList.add(customer14);
			
			Customer customer15 = new Customer();
			customer15.setUserID(1015);
			customer15.setNo(58);
			customer15.setYes(42);
			customer15.setFirstName("Rachel");
			customer15.setLastName("Fillin");
			customer15.setCurrentStatus("Available");
			customer15.setGreeterQueuePosition(10);
			customer15.setIsBusy("False");
			customer15.setIsClockedIn("True");
			customer15.setEmailAddress("rache@testemail.com");
			customer15.setCellPhone("8165551445");
			customer15.setPhoneEXT("273");
			customer15.setSalesPredictionScore(0.13);
			customerList.add(customer15);
			
			Customer customer16 = new Customer();
			customer16.setUserID(1016);
			customer16.setNo(84);
			customer16.setYes(16);
			customer16.setFirstName("Kaneth");
			customer16.setLastName("Mill");
			customer16.setCurrentStatus("Not Available");
			customer16.setGreeterQueuePosition(21);
			customer16.setIsBusy("False");
			customer16.setIsClockedIn("False");
			customer16.setEmailAddress("Kmill@testemail.com");
			customer16.setCellPhone("816555099");
			customer16.setPhoneEXT("816");
			customer16.setSalesPredictionScore(0.39);
			customerList.add(customer16);
			
			Customer customer17 = new Customer();
			customer17.setUserID(1017);
			customer17.setNo(18);
			customer17.setYes(82);
			customer17.setFirstName("Ron");
			customer17.setLastName("Charlotte");
			customer17.setCurrentStatus("out on lot tour");
			customer17.setGreeterQueuePosition(19);
			customer17.setIsBusy("False");
			customer17.setIsClockedIn("True");
			customer17.setEmailAddress("RonCharlotte@testemail.com");
			customer17.setCellPhone("8165111313");
			customer17.setPhoneEXT("453");
			customer17.setSalesPredictionScore(0.10);
			customerList.add(customer17);
			
			Customer customer18 = new Customer();
			customer18.setUserID(1018);
			customer18.setNo(72);
			customer18.setYes(28);
			customer18.setFirstName("Mared");
			customer18.setLastName("Richard");
			customer18.setCurrentStatus("Not Available");
			customer18.setGreeterQueuePosition(19);
			customer18.setIsBusy("False");
			customer18.setIsClockedIn("False");
			customer18.setEmailAddress("marcrich@testemail.com");
			customer18.setCellPhone("8165576232");
			customer18.setPhoneEXT("173");
			customer18.setSalesPredictionScore(0.23);
			customerList.add(customer18);
			
			Customer customer19 = new Customer();
			customer19.setUserID(1019);
			customer19.setNo(76);
			customer19.setYes(24);
			customer19.setFirstName("Keith");
			customer19.setLastName("Underwood");
			customer19.setCurrentStatus("Client meeting");
			customer19.setGreeterQueuePosition(02);
			customer19.setIsBusy("True");
			customer19.setIsClockedIn("True");
			customer19.setEmailAddress("keithUnderwood@testemail.com");
			customer19.setCellPhone("8165589895");
			customer19.setPhoneEXT("453");
			customer19.setSalesPredictionScore(0.19);
			customerList.add(customer19);
			
			Customer customer20 = new Customer();
			customer20.setUserID(1020);
			customer20.setNo(48);
			customer20.setYes(52);
			customer20.setFirstName("Arnold");
			customer20.setLastName("Rogane");
			customer20.setCurrentStatus("Available");
			customer20.setGreeterQueuePosition(06);
			customer20.setIsBusy("False");
			customer20.setIsClockedIn("False");
			customer20.setEmailAddress("ArnoldRog@testemail.com");
			customer20.setCellPhone("8165555111");
			customer20.setPhoneEXT("273");
			customer20.setSalesPredictionScore(0.09);
			customerList.add(customer20);
			
			Customer customer21 = new Customer();
			customer21.setUserID(1021);
			customer21.setNo(18);
			customer21.setYes(82);
			customer21.setFirstName("Bruce");
			customer21.setLastName("Willson");
			customer21.setCurrentStatus("Client meeting");
			customer21.setGreeterQueuePosition(9);
			customer21.setIsBusy("True");
			customer21.setIsClockedIn("True");
			customer21.setEmailAddress("Bruce@testemail.com");
			customer21.setCellPhone("8165557555");
			customer21.setPhoneEXT("453");
			customer21.setSalesPredictionScore(0.37);
			customerList.add(customer21);
			
			return customerList;
		}
}
