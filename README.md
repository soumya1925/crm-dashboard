 
welcome to the crm-dasboard-frontend page 
the whole project is devided into two views admin and technician , admin has more controls and navigations as compared to technician


**************************************************************************       LOGIN PAGE      *********************************************************************

login Page -- you can fill up the required fields   from  public --> roleData.json 
the json file contains all technicians and one admin data to login 
here is a sample dat from the roleData.json  which also can be used to login the  page 
 {
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "password": "password123",
      "role": "admin"
    },
    {
      "name": "Bob Smith",
      "email": "bob.smith@example.com",
      "password": "techpass1",
      "role": "technician",
      "workstatus": "available"
    }
enter the required data in  the required field to navigate to either admin/technician  view  according to the role selected in the login page  recommended (admin)

**************************************************************************     ADMIN DASHBOARD     *********************************************************************

