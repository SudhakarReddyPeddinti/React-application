package com.simpleserver.data.jdbc;

public class MySQLMain {
   public static final String MYSQL_DRIVER = "com.mysql.jdbc.Driver";
   public static final String MYSQL_URL = "jdbc:mysql://localhost:3306/?"
                                           + "user=root&password=root";

   public static void main(String[] args) throws Exception {
       MySQLJava dao = new MySQLJava(MYSQL_DRIVER,MYSQL_URL);
       dao.readData();
   }
}